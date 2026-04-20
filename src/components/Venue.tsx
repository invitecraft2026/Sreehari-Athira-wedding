import { useEffect, useRef, useState } from "react";
import FloralDivider from "./FloralDivider";

const WEDDING_DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=Holiday+Home,+Kumily";
const WEDDING_MAP = "https://maps.google.com/?q=Holiday+Home,+Kumily";

const Venue = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const slideStyle = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(40px)",
    transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
  });

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at top, #FBF5EC 0%, #F5E6C8 50%, #F2C4A0 100%)",
      }}
    >
      {/* Crimson vignette bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(139,26,26,0.07) 0%, transparent 100%)",
        }}
      />

      {/* Background mango-leaf pattern — crimson tint */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <svg
            key={i}
            width="200"
            height="200"
            viewBox="0 0 200 200"
            className="absolute"
            style={{
              left: `${(i % 3) * 35}%`,
              top: `${Math.floor(i / 3) * 50}%`,
              transform: `rotate(${i * 60}deg)`,
              color: "#8B1A1A",
            }}
          >
            <path d="M100 20 Q130 60 100 180 Q70 60 100 20Z" fill="currentColor" />
          </svg>
        ))}
      </div>

      <div className="relative z-10 max-w-xl mx-auto text-center">
        {/* Floral divider */}
        <div style={slideStyle(0.1)}>
          <FloralDivider className="mb-10" />
        </div>

        {/* Venue card */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            ...slideStyle(0.3),
            background:
              "linear-gradient(135deg, rgba(251,245,236,0.85) 0%, rgba(245,230,200,0.95) 100%)",
            border: "1px solid rgba(212,162,76,0.35)",
            boxShadow:
              "0 24px 64px rgba(139,26,26,0.13), 0 4px 16px rgba(160,116,42,0.10), inset 0 1px 0 rgba(255,255,255,0.65)",
          }}
        >
          {/* Gold shimmer top edge */}
          <div
            className="absolute top-0 left-8 right-8 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, #D4A24C90, transparent)",
            }}
          />

          {/* Decorative corner circles */}
          <div
            className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10 pointer-events-none"
            style={{ background: "#D4A24C" }}
          />
          <div
            className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-10 pointer-events-none"
            style={{ background: "#8B1A1A" }}
          />

          <div className="relative z-10 p-8 md:p-10">
            {/* Eyebrow */}
            <p
              className="font-sans text-[10px] tracking-[0.35em] uppercase mb-2"
              style={{ color: "#A0742A" }}
            >
              Wedding Venue
            </p>

            {/* Venue name — crimson serif */}
            <h2
              className="font-serif italic text-2xl md:text-3xl mb-1"
              style={{ color: "#8B1A1A" }}
            >
              Holiday Home
            </h2>

            {/* Location lines */}
            <p
              className="font-sans text-sm mb-0.5"
              style={{ color: "rgba(139,26,26,0.65)" }}
            >
              Kumily
            </p>
            <p
              className="font-sans text-sm mb-5"
              style={{ color: "rgba(139,26,26,0.65)" }}
            >
              Kerala, India
            </p>

            {/* Gold ornamental divider */}
            <div className="flex items-center justify-center gap-3 my-4">
              <div
                className="h-px flex-1"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #D4A24C60)",
                }}
              />
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1 L7.9 5.5 L12.5 7 L7.9 8.5 L7 13 L6.1 8.5 L1.5 7 L6.1 5.5 Z"
                  fill="#D4A24C"
                />
              </svg>
              <div
                className="h-px flex-1"
                style={{
                  background:
                    "linear-gradient(to left, transparent, #D4A24C60)",
                }}
              />
            </div>

            {/* Date & time — gold serif */}
            <p
              className="font-serif italic text-lg mb-6"
              style={{ color: "#A0742A" }}
            >
              May 18, 2026 &nbsp;|&nbsp; 9:15 AM – 10:05 AM
            </p>

            {/* Action buttons */}
            <div className="flex gap-3 justify-center flex-wrap">
              {/* Primary — crimson filled */}
              <button
                onClick={() => window.open(WEDDING_DIRECTIONS, "_blank")}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-sans text-xs tracking-widest uppercase transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "#8B1A1A",
                  color: "#F5E6C8",
                  border: "1px solid rgba(212,162,76,0.45)",
                  boxShadow:
                    "0 6px 20px rgba(139,26,26,0.22), inset 0 1px 0 rgba(242,201,122,0.18)",
                  letterSpacing: "0.15em",
                }}
              >
                <span style={{ color: "#D4A24C" }}>📍</span>
                Directions
              </button>

              {/* Secondary — ghost gold border */}
              <button
                onClick={() => window.open(WEDDING_MAP, "_blank")}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-sans text-xs tracking-widest uppercase transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "transparent",
                  color: "#8B1A1A",
                  border: "1px solid rgba(212,162,76,0.55)",
                  boxShadow: "0 4px 12px rgba(160,116,42,0.10)",
                  letterSpacing: "0.15em",
                }}
              >
                <span>🗺️</span>
                Map
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Venue;