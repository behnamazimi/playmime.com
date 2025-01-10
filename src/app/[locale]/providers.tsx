"use client";

import { FC, PropsWithChildren } from "react";
import { Cookies, CookiesProvider } from "react-cookie";
import { OneWordPerTurnGameProvider } from "@/contexts/games/OneWordPerTurnGameContext";
import { QuickPlayGameProvider } from "@/contexts/games/QuickPlayGameContext";
import { LanguageSwitcherProvider } from "@/contexts/LanguageSwitcherContext";

const Providers: FC<
  PropsWithChildren & {
    cookies: Record<string, string>;
  }
> = ({ children, cookies }) => {
  return (
    <CookiesProvider cookies={new Cookies(cookies)}>
      <LanguageSwitcherProvider>
        <QuickPlayGameProvider>
          <OneWordPerTurnGameProvider>{children}</OneWordPerTurnGameProvider>
        </QuickPlayGameProvider>
      </LanguageSwitcherProvider>
    </CookiesProvider>
  );
};

export default Providers;
