'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p5: では、始めましょう ＋ このセミナーの楽しみ方（2 Tips, コンパクト版）
 *
 * - TIP 01: ブラウザAIで深堀 → スレッド整理で持ち帰り資料化
 * - TIP 02: F11キーで全画面モード（解除も F11）
 */
export default function Slide05Start() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center w-full max-w-3xl gap-6"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* ── Hero ── */}
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            Ready to begin?
          </span>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            では、始めましょう。
          </h2>
          <p className="text-[12.5px] text-white/55 leading-relaxed">
            その前に、本セミナーの楽しみ方を
            <span className="text-white font-semibold mx-1">3 つ</span>
            だけ。
          </p>
        </div>

        {/* ── 2 Tips（コンパクト） ── */}
        <div className="flex flex-col w-full gap-2">

          {/* TIP 01 */}
          <motion.div
            className="flex items-start gap-3 px-4 py-3 rounded-xl border"
            style={{
              borderColor: '#c8a8ff44',
              background:
                'linear-gradient(90deg, rgba(200,168,255,0.10) 0%, rgba(15,20,40,0.40) 100%)',
            }}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span
              className="shrink-0 w-7 h-7 rounded-md flex items-center justify-center font-bold text-[13px]"
              style={{
                color: '#c8a8ff',
                background: '#c8a8ff20',
                border: '1px solid #c8a8ff66',
              }}
            >
              ①
            </span>
            <div className="flex flex-col gap-0.5 min-w-0">
              <h3 className="text-[14px] font-bold text-white leading-snug">
                ブラウザAI（Gemini / Claude / Comet 等）で深堀 → 持ち帰り資料化
              </h3>
              <p className="text-[12px] text-white/70 leading-snug">
                気になった所はその場でAIに聞く（例:「このページの〇〇を整理して」）。
                最後に「このスレッドの内容を整理して出力して」と頼めば、講義の持ち帰り資料が完成。
              </p>
            </div>
          </motion.div>

          {/* TIP 02 */}
          <motion.div
            className="flex items-center gap-3 px-4 py-3 rounded-xl border"
            style={{
              borderColor: '#88bbff44',
              background:
                'linear-gradient(90deg, rgba(136,187,255,0.10) 0%, rgba(15,20,40,0.40) 100%)',
            }}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span
              className="shrink-0 w-7 h-7 rounded-md flex items-center justify-center font-bold text-[13px]"
              style={{
                color: '#88bbff',
                background: '#88bbff20',
                border: '1px solid #88bbff66',
              }}
            >
              ②
            </span>
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              <h3 className="text-[14px] font-bold text-white leading-snug">
                F11 で全画面表示
              </h3>
              <span
                className="px-2 py-0.5 rounded-md font-mono font-bold text-[11.5px] tracking-wider"
                style={{
                  color: '#88bbff',
                  background: '#88bbff15',
                  border: '1px solid #88bbff66',
                }}
              >
                F11
              </span>
              <p className="text-[12px] text-white/65 leading-snug">
                解除も同じ F11キーで OK。
              </p>
            </div>
          </motion.div>

          {/* TIP 03 */}
          <motion.div
            className="flex items-center gap-3 px-4 py-3 rounded-xl border"
            style={{
              borderColor: '#9ee0a844',
              background:
                'linear-gradient(90deg, rgba(158,224,168,0.10) 0%, rgba(15,20,40,0.40) 100%)',
            }}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span
              className="shrink-0 w-7 h-7 rounded-md flex items-center justify-center font-bold text-[13px]"
              style={{
                color: '#9ee0a8',
                background: '#9ee0a820',
                border: '1px solid #9ee0a866',
              }}
            >
              ③
            </span>
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              <h3 className="text-[14px] font-bold text-white leading-snug">
                左上の
              </h3>
              <span
                className="flex items-center gap-1.5 px-2 py-0.5 rounded-md font-bold text-[11.5px]"
                style={{
                  color: '#9ee0a8',
                  background: '#9ee0a815',
                  border: '1px solid #9ee0a866',
                }}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <rect x="1" y="1" width="6" height="6" rx="1" />
                  <rect x="9" y="1" width="6" height="6" rx="1" />
                  <rect x="1" y="9" width="6" height="6" rx="1" />
                  <rect x="9" y="9" width="6" height="6" rx="1" />
                </svg>
                目次
              </span>
              <p className="text-[12px] text-white/70 leading-snug">
                から
                <span className="text-white font-semibold mx-1">全スライド</span>
                に直接ジャンプできます。
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
