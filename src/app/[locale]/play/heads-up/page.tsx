"use client";

import { useState, useEffect } from "react";
import { useOrientation } from "@uidotdev/usehooks";
import {
  DevicePhoneMobileIcon,
  XMarkIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import BaseButton from "@/components/common/Button/BaseButton";
import PageLeaveConfirmModal from "@/components/pages/play/components/PageLeaveConfirmModal";
import redirect from "@/i18n/routing/redirect";
import { useTranslations } from "next-intl";
import useRouter from "@/i18n/routing/useRouter";
import { useHideLanguageSwitcherToggle } from "@/contexts/LanguageSwitcherContext";
import { useHeadsUpGame } from "@/contexts/games/HeadsUpGameContext";
import { useDisplayMuteToggle } from "@/contexts/SoundFxContext";
import useDeviceMotion from "@/hooks/useDeviceMotion";
import useKeepScreenAwake from "@/hooks/useKeepScreenAwake";
import { useNavigationGuard } from "next-navigation-guard";
import useTimedState from "@/hooks/useTimedState";
import useIsMobile from "@/hooks/useIsMobile";
import useFullscreenOnLandscape from "@/hooks/useFullscreenOnLandscape";
import NonMobileMessage from "@/components/pages/play/components/NonMobileMessages";
import RemainingTime from "@/components/pages/play/components/RemainingTime";
import RotateDeviceBanner from "@/components/pages/play/components/RotateDeviceBanner";
import HeadsUpInstructions from "@/components/pages/play/components/HeadsUpInstructions";

export default function HeadsUpGame() {
  const {
    state,
    startNextTurn,
    submitResult,
    finalizeGame,
    cancelGame,
    getCurrentPlayer,
    changeWord,
  } = useHeadsUpGame();
  const currentPlayer = getCurrentPlayer();
  const isRunning = state.status === "running";
  const isCancelable = !isRunning;

  const t = useTranslations("play");
  const router = useRouter();
  const navGuard = useNavigationGuard({ enabled: true });
  const [isLeaving, setIsLeaving] = useState(false);
  const isMobile = useIsMobile();
  const [bgAnimation, setBgAnimation] = useTimedState<
    "none" | "success" | "pass"
  >("none", 500);

  const orientation = useOrientation();
  const isLandscape =
    orientation.type === "landscape-primary" ||
    orientation.type === "landscape-secondary";

  const isFullscreen = useFullscreenOnLandscape({ isMobile, isLandscape });

  useHideLanguageSwitcherToggle();
  useDisplayMuteToggle();
  useKeepScreenAwake(!!currentPlayer);

  useDeviceMotion((action) => {
    if (state.status !== "running") {
      if (action === "downward") {
        startNextTurn();
      }
      return;
    }

    if (action === "upward") {
      setBgAnimation("pass");
      changeWord();
    } else if (action === "downward") {
      setBgAnimation("success");
      submitResult(true);
    }
  });

  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    const hasShownInstructions = localStorage.getItem(
      "headsup-instructions-shown"
    );
    if (!hasShownInstructions) {
      setShowInstructions(true);
    }
  }, []);

  if (!currentPlayer) {
    redirect("/play");
  }
  if (state.status === "finalized") {
    redirect("/play/heads-up/results");
  }

  // Show message for non-mobile devices
  if (!isMobile) {
    return <NonMobileMessage />;
  }

  const gameScreenBgStyles = {
    none: "bg-white",
    success: "bg-green-400",
    pass: "bg-blue-200",
  };

  return (
    <div
      className={`transition-colors duration-300 ${gameScreenBgStyles[bgAnimation]} ${isFullscreen ? "fixed inset-0 z-50" : "h-[calc(100vh-16rem)]"}`}
    >
      <div className="relative h-full flex flex-col">
        <div className="absolute top-8 right-8 z-10 flex gap-4">
          <BaseButton
            onClick={() => setShowInstructions(true)}
            vibrateOnTap
            icon={<InformationCircleIcon className="h-6 w-6" />}
          />
          <BaseButton
            onClick={() => {
              setIsLeaving(true);
            }}
            vibrateOnTap
            icon={<XMarkIcon className="h-6 w-6" />}
          />
        </div>

        <div className="flex items-center justify-center p-4 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">
              {t("headsUp.play.turnMessage", {
                player: currentPlayer?.playerId,
              })}
            </span>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div
            className="text-center"
            onClick={() => {
              if (state.status === "running") {
                submitResult(true);
              } else {
                startNextTurn();
              }
            }}
          >
            {isRunning ? (
              <>
                <span className="text-4xl font-semibold">
                  {state.currentWord?.word}
                </span>
                <div className="mt-2 text-sm text-gray-500">
                  {state.currentWord?.category}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <span className="text-xl font-semibold">
                  {t("headsUp.play.startTurnMessage")}
                </span>
                <span className="animate-tilt-down">
                  <DevicePhoneMobileIcon
                    className={`w-12 h-12 ${isLandscape ? "rotate-90" : ""}`}
                  />
                </span>
              </div>
            )}
          </div>
        </div>

        <RemainingTime time={currentPlayer?.timeRemaining} />

        {!isLandscape && <RotateDeviceBanner />}
        <PageLeaveConfirmModal
          open={isLeaving || navGuard.active}
          onLeave={() => {
            if (isCancelable) cancelGame();
            else finalizeGame();

            if (navGuard.active) {
              navGuard.accept?.();
            } else {
              router.push("/play");
            }
          }}
          onStay={() => {
            setIsLeaving(false);
            navGuard.reject?.();
          }}
          title={t("shared.leaveGame.title")}
          description={
            isCancelable
              ? t("shared.leaveGame.cancelDescription")
              : t("shared.leaveGame.description")
          }
          rejectCtaText={t("shared.leaveGame.rejectCtaText")}
          acceptCtaText={t("shared.leaveGame.acceptCtaText")}
        />
        <HeadsUpInstructions
          open={showInstructions}
          onClose={() => setShowInstructions(false)}
        />
      </div>
    </div>
  );
}
