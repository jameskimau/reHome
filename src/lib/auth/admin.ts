// 이 파일은 서버에서만 쓴다. (브라우저 번들에 섞이면 빌드 에러)
import "server-only";

import { redirect } from "next/navigation";
import { connection } from "next/server";
import { getAuth } from "@/lib/auth/server";

/**
 * 지금 요청한 사람이 admin인지 true/false로 알려 준다.
 *
 * "로그인했는가"만으로는 부족하다.
 * Neon Auth는 누구나 계정을 만들 수 있으니, role이 "admin"인지까지 확인해야 한다.
 */
export async function isAdmin(): Promise<boolean> {
  // 1) "이 함수는 요청이 들어올 때마다 실행해라"라고 Next에 알려 준다.
  //    로그인 정보는 사람마다 다르니 빌드 때 미리 만들어 둘 수 없다.
  //    이 줄이 없으면 빌드 중에 이 코드가 돌아가서, auth env가 없다고 빌드가 실패한다.
  await connection();

  // 2) 브라우저가 보낸 쿠키를 들고 Neon에 "이 사람 누구야?"라고 물어본다.
  //    로그인 안 했으면 session은 null.
  const { data: session } = await getAuth().getSession();

  // 3) role이 "admin"일 때만 true.
  //    ?. 는 "값이 없으면 에러 대신 undefined"라는 뜻이다. (로그인 안 했으면 false가 됨)
  const role = session?.user?.role;
  return role === "admin";
}

/**
 * admin이 아니면 로그인 페이지로 쫓아내는 경비원.
 *
 * 모든 admin 페이지와 admin Server Action의 "맨 첫 줄"에서 호출한다.
 * proxy.ts는 페이지 이동만 막을 뿐이고, Server Action은 누구나 POST로 직접 호출할 수 있어서
 * 진짜 보안은 여기서 책임진다.
 */
export async function requireAdmin(): Promise<void> {
  const allowed = await isAdmin();
  if (!allowed) {
    redirect("/admin/sign-in");
  }
  // admin이면 아무것도 안 하고 통과 → 호출한 쪽 코드가 계속 실행된다.
}
