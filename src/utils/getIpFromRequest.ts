import { NextRequest } from "next/server";

const getIpFromRequest = (request: NextRequest): string | null => {
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for") ||
    null
  );
};

export default getIpFromRequest;
