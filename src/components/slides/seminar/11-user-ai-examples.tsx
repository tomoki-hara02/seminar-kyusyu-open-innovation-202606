'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

type Scene = {
  no: string;
  when: string;
  title: string;
  prompt: string;
  outcome: string[];
  accent: string;
};

const SCENES: Scene[] = [
  {
    no: '01',
    when: 'セミナーの帰り道',
    title: '名刺をまとめて登録',
    prompt:
      '今日のセミナーで〇〇株式会社の田中部長と名刺交換した。AI法務に興味ありで、来週フォロー予定。',
    outcome: [
      '会社 / 連絡先 / 活動記録 を一括登録',
      '重複チェック → 既存企業は紐付け',
      '次回フォロー予定日も自動セット',
    ],
    accent: '#88bbff',
  },
  {
    no: '02',
    when: '月曜の朝',
    title: 'フォロー漏れを潰す',
    prompt: '今週フォローすべき人を教えて。',
    outcome: [
      '温度感 hot / warm × 期日 で抽出',
      '優先順に並べて一覧表示',
      '「連絡し忘れ」を仕組みで防ぐ',
    ],
    accent: '#c8a8ff',
  },
  {
    no: '03',
    when: '商談直後',
    title: '記録 → 状態更新を1発',
    prompt:
      'さっき山田社長とMTG。AI規程の件で来週提案書を送る。関係性は prospect に更新して。',
    outcome: [
      '活動記録を追加',
      '連絡先のステータスを更新',
      '次のアクションを登録',
    ],
    accent: '#9ee0a8',
  },
];

