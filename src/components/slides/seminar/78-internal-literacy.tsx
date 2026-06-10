'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * 7-2 社内リテラシー向上 — 規程を「機能させる」土台
 *
 * これまでの内容を統合:
 *   - 知識: 関連法令（個情法28条 / 著作権法30の4 / 不競法2条6項 ...）と
 *           各事業者規約改訂への追随（p77 規程の見直し）
 *   - 判断: リスクベースアプローチ（Chapter 02 前編）、
 *           HITL / 認識の無い著作物（Section 05 出力情報）、
 *           思考の放棄 / サイコファンシー / バイアス / AIディバイド
 *           （Chapter 02 前編 AI事業者ガイドライン基本理念）
 *   - 行動: 入力前セルフチェック・出力審査・ログ運用・違反時通報
 */

const LAW_ACCENT = '#60a5fa';
const JUDGE_ACCENT = '#f7c46c';
const ACT_ACCENT = '#9ee0a8';
const GOVERN_ACCENT = '#ff7aa8';

const LAYERS = [
  {
    num: '01',
    en: 'Know',
    jp: '知識',
    accent: LAW_ACCENT,
    items: [
      '関連法令の基礎（個情法・著作権法・不競法）',
      '社内規程・主要事業者規約（OpenAI／Anthropic／Google）',
      '改訂・主要リスクへの追随',
    ],
    insight: '規程理解なしに運用は始まらない',
  },
  {
    num: '02',
    en: 'Judge',
    jp: '判断',
    accent: JUDGE_ACCENT,
    items: [
      'リスクベースアプローチを自分で回せる',
      'HITL — 出力を疑い、依拠性・正確性を点検',
      '思考の放棄 / サイコファンシー / バイアスを意識',
    ],
    insight: '判断は個々人にしかできない',
  },
  {
    num: '03',
    en: 'Act',
    jp: '行動',
    accent: ACT_ACCENT,
    items: [
      '入力前のセルフチェックを徹底',
      '社内審査ルートとHITLを実際に通す',
      '違反・ヒヤリハットを通報／ログに残す',
    ],
    insight: '行動できなければ知識も判断も無意味',
  },
] as const;

const IDEALS = [
  { label: '人間の尊厳', accent: LAW_ACCENT },
  { label: '多様性・包摂', accent: '#c8a8ff' },
  { label: '持続可能性', accent: ACT_ACCENT },
];

function LayerCard({
  layer,
  index,
}: {
  layer: (typeof LAYERS)[number];
  index: number;
}) {
  return (
    <motion.div
      className="flex flex-col gap-3 p-4 md:p-5 rounded-2xl border h-full"
      style={{
        borderColor: `${layer.accent}55`,
        background: `linear-gradient(160deg, ${layer.accent}14 0%, rgba(255,255,255,0.02) 100%)`,
        boxShadow: `0 0 32px -12px ${layer.accent}33`,
      }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.12 + index * 0.1 }}
    >
      <div className="flex items-baseline gap-3">
        <span
          className="font-mono font-bold tracking-tight"
          style={{ color: layer.accent, fontSize: 'clamp(28px, 2.8vw, 40px)' }}
        >
          {layer.num}
        </span>
        <div className="flex flex-col leading-none gap-1">
          <span
            className="tracking-[0.22em] uppercase font-semibold"
            style={{ color: `${layer.accent}cc`, fontSize: 'clamp(10px, 0.85vw, 12px)' }}
          >
            {layer.en}
          </span>
          <span
            className="font-bold text-white tracking-tight"
            style={{ fontSize: 'clamp(18px, 1.6vw, 24px)' }}
          >
            {layer.jp}
          </span>
        </div>
      </div>

      <div
        className="h-px"
        style={{ background: `linear-gradient(90deg, ${layer.accent}66, transparent)` }}
      />

      <ul className="flex flex-col gap-1.5">
        {layer.items.map((item, i) => (
          <motion.li
            key={item}
            className="flex items-start gap-2 leading-snug"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.25 + index * 0.1 + i * 0.05 }}
          >
            <span
              className="shrink-0 mt-1.5 w-1 h-1 rounded-full"
              style={{ background: layer.accent }}
            />
            <span
              className="text-white/80"
              style={{ fontSize: 'clamp(13px, 1.02vw, 15px)' }}
            >
              {item}
            </span>
          </motion.li>
        ))}
      </ul>

      <div
        className="mt-auto pt-2.5 border-t"
        style={{ borderColor: `${layer.accent}33` }}
      >
        <p
          className="font-semibold leading-snug"
          style={{ color: layer.accent, fontSize: 'clamp(13px, 1.02vw, 15px)' }}
        >
          {layer.insight}
        </p>
      </div>
    </motion.div>
  );
}

export default function Slide78InternalLiteracy() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-5 md:gap-6 w-full max-w-6xl py-6 md:py-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <div className="flex flex-col gap-1.5 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(10px, 0.85vw, 11px)' }}
          >
            7-3 · ガバナンス · 社内リテラシー
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(20px, 2.4vw, 34px)' }}
          >
            規程を
            <span
              className="bg-clip-text text-transparent mx-1.5"
              style={{
                backgroundImage: `linear-gradient(90deg, ${LAW_ACCENT} 0%, ${JUDGE_ACCENT} 50%, ${ACT_ACCENT} 100%)`,
              }}
            >
              機能させる
            </span>
            のは、自走できる社員
          </h2>
          <p
            className="text-white/50"
            style={{ fontSize: 'clamp(11px, 0.95vw, 13px)' }}
          >
            規程は書いて終わりではない — 「知る・判断する・動ける」3層を育てる
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 items-stretch">
          {LAYERS.map((layer, i) => (
            <LayerCard key={layer.num} layer={layer} index={i} />
          ))}
        </div>

        <motion.div
          className="flex flex-col gap-2 p-3.5 md:p-4 rounded-2xl border shrink-0"
          style={{
            borderColor: `${GOVERN_ACCENT}40`,
            background: `linear-gradient(135deg, ${GOVERN_ACCENT}10 0%, rgba(255,255,255,0.02) 100%)`,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="flex items-center gap-2">
            <span
              className="tracking-[0.2em] uppercase font-semibold"
              style={{ color: GOVERN_ACCENT, fontSize: 'clamp(10px, 0.78vw, 11px)' }}
            >
              基本理念 × リテラシー
            </span>
            <div className="flex-1 h-px" style={{ background: `${GOVERN_ACCENT}33` }} />
          </div>
          <p
            className="text-white/80 leading-snug"
            style={{ fontSize: 'clamp(11.5px, 1.05vw, 14px)' }}
          >
            <span className="text-white font-semibold">AI事業者ガイドライン</span>の基本理念
            <span className="inline-flex flex-wrap items-center gap-1.5 mx-1.5">
              {IDEALS.map((ideal) => (
                <span
                  key={ideal.label}
                  className="px-2 py-0.5 rounded font-semibold"
                  style={{
                    color: ideal.accent,
                    background: `${ideal.accent}18`,
                    border: `1px solid ${ideal.accent}44`,
                    fontSize: 'clamp(10px, 0.88vw, 12px)',
                  }}
                >
                  {ideal.label}
                </span>
              ))}
            </span>
            を <span className="text-white font-semibold">日々の判断と行動に落とす</span>
            のが、社内リテラシー向上の到達点。
          </p>
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
