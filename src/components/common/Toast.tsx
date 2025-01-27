"use client";

import React, { FC, PropsWithChildren } from "react";
import Button from "@/components/common/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = PropsWithChildren<{
  visible: boolean;
  onClose?: () => void;
}>;

const Toast: FC<Props> = ({ children, onClose, visible }) => {
  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 ltr:left-1/2 ltr:right-0 rtl:right-1/2 rtl:left-0 w-10/12 mx-auto bg-white shadow-md rounded-lg p-4 transform ltr:-translate-x-1/2 rtl:translate-x-1/2 transition-all duration-300 ease-in-out z-50"
      role="dialog"
      aria-live="polite"
    >
      <div className="flex gap-4 items-center">
        <div className="text-gray-800 text-sm flex-grow">{children}</div>
        <Button
          onClick={onClose}
          icon={<XMarkIcon />}
          aria-label="Close installation prompt"
        />
      </div>
    </div>
  );
};

export default Toast;
