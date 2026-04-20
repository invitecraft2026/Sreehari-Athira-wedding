import { useMemo } from "react";

const FallingPetals = ({ count = 15 }: { count?: number }) => {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 6,
        size: 8 + Math.random() * 12,
        opacity: 0.3 + Math.random() * 0.5,
      })),
    [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute animate-fall"
          style={{
            left: `${p.left}%`,
            top: "-20px",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            animationIterationCount: "infinite",
            opacity: p.opacity,
          }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 20 20">
            <ellipse
              cx="10"
              cy="10"
              rx="5"
              ry="9"
              fill="hsl(var(--pistachio))"
              transform="rotate(30 10 10)"
              opacity="0.7"
            />
            <ellipse
              cx="10"
              cy="10"
              rx="4"
              ry="7"
              fill="hsl(var(--gold))"
              transform="rotate(-20 10 10)"
              opacity="0.3"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FallingPetals;
