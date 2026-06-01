import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: '生成AIを"安心して使い倒す"ためのルールづくり入門 | tAiL. 法律事務所',
  description:
    "経営者・幹部・次世代リーダー層向けセミナー（2026年6月17日 熊本城ホール）。生成AI活用のルールづくりを学ぶ実践型セッション。",
  icons: {
    icon: '/04_favicon.ico',
    shortcut: '/04_favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="overflow-hidden">{children}</body>
    </html>
  );
}
