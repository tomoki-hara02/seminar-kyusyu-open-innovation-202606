'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';
import { RelatedRuleLink } from '../../ui';

/**
 * p22: リスクベースアプローチ — 実践例
 *
 * 名刺管理MCPサーバー設計 → zodバリデーション →
 * 懸念（技術面=ミスアライメント / 法令面=個人情報・守秘義務）→
 * RBAで検証（検討事項: ミスアライメント / 格納情報範囲、リスク対策: HITL / 入力情報範囲のルール化）→
 * 判断、のフローを示す。
 */

type FlowStep = {
  id: string;
  label: string;
  title: string;
  desc?: string;
  accent: string;
  variant?: 'default' | 'concern' | 'branch' | 'decision';
};

// 面の色（技術面 / 法令面）
const TECH_ACCENT = '#88bbff'; // 技術面
const LEGAL_ACCENT = '#c8a8ff'; // 法令面

const STEPS: FlowStep[] = [
  {
    id: 'design',
    label: 'Step 01',
    title: '名刺管理MCPサーバーの設計',
    accent: '#88bbff',
  },
  {
    id: 'zod',
    label: 'Step 02',
    title: 'zodでバリデーション強化',
    accent: '#c8a8ff',
  },
  {
    id: 'concern',
    label: '懸念事項',
    title: '技術面・法令面、2つの懸念',
    accent: '#f7c46c',
    variant: 'concern',
  },
  {
    id: 'risk',
    label: 'Step 03',
    title: 'リスクベースアプローチにてリスクを検証',
    accent: '#ffaacc',
    variant: 'branch',
  },
  {
    id: 'decision',
    label: 'Step 04',
    title: '判断',
    desc: '自社のリスク許容度に基づき、運用方針を確定',
    accent: '#9ee0a8',
    variant: 'decision',
  },
];

function Arrow({ delay }: { delay: number }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-0.5 py-0.5 shrink-0"
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
    >
      <div className="w-px h-3 bg-gradient-to-b from-white/15 to-white/35" />
      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
        <path d="M6 8L0 0h12L6 8z" fill="rgba(255,255,255,0.35)" />
      </svg>
    </motion.div>
  );
}

