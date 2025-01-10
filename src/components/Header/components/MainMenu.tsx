"use client";

import { LanguageIcon, Bars2Icon } from "@heroicons/react/24/outline";
import Button from "@/components/shared/Button";
import InstallAppCTA from "@/components/shared/InstallAppCTA";
import { Menu } from "@ark-ui/react/menu";
import { useTranslations } from "next-intl";
import Link from "@/i18n/routing/Link";

const MainMenu = () => {
  const t = useTranslations("shared");
  return (
    <>
      <div className="hidden sm:flex gap-4 items-center">
        <InstallAppCTA />
        <Button as={Link} href="/select-language" icon={<LanguageIcon />} />
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
              <Menu.Item value="language-switcher" className="">
                <Button
                  as={Link}
                  href={"/select-language"}
                  icon={<LanguageIcon />}
                  className={"shadow-none w-full rounded-none py-4"}
                >
                  {t("changeLanguage")}
                </Button>
              </Menu.Item>
              <Menu.Item value="install-now">
                <InstallAppCTA
                  className={"shadow-none w-full rounded-none py-4"}
                />
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </div>
    </>
  );
};

export default MainMenu;
