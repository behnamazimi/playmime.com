import { NextRequest, NextResponse } from "next/server";
import { defaultLocale } from "@/i18n/config";
import { isIP } from "is-ip";
import getIpFromRequest from "@/utils/getIpFromRequest";

const COUNTRY_PATH_MAP: Record<string, string> = {
  IR: "/fa",
};

const fetchCountryByIp = async (
  ip: string,
  origin: string
): Promise<string | null> => {
  try {
    const response = await fetch(`${origin}/api/ipinfo?ip=${ip}`);
    if (response.ok) {
      const { country } = await response.json();
      return country?.toUpperCase() || null;
    }
  } catch {
    // Fail silently, fallback will handle errors
  }
  return null;
};

const redirectByCountry = async (request: NextRequest) => {
  const ip = getIpFromRequest(request);

  if (!ip || !isIP(ip)) {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  const country = await fetchCountryByIp(ip, request.nextUrl.origin);
  const redirectPath = COUNTRY_PATH_MAP[country || ""] || `/${defaultLocale}`;

  return NextResponse.redirect(new URL(redirectPath, request.url));
};

export default redirectByCountry;
