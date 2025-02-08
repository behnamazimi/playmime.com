"use client";
import { Dialog } from "@ark-ui/react/dialog";
import { DevicePhoneMobileIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import BaseButton from "@/components/common/Button/BaseButton";
import { Portal } from "@ark-ui/react/portal";
import useIsRtl from "@/hooks/useIsRtl";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function HeadsUpInstructions({ open, onClose }: Props) {
  const t = useTranslations("play");
  const isRTL = useIsRtl();

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => {
        if (!e.open) {
          onClose?.();
        }
      }}
    >
      <Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />
        <Dialog.Positioner className="fixed inset-0 flex items-center justify-center z-50">
          <Dialog.Content
            className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4"
            dir={isRTL ? "rtl" : "ltr"}
          >
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-semibold text-gray-800">
                {t("headsUp.instructions.title")}
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <BaseButton
                  onClick={onClose}
                  icon={<XMarkIcon className="h-5 w-5" />}
                />
              </Dialog.CloseTrigger>
            </div>
            <Dialog.Description dir={isRTL ? "rtl" : "ltr"}>
              <div className="space-y-4">
                <p>{t("headsUp.instructions.description")}</p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="animate-tilt-down">
                      <DevicePhoneMobileIcon
                        className={"w-8 h-8-once rotate-90"}
                      />
                    </span>
                    <p>{t("headsUp.instructions.startTurn")}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="animate-tilt-down">
                      <DevicePhoneMobileIcon className={"w-8 h-8 rotate-90"} />
                    </span>
                    <p>{t("headsUp.instructions.correctGuess")}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="animate-tilt-up">
                      <DevicePhoneMobileIcon className={"w-8 h-8 rotate-90"} />
                    </span>
                    <p>{t("headsUp.instructions.passWord")}</p>
                  </div>
                </div>
              </div>
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
