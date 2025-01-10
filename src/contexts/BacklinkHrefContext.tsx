"use client";

import React, { createContext, use, useEffect, useMemo, useState } from "react";

// Context
const BacklinkHrefContext = createContext<{
  backlinkHref: string;
  setBacklinkHref: (href: string) => void;
  isBacklinkHidden: boolean;
  setIsBacklinkHidden: (isHidden: boolean) => void;
}>({
  backlinkHref: "/",
  setBacklinkHref: () => {},
  isBacklinkHidden: false,
  setIsBacklinkHidden: () => {},
});

// Provider Component
export const BacklinkHrefProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [backlinkHref, setBacklinkHref] = useState<string>("/");
  const [isBacklinkHidden, setIsBacklinkHidden] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      backlinkHref,
      setBacklinkHref,
      isBacklinkHidden,
      setIsBacklinkHidden,
    }),
    [backlinkHref, isBacklinkHidden]
  );
  return <BacklinkHrefContext value={value}>{children}</BacklinkHrefContext>;
};

// Custom Hook
export const useBacklinkHref = ({
  backlinkHref,
  hideBacklink,
}: {
  backlinkHref?: string;
  hideBacklink?: boolean;
} = {}) => {
  const context = use(BacklinkHrefContext);
  if (!context) {
    throw new Error(
      "useBacklinkHref must be used within a BacklinkHrefProvider"
    );
  }
  useEffect(() => {
    if (backlinkHref) {
      context.setBacklinkHref(backlinkHref);
    }
    context.setIsBacklinkHidden(Boolean(hideBacklink));
  }, [backlinkHref, hideBacklink, context]);
  return context;
};
