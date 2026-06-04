'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p56: 4-4 個人情報 — 利用目的の考え方 × 生成AIに入れると受ける影響
 *
 * メッセージは2つに絞る:
 *   ①「利用目的」とは何か（法17条 → 法18条 の流れ・粒度）
 *   ② 個人情報を生成AIに入れると、当初の利用目的との関係でどんな影響が生じるか
 */

const LAW_ACCENT = '#60a5fa';
const AI_ACCENT = '#f7c46c';
const HIGHLIGHT = '#88bbff';

const PURPOSE_POINTS = [
  {
    badge: '法17条',
    label: 'できる限り特定',
    desc: '個人情報を取り扱う目的を「できる限り特定」する義務。粒度は本人が「自分の情報がどう使われるか」を想像できる水準。',
  },
  {
    badge: '粒度',
    label: '最終目的レベルでOK',
    desc: '取扱過程ごと（受領→保管→分析…）まで分ける必要はなく、達成すべき最終目的を示せば足りる。',
  },
  {
    badge: '法18条',
    label: '範囲外利用は禁止',
    desc: '特定した利用目的の達成に必要な範囲を超えた取扱いは原則禁止。範囲を超える利用には本人同意が必要。',
  },
  {
    badge: '例外',
    label: '本人の想定外利用は具体化',
    desc: 'プロファイリング・顔認証等、本人が最終目的から予想できない利用は、目的として具体化して示す必要がある。',
  },
] as const;

const AI_IMPACTS = [
  {
    badge: '①',
    title: '入力行為そのものが目的審査の対象',
    desc: '個人データを生成AIに入力する行為が、当初特定した利用目的の達成に必要な範囲か — まずここを再点検する。',
    color: AI_ACCENT,
  },
  {
    badge: '②',
    title: '学習利用される設定では「別目的」が発生',
    desc: '応答結果の出力以外の用途（モデル学習等）で扱われると、当初目的の範囲外利用＝法18条違反のおそれ。',
    color: '#ff9966',
  },
  {
    badge: '③',
    title: 'プロファイリングは利用目的のアップデートが必要',
    desc: '生成AI活用との接続で重要度が増している論点。趣味・嗜好・属性・行動傾向の推定（プロファイリング）を行う場合は、当初の利用目的を更新して明示する必要がある。',
    color: HIGHLIGHT,
  },
] as const;

function PurposePointRow({
  point,
  index,
}: {
  point: (typeof PURPOSE_POINTS)[number];
  index: number;
}) {
  return (
    <motion.div
      className="flex items-start gap-2.5"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.15 + index * 0.06 }}
    >
      <span
        className="shrink-0 font-mono tracking-wider font-bold px-1.5 py-0.5 rounded border leading-none"
        style={{
          color: LAW_ACCENT,
          borderColor: `${LAW_ACCENT}66`,
          background: `${LAW_ACCENT}14`,
          fontSize: 'clamp(10px, 0.78vw, 11px)',
          minWidth: '4.2rem',
          textAlign: 'center',
        }}
      >
        {point.badge}
      </span>
      <div className="flex flex-col gap-0.5 min-w-0">
        <p
          className="font-bold text-white leading-snug"
          style={{ fontSize: 'clamp(13px, 1.02vw, 15px)' }}
        >
          {point.label}
        </p>
        <p
          className="text-white/65 leading-snug"
          style={{ fontSize: 'clamp(11px, 0.9vw, 12.5px)' }}
        >
          {point.desc}
        </p>
      </div>
    </motion.div>
  );
}

function AiImpactCard({
  impact,
  index,
}: {
  impact: (typeof AI_IMPACTS)[number];
  index: number;
}) {
  return (
    <motion.div
      className="relative flex flex-col gap-1 px-3 py-2 rounded-lg border overflow-hidden"
      style={{
        borderColor: `${impact.color}44`,
        background: `linear-gradient(135deg, ${impact.color}12 0%, rgba(255,255,255,0.02) 100%)`,
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 + index * 0.07 }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: impact.color, boxShadow: `0 0 10px ${impact.color}66` }}
      />
      <div className="flex items-baseline gap-2 pl-1.5">
        <span
          className="shrink-0 font-mono font-bold leading-none"
          style={{ color: impact.color, fontSize: 'clamp(13px, 1.05vw, 16px)' }}
        >
          {impact.badge}
        </span>
        <h3
          className="font-bold text-white leading-snug"
          style={{ fontSize: 'clamp(12px, 1.02vw, 14.5px)' }}
        >
          {impact.title}
        </h3>
      </div>
      <p
        className="pl-1.5 text-white/68 leading-snug"
        style={{ fontSize: 'clamp(11px, 0.9vw, 12.5px)' }}
      >
        {impact.desc}
      </p>
    </motion.div>
  );
}

