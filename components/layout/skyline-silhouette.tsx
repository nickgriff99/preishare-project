import { cn } from "@/lib/utils";

type SkylineSilhouetteProps = {
  layer: "back" | "front";
  className?: string;
};

export function SkylineSilhouette({ layer, className }: SkylineSilhouetteProps) {
  const isBack = layer === "back";

  return (
    <svg
      viewBox="0 0 1440 360"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
      className={cn("h-full w-full", className)}
    >
      <defs>
        <linearGradient id={`skyline-fill-${layer}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={isBack ? "#2d1a4a" : "#3d2560"} />
          <stop offset="100%" stopColor={isBack ? "#140a22" : "#1f1035"} />
        </linearGradient>
      </defs>

      {isBack ? (
        <g fill={`url(#skyline-fill-${layer})`}>
          <rect x="0" y="120" width="90" height="240" />
          <rect x="100" y="60" width="110" height="300" />
          <rect x="220" y="140" width="70" height="220" />
          <rect x="300" y="40" width="130" height="320" />
          <rect x="440" y="100" width="95" height="260" />
          <rect x="545" y="20" width="150" height="340" />
          <rect x="705" y="90" width="100" height="270" />
          <rect x="815" y="50" width="120" height="310" />
          <rect x="945" y="130" width="80" height="230" />
          <rect x="1035" y="30" width="140" height="330" />
          <rect x="1185" y="110" width="90" height="250" />
          <rect x="1285" y="70" width="110" height="290" />
          <rect x="1395" y="150" width="45" height="210" />
          <rect x="330" y="80" width="18" height="18" fill="#5b21b6" opacity="0.35" />
          <rect x="360" y="110" width="18" height="18" fill="#5b21b6" opacity="0.35" />
          <rect x="570" y="60" width="20" height="20" fill="#5b21b6" opacity="0.3" />
          <rect x="600" y="90" width="20" height="20" fill="#5b21b6" opacity="0.3" />
          <rect x="1060" y="70" width="18" height="18" fill="#5b21b6" opacity="0.35" />
        </g>
      ) : (
        <g fill={`url(#skyline-fill-${layer})`}>
          <rect x="30" y="180" width="75" height="180" />
          <rect x="115" y="150" width="60" height="210" />
          <rect x="185" y="200" width="55" height="160" />
          <rect x="250" y="130" width="85" height="230" />
          <rect x="345" y="170" width="65" height="190" />
          <rect x="420" y="110" width="100" height="250" />
          <rect x="530" y="190" width="50" height="170" />
          <rect x="590" y="140" width="90" height="220" />
          <rect x="690" y="180" width="70" height="180" />
          <rect x="770" y="100" width="105" height="260" />
          <rect x="885" y="160" width="60" height="200" />
          <rect x="955" y="120" width="95" height="240" />
          <rect x="1060" y="190" width="55" height="170" />
          <rect x="1125" y="150" width="80" height="210" />
          <rect x="1215" y="110" width="100" height="250" />
          <rect x="1325" y="170" width="70" height="190" />
          <rect x="1395" y="200" width="45" height="160" />
          <rect x="450" y="140" width="14" height="14" fill="#a78bfa" opacity="0.25" />
          <rect x="480" y="170" width="14" height="14" fill="#a78bfa" opacity="0.25" />
          <rect x="800" y="130" width="14" height="14" fill="#d4af37" opacity="0.2" />
          <rect x="830" y="160" width="14" height="14" fill="#d4af37" opacity="0.2" />
          <rect x="1240" y="140" width="14" height="14" fill="#a78bfa" opacity="0.25" />
        </g>
      )}
    </svg>
  );
}
