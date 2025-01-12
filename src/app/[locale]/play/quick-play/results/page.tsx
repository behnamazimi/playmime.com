"use client";

import { useQuickPlayGame } from "@/contexts/games/QuickPlayGameContext";
import PageTitle from "@/components/common/PageTitle";
import TeamResult from "@/components/pages/play/components/TeamResult";
import BackToHomeCTA from "@/components/pages/play/components/BackToHomeCTA";
import { useTranslations } from "next-intl";
import redirect from "@/i18n/routing/redirect";

export default function QuickPlayGameResults() {
  const t = useTranslations("play");
  const {
    state: { status, teams },
  } = useQuickPlayGame();
  if (status !== "finalized") {
    redirect("/");
  }

  return (
    <div className="max-w-2xl mx-auto md:px-4 pt-2 pb-8 animate-fade-in">
      <PageTitle
        title={t("quickPlay.results.title")}
        subtitle={t("quickPlay.results.subtitle")}
        backlinkHref="/play"
      />
      <div className="space-y-4">
        {teams.map((team, index) => (
          <TeamResult
            key={team.teamId}
            teamId={team.teamId}
            rank={index}
            score={team.score}
            quickPlayResult
          />
        ))}
        <BackToHomeCTA />
      </div>
    </div>
  );
}
