"use client";

import { FC, PropsWithChildren } from "react";
import { Cookies, CookiesProvider } from "react-cookie";
import { OneWordPerTurnGameProvider } from "@/contexts/games/OneWordPerTurnGameContext";
import { QuickPlayGameProvider } from "@/contexts/games/QuickPlayGameContext";
import { LanguageSwitcherProvider } from "@/contexts/LanguageSwitcherContext";
import { NavigationGuardProvider } from "next-navigation-guard";

const Providers: FC<
  PropsWithChildren & {
    cookies: Record<string, string>;
  }
> = ({ children, cookies }) => {
  return (
    <NavigationGuardProvider>
      <CookiesProvider cookies={new Cookies(cookies)}>
        <LanguageSwitcherProvider>
          <QuickPlayGameProvider>
            <OneWordPerTurnGameProvider>{children}</OneWordPerTurnGameProvider>
          </QuickPlayGameProvider>
        </LanguageSwitcherProvider>
      </CookiesProvider>
    </NavigationGuardProvider>
  );
};

export default Providers;
