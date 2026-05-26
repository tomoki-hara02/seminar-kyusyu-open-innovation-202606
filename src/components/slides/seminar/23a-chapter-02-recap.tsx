'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p23a: Recap · Chapter 02 前編まとめ
 *
 * 3 つのキーポイント：
 *   ① AI事業者ガイドライン適合性
 *   ② リスクベースアプローチの考え方を知る
 *   ③ 生成AIの法的な問題は入力情報の権利処理とモデルで分ける
 */

const TAKEAWAYS = [
  {
    title: 'AI事業者ガイドライン適合性',
    desc: 'AIに評価させる・AIが従業員を支配するなど、AIの使用方法が人間の尊厳に配慮されているか。またデータの偏りが誤った出力を誘導しないかといったリスクに気づけるようになることが重要です。',
    accent: '#c8a8ff',
  },
  {
    title: 'リスクベースアプローチの考え方を知る',
    desc: 'リスクベースアプローチは発生確率とそのインパクトによりリスクをコントロールするアプローチです。主体によって判断は異なるため、「他社がOKだから自社もOK」という構図は成り立ちません。自社の状況に応じた判断が不可欠です。',
    accent: '#88bbff',
  },
  {
    title: '生成AIの法的問題は入力情報の権利処理とモデルで分ける',
    desc: '両者を分けることで問題分析がクリアになります。入力情報の権利処理は自社特有の問題であり、モデルの問題はサービス選択と深く結びついています。両者が交差する領域も存在するため、特に注意が必要です。',
    accent: '#9ee0a8',
  },
];

export default function Slide23aChapter02Recap() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-8 md:gap-10 w-full max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 見出し */}
        <div className="flex flex-col gap-2 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
              Recap · Chapter 02 前編
            </span>
            <div className="flex-1 max-w-[120px] h-px bg-gradient-to-r from-white/20 to-transparent" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            前編の
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{ backgroundImage: 'linear-gradient(90deg, #c8a8ff 0%, #88bbff 50%, #9ee0a8 100%)' }}
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
              style={{ borderColor: `${t.accent}22` }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.13 }}
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
                <h3 className="text-lg md:text-xl font-semibold text-white tracking-tight leading-snug">
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
          ※ この 3 点を踏まえた上で、後編では実際の社内規程の各論へ進みます。
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
