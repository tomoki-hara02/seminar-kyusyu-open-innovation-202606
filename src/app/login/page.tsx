import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "アクセス認証",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ from?: string; error?: string }>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { from, error } = await searchParams;
  const fromPath = from && from.startsWith("/") ? from : "/";

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-4 py-12 bg-gradient-to-br from-[#0a0a0f] via-[#0e1424] to-[#0a1f2e]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-[11px] tracking-[0.35em] text-cyan-300/80 mb-2">
            tAiL. SEMINAR
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            セミナー資料 アクセス認証
          </h1>
          <p className="mt-3 text-sm text-white/70 leading-relaxed">
            本資料は受講者限定公開です。
            <br />
            セミナーでお伝えしたパスワードをご入力ください。
          </p>
        </div>

        <LoginForm from={fromPath} hasError={Boolean(error)} />

        <p className="mt-8 text-center text-xs text-white/40">
          tAiL. 法律事務所
        </p>
      </div>
    </main>
  );
}
