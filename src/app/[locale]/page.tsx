import { Hero } from "@/components/LandingPage/Hero";
import { GameModes } from "@/components/LandingPage/GameModes";
import { Features } from "@/components/LandingPage/Features";

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
