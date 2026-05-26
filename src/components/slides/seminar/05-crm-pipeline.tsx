'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

type Step = {
  badge: string;
  title: string;
  desc: string;
  accent: string;
  Icon: React.FC<{ color: string }>;
};

const IconCamera: React.FC<{ color: string }> = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const IconBrain: React.FC<{ color: string }> = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2a2.5 2.5 0 0 1 5 0v.5A2.5 2.5 0 0 1 12 5a2.5 2.5 0 0 1-2.5-2.5V2z" />
    <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6H8a4 4 0 0 1 4 4v8H7a3 3 0 0 1-3-3v-6.5z" />
    <path d="M20 8.5A2.5 2.5 0 0 0 17.5 6H16a4 4 0 0 0-4 4v8h5a3 3 0 0 0 3-3v-6.5z" />
    <path d="M8 18a4 4 0 0 0 8 0" />
    <path d="M6 11h2M16 11h2M9 15h.01M15 15h.01" />
  </svg>
);

const IconPlug: React.FC<{ color: string }> = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22v-5" />
    <path d="M9 8V2" />
    <path d="M15 8V2" />
    <path d="M18 8H6a1 1 0 0 0-1 1v4a5 5 0 0 0 10 0V9a1 1 0 0 0-1-1z" />
  </svg>
);

const IconEdit: React.FC<{ color: string }> = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const IconBarChart: React.FC<{ color: string }> = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6"  y1="20" x2="6"  y2="14" />
    <line x1="2"  y1="20" x2="22" y2="20" />
  </svg>
);

const STEPS: Step[] = [
  {
    badge: '01',
    title: '名刺をスマホで撮影',
    desc: 'スマホカメラで名刺を撮影するだけ。紙の名刺を手入力する手間がゼロに。',
    accent: '#88bbff',
    Icon: IconCamera,
  },
  {
    badge: '02',
    title: 'AIがOCR＋データ整形',
    desc: '生成AIが画像から氏名・会社名・連絡先を自動抽出し、データベース向けに整形。',
    accent: '#c8a8ff',
    Icon: IconBrain,
  },
  {
    badge: '03',
    title: '外部DBアプリに接続',
    desc: 'MCP経由で外部の顧客管理ツールやデータベースと自動接続。人手のコピペ不要。',
    accent: '#ffaacc',
    Icon: IconPlug,
  },
  {
    badge: '04',
    title: '情報を登録・更新',
    desc: '新規顧客は自動登録。既存顧客なら差分を検知して最新情報に更新。重複も防止。',
    accent: '#f7c46c',
    Icon: IconEdit,
  },
  {
    badge: '05',
    title: 'ダッシュボード作成',
    desc: '顧客データを可視化したダッシュボードを自動生成。営業状況をリアルタイムで把握。',
    accent: '#9ee0a8',
    Icon: IconBarChart,
  },
];

const STEP_MS = 1800;

export default function Slide05CrmPipeline() {
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
        className="flex flex-col w-full h-full max-w-6xl px-2 py-5 gap-6 pt-14"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        {/* ヘッダー */}
        <div className="shrink-0 flex flex-col gap-1">
          <span className="text-[10px] tracking-[0.22em] uppercase text-white/30">
            活用事例 · CRM
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
            顧客管理
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: 'linear-gradient(90deg, #88bbff 0%, #c8a8ff 60%, #ffaacc 100%)',
              }}
            >
              （CRM）
            </span>
            の参考例
          </h2>
        </div>

        {/* パイプライン */}
        <div className="relative flex-1 flex flex-col justify-center gap-0">
          {/* 接続ライン（ベース） */}
          <div className="absolute left-[5.5%] right-[5.5%] top-[6.8rem] h-px bg-white/10" />
          {/* 接続ライン（アクティブ） */}
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
              const accentColor = step.accent;

              return (
                <div key={step.badge} className="flex-1 flex flex-col items-center gap-4">
                  {/* Step ラベル（円の上） */}
                  <motion.span
                    className="text-[10px] font-mono tracking-[0.2em] uppercase shrink-0"
                    animate={{
                      color: isActive ? step.accent : isDone ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)',
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
                        ? `linear-gradient(135deg, ${accentColor}cc, ${accentColor}66)`
                        : 'rgba(20,22,38,0.85)',
                      borderColor: isDone || isActive ? 'transparent' : 'rgba(255,255,255,0.15)',
                      scale: isActive ? 1.1 : 1,
                    }}
                    style={{
                      border: '1px solid',
                      boxShadow: isActive
                        ? `0 0 35px ${accentColor}88`
                        : isDone
                        ? '0 0 20px rgba(123,94,167,0.35)'
                        : 'none',
                    }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  >
                    {isActive && (
                      <motion.span
                        className="absolute inset-0 rounded-full"
                        style={{ border: `1px solid ${accentColor}` }}
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
                      <step.Icon color={isActive ? step.accent : 'rgba(255,255,255,0.35)'} />
                    )}
                  </motion.div>

                  {/* テキスト */}
                  <div className="text-center px-1">
                    <motion.h3
                      className="text-sm font-bold tracking-tight leading-snug"
                      animate={{
                        color: isActive
                          ? accentColor
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* フッターノート */}
        <p className="shrink-0 text-xs text-white/30 tracking-wide text-center">
          名刺撮影からダッシュボード作成まで、AIが自動でつなぐ顧客管理フロー
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
