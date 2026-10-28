import { NextResponse, type NextRequest } from "next/server";

import { getAuth } from "@/lib/auth/server";

// Optimistic check plus session refresh. The real guard is requireAdmin() in each admin page and
// Server Action (this only knows "signed in", not "is an admin"). The login URL is skipped by the SDK.
export default async function proxy(request: NextRequest) {
  // GET 요청만 인증 검사
  if (request.method !== "GET") {
    return NextResponse.next();
  }

  // 사용자가 로그인했는지 확인 POST / UPDATE / DELETE 요청은 requireAdmin()에서 검사하므로 여기서는 GET만 검사
  const authMiddleware = getAuth().middleware({
    loginUrl: "/admin/sign-in",
  });

  // 인증 결과에 따라 계속 진행하거나 로그인 페이지로 이동
  return authMiddleware(request);
}

export const config = {
  // /admin 및 모든 하위 경로에 적용
  matcher: ["/admin", "/admin/:path*"],
};
// Next.js 14부터는 matcher를 export해야만 middleware가 적용됨
