"use client";
import BaseButton from "./BaseButton";
import { ComponentProps, FC, useCallback } from "react";
import vibrateDevice from "@/utils/vibrateDevice";

type ButtonProps = ComponentProps<typeof BaseButton>; // Extract the props from your Button component

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  vibrateOnTap,
  ...props
}) => {
  const handleOnClick = useCallback(
    (e: MouseEvent) => {
      if (vibrateOnTap) {
        vibrateDevice();
      }
      onClick?.(e);
    },
    [onClick, vibrateOnTap]
  );
  return (
    <BaseButton {...props} onClick={handleOnClick}>
      {children}
    </BaseButton>
  );
};

export default Button;
