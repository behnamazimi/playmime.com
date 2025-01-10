"use client";

import {
  CheckIcon,
  EyeSlashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import BaseButton from "@/components/shared/Button/BaseButton";
import { useQuickPlayGame } from "@/contexts/games/QuickPlayGameContext";
import PageTitle from "@/components/shared/PageTitle";
import { useTranslations } from "next-intl";
import redirect from "@/i18n/routing/redirect";
import { useHideLanguageSwitcherToggle } from "@/contexts/LanguageSwitcherContext";

export default function QuickPlay() {
  const {
    state,
    startNextTurn,
    submitResult,
    finalizeGame,
    cancelGame,
    getCurrentTeam,
  } = useQuickPlayGame();
  const t = useTranslations("play");
  useHideLanguageSwitcherToggle();
  const currentTeam = getCurrentTeam();
  if (!currentTeam) {
    redirect("/play");
  }

  if (state.status === "finalized") {
    redirect("/play/quick-play/results");
  }

  const isRunning = state.status === "running";
  const isCancelable = !isRunning;

  return (
    <div className={`max-w-2xl mx-auto md:px-4 pt-8 pb-8 animate-fade-in`}>
      <PageTitle
        title={t("quickPlay.play.title")}
        subtitle={
          <span className="flex justify-between">
            <span>{t("shared.teamName", { team: currentTeam.teamId })}</span>
            <span>{t("shared.teamScore", { score: currentTeam.score })}</span>
          </span>
        }
      />

      <div
        className={`relative flex justify-center items-center p-2 py-12 w-full text-gray-500 h-40 rounded-sm ${isRunning ? "bg-blue-50" : "bg-gray-50"}`}
      >
        {isRunning ? (
          <span className="absolute w-full p-2 flex items-center justify-center text-3xl font-semibold">
            {state.currentWord}
          </span>
        ) : (
          <span className="flex flex-col gap-4">
            <span className="text-xl font-semibold">
              {t("shared.hiddenWordTitle", { team: currentTeam.teamId })}
            </span>
            <EyeSlashIcon className="h-10 w-10 text-gray-500 " />
          </span>
        )}
      </div>

      <div className="flex flex-col items-center justify-center gap-2 my-8">
        <h3 className="text-xl font-light">{t("shared.timeRemainingLabel")}</h3>
        <span className="text-2xl font-bold">
          {t("shared.timeRemainingValue", {
            time: currentTeam.timeRemaining,
          })}
        </span>
      </div>

      <div className="flex justify-center flex-col gap-4">
        {isRunning ? (
          <div className="flex gap-4">
            <BaseButton
              icon={<XMarkIcon />}
              color="danger"
              size="large"
              className="w-1/2"
              onClick={() => {
                submitResult(false);
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
        <BaseButton
          size="large"
          className="justify-center"
          onClick={() => {
            if (isCancelable) {
              cancelGame();
            } else {
              finalizeGame();
            }
          }}
          vibrateOnTap
        >
          {isCancelable
            ? t("shared.cancelGameButton")
            : t("shared.finalizeGameButton")}
        </BaseButton>
      </div>
    </div>
  );
}
