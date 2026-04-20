import { motion } from "framer-motion";
import { useState } from "react";
import floralTop from "/flower-top.png";
import floralBottom from "/flower-bottom.png";

interface WeddingIntroProps {
  groomName?: string;
  brideName?: string;
  onEnter: () => void;
}

const Petal = ({ delay }: { delay: number }) => {
  const left = Math.random() * 100;
  const duration = 6 + Math.random() * 6;
  const size = 10 + Math.random() * 8;
  const symbols = ["✿", "❀", "✾", "🌸"];
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];

  return (
    <motion.span
      className="absolute top-0 pointer-events-none select-none"
      style={{ left: `${left}%`, fontSize: size }}
      initial={{ y: -20, opacity: 0, rotate: 0 }}
      animate={{
        y: typeof window !== "undefined" ? window.innerHeight + 50 : 700,
        opacity: [0, 0.6, 0.5, 0],
        rotate: 720,
      }}
      transition={{
        duration,
        delay,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: Math.random() * 4,
      }}
    >
      {symbol}
    </motion.span>
  );
};

const Sparkle = ({ top, left, delay }: { top: string; left: string; delay: number }) => (
  <motion.div
    className="absolute pointer-events-none w-1.5 h-1.5 sm:w-2 sm:h-2"
    style={{ top, left }}
    animate={{ scale: [0, 1, 0], rotate: [0, 180, 360], opacity: [0, 1, 0] }}
    transition={{ duration: 3, delay, repeat: Infinity, ease: "easeInOut" }}
  >
    <span
      className="absolute inset-0"
      style={{
        background: "#c9a882",
        clipPath:
          "polygon(50% 0%, 52% 48%, 100% 50%, 52% 52%, 50% 100%, 48% 52%, 0% 50%, 48% 48%)",
      }}
    />
  </motion.div>
);

const IntroOverlay = ({
  groomName = "Ashrutha",
  brideName = "Albin",
  onEnter,
}: WeddingIntroProps) => {
  const [petals] = useState(() => Array.from({ length: 12 }, (_, i) => i));

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden px-4"
      style={{ background: "hsl(var(--background))", cursor: "pointer" }}
      exit={{ opacity: 0, scale: 1.06 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 1, 1] }}
      onClick={onEnter}
    >
      {/* Petals */}
      {petals.map((i) => (
        <Petal key={i} delay={i * 0.5} />
      ))}

      {/* Sparkles */}
      <Sparkle top="22%" left="18%" delay={0} />
      <Sparkle top="35%" left="78%" delay={0.8} />
      <Sparkle top="65%" left="26%" delay={1.6} />
      <Sparkle top="70%" left="82%" delay={2.1} />
      <Sparkle top="15%" left="68%" delay={0.4} />

      {/* Pulse Rings */}
      {[180, 240].map((size, i) => (
        <motion.div
          key={size}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: size,
            height: size,
            border: "0.5px solid rgba(201,168,130,0.2)",
            top: "50%",
            left: "50%",
            marginTop: -size / 2,
            marginLeft: -size / 2,
          }}
          animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.7, 1, 0.7] }}
          transition={{
            duration: 4,
            delay: i * 0.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floral Images */}
      <motion.img
        src={floralTop}
        alt=""
        className="absolute top-0 left-0 w-32 sm:w-48 md:w-80 pointer-events-none"
        initial={{ opacity: 0, scale: 0.85, x: -20, y: -20 }}
        animate={{ opacity: 0.85, scale: [1, 1.02, 1], x: 0, y: 0 }}
        transition={{
          opacity: { duration: 1.8 },
          x: { duration: 1.5 },
          y: { duration: 1.5 },
          scale: { duration: 7, repeat: Infinity },
        }}
      />

      <motion.img
        src={floralBottom}
        alt=""
        className="absolute bottom-2 right-2 w-32 sm:w-48 md:w-80 pointer-events-none"
        initial={{ opacity: 0, scale: 0.85, x: 20, y: 20 }}
        animate={{ opacity: 0.85, scale: [1, 1.02, 1], x: 0, y: 0 }}
        transition={{
          opacity: { duration: 1.8, delay: 0.3 },
          x: { duration: 1.5, delay: 0.3 },
          y: { duration: 1.5, delay: 0.3 },
          scale: { duration: 8, repeat: Infinity },
        }}
      />

      {/* Center Content */}
      <motion.div
        className="relative z-20 text-center max-w-xs sm:max-w-md"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        {/* Eyebrow */}
        <motion.p
          className="text-[9px] sm:text-[10px] tracking-[0.4em] uppercase mb-6 sm:mb-8"
          style={{ color: "#9b8c7e", fontFamily: "'Jost', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Together with their families
        </motion.p>

        {/* Groom */}
        <motion.h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(2.5rem, 10vw, 5rem)",
            color: "#3d2c20",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {groomName}
        </motion.h1>

        {/* Divider */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 my-3">
          <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent via-[#c9a882] to-transparent" />
          <div className="w-[4px] h-[4px] sm:w-[5px] sm:h-[5px] bg-[#c9a882] rotate-45" />
          <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent via-[#c9a882] to-transparent" />
        </div>

        {/* Bride */}
        <motion.h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(2.5rem, 10vw, 5rem)",
            color: "#3d2c20",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {brideName}
        </motion.h1>

        {/* Tap Text */}
        <motion.p
          className="mt-8 sm:mt-10 text-[8px] sm:text-[9.5px] tracking-[0.4em] uppercase"
          style={{ color: "#c9a882", fontFamily: "'Jost', sans-serif" }}
          animate={{ opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Tap anywhere to open
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default IntroOverlay;