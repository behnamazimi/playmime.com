"use client";

import SetupSection from "@/components/pages/play/components/SetupSection/SetupSection";
import BaseButton from "@/components/common/Button/BaseButton";
import { PlayIcon } from "@heroicons/react/24/outline";
import { useOneWordPerTurnGame } from "@/contexts/games/OneWordPerTurnGameContext";
import { useState } from "react";
import PageTitle from "@/components/common/PageTitle";
import { useTranslations } from "next-intl";
import useRouter from "@/i18n/routing/useRouter";

const minTeams = 2;
const minRounds = 1;
const minTime = 15;

export default function PlaySetup() {
  const t = useTranslations("play");
  const { initializeGame } = useOneWordPerTurnGame();
  const [numberOfTeams, setNumberOfTeams] = useState(2);
  const [numberOfRounds, setNumberOfRounds] = useState(5);
  const [timePerTeam, setTimePerTeam] = useState(120);
  const router = useRouter();

  return (
    <div className={`max-w-2xl mx-auto md:px-4 pt-2 pb-8 animate-fade-in`}>
      <PageTitle
        title={t("oneWordPerTurn.setup.title")}
        subtitle={t("oneWordPerTurn.setup.subtitle")}
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
          title={t("shared.rounds")}
          initialValue={5}
          step={1}
          min={minRounds}
          onChange={setNumberOfRounds}
        />
        <SetupSection
          title={t("shared.time")}
          initialValue={120}
          step={15}
          unit={t("shared.seconds")}
          min={minTime}
          onChange={setTimePerTeam}
        />

        <div className="flex items-center justify-center">
          <BaseButton
            icon={<PlayIcon />}
            size="large"
            color="primary"
            className="w-full max-w-60"
            onClick={() => {
              initializeGame({
                numberOfTeams,
                numberOfRounds,
                timePerTeam,
              });

              router.replace("/play/one-word-per-turn");
            }}
          >
            {t("shared.next")}
          </BaseButton>
        </div>
      </div>
    </div>
  );
}
