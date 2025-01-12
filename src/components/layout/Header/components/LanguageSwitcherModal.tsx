"use client";

import { LOCALE_COOKIE_NAME, locales } from "@/i18n/config";
import { useTranslations } from "next-intl";
import usePathname from "@/i18n/routing/usePathname";
import { useLocale } from "next-intl";
import Link from "@/i18n/routing/Link";
import { Dialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import { useLanguageSwitcher } from "@/contexts/LanguageSwitcherContext";
import { useCookies } from "react-cookie";
import Button from "@/components/common/Button";

export default function LanguageSwitcherModal() {
  const t = useTranslations("LanguageSwitcher");
  const pathname = usePathname();
  const currentLocale = useLocale();
  const { isOpen, setIsOpen } = useLanguageSwitcher();
  const [{ [LOCALE_COOKIE_NAME]: language }] = useCookies([LOCALE_COOKIE_NAME]);
  const isRTL = language === "fa";

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      <Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
        <Dialog.Positioner className="fixed inset-0 flex items-center justify-center z-50">
          <Dialog.Content className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4">
            <Dialog.Title
              className="text-lg font-semibold text-gray-800"
              dir={isRTL ? "rtl" : "ltr"}
            >
              {t("title")}
            </Dialog.Title>
            <Dialog.Description>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {locales.map((locale) => {
                  const isActive = currentLocale === locale;

                  return (
                    <Link
                      key={locale}
                      className={isActive ? "underline" : undefined}
                      href={pathname}
                      locale={locale}
                    >
                      <Button
                        variant={"ghost"}
                        size={"large"}
                        className="flex items-center justify-center h-32 w-full bg-gray-100 rounded-md font-bold text-xl"
                        vibrateOnTap
                      >
                        {t(locale)}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
