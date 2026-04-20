import { useEffect, useRef } from "react";
import CornerFlorals from "./CornerFlorals";
import FloralDivider from "./FloralDivider";

const VideoHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* 🎬 Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-[0.55] saturate-[1.15]"
      >
        <source src="/wedding-animated-hindu-video-3.mp4" type="video/mp4" />
      </video>

      {/* 🌫 Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-sage/40" />

      <CornerFlorals />

      <div className="relative z-10 text-center px-6">

        {/* Subtitle */}
        <p
          className="animate-slide-up text-cream/85 mb-6 uppercase"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
            letterSpacing: "0.35em",
            animationDelay: "0.2s",
          }}
        >
          We joyfully invite you to celebrate our
        </p>

        {/* Heading */}
        <h2
          className="animate-slide-up text-cream mb-6 leading-tight"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
            letterSpacing: "0.04em",
            textShadow: "0 6px 25px rgba(0,0,0,0.4)",
            animationDelay: "0.5s",
          }}
        >
          Wedding
        </h2>

        {/* Divider */}
        <div
          className="animate-slide-up mb-8"
          style={{ animationDelay: "0.8s" }}
        >
          <FloralDivider />
        </div>

        {/* Names */}
        <div
          className="animate-slide-up flex items-center justify-center gap-4 md:gap-8"
          style={{ animationDelay: "1.1s" }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#FFF9F0",
              textShadow: "0 4px 15px rgba(0,0,0,0.35)",
            }}
          >
            Ashrutha
           
          </span>

         <span
  className="animate-float"
  style={{
    color: "#D4A24C", // richer gold
    fontSize: "1.8rem",
    filter: "drop-shadow(0 0 6px rgba(212,162,76,0.5))",
  }}
>
  ❤
</span>

          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#FFF9F0",
              textShadow: "0 4px 15px rgba(0,0,0,0.35)",
            }}
          >
             Albin
          </span>
        </div>
      </div>
    </section>
  );
};

export default VideoHero;