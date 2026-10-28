import { NextResponse, type NextRequest } from "next/server";

import { getAuth } from "@/lib/auth/server";

// Optimistic check plus session refresh. The real guard is requireAdmin() in each admin page and
// Server Action (this only knows "signed in", not "is an admin"). The login URL is skipped by the SDK.
export default async function proxy(request: NextRequest) {
  // Server Action POSTs are left to requireAdmin(), whose redirect() the client understands.
  // A proxy redirect would hand the action call an HTML page instead.
  if (request.method !== "GET") return NextResponse.next();
  return getAuth().middleware({ loginUrl: "/admin/sign-in" })(request);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
