import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = process.env.IPINFO_TOKEN;
    if (!token) {
      return Response.json(
        { error: "Server misconfiguration: Missing IPINFO_TOKEN" },
        { status: 500 }
      );
    }

    const ipToLookup = req.nextUrl.searchParams.get("ip");
    const ipCacheKey = `ip-${ipToLookup || "default"}`;
    const cachedIpInfo = global.cacheIps.get(ipCacheKey);

    if (cachedIpInfo) {
      return Response.json(cachedIpInfo);
    }

    const ipInfoUrl = `https://ipinfo.io/${ipToLookup}?token=${token}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000); // 3-second timeout

    try {
      const response = await fetch(ipInfoUrl, { signal: controller.signal });
      clearTimeout(timeout);

      if (!response.ok) {
        return Response.json(
          { error: `IP info lookup failed. Status: ${response.status}` },
          { status: response.status }
        );
      }

      const jsonResponse = await response.json();
      global.cacheIps.set(ipCacheKey, jsonResponse); // Cache the response
      return Response.json(jsonResponse);
    } catch (fetchError) {
      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        return Response.json(
          { error: "IP info lookup timed out" },
          { status: 504 }
        );
      }
      throw fetchError;
    }
  } catch (error) {
    console.error("Error fetching IP info:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
