"use client";

import React from "react";
import Button from "@/components/common/Button";
import Link from "@/i18n/routing/Link";

interface GameCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "purple" | "orange" | "blue" | "green";
  href: string;
}
const GameCard = ({ icon, title, description, color, href }: GameCardProps) => {
  const colorsMap = {
    purple: ["bg-purple-300", "bg-purple-400", "text-purple-200"],
    orange: ["bg-orange-300", "bg-orange-400", "text-orange-200"],
    green: ["bg-green-300", "bg-green-400", "text-green-200"],
    blue: ["bg-blue-300", "bg-blue-400", "text-blue-200"],
  };
  const backgroundColor = colorsMap[color][0];
  const effectColor = colorsMap[color][1];
  const iconColor = colorsMap[color][2];

  const effectAnimationClasses = "transform transition duration-200 ease-out";

  return (
    <Button
      as={Link}
      href={href}
      className={`group relative w-full p-0 overflow-hidden rounded-2xl ${backgroundColor} hover:${backgroundColor} shadow-sm transform transition duration-150 ease-in-out active:scale-95 active:shadow-none whitespace-pre`}
      vibrateOnTap
    >
      <div className="px-4 md:px-6 py-4 relative flex items-center justify-between gap-6 z-10 max-w-full min-w-full">
        <div className="whitespace-normal flex-1">
          <h3 className="text-lg md:text-xl font-semibold text-gray-600">
            {title}
          </h3>
          <p className="md:text-lg text-gray-600 font-light">{description}</p>
        </div>
        <span className={`block h-12 w-12 md:w-14 ${iconColor} ml-2 scale-150`}>
          {icon}
        </span>
      </div>
      <span className="effect absolute z-0 w-full h-full left-0 top-0 overflow-hidden rounded-2xl">
        <span
          className={`absolute w-72 h-72 bg-white opacity-20 rounded-full -bottom-16 ltr:-left-8 rtl:-right-8 group-hover:scale-125 ${effectAnimationClasses}`}
        />
        <span
          className={`absolute w-64 h-64 bg-white opacity-30 rounded-full -bottom-36 ltr:-left-16 rtl:-right-16 group-hover:scale-90 ${effectAnimationClasses}`}
        />
        <span
          className={`absolute w-40 h-40 ${effectColor} opacity-20 rounded-full -bottom-24 ltr:-left-16 rtl:-right-16 group-hover:scale-75 ${effectAnimationClasses}`}
        />
      </span>
    </Button>
  );
};
export default GameCard;
