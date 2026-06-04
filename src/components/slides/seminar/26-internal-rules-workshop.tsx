'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p26: 社内規程作成 Workshop — Gemini で規程ドラフトを作成し Gem にフィードバック
 */

const GEMINI_GEM_URL =
  'https://gemini.google.com/gem/1bgPxFp5eKEYJheQQvVJwriYgnpjwF-Ec?usp=sharing';

const STEPS = [
  'Gemini で社内生成AI利用規程を作成してみてください。',
  '作成した規程は下記の Gem にそのまま貼り付け、フィードバックをもらってください。',
] as const;

function WorkshopIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden>
      <rect
        x="8"
        y="6"
        width="30"
        height="38"
        rx="3"
        stroke="rgba(255,255,255,0.30)"
        strokeWidth="1.8"
      />
      {[16, 22, 28, 34].map((y) => (
        <line
          key={y}
          x1="14"
          y1={y}
          x2="32"
          y2={y}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      ))}
      <motion.g
        animate={{ rotate: [-4, 4, -4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '38px 38px' }}
      >
        <rect
          x="33"
          y="25"
          width="7"
          height="18"
          rx="1.5"
          fill="rgba(255,106,157,0.18)"
          stroke="#FF6B9D"
          strokeWidth="1.4"
        />
        <polygon points="33,43 40,43 36.5,49" fill="#FF6B9D" opacity="0.7" />
      </motion.g>
    </svg>
  );
}

export default function Slide26InternalRulesWorkshop() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center gap-8 md:gap-10 text-center w-full max-w-3xl px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <span className="block w-12 h-px bg-white/20" />
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#FF6B9D]/50 bg-[#FF6B9D]/10">
            <motion.span
              className="w-2 h-2 rounded-full bg-[#FF6B9D]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-[11px] tracking-[0.28em] uppercase text-[#ffb8d0] font-bold">
              Workshop
            </span>
          </span>
          <span className="block w-12 h-px bg-white/20" />
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.35 }}
        >
          <WorkshopIcon />

          <h1
            className="leading-tight font-extrabold tracking-tight text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}
          >
            社内規程作成
            <span
              className="block mt-1 bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #FF6B9D 0%, #ffaacc 55%, #c8a8ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Workshop
            </span>
          </h1>
        </motion.div>

        <motion.div
          className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-white/25 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.0, ease: 'easeOut', delay: 0.8 }}
        />

        <motion.ol
          className="flex flex-col gap-4 md:gap-5 text-left w-full max-w-2xl list-none counter-reset-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.9 }}
        >
          {STEPS.map((step, i) => (
            <motion.li
              key={step}
              className="flex items-start gap-4 p-4 md:p-5 rounded-xl border border-white/10 bg-white/[0.04]"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 1.0 + i * 0.12 }}
            >
              <span
                className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center font-bold tabular-nums"
                style={{
                  fontSize: 'clamp(14px, 1.2vw, 17px)',
                  background: 'rgba(255,106,157,0.15)',
                  border: '1px solid rgba(255,106,157,0.45)',
                  color: '#FF6B9D',
                }}
              >
                {i + 1}
              </span>
              <p
                className="text-white/85 leading-relaxed pt-1 min-w-0"
                style={{ fontSize: 'clamp(14px, 1.25vw, 18px)' }}
              >
                {step}
              </p>
            </motion.li>
          ))}
        </motion.ol>

        <motion.div
          className="w-full max-w-2xl text-left px-4 py-3 rounded-xl border"
          style={{
            borderColor: 'rgba(136,187,255,0.35)',
            background: 'rgba(136,187,255,0.08)',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.25 }}
        >
          <span
            className="block text-white/45 mb-2 tracking-wide"
            style={{ fontSize: 'clamp(13px, 0.9vw, 14px)' }}
          >
            フィードバック用 Gem
          </span>
          <a
            href={GEMINI_GEM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#88bbff] underline decoration-[#88bbff]/50 underline-offset-4 break-all leading-relaxed hover:text-[#a8d0ff] transition-colors"
            style={{ fontSize: 'clamp(13px, 1.05vw, 16px)' }}
          >
            {GEMINI_GEM_URL}
          </a>
        </motion.div>

        <motion.p
          className="text-[10px] tracking-[0.32em] uppercase text-white/35"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          Use Gemini · Paste your draft · Get feedback
        </motion.p>
      </motion.div>
    </SlideWrapper>
  );
}
