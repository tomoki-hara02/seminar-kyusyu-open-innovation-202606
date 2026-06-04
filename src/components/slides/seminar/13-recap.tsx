'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p13: Recap · Key Takeaways — ここまでのまとめ
 *
 * ベーステンプレート: `templates/Recap.tsx`
 *
 * 3 つのキーポイント：
 *   ① 無形業務領域における生成AI活用を考える
 *   ② 生成AI活用においてはMCP（エージェント）前提で計画する
 *   ③ MIT論文にある多くの企業の失敗事例を意識する
 */

const TAKEAWAYS = [
  {
    title: '無形業務領域における生成AI活用を考える',
    desc: '製造・在庫など「形のある業務」はデジタル化が進みやすい。一方、企画・営業・接客・意思決定など「形のない業務」にこそ、生成AIの貢献余地が大きく残っている。まず自社の無形業務を棚卸しすることが出発点。',
    accent: '#88bbff',
  },
  {
    title: '生成AI活用はMCP（エージェント）前提で計画する',
    desc: '単体のチャットAIでは「補助ツール」止まりになりやすい。MCP でシステム・データ・SaaS をつなぎ、AIが自律的に動けるエージェント構造を最初から設計に組み込むことで、業務の自動化が現実になる。',
    accent: '#c8a8ff',
  },
  {
    title: 'MIT論文の失敗パターンを意識して設計する',
    desc: '多くの企業が「PoC で終わる」「一部門だけで孤立する」「ROI を測らず撤退する」という落とし穴にはまっている。成功企業は業務フローへの深い統合・指標の可視化・全社横断の推進体制の 3 点を最初から揃えている。',
    accent: '#ffaacc',
  },
];

export default function Slide13Recap() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-10 md:gap-12 w-full max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 見出し */}
        <div className="flex flex-col gap-2 shrink-0">
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            Recap · Key Takeaways
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            ここまでの
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{ backgroundImage: 'linear-gradient(90deg, #88bbff 0%, #c8a8ff 55%, #ffaacc 100%)' }}
            >
              3 つのポイント
            </span>
          </h2>
        </div>

        {/* テイクアウェイ */}
        <div className="flex flex-col gap-4 md:gap-5">
          {TAKEAWAYS.map((t, i) => (
            <motion.div
              key={t.title}
              className="flex items-start gap-5 md:gap-6 p-5 md:p-6 rounded-2xl bg-white/[0.04] border border-white/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
            >
              {/* 番号バッジ */}
              <div
                className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center font-bold text-2xl tabular-nums"
                style={{
                  background: `${t.accent}1f`,
                  border: `1px solid ${t.accent}66`,
                  color: t.accent,
                  boxShadow: `0 0 18px ${t.accent}33`,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* 本文 */}
              <div className="flex flex-col gap-1.5 min-w-0">
                <h3 className="text-lg md:text-xl font-semibold text-white tracking-tight">
                  {t.title}
                </h3>
                <p className="text-sm text-white/55 leading-relaxed">
                  {t.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* フッター */}
        <p className="text-xs text-white/30 tracking-wider">
          ※ この 3 点を押さえた設計から始めることで、MIT 成功パターンへの最短距離を取れる。
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
