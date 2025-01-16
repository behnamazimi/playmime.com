import type { NextRequest } from "next/server";
import createNextResponse from "@/utils/createNextResponse";

export async function GET(req: NextRequest) {
  try {
    const token = process.env.IPINFO_TOKEN;
    if (!token) {
      return createNextResponse(
        { error: "Server misconfiguration: Missing IPINFO_TOKEN" },
        500
      );
    }

    const ipToLookup = req.nextUrl.searchParams.get("ip");
    const ipCacheKey = `ip-${ipToLookup || "default"}`;
    const cachedIpInfo = global.cacheIps.get(ipCacheKey);

    if (cachedIpInfo) {
      return createNextResponse(cachedIpInfo, 200);
    }

    const ipInfoUrl = `https://ipinfo.io/${ipToLookup}?token=${token}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000); // 3-second timeout

    try {
      const response = await fetch(ipInfoUrl, { signal: controller.signal });
      clearTimeout(timeout);

      if (!response.ok) {
        return createNextResponse(
          { error: `IP info lookup failed. Status: ${response.status}` },
          response.status
        );
      }

      const jsonResponse = await response.json();
      global.cacheIps.set(ipCacheKey, jsonResponse); // Cache the response
      return createNextResponse(jsonResponse, 200);
    } catch (fetchError) {
      // @ts-expect-error - AbortError is expected
      if (fetchError.name === "AbortError") {
        return createNextResponse({ error: "IP info lookup timed out" }, 504);
      }
      throw fetchError;
    }
  } catch (error) {
    console.error("Error fetching IP info:", error);
    return createNextResponse({ error: "Internal Server Error" }, 500);
  }
}
