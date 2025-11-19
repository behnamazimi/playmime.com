import { Hero } from "@/components/pages/landing/Hero";
import { GameModes } from "@/components/pages/landing/GameModes";
import { Features } from "@/components/pages/landing/Features";
import { getTranslations } from "next-intl/server";
import BlogList from "@/components/common/BlogList";

// This polyfill required for development environment only,
// when the app is served over HTTPS on a network IP address.
if (process.env.NODE_ENV === "development") {
  import("@/utils/randomUuidPolyfillForDev");
}

const LandingPage = async () => {
  const t = await getTranslations("shared");
  return (
    <div className="min-h-screen relative page-enter">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl animate-orb-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-magenta/5 rounded-full blur-3xl animate-orb-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* Content sections with proper spacing */}
      <div className="relative z-10">
        <Hero />
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <GameModes />
        </div>
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-magenta/20 to-transparent" />
          <Features />
        </div>

        <div className="relative max-w-2xl mx-auto px-4 py-12">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <BlogList title={t("moreResources")} className="border-t-0" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
