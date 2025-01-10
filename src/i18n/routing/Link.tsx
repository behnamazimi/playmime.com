"use client";
// import NextLink from "next/link";
// import { ComponentProps, FC } from "react";
// import { defaultLocale, LOCALE_COOKIE_NAME } from "@/i18n/config";
// import { useCookies } from "react-cookie";
//
// const Link: FC<ComponentProps<typeof NextLink>> = ({ href, ...props }) => {
//   const [{ [LOCALE_COOKIE_NAME]: currentLocale }] = useCookies([
//     LOCALE_COOKIE_NAME,
//   ]);
//
//   const locale = currentLocale || defaultLocale;
//   const hrefWithLocale = `/${locale}${href}`;
//
//   return <NextLink href={hrefWithLocale} {...props} />;
// };
//
// export default Link;

import { createNavigation } from "next-intl/navigation";
import routing from "@/i18n/routing/index";

const { Link } = createNavigation(routing);

export default Link;