function StepCard({
  step,
  index,
  inView,
}: {
  step: FlowStep;
  index: number;
  inView: boolean;
}) {
  const isConcern = step.variant === 'concern';
  const isBranch = step.variant === 'branch';
  const isDecision = step.variant === 'decision';

  return (
    <motion.div
      className="flex flex-col w-full min-w-0"
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.15 + index * 0.1 }}
    >
      <div
        className={`flex flex-col gap-1.5 px-4 py-3 rounded-2xl border w-full min-w-0 ${
          isConcern ? 'border-dashed' : ''
        }`}
        style={{
          borderColor: `${step.accent}${isConcern ? '88' : '55'}`,
          background: isConcern
            ? `linear-gradient(135deg, ${step.accent}18 0%, rgba(255,85,96,0.06) 100%)`
            : `linear-gradient(135deg, ${step.accent}14 0%, rgba(255,255,255,0.02) 100%)`,
          boxShadow: isConcern ? `0 0 24px ${step.accent}22` : 'none',
        }}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="font-mono tracking-widest whitespace-nowrap shrink-0"
            style={{ color: step.accent, fontSize: 'clamp(10px, 0.85vw, 11px)' }}
          >
            {step.label}
          </span>
          {isConcern && (
            <span
              className="px-2 py-0.5 rounded-full font-bold whitespace-nowrap"
              style={{
                color: '#ff5560',
                background: '#ff556018',
                border: '1px solid #ff556055',
                fontSize: 'clamp(10px, 0.75vw, 11px)',
              }}
            >
              ⚠ 2つの側面
            </span>
          )}
        </div>

        <h3
          className="font-bold text-white leading-snug"
          style={{ fontSize: 'clamp(13px, 1.25vw, 17px)' }}
        >
          {step.title}
        </h3>

        {step.desc && (
          <p
            className="text-white/60 leading-snug"
            style={{ fontSize: 'clamp(13px, 1.05vw, 15px)' }}
          >
            {step.desc}
          </p>
        )}

        {isConcern && (
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div
              className="flex flex-col gap-0.5 p-2.5 rounded-xl border"
              style={{
                borderColor: `${TECH_ACCENT}66`,
                background: `linear-gradient(135deg, ${TECH_ACCENT}16 0%, ${TECH_ACCENT}04 100%)`,
              }}
            >
              <span
                className="font-mono tracking-wider"
                style={{ color: TECH_ACCENT, fontSize: 'clamp(10px, 0.75vw, 11px)' }}
              >
                技術面
              </span>
              <span
                className="font-bold text-white leading-snug"
                style={{ fontSize: 'clamp(13px, 1.05vw, 15px)' }}
              >
                ミスアライメント
              </span>
              <span
                className="text-white/55 leading-snug"
                style={{ fontSize: 'clamp(12px, 0.95vw, 13px)' }}
              >
                「登録して」を満たそうと、AIが重複チェックを回避して強行登録
              </span>
            </div>
            <div
              className="flex flex-col gap-0.5 p-2.5 rounded-xl border"
              style={{
                borderColor: `${LEGAL_ACCENT}66`,
                background: `linear-gradient(135deg, ${LEGAL_ACCENT}16 0%, ${LEGAL_ACCENT}04 100%)`,
              }}
            >
              <span
                className="font-mono tracking-wider"
                style={{ color: LEGAL_ACCENT, fontSize: 'clamp(10px, 0.75vw, 11px)' }}
              >
                法令面
              </span>
              <span
                className="font-bold text-white leading-snug"
                style={{ fontSize: 'clamp(13px, 1.05vw, 15px)' }}
              >
                個人情報 / 守秘義務
              </span>
              <span
                className="text-white/55 leading-snug"
                style={{ fontSize: 'clamp(12px, 0.95vw, 13px)' }}
              >
                名刺情報か相談情報か、格納する情報の性質に応じた義務
              </span>
            </div>
          </div>
        )}

        {isBranch && (
          <div className="flex flex-col gap-2.5 mt-1">
            {/* 検討事項 */}
            <div className="flex flex-col gap-1.5">
              <span
                className="font-mono tracking-wider text-white/45"
                style={{ fontSize: 'clamp(10px, 0.75vw, 11px)' }}
              >
                検討事項
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div
                  className="flex flex-col gap-0.5 p-2.5 rounded-xl border"
                  style={{
                    borderColor: `${TECH_ACCENT}66`,
                    background: `linear-gradient(135deg, ${TECH_ACCENT}14 0%, ${TECH_ACCENT}04 100%)`,
                  }}
                >
                  <span
                    className="font-mono tracking-wider"
                    style={{ color: TECH_ACCENT, fontSize: 'clamp(10px, 0.72vw, 11px)' }}
                  >
                    技術面
                  </span>
                  <span
                    className="font-bold text-white leading-snug"
                    style={{ fontSize: 'clamp(13px, 1.05vw, 15px)' }}
                  >
                    ミスアライメント
                  </span>
                  <span
                    className="text-white/50 leading-snug"
                    style={{ fontSize: 'clamp(12px, 0.95vw, 13px)' }}
                  >
                    強行登録の挙動が起こりうるか
                  </span>
                </div>
                <div
                  className="flex flex-col gap-0.5 p-2.5 rounded-xl border"
                  style={{
                    borderColor: `${LEGAL_ACCENT}66`,
                    background: `linear-gradient(135deg, ${LEGAL_ACCENT}14 0%, ${LEGAL_ACCENT}04 100%)`,
                  }}
                >
                  <span
                    className="font-mono tracking-wider"
                    style={{ color: LEGAL_ACCENT, fontSize: 'clamp(10px, 0.72vw, 11px)' }}
                  >
                    法令面
                  </span>
                  <span
                    className="font-bold text-white leading-snug"
                    style={{ fontSize: 'clamp(13px, 1.05vw, 15px)' }}
                  >
                    格納情報範囲
                  </span>
                  <span
                    className="text-white/50 leading-snug"
                    style={{ fontSize: 'clamp(12px, 0.95vw, 13px)' }}
                  >
                    名刺情報のみか、相談情報まで保存するか
                  </span>
                </div>
              </div>
            </div>

            {/* リスク対策 */}
            <div className="flex flex-col gap-1.5">
              <span
                className="font-mono tracking-wider text-white/45"
                style={{ fontSize: 'clamp(10px, 0.75vw, 11px)' }}
              >
                リスク対策
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div
                  className="flex flex-col gap-0.5 p-2.5 rounded-xl border"
                  style={{
                    borderColor: '#ffaacc66',
                    background: 'linear-gradient(135deg, #ffaacc18 0%, #ffaacc06 100%)',
                  }}
                >
                  <span
                    className="font-bold text-white leading-snug"
                    style={{ fontSize: 'clamp(13px, 1.05vw, 15px)' }}
                  >
                    HITL
                  </span>
                  <span
                    className="text-white/55 leading-snug"
                    style={{ fontSize: 'clamp(12px, 0.95vw, 13px)' }}
                  >
                    人が確認してから登録する
                  </span>
                  <div className="mt-1">
                    <RelatedRuleLink
                      targetId="68-hitl-human-review"
                      label="5-2 HITL（各論）へ"
                      accent="#ffaacc"
                    />
                  </div>
                </div>
                <div
                  className="flex flex-col gap-0.5 p-2.5 rounded-xl border"
                  style={{
                    borderColor: '#9ee0a866',
                    background: 'linear-gradient(135deg, #9ee0a818 0%, #9ee0a806 100%)',
                  }}
                >
                  <span
                    className="font-bold text-white leading-snug"
                    style={{ fontSize: 'clamp(13px, 1.05vw, 15px)' }}
                  >
                    入力情報範囲のルール化
                  </span>
                  <span
                    className="text-white/55 leading-snug"
                    style={{ fontSize: 'clamp(12px, 0.95vw, 13px)' }}
                  >
                    名刺情報のみに限定する等、保存範囲を規程で定める
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {isDecision && (
          <div className="flex items-center gap-2 mt-0.5">
            <span style={{ color: step.accent, fontSize: 'clamp(13px, 1.1vw, 17px)' }}>✓</span>
            <span
              className="text-white/70"
              style={{ fontSize: 'clamp(13px, 1vw, 14px)' }}
            >
              発生確率 × 深刻さでスコア化し、自社基準で方針を決める
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Slide22RiskPractice() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <SlideWrapper>
      <motion.div
        ref={ref}
        className="flex flex-col w-full h-full max-w-5xl px-2 py-4 pt-14 gap-3 min-h-0"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        {/* ヘッダー */}
        <div className="shrink-0 flex flex-col gap-1">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(10px, 0.9vw, 12px)' }}
          >
            Risk-Based Approach · 実践編
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(20px, 2.6vw, 38px)' }}
          >
            名刺管理MCP —{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #88bbff 0%, #c8a8ff 50%, #9ee0a8 100%)' }}
            >
              リスクベースアプローチの実践例
            </span>
          </h2>
        </div>

        {/* フロー本体 */}
        <div className="flex flex-col items-center flex-1 min-h-0 overflow-y-auto scrollbar-thin py-1">
          {STEPS.map((step, i) => (
            <div key={step.id} className="flex flex-col items-center w-full max-w-2xl min-w-0">
              <StepCard step={step} index={i} inView={inView} />
              {i < STEPS.length - 1 && <Arrow delay={0.3 + i * 0.1} />}
            </div>
          ))}
        </div>

        {/* フッター */}
        <motion.p
          className="shrink-0 text-white/35 tracking-wide text-center"
          style={{ fontSize: 'clamp(13px, 1vw, 14px)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          ※ 技術的な対策（zod）だけでなく、
          <span className="text-white/65 font-semibold">ビジネス上のリスク許容度</span>
          に応じた運用設計（HITL の要否）がポイント。
        </motion.p>
      </motion.div>
    </SlideWrapper>
  );
}
