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
    purple: {
      neon: "neon-magenta",
      border: "border-neon-magenta",
      text: "text-neon-magenta",
    },
    orange: {
      neon: "neon-magenta",
      border: "border-neon-magenta",
      text: "text-neon-magenta",
    },
    green: {
      neon: "neon-green",
      border: "border-neon-green",
      text: "text-neon-green",
    },
    blue: {
      neon: "neon-blue",
      border: "border-neon-blue",
      text: "text-neon-blue",
    },
  };
  const colorConfig = colorsMap[color];

  return (
    <Button
      as={Link}
      href={href}
      className="group relative w-full p-0 overflow-hidden rounded-xl glass-dark-strong border transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 whitespace-pre"
      style={{
        borderColor: `hsl(var(--${colorConfig.neon}) / 0.3)`,
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.borderColor = `hsl(var(--${colorConfig.neon}))`;
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.borderColor = `hsl(var(--${colorConfig.neon}) / 0.3)`;
      }}
      vibrateOnTap
    >
      <div className="px-4 md:px-6 py-4 relative flex items-center justify-between gap-6 z-10 max-w-full min-w-full">
        <div className="whitespace-normal flex-1">
          <h3 className={`text-lg md:text-xl font-bold ${colorConfig.text}`}>
            {title}
          </h3>
          <p className="md:text-lg text-muted-foreground font-light">
            {description}
          </p>
        </div>
        <span
          className="block h-12 w-12 md:w-14 ml-2 scale-150"
          style={{ color: `hsl(var(--${colorConfig.neon}))` }}
        >
          {icon}
        </span>
      </div>

      {/* Hover glow effect */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `0 0 20px hsl(var(--${colorConfig.neon}) / 0.2), inset 0 0 20px hsl(var(--${colorConfig.neon}) / 0.05)`,
        }}
      />
    </Button>
  );
};
export default GameCard;
