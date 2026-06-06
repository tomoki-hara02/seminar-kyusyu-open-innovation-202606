'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p8: 法的な近時のホットトピック
 *
 * 旧 p8（令和8年改正個人情報保護法 12 項目）と
 * 旧 p9（声優×生成AI / 法務省検討会）を 1 枚に統合。
 */

const LAW_ACCENT = '#88bbff';
const PURPLE_ACCENT = '#c8a8ff';
const PINK_ACCENT = '#ffaacc';
const MOJ_URL = 'https://www.moj.go.jp/content/001463284.pdf';

type PipCategory = {
  num: number;
  title: string;
  accent: string;
  summary: string;
};

const PIP_CATEGORIES: PipCategory[] = [
  {
    num: 1,
    title: 'データ利活用の推進',
    accent: '#60a5fa',
    summary: '統計作成等目的の同意不要新設、同意例外の緩和',
  },
  {
    num: 2,
    title: 'リスク対応規律',
    accent: '#88bbff',
    summary: '子ども・生体・委託先など、新たな規律を整備',
  },
  {
    num: 3,
    title: '不適正利用等の防止',
    accent: '#f7c46c',
    summary: '連絡可能個人関連情報の不正取得・オプトアウト規制',
  },
  {
    num: 4,
    title: '規律遵守の実効性確保',
    accent: '#9ee0a8',
    summary: '勧告・命令の柔軟化、罰則強化、課徴金制度の導入',
  },
];

