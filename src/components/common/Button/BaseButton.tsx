import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import vibrateDevice from "@/utils/vibrateDevice";

type ButtonVariant = "ghost" | "default" | "fill" | "bordered";
type ButtonSize = "default" | "large";
type ButtonColor = "default" | "primary" | "secondary" | "danger";

type ButtonProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> &
    PropsWithChildren<{
      as?: T;
      variant?: ButtonVariant;
      size?: ButtonSize;
      icon?: React.ReactNode;
      color?: ButtonColor;
      loading?: boolean; // New loading prop
      vibrateOnTap?: boolean;
    }>;

const BaseButton = <T extends React.ElementType = "button">({
  as,
  variant = "default",
  size = "default",
  color = "default",
  icon,
  className,
  children,
  disabled,
  loading = false, // Default value for loading
  onClick,
  vibrateOnTap,
  ...props
}: ButtonProps<T>) => {
  const baseStyles =
    "relative shadow-xs whitespace-nowrap focus:outline-hidden focus-visible:outline-1 rounded-sm inline-flex items-center transition-colors duration-150 ease-in-out active:scale-95 active:shadow-none";

  const variantStyles = {
    default: "bg-gray-50 hover:bg-gray-100 text-gray-800",
    fill: "bg-purple-100 hover:bg-purple-200 text-gray-800",
    ghost: "bg-transparent hover:text-gray-600 shadow-none",
    bordered: "border border-gray-[0.8]",
  };

  const colorStyles = {
    default: "",
    primary: "text-white bg-purple-400 hover:bg-purple-500",
    secondary: "text-white bg-green-400 hover:bg-green-500",
    danger: "text-white bg-red-400 hover:bg-red-500",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  const iconOnly = children === undefined && icon !== undefined;
  const iconOnlyStyles = iconOnly ? "p-2 hover:bg-gray-100" : "";

  const sizeStyles = {
    default: `${iconOnly ? "p-2" : "px-4 py-2"} text-sm`,
    large: `${iconOnly ? "p-4" : "px-6 py-4"} text-xl`,
  };

  const combinedStyles = twMerge(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    colorStyles[color],
    iconOnlyStyles,
    disabled && disabledStyles,
    className
  );

  const iconWrapperStyles = twMerge(
    "stroke-current",
    size === "large" ? "w-6" : "w-5",
    iconOnly ? "" : "mr-2",
    "inline-flex items-center"
  );

  const Component = as || "button"; // Default to 'button' if no 'as' prop is provided

  return (
    <Component
      className={combinedStyles}
      disabled={disabled || loading}
      onClick={(e) => {
        onClick?.(e);
        if (vibrateOnTap) {
          vibrateDevice();
        }
      }}
      {...props}
    >
      {loading ? (
        <div className="absolute inset-0 flex justify-center items-center transition-opacity duration-300 opacity-100 overflow-hidden w-full">
          <svg
            aria-hidden="true"
            className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-purple-400"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : null}
      <div
        className={`relative transition inline-flex justify-center items-center w-full ${loading ? "opacity-0" : "opacity-100"} rtl:flex-row-reverse`}
      >
        {icon && <span className={iconWrapperStyles}>{icon}</span>}
        {children}
      </div>
    </Component>
  );
};

export default BaseButton;
