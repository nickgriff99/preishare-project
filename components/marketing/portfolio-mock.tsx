"use client";

import { CountUp } from "@/components/motion/count-up";
import { FadeIn } from "@/components/motion/fade-in";
import { motion } from "framer-motion";

const bars = [40, 65, 45, 80, 55, 90, 70, 85];

export function PortfolioMock() {
  return (
    <FadeIn>
      <div className="glass-purple panel-lg mx-auto w-full max-w-md overflow-hidden lg:mx-0 lg:max-w-none">
        <p className="text-xs font-medium uppercase tracking-wider text-purple-light">
          Portfolio Overview
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
          {[
            {
              label: "Total Invested",
              content: <CountUp value={2450000} prefix="$" />,
              extra: "+12.5% YTD",
              className: "text-gold text-lg sm:text-xl",
            },
            {
              label: "Avg. IRR",
              content: <CountUp value={18.2} suffix="%" decimals={1} />,
              className: "text-purple-light text-lg sm:text-xl",
            },
            {
              label: "Properties",
              content: <CountUp value={12} decimals={0} />,
              className: "text-lg sm:text-xl",
            },
            {
              label: "Co-Investors",
              content: <CountUp value={847} decimals={0} />,
              className: "text-lg sm:text-xl",
            },
          ].map((cell) => (
            <div
              key={cell.label}
              className="min-w-0 overflow-hidden rounded-xl bg-purple-surface p-4 ring-1 ring-purple-light/10 sm:p-5"
            >
              <p className="text-xs text-muted">{cell.label}</p>
              <p className={`mt-2 font-semibold tabular-nums ${cell.className ?? ""}`}>
                {cell.content}
              </p>
              {cell.extra && <p className="mt-1 text-xs text-success">{cell.extra}</p>}
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted">Returns by Quarter</p>
        <div className="mt-3 flex h-24 items-end gap-2 sm:h-28">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="min-w-0 flex-1 rounded-t bg-gradient-to-t from-purple to-gold/80"
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 + i * 0.04, duration: 0.4 }}
            />
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-purple-light/20 pt-5 text-sm text-muted">
          <span>Distributions</span>
          <span className="shrink-0 font-semibold tabular-nums text-gold">$340K</span>
        </div>
      </div>
    </FadeIn>
  );
}
