import { Hero } from "@/components/pages/landing/Hero";
import { GameModes } from "@/components/pages/landing/GameModes";
import { Features } from "@/components/pages/landing/Features";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <GameModes />
      <Features />
    </div>
  );
};

export default LandingPage;
