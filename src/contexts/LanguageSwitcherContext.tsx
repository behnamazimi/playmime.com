"use client";

import React, { createContext, use, useEffect, useMemo, useState } from "react";

// Context
const LanguageSwitcherContext = createContext<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isToggleVisible: boolean;
  setIsToggleVisible: (isHidden: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
  isToggleVisible: false,
  setIsToggleVisible: () => {},
});

// Provider Component
export const LanguageSwitcherProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isToggleVisible, setIsToggleVisible] = useState(true);

  const value = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      isToggleVisible,
      setIsToggleVisible,
    }),
    [isOpen, setIsOpen, isToggleVisible, setIsToggleVisible]
  );
  return (
    <LanguageSwitcherContext value={value}>{children}</LanguageSwitcherContext>
  );
};

// Custom Hook
export const useLanguageSwitcher = () => {
  const context = use(LanguageSwitcherContext);
  if (!context) {
    throw new Error(
      "useLanguageSwitcher must be used within a LanguageSwitcherProvider"
    );
  }
  return context;
};

export const useHideLanguageSwitcherToggle = () => {
  const { setIsToggleVisible } = useLanguageSwitcher();
  useEffect(() => {
    setIsToggleVisible(false);

    return () => {
      setIsToggleVisible(true);
    };
  }, [setIsToggleVisible]);
};