const IconClaude: React.FC<{ color: string }> = ({ color }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const IconPlug: React.FC<{ color: string }> = ({ color }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 2v6" />
    <path d="M15 2v6" />
    <path d="M6 8h12v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8z" />
    <path d="M12 17v5" />
  </svg>
);

const IconDb: React.FC<{ color: string }> = ({ color }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const IconMic: React.FC<{ color: string }> = ({ color }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const STACK = [
  { label: 'Claude', sub: '自然言語の入口', Icon: IconClaude, color: '#c8a8ff' },
  { label: 'MCP Server', sub: 'AIに「手」を生やす', Icon: IconPlug, color: '#88bbff' },
  { label: 'Firestore', sub: 'クラウドDB', Icon: IconDb, color: '#9ee0a8' },
];

const DATA_LAYERS = [
  { jp: '企業', en: 'Company' },
  { jp: '連絡先', en: 'Contact' },
  { jp: '活動記録', en: 'Activity' },
];

/**
 * p11: tAiL. CRM × MCP × Claude — 弁護士1人で運用する顧客管理
 *
 * 構成:
 *   - ヘッダー: タイトル + 「Claude × MCP × Firestore」
 *   - 左カラム: 3層スタック + 3層データモデル
 *   - 右カラム: 3つのシーン（音声入力 → 自動化結果）
 *   - フッター: 「話すだけで完結 = 入力ハードルがほぼゼロ」
 */
export default function Slide11UserAiExamples() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col w-full h-full max-w-6xl px-2 py-5 pt-14 gap-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        {/* ── ヘッダー ── */}
        <div className="shrink-0 flex items-end justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] tracking-[0.22em] uppercase text-white/30">
              User Case · tAiL. 法律事務所 ／ CRM
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
              Claude に話しかけるだけで
              <span
                className="bg-clip-text text-transparent ml-2"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, #88bbff 0%, #c8a8ff 50%, #ffaacc 100%)',
                }}
              >
                人脈を管理する
              </span>
            </h2>
          </div>
          <div className="hidden md:flex shrink-0 items-center gap-2 text-[11px] tracking-[0.16em] text-white/45 pb-1">
            <span className="text-white/30">stack</span>
            <span className="text-[#c8a8ff]">Claude</span>
            <span className="text-white/20">×</span>
            <span className="text-[#88bbff]">MCP</span>
            <span className="text-white/20">×</span>
            <span className="text-[#9ee0a8]">Firestore</span>
          </div>
        </div>

        {/* ── メイン: 左(構成) + 右(3シーン) を1つの枠に統合 ── */}
        <motion.div
          className="flex flex-1 min-h-0 rounded-2xl border border-white/15 overflow-hidden"
          style={{
            background:
              'linear-gradient(160deg, rgba(200,168,255,0.08) 0%, rgba(15,20,40,0.55) 100%)',
            boxShadow: '0 30px 60px -28px rgba(0,0,0,0.6)',
          }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {/* 左カラム: アーキテクチャ + データモデル */}
          <div className="w-[270px] shrink-0 flex flex-col gap-4 p-5">
            {/* 3層スタック */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] tracking-[0.22em] uppercase text-white/35">
                System
              </span>
              <div className="flex flex-col gap-1.5">
                {STACK.map((s, i) => (
                  <React.Fragment key={s.label}>
                    <div
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg border"
                      style={{
                        borderColor: `${s.color}55`,
                        background: `${s.color}14`,
                      }}
                    >
                      <div
                        className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                        style={{ background: `${s.color}26` }}
                      >
                        <s.Icon color={s.color} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span
                          className="text-[13px] font-semibold leading-tight"
                          style={{ color: s.color }}
                        >
                          {s.label}
                        </span>
                        <span className="text-[10px] text-white/45 leading-tight">
                          {s.sub}
                        </span>
                      </div>
                    </div>
                    {i < STACK.length - 1 && (
                      <div className="flex justify-center text-white/30 text-xs leading-none">
                        ↕
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="h-px w-full bg-white/10" />

            {/* データモデル（3層） */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] tracking-[0.22em] uppercase text-white/35">
                Data Model
              </span>
              <div className="flex flex-col gap-1.5 font-mono">
                {DATA_LAYERS.map((d, i) => (
                  <div
                    key={d.en}
                    className="flex items-baseline gap-2 text-[12px]"
                    style={{ paddingLeft: `${i * 14}px` }}
                  >
                    {i > 0 && (
                      <span className="text-white/30 select-none">└</span>
                    )}
                    <span className="text-white/85 font-semibold tracking-wide">
                      {d.jp}
                    </span>
                    <span className="text-[10px] text-white/35 tracking-wide">
                      {d.en}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[10.5px] text-white/40 leading-relaxed">
                会社 → 人 → 活動 の3層に紐づけて蓄積。
                必要な情報がバラけず、AIから検索しやすい構造。
              </p>
            </div>
          </div>

          {/* 縦の仕切り */}
          <div className="w-px bg-white/15 shrink-0" />

          {/* 右カラム: 3シーン（厚みのあるレイアウト） */}
          <div className="flex-1 flex flex-col gap-3 p-5 min-h-0">
            <div className="flex items-center justify-between shrink-0">
              <span className="text-[10px] tracking-[0.22em] uppercase text-white/40">
                3 Scenes · 自然言語で完結
              </span>
              <span className="text-[10px] tracking-[0.16em] text-white/30">
                voice / chat → Claude → Firestore
              </span>
            </div>

            <div className="flex-1 flex flex-col gap-3 min-h-0">
              {SCENES.map((s, i) => (
                <motion.div
                  key={s.no}
                  className="relative grid grid-cols-[58px_minmax(0,1.15fr)_minmax(0,1fr)] gap-4 rounded-xl p-4 flex-1 min-h-0"
                  style={{
                    background: `linear-gradient(135deg, ${s.accent}1c 0%, rgba(15,20,40,0.55) 75%)`,
                    border: `1px solid ${s.accent}38`,
                    boxShadow: `0 18px 38px -22px ${s.accent}66`,
                  }}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                >
                  {/* No バッジ + when */}
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <span
                      className="text-2xl font-extrabold leading-none tabular-nums"
                      style={{ color: s.accent }}
                    >
                      {s.no}
                    </span>
                    <span className="text-[9.5px] tracking-[0.12em] text-white/45 text-center leading-tight">
                      {s.when}
                    </span>
                  </div>

                  {/* 中: タイトル + 音声プロンプト */}
                  <div className="flex flex-col gap-2 min-w-0 justify-center">
                    <span
                      className="text-[14px] font-bold leading-tight"
                      style={{ color: s.accent }}
                    >
                      {s.title}
                    </span>
                    <div
                      className="flex items-start gap-2 px-3 py-2 rounded-lg border"
                      style={{
                        borderColor: `${s.accent}60`,
                        background: 'rgba(0,0,0,0.32)',
                      }}
                    >
                      <span className="shrink-0 mt-[3px]">
                        <IconMic color={s.accent} />
                      </span>
                      <p className="text-[12.5px] text-white/90 leading-snug">
                        {s.prompt}
                      </p>
                    </div>
                  </div>

                  {/* 右: 自動化される結果 */}
                  <div className="flex flex-col gap-1.5 justify-center min-w-0">
                    <span className="text-[9.5px] tracking-[0.18em] text-white/45 uppercase">
                      Claude が自動で
                    </span>
                    <ul className="flex flex-col gap-1.5">
                      {s.outcome.map((o) => (
                        <li
                          key={o}
                          className="flex items-start gap-2 text-[12.5px] text-white/85 leading-snug"
                        >
                          <span
                            className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: s.accent }}
                          />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── フッター ── */}
        <motion.p
          className="shrink-0 text-xs md:text-[13px] text-white/60 tracking-wide text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          専用アプリを開かず
          <span className="mx-1 text-white font-semibold">話すだけで完結</span>
          → 入力ハードルがほぼゼロ。
          <span className="ml-2 text-white/45">
            高額CRMでも自作Excelでもない、中小企業サイズの「使い続けられる」設計。
          </span>
        </motion.p>
      </motion.div>
    </SlideWrapper>
  );
}
