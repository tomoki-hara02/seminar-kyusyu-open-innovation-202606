'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p13a: ワークショップ開始アナウンス
 *
 * Live Demo（p13）の直後に挟む 1 枚。
 * 聴衆に「次の 4 枚の架空企業情報を見ながら、生成AIで活用プランを考えてみる」
 * という行動を促すブリッジスライド。
 */

// ── 鉛筆アイコン ──────────────────────────────────────────────────────────────
function WorkshopIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      {/* ノート */}
      <rect
        x="8" y="6" width="30" height="38" rx="3"
        stroke="rgba(255,255,255,0.30)"
        strokeWidth="1.8"
      />
      {/* 行線 */}
      {[16, 22, 28, 34].map((y) => (
        <line
          key={y}
          x1="14" y1={y} x2="32" y2={y}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      ))}
      {/* 鉛筆 */}
      <motion.g
        animate={{ rotate: [-4, 4, -4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '38px 38px' }}
      >
        <rect
          x="33" y="25" width="7" height="18" rx="1.5"
          fill="rgba(200,168,255,0.18)"
          stroke="#c8a8ff"
          strokeWidth="1.4"
        />
        <polygon
          points="33,43 40,43 36.5,49"
          fill="#c8a8ff"
          opacity="0.7"
        />
        <line
          x1="33" y1="29" x2="40" y2="29"
          stroke="#c8a8ff"
          strokeWidth="1.2"
          opacity="0.5"
        />
      </motion.g>
    </svg>
  );
}

// ── コンポーネント ────────────────────────────────────────────────────────────
export default function Slide13aWorkshopIntro() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center gap-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {/* トップバッジ */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <span className="block w-12 h-px bg-white/20" />
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#c8a8ff]/50 bg-[#c8a8ff]/10">
            <motion.span
              className="w-2 h-2 rounded-full bg-[#c8a8ff]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-[11px] tracking-[0.28em] uppercase text-[#d8c0ff] font-bold">
              Workshop
            </span>
          </span>
          <span className="block w-12 h-px bg-white/20" />
        </motion.div>

        {/* メイン見出し */}
        <motion.div
          className="flex flex-col items-center gap-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.35 }}
        >
          <WorkshopIcon />

          <h1
            className="leading-none font-extrabold tracking-tight"
            style={{
              fontSize: 'clamp(4.5rem, 12vw, 10rem)',
              background: 'linear-gradient(135deg, #c8a8ff 0%, #88bbff 50%, #ffaacc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 6px 36px rgba(200,168,255,0.4))',
            }}
          >
            ワークショップ
          </h1>

          {/* サブタイトル */}
          <p
            className="font-bold text-white/85 tracking-tight"
            style={{ fontSize: 'clamp(1.1rem, 2.4vw, 1.75rem)' }}
          >
            生成AI活用プラン作成
          </p>
        </motion.div>

        {/* ディバイダー */}
        <motion.div
          className="h-px w-80 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.0, ease: 'easeOut', delay: 0.8 }}
        />

        {/* 説明文 */}
        <motion.p
          className="text-base md:text-lg text-white/60 leading-relaxed max-w-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.9 }}
        >
          次の 4 枚の架空企業の設定を元に<br />
          <span className="text-white/85 font-semibold">
            生成AIを使って活用プランを考えてみましょう
          </span>
        </motion.p>

        {/* パルスドット */}
        <motion.div
          className="flex items-center gap-2 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-[#c8a8ff]"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/35">
            Use your AI tool of choice
          </span>
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-[#c8a8ff]"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
          />
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
