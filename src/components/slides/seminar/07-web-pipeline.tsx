'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

type Step = {
  badge: string;
  title: string;
  desc: string;
  accent: string;
  note?: string;
  Icon: React.FC<{ color: string }>;
};

// ── SVG アイコン ──────────────────────────────────────────────

const IconBarChart: React.FC<{ color: string }> = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6"  y1="20" x2="6"  y2="14" />
    <line x1="2"  y1="20" x2="22" y2="20" />
  </svg>
);

const IconSearch: React.FC<{ color: string }> = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconLayout: React.FC<{ color: string }> = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);

const IconDatabase: React.FC<{ color: string }> = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const IconSend: React.FC<{ color: string }> = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const STEPS: Step[] = [
  {
    badge: '01',
    title: 'Webサイトの\nデータ分析',
    desc: 'GA4・GSCのアクセスログ、検索クエリ、直帰率などをAIに読み込ませ、現状のボトルネックを把握。',
    accent: '#88bbff',
    Icon: IconBarChart,
  },
  {
    badge: '02',
    title: '市場ニーズの\n分析',
    desc: '競合サイト・SNS・検索トレンドをAIが横断調査。ターゲット層が求めるキーワードと話題を特定。',
    accent: '#c8a8ff',
    Icon: IconSearch,
  },
  {
    badge: '03',
    title: 'コンテンツ\nフレームワーク提案',
    desc: 'データを基にAIが記事構成・タイトル案・見出しを自動生成。SEO最適化された骨格を一括提案。',
    accent: '#ffaacc',
    Icon: IconLayout,
  },
  {
    badge: '04',
    title: 'データ整形',
    desc: '生成した文章・画像・メタ情報をCMS投稿用のフォーマットに変換・整形。公開前の最終調整も自動化。',
    accent: '#f7c46c',
    Icon: IconDatabase,
  },
  {
    badge: '05',
    title: 'コンテンツ\n投稿',
    desc: 'MCPでCMSと接続し、記事の新規作成・更新・タグ付けまで自動実行。投稿作業はゼロに。',
    accent: '#9ee0a8',
    note: 'CMS投稿はMCPで自動',
    Icon: IconSend,
  },
];

const STEP_MS = 1800;

export default function Slide07WebPipeline() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % (STEPS.length + 1));
    }, STEP_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col w-full h-full max-w-6xl px-2 py-5 pt-14 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        {/* ヘッダー */}
        <div className="shrink-0 flex flex-col gap-1">
          <span className="text-[10px] tracking-[0.22em] uppercase text-white/30">
            活用事例 · Webマーケティング
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
            Webマーケティング
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: 'linear-gradient(90deg, #88bbff 0%, #c8a8ff 60%, #ffaacc 100%)',
              }}
            >
              の参考例
            </span>
          </h2>
        </div>

        {/* パイプライン */}
        <div className="relative flex-1 flex flex-col justify-center">
          {/* ベースライン */}
          <div className="absolute left-[5.5%] right-[5.5%] top-[6.8rem] h-px bg-white/10" />
          {/* アクティブライン */}
          <motion.div
            className="absolute left-[5.5%] top-[6.8rem] h-px"
            style={{
              background: 'linear-gradient(90deg, #7B5EA7, #4F8EF7, #FF6B9D)',
              filter: 'drop-shadow(0 0 8px rgba(79,142,247,0.5))',
            }}
            animate={{
              width: `${Math.min(active, STEPS.length - 1) / (STEPS.length - 1) * 89}%`,
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />

          <div className="flex items-stretch justify-between gap-2">
            {STEPS.map((step, i) => {
              const isDone   = i < active;
              const isActive = i === active;
              const accent   = step.accent;

              return (
                <div key={step.badge} className="flex-1 flex flex-col items-center gap-4">
                  {/* Step ラベル */}
                  <motion.span
                    className="text-[10px] font-mono tracking-[0.2em] uppercase shrink-0"
                    animate={{
                      color: isActive ? accent : isDone ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    Step {step.badge}
                  </motion.span>

                  {/* サークルノード */}
                  <motion.div
                    className="relative w-20 h-20 rounded-full flex items-center justify-center z-10 shrink-0"
                    animate={{
                      background: isDone
                        ? 'linear-gradient(135deg, #7B5EA7, #4F8EF7)'
                        : isActive
                        ? `linear-gradient(135deg, ${accent}cc, ${accent}55)`
                        : 'rgba(20,22,38,0.85)',
                      borderColor: isDone || isActive ? 'transparent' : 'rgba(255,255,255,0.15)',
                      scale: isActive ? 1.1 : 1,
                    }}
                    style={{
                      border: '1px solid',
                      boxShadow: isActive
                        ? `0 0 35px ${accent}88`
                        : isDone
                        ? '0 0 20px rgba(123,94,167,0.35)'
                        : 'none',
                    }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  >
                    {isActive && (
                      <motion.span
                        className="absolute inset-0 rounded-full"
                        style={{ border: `1px solid ${accent}` }}
                        animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                      />
                    )}

                    {isDone ? (
                      <motion.svg width="24" height="24" viewBox="0 0 22 22" fill="none">
                        <motion.path
                          d="M5 11.5l4.2 4.2L17 8"
                          stroke="white"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                        />
                      </motion.svg>
                    ) : (
                      <step.Icon color={isActive ? accent : 'rgba(255,255,255,0.35)'} />
                    )}
                  </motion.div>

                  {/* テキスト */}
                  <div className="text-center px-1">
                    <motion.h3
                      className="text-sm font-bold tracking-tight leading-snug whitespace-pre-line min-h-[2.5rem] flex items-center justify-center"
                      animate={{
                        color: isActive
                          ? accent
                          : isDone
                          ? 'rgba(255,255,255,0.85)'
                          : 'rgba(255,255,255,0.4)',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.title}
                    </motion.h3>
                    <motion.p
                      className="text-[11px] mt-2 leading-relaxed"
                      animate={{
                        color: isActive
                          ? 'rgba(255,255,255,0.7)'
                          : isDone
                          ? 'rgba(255,255,255,0.45)'
                          : 'rgba(255,255,255,0.25)',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.desc}
                    </motion.p>
                    {/* MCPノート */}
                    {step.note && (
                      <motion.span
                        className="inline-block mt-2 px-2 py-0.5 rounded-full text-[9px] tracking-widest uppercase border"
                        style={{ borderColor: `${accent}55`, color: accent }}
                        animate={{ opacity: isActive ? 1 : 0.35 }}
                        transition={{ duration: 0.3 }}
                      >
                        {step.note}
                      </motion.span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* フッターノート */}
        <p className="shrink-0 text-xs text-white/30 tracking-wide text-center">
          データ分析からコンテンツ投稿まで、AIが自動でつなぐWebマーケティングフロー
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
