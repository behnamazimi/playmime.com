"use client";

import SetupSection from "@/components/pages/play/components/SetupSection/SetupSection";
import BaseButton from "@/components/common/Button/BaseButton";
import { PlayIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import PageTitle from "@/components/common/PageTitle";
import { useTranslations } from "next-intl";
import useRouter from "@/i18n/routing/useRouter";
import { useHeadsUpGame } from "@/contexts/games/HeadsUpGameContext";

const minPlayers = 2;
const minTime = 5;

export default function PlaySetup() {
  const t = useTranslations("play");
  const { initializeGame } = useHeadsUpGame();
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const [timePerPlayer, setTimePerPlayer] = useState(60);
  const router = useRouter();

  return (
    <div className={`max-w-2xl mx-auto md:px-4 pt-2 pb-8 animate-fade-in`}>
      <PageTitle
        title={t("headsUp.setup.title")}
        subtitle={t("headsUp.setup.subtitle")}
        backlinkHref="/play"
      />

      <div className="grid grid-cols-1 items-center justify-center gap-12">
        <SetupSection
          title={t("headsUp.setup.players")}
          initialValue={numberOfPlayers}
          step={1}
          min={minPlayers}
          onChange={setNumberOfPlayers}
        />
        <SetupSection
          title={t("shared.time")}
          initialValue={timePerPlayer}
          step={15}
          unit={t("shared.seconds", {
            seconds: timePerPlayer,
          })}
          min={minTime}
          onChange={setTimePerPlayer}
        />
        <div className="flex items-center justify-center">
          <BaseButton
            icon={<PlayIcon />}
            size="large"
            color="primary"
            className="w-full max-w-60"
            onClick={() => {
              initializeGame({
                numberOfPlayers,
                timePerPlayer,
              });
              router.replace("/play/heads-up");
            }}
          >
            {t("shared.next")}
          </BaseButton>
        </div>
      </div>
    </div>
  );
}
