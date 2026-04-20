const CornerFloral = ({ className = "" }: { className?: string }) => (
  <svg width="120" height="120" viewBox="0 0 120 120" className={`absolute ${className}`}>
    <path d="M0 0 Q30 20 20 60 Q10 40 0 30Z" fill="hsl(var(--pistachio))" opacity="0.4" />
    <path d="M0 0 Q40 10 60 40 Q30 20 10 10Z" fill="hsl(var(--gold))" opacity="0.2" />
    <circle cx="25" cy="25" r="4" fill="hsl(var(--gold))" opacity="0.5" />
    <circle cx="15" cy="40" r="3" fill="hsl(var(--pistachio))" opacity="0.6" />
    <path d="M5 5 Q20 8 30 25" stroke="hsl(var(--gold))" fill="none" strokeWidth="0.5" opacity="0.4" />
  </svg>
);

const CornerFlorals = () => (
  <>
    <CornerFloral className="top-0 left-0" />
    <CornerFloral className="top-0 right-0 scale-x-[-1]" />
    <CornerFloral className="bottom-0 left-0 scale-y-[-1]" />
    <CornerFloral className="bottom-0 right-0 scale-[-1]" />
  </>
);

export default CornerFlorals;
