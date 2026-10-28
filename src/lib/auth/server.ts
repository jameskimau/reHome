// 이 파일이 브라우저 번들에 섞이면 빌드 에러를 낸다.
// 쿠키 비밀키(secret)가 손님 브라우저로 새는 것을 막는 안전장치.
import "server-only";

// Neon이 제공하는 "Auth 클라이언트 공장".
import { createNeonAuth } from "@neondatabase/auth/next/server";

// 공장이 만들어 주는 클라이언트의 타입 (signIn, signOut, getSession, middleware를 가진 객체).
type NeonAuth = ReturnType<typeof createNeonAuth>;

// 만든 클라이언트를 담아 둘 보관함. 처음엔 비어 있음.
// Prisma처럼 globalThis에 두지 않은 이유: 이 클라이언트는 DB 커넥션 같은 걸 열지 않는
// 가벼운 설정 객체라서, dev 리로드 때 다시 만들어져도 누수가 없다.
let instance: NeonAuth | undefined;

// 핵심 목적은 "지연 생성(lazy)".
// 파일 맨 위에서 바로 만들면 import만 해도 env를 검사해서, env가 없을 때 손님 페이지까지 같이 터진다.
// 함수 안에서 "실제로 쓸 때" 만들면 env가 없어도 /admin만 에러가 나고 쇼핑 페이지는 멀쩡하다.
export function getAuth(): NeonAuth {
  // 처음 호출될 때만 만든다. 두 번째부터는 보관함에 든 걸 그대로 돌려준다.
  if (!instance) {
    // Neon Auth 서버 주소. signIn이나 getSession을 하면 이 주소로 요청이 간다. (neon deploy가 .env에 넣어 줌)
    const baseUrl = process.env.NEON_AUTH_BASE_URL;
    // 세션 쿠키에 찍는 도장. 쿠키를 위조하면 도장이 안 맞아 거부된다. (직접 만든 32자 이상 랜덤 문자열)
    const secret = process.env.NEON_AUTH_COOKIE_SECRET;

    // 둘 중 하나라도 없으면 무엇이 빠졌는지 바로 알려 준다.
    if (!baseUrl || !secret) {
      throw new Error("NEON_AUTH_BASE_URL and NEON_AUTH_COOKIE_SECRET must be set");
    }

    // 주소와 도장으로 클라이언트를 만들어 보관함에 넣는다.
    instance = createNeonAuth({ baseUrl, cookies: { secret } });
  }
  return instance;
}
