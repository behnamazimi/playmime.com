"use client";

import SetupSection from "@/components/Setup/SetupSection/SetupSection";
import BaseButton from "@/components/shared/Button/BaseButton";
import { PlayIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useQuickPlayGame } from "@/contexts/games/QuickPlayGameContext";
import PageTitle from "@/components/shared/PageTitle";
import { useTranslations } from "next-intl";
import Link from "@/i18n/routing/Link";

const minTeams = 2;
const minTime = 15;

export default function PlaySetup() {
  const t = useTranslations("play");
  const { initializeGame } = useQuickPlayGame();
  const [numberOfTeams, setNumberOfTeams] = useState(2);
  const [timePerTeam, setTimePerTeam] = useState(120);

  return (
    <div className={`max-w-2xl mx-auto md:px-4 pt-2 pb-8 animate-fade-in`}>
      <PageTitle
        title={t("quickPlay.setup.title")}
        subtitle={t("quickPlay.setup.subtitle")}
        backlinkHref="/play"
      />

      <div className="grid grid-cols-1 items-center justify-center gap-12">
        <SetupSection
          title={t("shared.teams")}
          initialValue={2}
          step={1}
          min={minTeams}
          onChange={setNumberOfTeams}
        />
        <SetupSection
          title={t("shared.time")}
          initialValue={120}
          step={15}
          unit={t("shared.seconds", {
            seconds: timePerTeam,
          })}
          min={minTime}
          onChange={setTimePerTeam}
        />

        <div className="flex items-center justify-center">
          <BaseButton
            icon={<PlayIcon />}
            size="large"
            color="primary"
            as={Link}
            href="/play/quick-play"
            className="w-full max-w-60"
            onClick={() => {
              initializeGame({
                numberOfTeams,
                timePerTeam,
              });
            }}
          >
            {t("shared.next")}
          </BaseButton>
        </div>
      </div>
    </div>
  );
}
