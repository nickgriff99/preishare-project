"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
};

function formatValue(v: number, decimals: number, prefix: string, suffix: string) {
  const formatted =
    decimals > 0
      ? v.toFixed(decimals)
      : new Intl.NumberFormat("en-US").format(Math.round(v));
  return `${prefix}${formatted}${suffix}`;
}

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const spring = useSpring(0, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (v) => formatValue(v, decimals, prefix, suffix));

  useEffect(() => {
    if (inView) spring.set(value);
  }, [inView, spring, value]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
