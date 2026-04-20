import { useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react";

export interface MusicPlayerHandle {
  play: () => void;
}

const MusicPlayer = forwardRef<MusicPlayerHandle>((_, ref) => {
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.25;
    let vol = 0;
    const fade = setInterval(() => {
      if (audioRef.current && vol < 0.3) {
        vol += 0.02;
        audioRef.current.volume = vol;
      } else {
        clearInterval(fade);
      }
    }, 100);
    return () => clearInterval(fade);
  }, []);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
      }
    },
  }));

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch((err) => console.log("Audio blocked:", err));
    }
  };

  const floatY = Math.sin(scrollY * 0.006) * 20;
  const floatX = Math.cos(scrollY * 0.004) * 8;

  return (
    <>
      <audio ref={audioRef} loop preload="auto" src="/seetha-kaliyana.mpeg" />

      {/* Keyframes injected once */}
      <style>{`
        @keyframes eq {
          0%, 100% { height: 4px; }
          50% { height: 18px; }
        }
        @keyframes diya-pulse {
          0%, 100% { box-shadow: 0 0 14px 4px rgba(232,148,26,0.45), 0 4px 20px rgba(139,26,26,0.30); }
          50%       { box-shadow: 0 0 28px 8px rgba(232,148,26,0.65), 0 6px 28px rgba(139,26,26,0.40); }
        }
      `}</style>

      <div
        className="fixed z-[9999] flex items-center"
        style={{
          right: `${24 + floatX}px`,
          bottom: `${90 + floatY}px`,
          transition: "right 0.2s ease-out, bottom 0.2s ease-out",
        }}
      >
        {/* Tooltip */}
        <div
          className="mr-3 px-3 py-1.5 rounded-full text-xs whitespace-nowrap relative font-sans"
          style={{
            background: "#8B1A1A",                       /* crimson */
            color: "#F5E6C8",                            /* ivory */
            border: "1px solid rgba(212,162,76,0.40)",  /* gold border */
            boxShadow: "0 4px 16px rgba(139,26,26,0.25)",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(8px)",
            transition: "opacity 0.2s, transform 0.2s",
            pointerEvents: "none",
            letterSpacing: "0.05em",
          }}
        >
          {playing ? "Pause Music" : "Play Music"}
          {/* Arrow tip — crimson */}
          <span
            className="absolute top-1/2 -right-[6px]"
            style={{
              transform: "translateY(-50%)",
              width: 0,
              height: 0,
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
              borderLeft: "6px solid #8B1A1A",
            }}
          />
        </div>

        {/* Button */}
        <button
          onClick={toggle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="w-[54px] h-[54px] rounded-full flex items-center justify-center cursor-pointer hover:scale-105 shrink-0"
          style={{
            /* Ivory-warm base, matches the card surfaces */
            background: "linear-gradient(145deg, #F5E6C8 0%, #FBF5EC 100%)",
            border: "1px solid rgba(212,162,76,0.55)",
            transition: "transform 0.3s, box-shadow 0.3s",
            /* Diya glow when playing, gentle gold when paused */
            animation: playing ? "diya-pulse 1.8s ease-in-out infinite" : "none",
            boxShadow: playing
              ? "0 0 20px 6px rgba(232,148,26,0.50), 0 4px 20px rgba(139,26,26,0.25)"
              : "0 4px 20px rgba(160,116,42,0.25)",
          }}
        >
          {playing ? (
            /* Equaliser bars — crimson */
            <div className="flex items-end gap-[3px] h-5">
              {[0, 0.15, 0.3, 0.45].map((delay, i) => (
                <span
                  key={i}
                  className="w-[3px] rounded-sm"
                  style={{
                    background: "#8B1A1A",
                    animation: `eq 0.8s ease-in-out ${delay}s infinite`,
                    height: "4px",
                  }}
                />
              ))}
            </div>
          ) : (
            /* Music note icon — crimson */
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18V5l12-2v13M9 18c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zM21 16c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"
                fill="#8B1A1A"
              />
            </svg>
          )}
        </button>
      </div>
    </>
  );
});

MusicPlayer.displayName = "MusicPlayer";
export default MusicPlayer;