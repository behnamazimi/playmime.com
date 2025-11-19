"use client";

import { locales } from "@/i18n/config";
import { useTranslations } from "next-intl";
import usePathname from "@/i18n/routing/usePathname";
import { useLocale } from "next-intl";
import Link from "@/i18n/routing/Link";
import { Dialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import { useLanguageSwitcher } from "@/contexts/LanguageSwitcherContext";
import Button from "@/components/common/Button";
import useIsRtl from "@/hooks/useIsRtl";

export default function LanguageSwitcherModal() {
  const t = useTranslations("LanguageSwitcher");
  const pathname = usePathname();
  const currentLocale = useLocale();
  const { isOpen, setIsOpen } = useLanguageSwitcher();
  const isRTL = useIsRtl();

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      <Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/60 backdrop-blur-md z-40" />
        <Dialog.Positioner className="fixed inset-0 flex items-center justify-center z-50">
          <Dialog.Content className="w-full max-w-md glass-dark-strong border border-primary/50 rounded-xl p-6 space-y-4 shadow-lg">
            <Dialog.Title
              className="text-lg font-bold text-foreground"
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
                        variant={isActive ? "fill" : "bordered"}
                        size={"large"}
                        color={isActive ? "primary" : "default"}
                        className="flex items-center justify-center h-32 w-full rounded-md font-bold text-xl"
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
