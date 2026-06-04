'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p06: 声優と生成AIの活用 — 法務省検討会・有志資料
 */

const ACCENT = '#c8a8ff';
const LAW_ACCENT = '#88bbff';
const MOJ_URL = 'https://www.moj.go.jp/content/001463284.pdf';

export default function Slide06VoiceActorGenai() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-6 md:gap-8 w-full max-w-4xl py-6 md:py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-2 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(9px, 0.9vw, 12px)' }}
          >
            Opening · 注目トピック
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(26px, 3.2vw, 44px)' }}
          >
            声優と
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: `linear-gradient(90deg, ${ACCENT} 0%, ${LAW_ACCENT} 55%, #ffaacc 100%)`,
              }}
            >
              生成AIの活用
            </span>
          </h2>
        </div>

        <motion.div
          className="flex flex-col gap-4 p-5 md:p-6 rounded-2xl border"
          style={{
            borderColor: `${ACCENT}44`,
            background: `linear-gradient(160deg, ${ACCENT}10 0%, rgba(255,255,255,0.02) 100%)`,
            boxShadow: `0 0 36px -10px ${ACCENT}33`,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-start gap-3">
            <span
              className="shrink-0 flex items-center justify-center w-11 h-11 rounded-xl border"
              style={{
                borderColor: `${LAW_ACCENT}55`,
                background: `${LAW_ACCENT}14`,
              }}
              aria-hidden
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={ACCENT}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
                <path d="M6 10v2a6 6 0 0 0 12 0v-2" />
                <path d="M12 18v4M8 22h8" />
              </svg>
            </span>
            <p
              className="text-white/75 leading-relaxed flex-1 min-w-0"
              style={{ fontSize: 'clamp(13px, 1.15vw, 17px)' }}
            >
              法務省：肖像、声等の無断利用による民事責任の在り方に関する検討会
            </p>
          </div>

          <div
            className="h-px w-full"
            style={{ background: `linear-gradient(90deg, ${ACCENT}44, transparent)` }}
          />

          <div className="flex flex-col gap-2">
            <span
              className="tracking-[0.2em] uppercase text-white/35 font-semibold"
              style={{ fontSize: 'clamp(9px, 0.82vw, 11px)' }}
            >
              参考資料
            </span>
            <a
              href={MOJ_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold underline underline-offset-4 decoration-2 transition-colors w-fit max-w-full"
              style={{
                color: LAW_ACCENT,
                fontSize: 'clamp(14px, 1.2vw, 18px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = ACCENT;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = LAW_ACCENT;
              }}
            >
              <span>声優有志提出資料</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="shrink-0"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
            <p
              className="text-white/30 font-mono break-all leading-snug"
              style={{ fontSize: 'clamp(9px, 0.78vw, 11px)' }}
            >
              {MOJ_URL}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
