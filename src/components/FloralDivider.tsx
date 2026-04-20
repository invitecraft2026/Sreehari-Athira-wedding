const FloralDivider = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center gap-3 ${className}`}>
    <svg width="60" height="20" viewBox="0 0 60 20" className="text-gold">
      <path d="M0 10 Q15 0 30 10 Q45 20 60 10" stroke="currentColor" fill="none" strokeWidth="1.5" />
      <circle cx="10" cy="8" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="50" cy="12" r="2" fill="currentColor" opacity="0.4" />
    </svg>
    <svg width="12" height="12" viewBox="0 0 12 12" className="text-gold">
      <rect x="6" y="0" width="6" height="6" transform="rotate(45 6 6)" fill="currentColor" />
    </svg>
    <svg width="60" height="20" viewBox="0 0 60 20" className="text-gold transform scale-x-[-1]">
      <path d="M0 10 Q15 0 30 10 Q45 20 60 10" stroke="currentColor" fill="none" strokeWidth="1.5" />
      <circle cx="10" cy="8" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="50" cy="12" r="2" fill="currentColor" opacity="0.4" />
    </svg>
  </div>
);

export default FloralDivider;
