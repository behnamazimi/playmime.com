"use client";

import { useEffect } from "react";
import useRouter from "@/i18n/routing/useRouter";

const useClientRedirect = (href: string | null | undefined): boolean => {
  const router = useRouter();
  const shouldRedirect = Boolean(href);

  useEffect(() => {
    if (href) {
      router.replace(href);
    }
  }, [href, router]);

  return shouldRedirect;
};

export default useClientRedirect;
