import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type RateLimit = { [key: string]: { timestamp: number; count: number } };
const rateLimit: RateLimit = {};

export default function rateLimiter(request: NextRequest) {
  const ip =
    request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for");

  if (ip) {
    if (!rateLimit[ip]) {
      rateLimit[ip] = { timestamp: Date.now(), count: 0 };
    }

    const currentTime = Date.now();
    const timeDiff = currentTime - rateLimit[ip].timestamp;

    // Reset the count if the last request was more than 1 minute ago
    if (timeDiff > 60000) {
      rateLimit[ip].timestamp = currentTime;
      rateLimit[ip].count = 0;
    }

    if (rateLimit[ip].count >= 1000) {
      return new NextResponse("Too many requests, please try again later", {
        status: 429,
      });
    }

    rateLimit[ip].count++;
  }

  return NextResponse.next();
}
