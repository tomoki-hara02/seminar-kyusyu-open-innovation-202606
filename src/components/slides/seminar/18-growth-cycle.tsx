'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p18: How It Works — 3 段階の成長ストーリー
 *
 * ベーステンプレート: `templates/AgentFlow.tsx`
 *
 * p14〜p17 で整理した「経営目標 / 社長の考え / 従業員の声」を踏まえて、
 *   ① MCP × 生成AIで業務効率化し時間を創る
 *   ② 創出した時間を仕入先見直し・新規営業に再投資する
 *   ③ 時間と売上を新製品・新規事業に拡大する
 * の流れを 1 枚で表現する。
 *
 * AgentFlow のパルスリングは振幅と速度を控えめにし、フラッシュに見えないよう調整。
 */

type Stage = {
  icon: string;
  step: string;
  label: string;
  desc: string;
  bullets: { title: string; sub: string }[];
  accent: string;
};

const STAGES: Stage[] = [
  {
    icon: '◇',
    step: 'Foundation',
    label: '時間を創る',
    desc: 'MCP × 生成AIで日々の作業を圧縮し、\n現場の時間を取り戻す。',
    bullets: [
      {
        title: 'MCPを活用した業務時間の創出',
        sub: '基幹システム・社内DB・SaaS をAIから直接呼び、転記/集計/問合せを圧縮',
      },
      {
        title: '在庫管理の効率化',
        sub: '需要予測と発注精度を上げ、欠品と過剰在庫を同時に削減',
      },
    ],
    accent: '#88bbff',
  },
  {
    icon: '◈',
    step: 'Reinvest',
    label: '時間を再投資する',
    desc: 'AIに任せられない領域に、\n人の時間を振り向ける。',
    bullets: [
      {
        title: '仕入先の見直し（オフライン）',
        sub: '対面交渉と現地確認で、生地・副資材コスト／物流費を本気で下げる',
      },
      {
        title: '営業開拓（生成AI × オフラインのMIX）',
        sub: '生成AIで候補とトークを準備し、人が訪問して関係を築く',
      },
    ],
    accent: '#9ee0a8',
  },
  {
    icon: '◉',
    step: 'Expansion',
    label: '事業を広げる',
    desc: '生まれた利益と時間を、\n次の収益の柱に振り向ける。',
    bullets: [
      {
        title: '新製品ラインの開発',
        sub: 'EC・店舗で得た顧客解像度を活かし、自社ブランドの粗利率を底上げ',
      },
      {
        title: '新規事業への拡大',
        sub: 'OEM 3社依存から脱却し、中長期で稼ぐ事業ポートフォリオへ',
      },
    ],
    accent: '#ffaacc',
  },
];

export default function Slide18GrowthCycle() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-10 md:gap-12 w-full max-w-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 見出し */}
        <div className="flex flex-col gap-2 shrink-0">
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            時間を創り、再投資し、
            <span
              className="bg-clip-text text-transparent ml-1"
              style={{ backgroundImage: 'linear-gradient(90deg, #88bbff 0%, #9ee0a8 50%, #ffaacc 100%)' }}
            >
              成長領域へ広げる 3 ステップ
            </span>
          </h2>
        </div>

        {/* ステージ */}
        <div className="relative">
          {/* 接続線（PC のみ表示） */}
          <div className="absolute hidden md:block left-[12%] right-[12%] top-[64px] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 relative">
            {STAGES.map((s, i) => (
              <motion.div
                key={s.step}
                className="relative flex flex-col items-start gap-3 p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.1 + i * 0.14,
                  ease: 'easeOut',
                }}
              >
                {/* アイコン円 */}
                <div
                  className="relative w-12 h-12 rounded-full flex items-center justify-center text-2xl font-light"
                  style={{
                    background: `${s.accent}22`,
                    border: `1px solid ${s.accent}66`,
                    color: s.accent,
                    boxShadow: `0 0 18px ${s.accent}44`,
                  }}
                >
                  {s.icon}
                  {/* パルスリング — 振幅・速度ともに控えめに調整 */}
                  <motion.span
                    className="absolute inset-0 rounded-full border pointer-events-none"
                    style={{ borderColor: s.accent }}
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: [1, 1.35, 1], opacity: [0, 0.25, 0] }}
                    transition={{
                      duration: 4.8,
                      repeat: Infinity,
                      delay: 0.6 + i * 0.6,
                      ease: 'easeInOut',
                    }}
                  />
                </div>

                {/* ステップ番号 */}
                <span
                  className="text-[10px] font-mono tabular-nums tracking-widest"
                  style={{ color: s.accent }}
                >
                  STEP {String(i + 1).padStart(2, '0')} · {s.step.toUpperCase()}
                </span>

                {/* ラベル */}
                <h3 className="text-lg md:text-xl font-semibold text-white tracking-tight">
                  {s.label}
                </h3>

                {/* 説明 */}
                <p className="text-xs md:text-sm text-white/55 leading-relaxed whitespace-pre-line">
                  {s.desc}
                </p>

                {/* セパレータ */}
                <div className="w-full h-px mt-1" style={{ background: `${s.accent}22` }} />

                {/* バレット 2 つ */}
                <div className="flex flex-col gap-2.5 w-full">
                  {s.bullets.map((b, bi) => (
                    <motion.div
                      key={b.title}
                      className="flex flex-col gap-0.5"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.4 + i * 0.14 + bi * 0.08,
                        ease: 'easeOut',
                      }}
                    >
                      <div className="flex items-start gap-2">
                        <span
                          className="shrink-0 mt-[6px] rounded-sm"
                          style={{
                            width: 6,
                            height: 6,
                            background: s.accent,
                            boxShadow: `0 0 8px ${s.accent}88`,
                          }}
                        />
                        <p className="text-sm font-bold text-white/95 leading-snug">
                          {b.title}
                        </p>
                      </div>
                      <p className="text-[11.5px] md:text-xs text-white/55 leading-snug pl-[14px]">
                        {b.sub}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* 次への矢印（最後を除く） */}
                {i < STAGES.length - 1 && (
                  <div
                    className="hidden md:block absolute -right-4 top-9 text-xl pointer-events-none"
                    style={{ color: `${STAGES[i + 1].accent}cc` }}
                  >
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* フッター */}
        <p className="text-xs text-white/30 tracking-wider">
          ※ 足元の効率化 → 人にしかできない動き → 中長期の成長 を、同じ年度内に回す。
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
