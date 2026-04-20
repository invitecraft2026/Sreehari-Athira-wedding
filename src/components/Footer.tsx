const Footer = () => (
  <footer
    className="py-16 px-6 text-center relative overflow-hidden"
    style={{
      background: "linear-gradient(160deg, #5C1010 0%, #8B1A1A 45%, #6B1212 100%)",
    }}
  >
    {/* Gold shimmer top edge */}
    <div
      className="absolute top-0 left-0 right-0 h-px pointer-events-none"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, #D4A24C 30%, #F2C97A 50%, #D4A24C 70%, transparent 100%)",
      }}
    />

    {/* Subtle pattern */}
    <div
      className="absolute inset-0 opacity-[0.04] pointer-events-none"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, #D4A24C 0px, #D4A24C 1px, transparent 1px, transparent 28px)",
      }}
    />

    <div className="relative z-10">

      {/* ✨ CLEAN PREMIUM MONOGRAM */}
      <div className="mb-10">
        <svg width="160" height="120" viewBox="0 0 120 120" className="mx-auto">
          
          {/* Left A */}
          <text
            x="42"
            y="70"
            textAnchor="middle"
            fontFamily="'Playfair Display', serif"
            fontSize="48"
            fill="#F2C97A"
            letterSpacing="3px"
          >
            A
          </text>

          {/* Elegant & */}
          <text
            x="60"
            y="75"
            textAnchor="middle"
            fontFamily="'Allura', cursive"
            fontSize="54"
            fill="#F5E6C8"
          >
            &
          </text>

          {/* Right A */}
          <text
            x="78"
            y="85"
            textAnchor="middle"
            fontFamily="'Playfair Display', serif"
            fontSize="48"
            fill="#F2C97A"
            letterSpacing="3px"
          >
            A
          </text>
        </svg>
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
        <div className="w-2 h-2 rounded-full bg-gold/80" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
      </div>

      {/* Quote */}
      <p
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
          color: "rgba(245,230,200,0.9)",
          marginBottom: "12px",
        }}
      >
        Together is a beautiful place to be
      </p>

      {/* Date */}
      <p
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "12px",
          letterSpacing: "0.35em",
          color: "rgba(212,162,76,0.65)",
        }}
      >
        18 · 05 · 2026
      </p>

      {/* Bottom line */}
      <div
        className="mt-8 mx-auto h-px w-24"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(212,162,76,0.4), transparent)",
        }}
      />
    </div>
  </footer>
);

export default Footer;