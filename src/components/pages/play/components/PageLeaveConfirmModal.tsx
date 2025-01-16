import { Dialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import Button from "@/components/common/Button";
import { FC } from "react";
import useIsRtl from "@/hooks/useIsRtl";

type Props = {
  title: string;
  description: string;
  rejectCtaText: string;
  acceptCtaText: string;
  open: boolean;
  onLeave: () => void;
  onStay: () => void;
};

const PageLeaveConfirmModal: FC<Props> = ({
  title,
  description,
  rejectCtaText,
  acceptCtaText,
  open,
  onLeave,
  onStay,
}) => {
  const isRTL = useIsRtl();

  return (
    <Dialog.Root open={open} onOpenChange={() => onStay?.()}>
      <Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
        <Dialog.Positioner className="fixed inset-0 flex items-center justify-center z-50">
          <Dialog.Content className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4">
            <Dialog.Title
              className="text-lg font-semibold text-gray-800"
              dir={isRTL ? "rtl" : "ltr"}
            >
              {title}
            </Dialog.Title>
            <Dialog.Description dir={isRTL ? "rtl" : "ltr"}>
              {description}
            </Dialog.Description>
            <div className="flex flex-row-reverse gap-4 rtl:flex-row">
              <Dialog.CloseTrigger asChild>
                <Button color={"secondary"}>{rejectCtaText}</Button>
              </Dialog.CloseTrigger>
              <Button onClick={() => onLeave?.()}>{acceptCtaText}</Button>
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default PageLeaveConfirmModal;