export default function Slide08LegalHotTopics() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col w-full h-full max-w-7xl px-2 py-4 pt-12 gap-3 md:gap-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        {/* タイトル */}
        <div className="shrink-0 flex flex-col gap-1">
          <span
            className="tracking-[0.28em] uppercase text-white/35"
            style={{ fontSize: 'clamp(10px, 0.85vw, 11px)' }}
          >
            Hot Topics · 法律分野
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(22px, 2.6vw, 36px)' }}
          >
            近時の
            <span
              className="bg-clip-text text-transparent ml-1.5"
              style={{
                backgroundImage: `linear-gradient(90deg, ${LAW_ACCENT} 0%, ${PURPLE_ACCENT} 55%, ${PINK_ACCENT} 100%)`,
              }}
            >
              法的ホットトピック
            </span>
          </h2>
          <p
            className="text-white/45 tracking-wide"
            style={{ fontSize: 'clamp(12px, 0.95vw, 14px)' }}
          >
            生成AI・データ活用にかかわる、いま動いている 2 つの論点
          </p>
        </div>

        {/* 2 カード並列 */}
        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {/* 左カード: 令和8年改正 個情法 */}
          <motion.section
            className="flex flex-col gap-3 p-4 md:p-5 rounded-2xl border min-h-0 overflow-hidden"
            style={{
              borderColor: `${LAW_ACCENT}44`,
              background: `linear-gradient(160deg, ${LAW_ACCENT}10 0%, rgba(255,255,255,0.02) 100%)`,
              boxShadow: `0 0 36px -10px ${LAW_ACCENT}33`,
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="flex items-baseline gap-3 shrink-0">
              <span
                className="font-mono font-bold tracking-tight leading-none"
                style={{
                  color: LAW_ACCENT,
                  fontSize: 'clamp(28px, 3.4vw, 44px)',
                }}
              >
                12
              </span>
              <div className="flex flex-col min-w-0">
                <span
                  className="tracking-[0.18em] uppercase text-white/40"
                  style={{ fontSize: 'clamp(10px, 0.8vw, 11px)' }}
                >
                  Topic 01 · 個人情報保護法
                </span>
                <h3
                  className="font-bold text-white leading-tight"
                  style={{ fontSize: 'clamp(15px, 1.4vw, 19px)' }}
                >
                  令和8年改正 — 12 の改正項目
                </h3>
              </div>
            </div>

            <ul className="flex flex-col gap-1.5 md:gap-2 flex-1 min-h-0">
              {PIP_CATEGORIES.map((cat, i) => (
                <motion.li
                  key={cat.num}
                  className="flex items-start gap-2.5 p-2 md:p-2.5 rounded-lg border min-w-0"
                  style={{
                    borderColor: `${cat.accent}33`,
                    background: `linear-gradient(135deg, ${cat.accent}10 0%, rgba(255,255,255,0.02) 100%)`,
                  }}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.25 + i * 0.05 }}
                >
                  <span
                    className="shrink-0 font-mono font-bold rounded border leading-none px-1.5 py-0.5"
                    style={{
                      color: cat.accent,
                      borderColor: `${cat.accent}55`,
                      background: `${cat.accent}14`,
                      fontSize: 'clamp(11px, 0.92vw, 13px)',
                    }}
                  >
                    {cat.num}
                  </span>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span
                      className="font-bold text-white leading-tight"
                      style={{ fontSize: 'clamp(12px, 1.05vw, 14px)' }}
                    >
                      {cat.title}
                    </span>
                    <span
                      className="text-white/65 leading-snug"
                      style={{ fontSize: 'clamp(11px, 0.92vw, 13px)' }}
                    >
                      {cat.summary}
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>

            <div
              className="shrink-0 flex flex-wrap gap-1.5 pt-1 border-t"
              style={{ borderColor: `${LAW_ACCENT}22` }}
            >
              <span
                className="px-2 py-0.5 rounded border text-white/65"
                style={{
                  borderColor: `${LAW_ACCENT}55`,
                  background: `${LAW_ACCENT}14`,
                  fontSize: 'clamp(10px, 0.78vw, 11px)',
                }}
              >
                2026.4.7 閣議決定
              </span>
              <span
                className="px-2 py-0.5 rounded border text-white/65"
                style={{
                  borderColor: `${LAW_ACCENT}55`,
                  background: `${LAW_ACCENT}14`,
                  fontSize: 'clamp(10px, 0.78vw, 11px)',
                }}
              >
                公布後 2 年以内施行
              </span>
              <span
                className="px-2 py-0.5 rounded border text-white/65"
                style={{
                  borderColor: `${LAW_ACCENT}55`,
                  background: `${LAW_ACCENT}14`,
                  fontSize: 'clamp(10px, 0.78vw, 11px)',
                }}
              >
                第221回特別国会 審議中
              </span>
            </div>
          </motion.section>

          {/* 右カード: 声優×生成AI 法務省検討会 */}
          <motion.section
            className="flex flex-col gap-4 p-4 md:p-5 rounded-2xl border min-h-0 overflow-hidden"
            style={{
              borderColor: `${PURPLE_ACCENT}44`,
              background: `linear-gradient(160deg, ${PURPLE_ACCENT}10 0%, rgba(255,255,255,0.02) 100%)`,
              boxShadow: `0 0 36px -10px ${PURPLE_ACCENT}33`,
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-start gap-3 shrink-0">
              <span
                className="shrink-0 flex items-center justify-center w-11 h-11 rounded-xl border"
                style={{
                  borderColor: `${PURPLE_ACCENT}55`,
                  background: `${PURPLE_ACCENT}14`,
                }}
                aria-hidden
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={PURPLE_ACCENT}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
                  <path d="M6 10v2a6 6 0 0 0 12 0v-2" />
                  <path d="M12 18v4M8 22h8" />
                </svg>
              </span>
              <div className="flex flex-col min-w-0">
                <span
                  className="tracking-[0.18em] uppercase text-white/40"
                  style={{ fontSize: 'clamp(10px, 0.8vw, 11px)' }}
                >
                  Topic 02 · 肖像 / 声 / 人格的利益
                </span>
                <h3
                  className="font-bold text-white leading-tight"
                  style={{ fontSize: 'clamp(15px, 1.4vw, 19px)' }}
                >
                  声優と生成AIの活用
                </h3>
              </div>
            </div>

            <p
              className="text-white/75 leading-relaxed"
              style={{ fontSize: 'clamp(12px, 1.05vw, 15px)' }}
            >
              法務省：肖像、声等の無断利用による民事責任の在り方に関する検討会
            </p>

            <div
              className="h-px w-full"
              style={{ background: `linear-gradient(90deg, ${PURPLE_ACCENT}44, transparent)` }}
            />

            <div className="flex flex-col gap-1.5">
              <span
                className="tracking-[0.2em] uppercase text-white/35 font-semibold"
                style={{ fontSize: 'clamp(10px, 0.82vw, 11px)' }}
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
                  fontSize: 'clamp(13px, 1.1vw, 16px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = PURPLE_ACCENT;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = LAW_ACCENT;
                }}
              >
                <span>声優有志提出資料</span>
                <svg
                  width="14"
                  height="14"
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
                style={{ fontSize: 'clamp(10px, 0.8vw, 11px)' }}
              >
                {MOJ_URL}
              </p>
            </div>

            <div className="mt-auto flex flex-wrap gap-1.5">
              <span
                className="px-2 py-0.5 rounded border text-white/65"
                style={{
                  borderColor: `${PURPLE_ACCENT}55`,
                  background: `${PURPLE_ACCENT}14`,
                  fontSize: 'clamp(10px, 0.78vw, 11px)',
                }}
              >
                肖像権
              </span>
              <span
                className="px-2 py-0.5 rounded border text-white/65"
                style={{
                  borderColor: `${PURPLE_ACCENT}55`,
                  background: `${PURPLE_ACCENT}14`,
                  fontSize: 'clamp(10px, 0.78vw, 11px)',
                }}
              >
                パブリシティ権
              </span>
              <span
                className="px-2 py-0.5 rounded border text-white/65"
                style={{
                  borderColor: `${PURPLE_ACCENT}55`,
                  background: `${PURPLE_ACCENT}14`,
                  fontSize: 'clamp(10px, 0.78vw, 11px)',
                }}
              >
                声の権利
              </span>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