export default function Slide56PipActGenaiArticles() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-4 md:gap-5 w-full max-w-6xl py-6 md:py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-1.5 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(10px, 0.9vw, 12px)' }}
          >
            4-4 · 個人情報 · 利用目的
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(20px, 2.3vw, 34px)' }}
          >
            利用目的の考え方と
            <span
              className="bg-clip-text text-transparent mx-1.5"
              style={{
                backgroundImage: `linear-gradient(90deg, ${LAW_ACCENT} 0%, ${AI_ACCENT} 100%)`,
              }}
            >
              生成AIに入れると受ける影響
            </span>
          </h2>
          <p
            className="text-white/50 leading-snug"
            style={{ fontSize: 'clamp(11px, 0.92vw, 13px)' }}
          >
            「生成AIに入れる」のは新規行為ではなく、既存の利用目的の範囲内に収まるか — をまず点検する話
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 items-stretch">
          {/* LEFT: 利用目的の考え方 */}
          <motion.div
            className="flex flex-col gap-3 p-3.5 md:p-4 rounded-2xl border"
            style={{
              borderColor: `${LAW_ACCENT}55`,
              background: `linear-gradient(160deg, ${LAW_ACCENT}10 0%, rgba(255,255,255,0.02) 100%)`,
            }}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <div className="flex items-center gap-2 shrink-0">
              <span
                className="font-mono tracking-[0.18em] uppercase font-bold px-1.5 py-0.5 rounded border"
                style={{
                  color: LAW_ACCENT,
                  borderColor: `${LAW_ACCENT}88`,
                  background: `${LAW_ACCENT}1c`,
                  fontSize: 'clamp(10px, 0.72vw, 10.5px)',
                }}
              >
                PART 1
              </span>
              <h3
                className="font-bold text-white tracking-tight"
                style={{ fontSize: 'clamp(15px, 1.3vw, 19px)' }}
              >
                「利用目的」の考え方
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              {PURPOSE_POINTS.map((p, i) => (
                <PurposePointRow key={p.badge} point={p} index={i} />
              ))}
            </div>
          </motion.div>

          {/* RIGHT: 生成AIに入れると受ける影響 */}
          <motion.div
            className="flex flex-col gap-3 p-3.5 md:p-4 rounded-2xl border"
            style={{
              borderColor: `${AI_ACCENT}55`,
              background: `linear-gradient(160deg, ${AI_ACCENT}10 0%, rgba(255,255,255,0.02) 100%)`,
              boxShadow: `0 0 32px -12px ${AI_ACCENT}44`,
            }}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="flex items-center gap-2 shrink-0">
              <span
                className="font-mono tracking-[0.18em] uppercase font-bold px-1.5 py-0.5 rounded border"
                style={{
                  color: AI_ACCENT,
                  borderColor: `${AI_ACCENT}88`,
                  background: `${AI_ACCENT}1c`,
                  fontSize: 'clamp(10px, 0.72vw, 10.5px)',
                }}
              >
                PART 2
              </span>
              <h3
                className="font-bold text-white tracking-tight"
                style={{ fontSize: 'clamp(15px, 1.3vw, 19px)' }}
              >
                生成AIに入れると受ける影響
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              {AI_IMPACTS.map((a, i) => (
                <AiImpactCard key={a.badge} impact={a} index={i} />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.p
          className="text-center text-white/55 leading-snug shrink-0"
          style={{ fontSize: 'clamp(11px, 0.95vw, 13px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.85 }}
        >
          生成AIに入れる前に、<span className="text-white/85 font-semibold">当初の利用目的を再点検</span>し、
          学習設定やプロファイリングの有無に応じて
          <span className="text-white/85 font-semibold">利用目的の更新</span>
          も検討する。
        </motion.p>
      </motion.div>
    </SlideWrapper>
  );
}
