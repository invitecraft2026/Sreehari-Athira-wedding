import { useState, useRef } from "react";
import IntroOverlay from "@/components/IntroOverlay";
import VideoHero from "@/components/VideoHero";
import Countdown from "@/components/Countdown";
import ScratchReveal from "@/components/ScratchReveal";
import Venue from "@/components/Venue";
import Footer from "@/components/Footer";
import MusicPlayer, { type MusicPlayerHandle } from "@/components/MusicPlayer";

const Index = () => {
  const [entered, setEntered] = useState(false);
  const musicRef = useRef<MusicPlayerHandle>(null);

  const handleEnter = () => {
    setEntered(true);
    // Auto-play music on user gesture (bypasses autoplay restrictions)
    setTimeout(() => musicRef.current?.play(), 100);
  };

 return (
  <div className="min-h-screen">
    {!entered && <IntroOverlay onEnter={handleEnter} />}

    {entered && (
      <>
        <div className="animate-fade-up">
          <VideoHero />
          <Countdown />
          <ScratchReveal />
          <Venue />
          <Footer />
        </div>

        {/* 👇 MOVE OUTSIDE */}
        <MusicPlayer ref={musicRef} />
      </>
    )}
  </div>
);
};

export default Index;
