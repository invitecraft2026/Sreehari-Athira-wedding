import { useEffect, useRef, useState } from "react";
import FloralDivider from "./FloralDivider";

const WEDDING_DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=NJ+Convention+Center,+Cinema+Paramb,+Bharanikavu-Kottarakkara+Road,+Kollam";
const WEDDING_MAP =
  "https://maps.google.com/?q=NJ+Convention+Center,+Kollam";

const RECEPTION_DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=MMK+Auditorium,+Sarathi+Junction,+Karikode,+Kollam";
const RECEPTION_MAP =
  "https://maps.google.com/?q=MMK+Auditorium,+Karikode,+Kollam";

const VenueCard = ({
  title,
  place,
  line1,
  line2,
  time,
  directions,
  map,
  delay,
  visible,
}: any) => {
  const slideStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(40px)",
    transition: `all 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden mb-10"
      style={{
        ...slideStyle,
        background:
          "linear-gradient(135deg, rgba(251,245,236,0.85) 0%, rgba(245,230,200,0.95) 100%)",
        border: "1px solid rgba(212,162,76,0.35)",
        boxShadow:
          "0 24px 64px rgba(139,26,26,0.13), 0 4px 16px rgba(160,116,42,0.10)",
      }}
    >
      <div className="p-8 md:p-10 text-center">
        <p
          className="text-[10px] tracking-[0.35em] uppercase mb-2"
          style={{ color: "#A0742A" }}
        >
          {title}
        </p>

        <h2
          className="font-serif italic text-2xl md:text-3xl mb-1"
          style={{ color: "#8B1A1A" }}
        >
          {place}
        </h2>

        <p className="text-sm" style={{ color: "rgba(139,26,26,0.65)" }}>
          {line1}
        </p>
        <p className="text-sm mb-5" style={{ color: "rgba(139,26,26,0.65)" }}>
          {line2}
        </p>

        <p
          className="font-serif italic text-lg mb-6"
          style={{ color: "#A0742A" }}
        >
          {time}
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => window.open(directions, "_blank")}
            className="px-6 py-2.5 rounded-full text-xs uppercase"
            style={{
              background: "#8B1A1A",
              color: "#F5E6C8",
            }}
          >
            📍 Directions
          </button>

          <button
            onClick={() => window.open(map, "_blank")}
            className="px-6 py-2.5 rounded-full text-xs uppercase"
            style={{
              border: "1px solid rgba(212,162,76,0.55)",
              color: "#8B1A1A",
            }}
          >
            🗺️ Map
          </button>
        </div>
      </div>
    </div>
  );
};

const Venue = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
      className="py-24 px-6"
      style={{
        background:
          "radial-gradient(ellipse at top, #FBF5EC 0%, #F5E6C8 50%, #F2C4A0 100%)",
      }}
    >
      <div className="max-w-xl mx-auto text-center">
        <FloralDivider className="mb-10" />

        {/* Wedding */}
        <VenueCard
          title="Wedding Ceremony"
          place="NJ Convention Center"
          line1="Cinema Paramb"
          line2="Bharanikavu-Kottarakkara Road, Kollam"
          time="May 18, 2026 | 11:55 AM – 12:10 PM"
          directions={WEDDING_DIRECTIONS}
          map={WEDDING_MAP}
          delay={0.2}
          visible={visible}
        />

        {/* Reception */}
        <VenueCard
          title="Reception"
          place="MMK Auditorium"
          line1="Sarathi Junction"
          line2="Karikode, Kollam"
          time="May 18, 2026 | 5:00 PM – 8:00 PM"
          directions={RECEPTION_DIRECTIONS}
          map={RECEPTION_MAP}
          delay={0.4}
          visible={visible}
        />
      </div>
    </section>
  );
};

export default Venue;