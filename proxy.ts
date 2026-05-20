import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

export function proxy(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.next();
  }

  const limit = rateLimit(request, "proxy:orders:create");
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many order attempts. Please try again shortly." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000))
        }
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/orders"
};
