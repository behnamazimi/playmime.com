import { Hero } from "@/components/pages/landing/Hero";
import { GameModes } from "@/components/pages/landing/GameModes";
import { Features } from "@/components/pages/landing/Features";

// This polyfill required for development environment only,
// when the app is served over HTTPS on a network IP address.
if (process.env.NODE_ENV === "development") {
  import("@/utils/randomUuidPolyfillForDev");
}

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
