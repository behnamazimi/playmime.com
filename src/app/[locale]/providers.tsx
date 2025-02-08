"use client";

import { FC, PropsWithChildren } from "react";
import { Cookies, CookiesProvider } from "react-cookie";
import { OneWordPerTurnGameProvider } from "@/contexts/games/OneWordPerTurnGameContext";
import { QuickPlayGameProvider } from "@/contexts/games/QuickPlayGameContext";
import { LanguageSwitcherProvider } from "@/contexts/LanguageSwitcherContext";
import { NavigationGuardProvider } from "next-navigation-guard";
import { SoundFxProvider } from "@/contexts/SoundFxContext";
import { HeadsUpGameProvider } from "@/contexts/games/HeadsUpGameContext";

const Providers: FC<
  PropsWithChildren & {
    cookies: Record<string, string>;
  }
> = ({ children, cookies }) => {
  return (
    <NavigationGuardProvider>
      <CookiesProvider cookies={new Cookies(cookies)}>
        <SoundFxProvider>
          <LanguageSwitcherProvider>
            <HeadsUpGameProvider>
              <QuickPlayGameProvider>
                <OneWordPerTurnGameProvider>
                  {children}
                </OneWordPerTurnGameProvider>
              </QuickPlayGameProvider>
            </HeadsUpGameProvider>
          </LanguageSwitcherProvider>
        </SoundFxProvider>
      </CookiesProvider>
    </NavigationGuardProvider>
  );
};

export default Providers;
