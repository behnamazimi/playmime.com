"use client";
import PageTitle from "@/components/shared/PageTitle";
import PageLeaveConfirmModal from "@/components/shared/PageLeaveConfirmModal";
import { useNavigationGuard } from "next-navigation-guard";
import { ReactNode, useState } from "react";
import useRouter from "@/i18n/routing/useRouter";
import useKeepScreenAwake from "@/hooks/useKeepScreenAwake";
import { useTranslations } from "next-intl";
import BaseButton from "@/components/shared/Button/BaseButton";

type GameLayoutProps = {
  title: string;
  subtitle: ReactNode;
  currentTeam: { teamId: number } | null;
  isCancelable: boolean;
  onCancel: () => void;
  onFinalize: () => void;
  children: ReactNode;
};

const GameLayout = ({
  title,
  subtitle,
  currentTeam,
  isCancelable,
  onCancel,
  onFinalize,
  children,
}: GameLayoutProps) => {
  const t = useTranslations("play");
  const navGuard = useNavigationGuard({ enabled: true });
  const [isLeaving, setIsLeaving] = useState(false);
  const router = useRouter();

  useKeepScreenAwake(!!currentTeam);

  return (
    <div className="max-w-2xl mx-auto md:px-4 pt-8 pb-8 animate-fade-in">
      <PageTitle title={title} subtitle={subtitle} />
      <div className="flex flex-col gap-4">
        {children}

        <BaseButton
          size="large"
          className="justify-center"
          onClick={() => {
            setIsLeaving(true);
          }}
          vibrateOnTap
        >
          {isCancelable
            ? t("shared.cancelGameButton")
            : t("shared.finalizeGameButton")}
        </BaseButton>
      </div>
      <PageLeaveConfirmModal
        open={isLeaving || navGuard.active}
        onLeave={() => {
          if (isCancelable) {
            onCancel();
          } else {
            onFinalize();
          }
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
    </div>
  );
};

export default GameLayout;
