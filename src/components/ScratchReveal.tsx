import { useRef, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import FloralDivider from "./FloralDivider";

const WEDDING_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Albin+%26+Ashrutha+Wedding&dates=20260518T034500Z/20260518T043500Z&details=Join+us+for+the+wedding+ceremony&location=Holiday+Home,+Kumily";

const ScratchReveal = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const isDrawing = useRef(false);
  const scratchCount = useRef(0);

  // 📍 Get position (fixed for mobile)
  const getPos = (e: any) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    return {
      x: ((clientX - rect.left) / rect.width) * canvas.width,
      y: ((clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  // 🎉 Reveal animation
  const triggerReveal = () => {
    setRevealed(true);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#D4A24C", "#8B1A1A", "#F2C97A"],
    });
  };

  // ✨ Scratch logic
  const scratch = (x: number, y: number) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, Math.PI * 2);
    ctx.fill();

    scratchCount.current++;

    if (scratchCount.current > 15 && !revealed) {
      triggerReveal();
    }
  };

  // 🎨 Draw scratch layer (IMPORTANT FIX HERE)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;

    // ✅ FIX: match actual display size
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    canvas.width = width;
    canvas.height = height;

    // 🎨 Solid cover (so scratch is visible)
    ctx.fillStyle = "#8B1A1A";
    ctx.fillRect(0, 0, width, height);

    // ✨ text
    ctx.fillStyle = "#F5E6C8";
    ctx.font = "bold 16px serif";
    ctx.textAlign = "center";
    ctx.fillText("Scratch to Reveal", width / 2, height / 2);
  }, []);

  const onStart = (e: any) => {
    isDrawing.current = true;
    const { x, y } = getPos(e);
    scratch(x, y);
  };

  const onMove = (e: any) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const { x, y } = getPos(e);
    scratch(x, y);
  };

  const onEnd = () => {
    isDrawing.current = false;
  };

  return (
    <section className="py-24 px-6 text-center">
      <FloralDivider className="mb-8" />

      <h2 className="text-2xl italic mb-6">Reveal the Date</h2>

      <div className="relative mx-auto max-w-md h-[200px] rounded-xl overflow-hidden shadow-lg">
        
        {/* 🎉 Revealed Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-0">
          <span className="text-2xl mb-2">💍</span>
          <p className="text-lg font-serif">May 18, 2026</p>
          <p className="text-sm text-gray-600">9:15 AM – 10:05 AM</p>
        </div>

        {/* 🪄 Scratch Layer */}
        {!revealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-10 cursor-pointer touch-none"
            onMouseDown={onStart}
            onMouseMove={onMove}
            onMouseUp={onEnd}
            onMouseLeave={onEnd}
            onTouchStart={onStart}
            onTouchMove={onMove}
            onTouchEnd={onEnd}
          />
        )}
      </div>

      {/* 📅 Button */}
      {revealed && (
        <button
          onClick={() => window.open(WEDDING_CALENDAR_URL, "_blank")}
          className="mt-8 px-6 py-3 rounded-full bg-[#8B1A1A] text-white"
        >
          Add to Calendar
        </button>
      )}
    </section>
  );
};

export default ScratchReveal;