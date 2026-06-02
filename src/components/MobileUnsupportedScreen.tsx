import Image from 'next/image';
import { ACCENTS, BG_COLOR } from '@/theme/colors';

/**
 * スマートフォン等の狭い画面で表示する案内画面。
 * 768px 未満でのみ表示（Tailwind max-md）。
 */
export default function MobileUnsupportedScreen() {
  return (
    <div
      className="hidden max-md:flex fixed inset-0 z-[9999] flex-col items-center justify-center px-8 text-center"
      style={{ background: BG_COLOR }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${ACCENTS.purple}44 0%, transparent 70%)`,
        }}
      />

      <div className="relative flex flex-col items-center gap-8 max-w-sm">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="tAiL. 法律事務所"
            width={40}
            height={40}
            className="opacity-90 object-contain"
          />
          <span className="text-sm font-semibold tracking-wider text-white/70">
            tAiL. 法律事務所
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-[10px] tracking-[0.35em] uppercase text-white/40">
            Desktop Required
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-white leading-snug">
            PCで開き直してください
          </h1>
          <p className="text-sm text-white/55 leading-relaxed">
            このプレゼンテーションはPC環境向けに最適化されています。
            <br />
            パソコンからアクセスしてください。
          </p>
        </div>

        <div
          className="w-16 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${ACCENTS.blue}, transparent)`,
          }}
        />

        <p className="text-xs text-white/35 leading-relaxed">
          生成AIを&quot;安心して使い倒す&quot;ための
          <br />
          ルールづくり入門
        </p>
      </div>
    </div>
  );
}
