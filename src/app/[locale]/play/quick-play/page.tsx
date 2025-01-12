"use client";

import {
  CheckIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/24/outline";
import BaseButton from "@/components/common/Button/BaseButton";
import { useQuickPlayGame } from "@/contexts/games/QuickPlayGameContext";
import { useTranslations } from "next-intl";
import redirect from "@/i18n/routing/redirect";
import { useHideLanguageSwitcherToggle } from "@/contexts/LanguageSwitcherContext";
import useKeepScreenAwake from "@/hooks/useKeepScreenAwake";
import GameLayout from "@/components/pages/play/GameLayout";
import GameStatus from "@/components/pages/play/GameStatus";

export default function QuickPlay() {
  const {
    state,
    startNextTurn,
    submitResult,
    finalizeGame,
    cancelGame,
    getCurrentTeam,
    changeWord,
  } = useQuickPlayGame();
  const t = useTranslations("play");
  useHideLanguageSwitcherToggle();

  const currentTeam = getCurrentTeam();
  useKeepScreenAwake(!!currentTeam);
  if (!currentTeam) {
    redirect("/play");
  }

  if (state.status === "finalized") {
    redirect("/play/quick-play/results");
  }

  const isRunning = state.status === "running";
  const isCancelable = !isRunning;

  return (
    <GameLayout
      title={t("quickPlay.play.title")}
      subtitle={
        <span className="flex justify-between">
          <span>{t("shared.teamName", { team: currentTeam.teamId })}</span>
          <span>
            {t("shared.roundsStatus", {
              current: state.currentRound,
              total: state.settings.numberOfRounds,
            })}
          </span>
        </span>
      }
      currentTeam={currentTeam}
      isCancelable={isCancelable}
      onCancel={cancelGame}
      onFinalize={finalizeGame}
    >
      <GameStatus
        isRunning={isRunning}
        currentWord={state.currentWord}
        currentTeam={currentTeam}
      />

      <div className="flex justify-center flex-col gap-4">
        {isRunning ? (
          <div className="flex gap-4">
            <BaseButton
              icon={<ArrowPathRoundedSquareIcon />}
              color="primary"
              size="large"
              className="w-1/2"
              onClick={() => {
                changeWord();
              }}
              disabled={!isRunning}
              vibrateOnTap
            >
              {t("quickPlay.play.nextWordButton")}
            </BaseButton>
            <BaseButton
              icon={<CheckIcon />}
              color="secondary"
              size="large"
              className="w-1/2"
              onClick={() => {
                submitResult(true);
              }}
              disabled={!isRunning}
              vibrateOnTap
            >
              {t("shared.correctButton")}
            </BaseButton>
          </div>
        ) : (
          <BaseButton
            size="large"
            className="justify-center"
            color="primary"
            onClick={() => {
              startNextTurn();
            }}
            vibrateOnTap
          >
            {t("oneWordPerTurn.play.startTurnButton", {
              team: currentTeam.teamId,
            })}
          </BaseButton>
        )}
      </div>
    </GameLayout>
  );
}
