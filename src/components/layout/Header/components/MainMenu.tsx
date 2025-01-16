"use client";

import {
  LanguageIcon,
  Bars2Icon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/common/Button";
import InstallAppCTA from "@/components/layout/Header/components/InstallAppCTA";
import { Menu } from "@ark-ui/react/menu";
import { useTranslations } from "next-intl";
import { useLanguageSwitcher } from "@/contexts/LanguageSwitcherContext";
import { useSoundFx } from "@/contexts/SoundFxContext";
import useIsRtl from "@/hooks/useIsRtl";

const MainMenu = () => {
  const t = useTranslations("shared");
  const { setIsOpen, isToggleVisible } = useLanguageSwitcher();
  const { isMuted, setIsMuted, isMuteToggleDisplayed } = useSoundFx();

  const isRTL = useIsRtl();
  const direction = isRTL ? "rtl" : "ltr";

  return (
    <div className="flex space-x-4">
      {isMuteToggleDisplayed && (
        <Button
          onClick={() => {
            setIsMuted(!isMuted);
          }}
          icon={isMuted ? <SpeakerXMarkIcon /> : <SpeakerWaveIcon />}
          vibrateOnTap
        />
      )}
      <div className="hidden sm:flex gap-4 items-center">
        <InstallAppCTA />
        {isToggleVisible && (
          <Button
            onClick={() => {
              setIsOpen(true);
            }}
            icon={<LanguageIcon />}
          />
        )}
      </div>

      <div className="sm:hidden">
        <Menu.Root>
          <Menu.Trigger asChild>
            <span>
              <Button icon={<Bars2Icon />} />️
            </span>
          </Menu.Trigger>

          <Menu.Positioner className="relative z-100" style={{ zIndex: 100 }}>
            <Menu.Content className="mt-1 w-60 bg-gray-50 rounded-sm shadow-lg border-0 overflow-hidden">
              {isToggleVisible && (
                <Menu.Item value="language-switcher" style={{ direction }}>
                  <Button
                    icon={<LanguageIcon />}
                    className={"shadow-none w-full rounded-none py-4"}
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
                    {t("changeLanguage")}
                  </Button>
                </Menu.Item>
              )}
              <Menu.Item value="install-now" style={{ direction }}>
                <InstallAppCTA
                  className={"shadow-none w-full rounded-none py-4"}
                />
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </div>
    </div>
  );
};

export default MainMenu;
