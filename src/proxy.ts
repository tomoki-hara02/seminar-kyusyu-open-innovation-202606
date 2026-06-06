import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "seminar_auth";
const COOKIE_VALUE = "verified";

/**
 * 簡易パスワード認証ゲート。
 * Cookie `seminar_auth=verified` が無い場合は /login へリダイレクト。
 * 認証は受講者向けの簡易保護目的（パスワードは公開可能な値）。
 */
export function proxy(request: NextRequest) {
  const cookie = request.cookies.get(COOKIE_NAME);
  if (cookie?.value === COOKIE_VALUE) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  url.searchParams.set(
    "from",
    request.nextUrl.pathname + request.nextUrl.search,
  );
  return NextResponse.redirect(url);
}

export const config = {
  // /login、静的アセット、Next 内部パスは除外
  matcher: [
    "/((?!login|_next/static|_next/image|favicon\\.ico|04_favicon\\.ico|robots\\.txt).*)",
  ],
};
