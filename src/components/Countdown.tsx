import { useState, useEffect, useRef } from "react";
import FloralDivider from "./FloralDivider";
import FallingPetals from "./FallingPetals";

const WEDDING_DATE = new Date("2026-05-18T03:45:00Z");

const getRemaining = (target: Date) => {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
};

const TimeUnit = ({
  value,
  label,
  accent,
}: {
  value: number;
  label: string;
  accent: string;
}) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className="relative w-14 h-16 sm:w-18 sm:h-20 md:w-24 md:h-28 rounded-2xl flex items-center justify-center"
      style={{
        background: "rgba(251,245,236,0.30)",
        backdropFilter: "blur(14px)",
        border: `1px solid rgba(212,162,76,0.35)`,
        boxShadow:
          "0 8px 32px rgba(139,26,26,0.08), inset 0 1px 0 rgba(255,255,255,0.55)",
      }}
    >
      {/* Top shine */}
      <div
        className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl"
        style={{ background: "rgba(242,201,122,0.12)" }}
      />

      <span
        className="relative font-serif font-bold text-2xl sm:text-3xl md:text-5xl tabular-nums"
        style={{ color: accent }}
      >
        {String(value).padStart(2, "0")}
      </span>
    </div>

    <span
      className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em]"
      style={{ color: `${accent}99` }}
    >
      {label}
    </span>
  </div>
);

const CountdownCard = ({
  title,
  time,
  accent,
  bg,
  border,
  visible,
  delay,
}: {
  title: string;
  time: { d: number; h: number; m: number; s: number };
  accent: string;
  bg: string;
  border: string;
  visible: boolean;
  delay: number;
}) => (
  <div
    className="relative rounded-3xl overflow-hidden"
    style={{
      opacity: visible ? 1 : 0,
      transform: visible
        ? "translateY(0) scale(1)"
        : "translateY(50px) scale(0.97)",
      transition: `opacity 1s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 1s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      background: bg,
      border: `1px solid ${border}`,
      boxShadow:
        "0 24px 64px rgba(139,26,26,0.14), 0 4px 16px rgba(160,116,42,0.10)",
    }}
  >
    {/* Decorative circles */}
    <div
      className="absolute -top-8 -right-8 w-36 h-36 rounded-full opacity-15"
      style={{ background: "#D4A24C" }}
    />
    <div
      className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full opacity-10"
      style={{ background: "#8B1A1A" }}
    />

    {/* Top gold line */}
    <div
      className="absolute top-0 left-8 right-8 h-px"
      style={{
        background:
          "linear-gradient(90deg, transparent, #D4A24C80, transparent)",
      }}
    />

    <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col items-center gap-6">
      
      {/* 🐘 Ganesha Image */}
      <img
        src="/ganesh.png"   // 👉 make sure image is in /public
        alt="Ganesha"
        className="w-14 h-14 md:w-20 md:h-20 object-contain mb-2 opacity-95 drop-shadow-[0_4px_10px_rgba(139,26,26,0.3)]"
      />

      {/* Title */}
      <h3
        className="font-serif italic text-2xl sm:text-3xl md:text-4xl mb-1"
        style={{ color: accent }}
      >
        {title}
      </h3>

      {/* Divider */}
      <div className="flex items-center gap-2 my-2">
        <div className="w-6 h-px" style={{ background: "#D4A24C60" }} />
        <div
          className="w-1 h-1 rounded-full"
          style={{ background: "#D4A24C80" }}
        />
        <div className="w-6 h-px" style={{ background: "#D4A24C60" }} />
      </div>

      {/* Timer */}
      <div className="flex gap-2 sm:gap-3 md:gap-4 justify-center">
        <TimeUnit value={time.d} label="Days" accent={accent} />
        <TimeUnit value={time.h} label="Hours" accent={accent} />
        <TimeUnit value={time.m} label="Mins" accent={accent} />
        <TimeUnit value={time.s} label="Secs" accent={accent} />
      </div>
    </div>
  </div>
);

const Countdown = () => {
  const [weddingTime, setWeddingTime] = useState(
    getRemaining(WEDDING_DATE)
  );
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const id = setInterval(
      () => setWeddingTime(getRemaining(WEDDING_DATE)),
      1000
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at top, #FBF5EC 0%, #F5E6C8 45%, #F2C4A0 100%)",
      }}
    >
      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(139,26,26,0.06) 0%, transparent 100%)",
        }}
      />

      <FallingPetals count={12} />

      <div className="relative z-10 max-w-3xl mx-auto">
        
        {/* Heading */}
        <div
          className="text-center mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.9s ease",
          }}
        >
          <p
            className="font-sans text-xs tracking-[0.35em] uppercase mb-3"
            style={{ color: "#A0742A" }}
          >
            mark your calendar
          </p>

          <h2
            className="font-serif italic text-3xl md:text-4xl"
            style={{ color: "#8B1A1A" }}
          >
            Countdown Begins
          </h2>
        </div>

        {/* Countdown Card */}
        <CountdownCard
          title="Wedding"
          time={weddingTime}
          accent="#8B1A1A"
          bg="linear-gradient(135deg, rgba(251,245,236,0.80) 0%, rgba(245,230,200,0.95) 100%)"
          border="rgba(212,162,76,0.30)"
          visible={visible}
          delay={0.2}
        />

        {/* Divider */}
        <div
          className="mt-14"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease 0.45s",
          }}
        >
          <FloralDivider />
        </div>
      </div>
    </section>
  );
};

export default Countdown;