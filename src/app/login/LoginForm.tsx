"use client";

import { useState } from "react";
import { loginAction } from "./actions";

type Props = {
  from: string;
  hasError: boolean;
};

export default function LoginForm({ from, hasError }: Props) {
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      action={loginAction}
      onSubmit={() => setSubmitting(true)}
      className="w-full max-w-sm mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl"
    >
      <input type="hidden" name="from" value={from} />

      <label className="block mb-5">
        <span className="block text-xs tracking-[0.2em] text-white/70 mb-2">
          PASSWORD
        </span>
        <input
          type="password"
          name="password"
          required
          autoFocus
          autoComplete="off"
          inputMode="numeric"
          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all"
          placeholder="受講者にお伝えしたパスワード"
        />
      </label>

      {hasError && (
        <p
          role="alert"
          className="mb-4 text-sm text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-md px-3 py-2"
        >
          パスワードが正しくありません。再度ご入力ください。
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
      >
        {submitting ? "認証中…" : "アクセス"}
      </button>
    </form>
  );
}
