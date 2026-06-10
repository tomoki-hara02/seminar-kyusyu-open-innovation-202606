'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p85: 商談編 — 対面・商談における生成AIツール使用ポリシー（例）
 *
 * 実際のポリシー文書のように、第1条〜第4条をそのまま縦に並べて表示する。
 */

const SALES_ACCENT = '#f7c46c';

const POLICY_TITLE = '対面・商談における生成AIツール使用に関するポリシー';

const ARTICLES = [
  {
    num: 1,
    title: '目的',
    paragraphs: [
      '本ポリシーは、当社従業員との間で行われる商談、対面打合せ、会議、提案その他の対話の場面における生成AIツールの使用に関する基本方針を定めるものです。',
    ],
    items: [] as string[],
  },
  {
    num: 2,
    title: '使用制限',
    paragraphs: [
      '相手方は、当社従業員との対話において、以下に掲げるサービスを当社担当者の事前承諾なく使用してはなりません。',
    ],
    items: [
      '対話内容をリアルタイムで文字起こしするサービス',
      '対話内容を生成AIが要約・処理するサービス',
      'AIコンパニオン機能その他対話内容を外部サーバーへ送信するサービス',
      '前各号に準ずる、対話内容を生成AIが取得・処理するサービス',
    ],
  },
  {
    num: 3,
    title: '承諾手続',
    paragraphs: [
      '前条のサービスを使用しようとする場合は、使用前に当社担当者に対し使用するサービスの名称・機能を明示のうえ、書面または口頭による承諾を得るものとします。',
    ],
    items: [] as string[],
  },
  {
    num: 4,
    title: '違反の効果',
    paragraphs: [
      '本ポリシーに違反して対話型生成AIサービスが使用された場合、当社は商談・打合せを中断し、または以後の継続を拒絶することができるものとします。',
    ],
    items: [] as string[],
  },
] as const;

export default function Slide85SalesAiPolicyExample() {
  return (
    <SlideWrapper>
      <div className="flex flex-col w-full h-full min-h-0 max-w-[960px] mx-auto px-2 py-7 gap-5">
        {/* ── ヘッダー ── */}
        <motion.div
          className="shrink-0 flex flex-col gap-1.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="font-mono uppercase tracking-[0.34em] text-white/40"
            style={{ fontSize: '11px' }}
          >
            商談編 · ポリシー例
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-none"
            style={{ fontSize: '24px' }}
          >
            取引先への
            <span
              className="bg-clip-text text-transparent ml-1"
              style={{
                backgroundImage: `linear-gradient(90deg, ${SALES_ACCENT} 0%, #ffaacc 100%)`,
              }}
            >
              提示文例
            </span>
          </h2>
        </motion.div>

        {/* ── ポリシー本文（ドキュメント風） ── */}
        <motion.article
          className="flex-1 min-h-0 overflow-hidden rounded-xl border bg-white/[0.025] flex flex-col"
          style={{ borderColor: 'rgba(255,255,255,0.12)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* 文書タイトル */}
          <div
            className="shrink-0 text-center px-6 py-4 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <h3
              className="font-bold text-white tracking-tight"
              style={{ fontSize: '20px' }}
            >
              {POLICY_TITLE}
            </h3>
          </div>

          {/* 本文 */}
          <div className="flex-1 min-h-0 overflow-y-auto px-10 py-6 flex flex-col gap-5">
            {ARTICLES.map((article, idx) => (
              <motion.section
                key={article.num}
                className="flex flex-col gap-1.5"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + idx * 0.08 }}
              >
                <h4
                  className="font-bold text-white"
                  style={{ fontSize: '15px' }}
                >
                  <span style={{ color: SALES_ACCENT }}>第{article.num}条</span>
                  <span className="text-white/90 ml-1.5">（{article.title}）</span>
                </h4>
                {article.paragraphs.map((p) => (
                  <p
                    key={p}
                    className="text-white/85 leading-relaxed pl-4"
                    style={{ fontSize: '14px' }}
                  >
                    {p}
                  </p>
                ))}
                {article.items.length > 0 && (
                  <ol className="flex flex-col gap-1 mt-0.5 pl-4 list-none">
                    {article.items.map((item, i) => (
                      <li
                        key={item}
                        className="grid grid-cols-[2.2rem_1fr] gap-x-1 text-white/85 leading-relaxed"
                        style={{ fontSize: '14px' }}
                      >
                        <span className="font-mono tabular-nums text-white/70">
                          ({i + 1})
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </motion.section>
            ))}
          </div>
        </motion.article>

        {/* ── フッター注記 ── */}
        <p
          className="shrink-0 text-white/35 leading-snug"
          style={{ fontSize: '10.5px' }}
        >
          ※ 実際の運用に合わせて文言・手続を調整してください。法的助言ではありません。
        </p>
      </div>
    </SlideWrapper>
  );
}
