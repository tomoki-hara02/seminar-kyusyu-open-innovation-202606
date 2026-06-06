"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const PASSWORD = "54643";
const COOKIE_NAME = "seminar_auth";
const COOKIE_VALUE = "verified";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7日間

export async function loginAction(formData: FormData) {
  const password = formData.get("password");
  const fromRaw = formData.get("from");
  const from =
    typeof fromRaw === "string" && fromRaw.startsWith("/") ? fromRaw : "/";

  if (typeof password !== "string" || password !== PASSWORD) {
    redirect(`/login?from=${encodeURIComponent(from)}&error=1`);
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });

  redirect(from);
}
