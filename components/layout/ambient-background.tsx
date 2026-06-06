"use client";

import { SkylineSilhouette } from "@/components/layout/skyline-silhouette";
import { getSkylinePhotoUrl } from "@/lib/ambient-assets";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

type AmbientVariant = "page" | "hero" | "section";

type AmbientBackgroundProps = {
  variant?: AmbientVariant;
  fixed?: boolean;
  className?: string;
  opacity?: number;
};

const variantConfig: Record<
  AmbientVariant,
  {
    photoOpacity: string;
    veil: string;
    skylineOpacity: string;
    orbs: number;
  }
> = {
  page: {
    photoOpacity: "opacity-[0.22] sm:opacity-[0.26]",
    veil: "from-background/88 via-purple-deep/72 to-background/94",
    skylineOpacity: "opacity-35 sm:opacity-40",
    orbs: 2,
  },
  hero: {
    photoOpacity: "opacity-[0.34] sm:opacity-[0.4]",
    veil: "from-background/78 via-purple-deep/55 to-background/90",
    skylineOpacity: "opacity-55 sm:opacity-65",
    orbs: 3,
  },
  section: {
    photoOpacity: "opacity-0",
    veil: "from-transparent via-purple-muted/20 to-transparent",
    skylineOpacity: "opacity-25 sm:opacity-30",
    orbs: 1,
  },
};

const orbPositions = [
  { className: "left-[8%] top-[12%] h-56 w-56 bg-purple", delay: 0 },
  { className: "right-[6%] top-[28%] h-72 w-72 bg-gold", delay: 4 },
  { className: "left-[42%] bottom-[18%] h-64 w-64 bg-purple-bright", delay: 8 },
];

function AmbientOrb({
  className,
  delay,
  reducedMotion,
}: {
  className: string;
  delay: number;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      aria-hidden
      className={cn("decor-glow absolute rounded-full", className)}
      initial={{ opacity: 0.18 }}
      animate={
        reducedMotion
          ? { opacity: 0.22 }
          : {
              opacity: [0.16, 0.32, 0.18],
              x: [0, 24, -12, 0],
              y: [0, -18, 10, 0],
              scale: [1, 1.06, 0.98, 1],
            }
      }
      transition={
        reducedMotion
          ? { duration: 0 }
          : { duration: 22, delay, repeat: Infinity, ease: "easeInOut" }
      }
    />
  );
}

export function AmbientBackground({
  variant = "section",
  fixed = false,
  className,
  opacity = 1,
}: AmbientBackgroundProps) {
  const reducedMotion = useReducedMotion();
  const config = variantConfig[variant];
  const showPhoto = variant !== "section";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none overflow-hidden transition-opacity duration-300 ease-out",
        fixed ? "fixed inset-0 z-0" : "absolute inset-0 z-0",
        className,
      )}
      style={{ opacity }}
    >
      {showPhoto && (
        <div className={cn("absolute inset-0", config.photoOpacity)}>
          <Image
            src={getSkylinePhotoUrl()}
            alt=""
            fill
            priority={variant === "hero"}
            sizes="100vw"
            className="object-cover object-[center_35%]"
          />
        </div>
      )}

      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b",
          config.veil,
        )}
      />

      <div
        className={cn(
          "ambient-skyline-back absolute inset-x-0 bottom-0 h-[38%] min-h-[12rem] sm:h-[42%]",
          config.skylineOpacity,
        )}
      >
        <SkylineSilhouette layer="back" />
      </div>

      <div
        className={cn(
          "ambient-skyline-front absolute inset-x-0 bottom-0 h-[28%] min-h-[9rem] sm:h-[30%]",
          config.skylineOpacity,
        )}
      >
        <SkylineSilhouette layer="front" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(91,33,182,0.28),transparent_70%)]" />

      {orbPositions.slice(0, config.orbs).map((orb) => (
        <AmbientOrb
          key={orb.className}
          className={orb.className}
          delay={orb.delay}
          reducedMotion={Boolean(reducedMotion)}
        />
      ))}
    </div>
  );
}
