'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SlideWrapper from '../../SlideWrapper';
import { ACCENTS } from '@/theme/colors';

/**
 * p1: 「生成AIを"安心して使い倒す"ためのルールづくり入門」
 * 主催: tAiL. 法律事務所
 *
 * 本番投影用のタイトルスライド。タイトル＋主催に加えて、
 * 冒頭で伝えたい「本セミナーの楽しみ方」3 Tips を下部にコンパクトに配置。
 *   - TIP 01: ブラウザAIで深堀 → 持ち帰り資料化
 *   - TIP 02: F11 で全画面表示
 *   - TIP 03: 左上の目次から全スライドへジャンプ
 */

type Tip = {
  no: string;
  color: string;
  title: string;
  desc: string;
  badge?: string;
};

const TIPS: Tip[] = [
  {
    no: '①',
    color: '#c8a8ff',
    title: 'ブラウザAIで深堀',
    desc: '気になった所はその場でAIに質問。最後に「整理して出力」と頼めば持ち帰り資料に。',
  },
  {
    no: '②',
    color: '#88bbff',
    title: 'F11 で全画面表示',
    desc: '解除も同じ F11キーで OK。',
    badge: 'F11',
  },
  {
    no: '③',
    color: '#9ee0a8',
    title: '左上の目次',
    desc: '目次から全スライドへ直接ジャンプできます。',
  },
];

export default function Slide01Title() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center gap-7 text-center w-full max-w-5xl px-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
      >
        {/* 上部の小さなアイブロウ */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span
            className="w-8 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${ACCENTS.purple})`,
            }}
          />
          <span className="text-[10px] tracking-[0.4em] uppercase text-white/50 font-light">
            Seminar
          </span>
          <span
            className="w-8 h-px"
            style={{
              background: `linear-gradient(270deg, transparent, ${ACCENTS.pink})`,
            }}
          />
        </motion.div>

        {/* メインタイトル */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.25] text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          生成AIを
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(90deg, ${ACCENTS.purple}, ${ACCENTS.blue}, ${ACCENTS.pink})`,
            }}
          >
            “安心して使い倒す”
          </span>
          ための
          <br />
          ルールづくり入門
        </motion.h1>

        {/* 区切り線 */}
        <motion.div
          className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.7 }}
        />

        {/* 主催 */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/35">
            Presented by
          </p>
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="tAiL. 法律事務所"
              width={48}
              height={48}
              className="opacity-90 object-contain"
              priority
            />
            <span className="text-lg md:text-xl font-semibold tracking-wider text-white/85">
              tAiL. 法律事務所
            </span>
          </div>
        </motion.div>

        {/* ── 本セミナーの楽しみ方（3 Tips） ── */}
        <motion.div
          className="flex flex-col items-center gap-3 w-full mt-1"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
        >
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            How to enjoy — 本セミナーの楽しみ方
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full text-left">
            {TIPS.map((tip, i) => (
              <motion.div
                key={tip.no}
                className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl border"
                style={{
                  borderColor: `${tip.color}44`,
                  background: `linear-gradient(135deg, ${tip.color}1a 0%, rgba(15,20,40,0.40) 100%)`,
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.25 + i * 0.12 }}
              >
                <span
                  className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center font-bold text-[12px]"
                  style={{
                    color: tip.color,
                    background: `${tip.color}20`,
                    border: `1px solid ${tip.color}66`,
                  }}
                >
                  {tip.no}
                </span>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="text-[12.5px] font-bold text-white leading-snug">
                      {tip.title}
                    </h3>
                    {tip.badge && (
                      <span
                        className="px-1.5 py-px rounded font-mono font-bold text-[10px] tracking-wider"
                        style={{
                          color: tip.color,
                          background: `${tip.color}15`,
                          border: `1px solid ${tip.color}66`,
                        }}
                      >
                        {tip.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-white/65 leading-snug">
                    {tip.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p
            className="text-[10px] text-white/30 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.7 }}
          >
            ※ 本資料の法令・ガイドライン等の記載は 2026年6月時点の情報に基づきます
          </motion.p>
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
