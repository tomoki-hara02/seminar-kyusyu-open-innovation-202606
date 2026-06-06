import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "seminar_auth";
const COOKIE_VALUE = "verified";

/**
 * 簡易パスワード認証ゲート。
 * Cookie `seminar_auth=verified` が無い場合は /login へリダイレクト。
 * 認証は受講者向けの簡易保護目的（パスワードは公開可能な値）。
 *
 * 静的アセット（拡張子つきパス）と /login、Next 内部パスはバイパス。
 * matcher 単体では Vercel の image 最適化経由のリクエストを取りこぼすことが
 * あるため、関数本体でも明示的にスキップしている。
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /login と Next 内部 / API はゲート対象外
  if (
    pathname === "/login" ||
    pathname.startsWith("/login/") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/")
  ) {
    return NextResponse.next();
  }

  // 拡張子つきパス（画像・フォント・CSS等の静的アセット）はゲート対象外
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) {
    return NextResponse.next();
  }

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
  // 全ルートにマッチさせ、関数本体でバイパス制御する。
  matcher: ["/:path*"],
};
