"use client";

import { PricingCard } from "@/components/marketing/pricing-card";
import type { PricingPlan } from "@/lib/pricing-plans";
import { cn } from "@/lib/utils";
import { animate, motion, useMotionValue, useReducedMotion, type PanInfo } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const SLIDE_TRANSITION = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };
const DRAG_SNAP_TRANSITION = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };
const SWIPE_OFFSET_THRESHOLD = 0.18;
const SWIPE_VELOCITY_THRESHOLD = 400;

function PricingCarouselSlide({
  plan,
  index,
  activeIndex,
}: {
  plan: PricingPlan;
  index: number;
  activeIndex: number;
}) {
  return (
    <div
      className="w-full min-w-full shrink-0 grow-0 basis-full px-1 py-2 sm:px-2"
      aria-hidden={index !== activeIndex}
    >
      <PricingCard plan={plan} />
    </div>
  );
}

type PricingCarouselProps = {
  plans: PricingPlan[];
};

export function PricingCarousel({ plans }: PricingCarouselProps) {
  const reduced = useReducedMotion() ?? false;
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const x = useMotionValue(0);
  const dragEnabled = slideWidth > 0 && !reduced && plans.length > 1;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => setSlideWidth(el.offsetWidth);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!slideWidth) return;
    animate(x, -activeIndex * slideWidth, reduced ? { duration: 0 } : SLIDE_TRANSITION);
  }, [activeIndex, slideWidth, reduced, x]);

  const snapToIndex = useCallback((index: number) => {
    setActiveIndex(Math.max(0, Math.min(index, plans.length - 1)));
  }, [plans.length]);

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (!slideWidth) return;

      const offsetThreshold = slideWidth * SWIPE_OFFSET_THRESHOLD;
      let next = activeIndex;

      if (info.offset.x < -offsetThreshold || info.velocity.x < -SWIPE_VELOCITY_THRESHOLD) {
        next = activeIndex + 1;
      } else if (info.offset.x > offsetThreshold || info.velocity.x > SWIPE_VELOCITY_THRESHOLD) {
        next = activeIndex - 1;
      }

      next = Math.max(0, Math.min(next, plans.length - 1));

      if (next === activeIndex) {
        animate(x, -activeIndex * slideWidth, DRAG_SNAP_TRANSITION);
      } else {
        snapToIndex(next);
      }
    },
    [activeIndex, slideWidth, snapToIndex, x],
  );

  return (
    <div className="min-w-0 w-full overflow-visible">
      <div
        ref={containerRef}
        className="relative w-full overflow-x-clip overflow-y-visible py-4 sm:py-5"
        aria-roledescription="carousel"
        aria-label="Pricing plans"
      >
        <motion.div
          className={cn(
            "flex w-full flex-nowrap touch-pan-x select-none",
            dragEnabled && "cursor-grab active:cursor-grabbing",
          )}
          style={{ x }}
          drag={dragEnabled ? "x" : false}
          dragConstraints={
            slideWidth
              ? { left: -(plans.length - 1) * slideWidth, right: 0 }
              : undefined
          }
          dragElastic={0.1}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
        >
          {plans.map((plan, index) => (
            <PricingCarouselSlide
              key={plan.id}
              plan={plan}
              index={index}
              activeIndex={activeIndex}
            />
          ))}
        </motion.div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {plans.map((plan, index) => (
          <button
            key={plan.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${plan.name} plan`}
            aria-current={index === activeIndex ? "true" : undefined}
            className={cn(
              "h-1.5 rounded-full transition-all",
              index === activeIndex
                ? "w-8 bg-gold"
                : "w-3 bg-card-border hover:bg-purple-light/50",
            )}
          />
        ))}
      </div>

      <p className="mt-3 text-center text-xs text-muted">
        Swipe or drag to compare · {plans[activeIndex]?.name}
      </p>
    </div>
  );
}
