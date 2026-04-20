import { useRef, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import FloralDivider from "./FloralDivider";

// ✅ UPDATED (IST → UTC converted)
const WEDDING_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Sreehari+%26+Athira+Wedding&dates=20260518T062500Z/20260518T064000Z&details=Join+us+for+the+wedding+ceremony&location=Holiday+Home,+Kumily";

const ScratchReveal = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const isDrawing = useRef(false);
  const scratchCount = useRef(0);

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

  const triggerReveal = () => {
    setRevealed(true);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#D4A24C", "#8B1A1A", "#F2C97A"],
    });
  };

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = "#8B1A1A";
    ctx.fillRect(0, 0, width, height);

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
        
        {/* 🎉 UPDATED CONTENT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-0">
          <span className="text-2xl mb-2">💍</span>
          <p className="text-lg font-serif">May 18, 2026</p>
          <p className="text-sm text-gray-600">11:55 AM – 12:10 PM</p>
        </div>

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