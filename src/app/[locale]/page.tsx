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
    <div className="min-h-screen bg-background">
      <Hero />
      <GameModes />
      <Features />

      <BlogList
        title={t("moreResources")}
        className="w-full max-w-2xl mx-auto my-4 border-t-0 border-b-1 pb-8"
      />
    </div>
  );
};

export default LandingPage;
