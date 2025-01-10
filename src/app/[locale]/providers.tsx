"use client";

import { FC, PropsWithChildren } from "react";
import { Cookies, CookiesProvider } from "react-cookie";
import { OneWordPerTurnGameProvider } from "@/contexts/games/OneWordPerTurnGameContext";
import { BacklinkHrefProvider } from "@/contexts/BacklinkHrefContext";
import { QuickPlayGameProvider } from "@/contexts/games/QuickPlayGameContext";

const Providers: FC<
  PropsWithChildren & {
    cookies: Record<string, string>;
  }
> = ({ children, cookies }) => {
  return (
    <CookiesProvider cookies={new Cookies(cookies)}>
      <BacklinkHrefProvider>
        <QuickPlayGameProvider>
          <OneWordPerTurnGameProvider>{children}</OneWordPerTurnGameProvider>
        </QuickPlayGameProvider>
      </BacklinkHrefProvider>
    </CookiesProvider>
  );
};

export default Providers;
