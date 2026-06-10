'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';
import { RelatedRuleLink } from '../../ui';

/**
 * p69: 5-2 出力情報 — HITL（人間による確認）
 *
 * 上部: 利用規約上の責任 + 出力の注意点3項目
 * 下部: 生成AIへの入力情報（プロンプト）構成図
 */

const OUTPUT_ACCENT = '#ff9966';
const OUTPUT_GRAD: [string, string] = ['#f17a45', '#c64823'];
const HIGHLIGHT_ACCENT = '#f7c46c';
const DIAGRAM_ROOT = '#c8a8ff';
const DIAGRAM_BRANCH = '#9ee0a8';
const DIAGRAM_LEAF = 'rgba(255,255,255,0.08)';

const CAUTIONS = [
  {
    label: 'ハルシネーション',
    desc: '生成AIの出力はあくまで統計的確率予測',
  },
  {
    label: 'サイコファンシー',
    desc: '認識しない内部プロンプトによる出力影響の可能性',
  },
  {
    label: 'データの偏り',
    desc: '生成AIは参照データの範囲内で出力する',
  },
] as const;

const PROMPT_COLUMNS = [
  {
    title: 'ユーザー入力',
    sub: 'テキストボックス',
    items: ['テキスト入力', 'ファイル・画像添付'],
  },
  {
    title: 'アプリ側の補完機能',
    sub: '文脈・記憶の補完',
    items: ['スレッド（文脈保持）', 'メモリ（スレッド横断）', 'カスタムインストラクション'],
  },
  {
    title: 'システムプロンプト',
    sub: '開発者・サービス側',
    items: ['モデルの内蔵設定（ガードレール等）', '開発者が設定するSP（カスタマイズ可）'],
  },
  {
    title: '外部ツール',
    sub: 'リアルタイム情報取得',
    items: ['web検索', 'MCP・API連携'],
  },
] as const;

function PromptInputDiagram() {
  return (
    <div className="relative w-full flex flex-col items-center gap-1.5 md:gap-2">
      {/* ルート */}
      <div
        className="px-3 py-1.5 rounded-lg border text-center font-bold leading-snug"
        style={{
          color: DIAGRAM_ROOT,
          borderColor: `${DIAGRAM_ROOT}66`,
          background: `${DIAGRAM_ROOT}18`,
          fontSize: 'clamp(10px, 0.88vw, 13px)',
        }}
      >
        生成AIへの入力情報（プロンプト）
      </div>

      {/* 接続線 */}
      <svg
        className="w-full max-w-4xl shrink-0"
        viewBox="0 0 800 28"
        preserveAspectRatio="none"
        aria-hidden
        style={{ height: 'clamp(14px, 1.4vw, 22px)' }}
      >
        <line x1="400" y1="0" x2="400" y2="10" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <line x1="100" y1="10" x2="700" y2="10" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        {[100, 300, 500, 700].map((x) => (
          <line key={x} x1={x} y1="10" x2={x} y2="28" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        ))}
      </svg>

      {/* 4列 */}
      <div className="grid grid-cols-4 gap-2.5 md:gap-3.5 w-full">
        {PROMPT_COLUMNS.map((col, i) => (
          <motion.div
            key={col.title}
            className="flex flex-col gap-2 min-w-0"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
          >
            <div
              className="px-2 py-2 rounded-md border text-center"
              style={{
                borderColor: `${DIAGRAM_BRANCH}55`,
                background: `${DIAGRAM_BRANCH}14`,
              }}
            >
              <p
                className="font-bold leading-tight"
                style={{ color: DIAGRAM_BRANCH, fontSize: 'clamp(10px, 0.92vw, 13px)' }}
              >
                {col.title}
              </p>
              <p
                className="text-white/45 leading-tight mt-1"
                style={{ fontSize: 'clamp(10px, 0.82vw, 11px)' }}
              >
                {col.sub}
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              {col.items.map((item) => (
                <div
                  key={item}
                  className="px-2 py-1.5 rounded border text-center leading-snug text-white/75"
                  style={{
                    borderColor: 'rgba(255,255,255,0.12)',
                    background: DIAGRAM_LEAF,
                    fontSize: 'clamp(11px, 1.02vw, 13px)',
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Slide69HitlHumanReview() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-2.5 md:gap-3 w-full max-w-6xl h-full justify-center py-4 md:py-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* ヘッダー */}
        <div className="flex flex-col gap-1 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(10px, 0.95vw, 13px)' }}
          >
            5-2 · 出力情報 · HITL
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(22px, 2.3vw, 36px)' }}
          >
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${OUTPUT_GRAD[0]} 0%, ${OUTPUT_GRAD[1]} 100%)`,
              }}
            >
              HITL
            </span>
            <span className="text-white/90 ml-2">（人間による確認）</span>
          </h2>
          <div className="flex flex-wrap gap-2 pt-1">
            <RelatedRuleLink
              targetId="22-risk-practice"
              label="関連: RBA実践例（名刺管理MCP）"
              accent="#ffaacc"
            />
          </div>
        </div>

        {/* 責任 + 注意点 */}
        <motion.div
          className="flex flex-col gap-2 shrink-0 px-3 py-2.5 md:px-4 md:py-3 rounded-xl border"
          style={{
            borderColor: `${OUTPUT_ACCENT}44`,
            background: `linear-gradient(160deg, ${OUTPUT_ACCENT}0a 0%, rgba(255,255,255,0.02) 100%)`,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          <p
            className="text-white/85 leading-relaxed"
            style={{ fontSize: 'clamp(13px, 1.05vw, 16px)' }}
          >
            各生成AI利用規約では、
            <span style={{ color: HIGHLIGHT_ACCENT, fontWeight: 700 }}>
              出力の利用はユーザーの責任
            </span>
            とされている
          </p>

          <div className="h-px bg-white/10" />

          <p
            className="font-bold text-white/70 tracking-wide"
            style={{ fontSize: 'clamp(11px, 0.95vw, 13px)' }}
          >
            【生成AIの出力に関する注意点】
          </p>

          <ul className="flex flex-col gap-1.5">
            {CAUTIONS.map((item, i) => (
              <motion.li
                key={item.label}
                className="flex items-baseline gap-2 leading-snug"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.15 + i * 0.06 }}
              >
                <span
                  className="shrink-0 font-semibold"
                  style={{ color: HIGHLIGHT_ACCENT, fontSize: 'clamp(11px, 0.95vw, 13px)' }}
                >
                  {item.label}：
                </span>
                <span
                  className="text-white/75"
                  style={{ fontSize: 'clamp(11px, 0.95vw, 13px)' }}
                >
                  {item.desc}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* プロンプト構成図 */}
        <motion.div
          className="shrink-0 px-2 py-2 md:px-3 md:py-2.5 rounded-xl border border-white/10 bg-white/[0.02]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
        >
          <PromptInputDiagram />
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
