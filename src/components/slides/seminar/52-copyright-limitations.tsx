'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p52: 4-6 著作物 — 著作権法における権利制限（一覧）
 *
 * ベーステンプレート: `templates/FurtherReading.tsx`
 */

const CHAPTER_ACCENT = '#9ee0a8';
const LAW_ACCENT = '#60a5fa';
const HIGHLIGHT_ACCENT = '#f7c46c';

/** 生成AI入力の検討で特に参照する条文 */
const HIGHLIGHTED_ARTICLES = new Set(['第30条の4', '第47条の5']);

const LIMITATIONS = [
  { article: '第30条', title: '私的使用のための複製' },
  { article: '第30条の2', title: '付随対象著作物の利用' },
  { article: '第30条の3', title: '検討の過程における利用' },
  { article: '第30条の4', title: '著作物に表現された思想又は感情の享受を目的としない利用' },
  { article: '第31条', title: '図書館等における複製等' },
  { article: '第32条', title: '引用' },
  { article: '第33条', title: '教科用図書等への掲載' },
  { article: '第33条の2', title: 'デジタル教科書への掲載等' },
  { article: '第33条の3', title: '拡大教科書等のための複製等' },
  { article: '第34条', title: '学校教育番組の放送等' },
  { article: '第35条', title: '学校その他の教育機関における複製等' },
  { article: '第36条', title: '試験問題としての複製等' },
  { article: '第37条', title: '視覚障害者等のための複製等' },
  { article: '第37条の2', title: '聴覚障害者等のための複製等' },
  { article: '第38条', title: '営利を目的としない上演等' },
  { article: '第39条', title: '時事問題に関する論説の転載等' },
  { article: '第40条', title: '政治上の演説等の利用' },
  { article: '第41条', title: '時事の事件の報道のための利用' },
  { article: '第42条', title: '裁判手続等における複製' },
  { article: '第42条の2', title: '行政機関の内部資料としての複製' },
  { article: '第42条の3', title: '地方公共団体の機関等の内部資料としての複製' },
  { article: '第43条', title: '翻訳、翻案等による利用' },
  { article: '第44条', title: '放送事業者等による一時的固定' },
  { article: '第45条', title: '美術の著作物等の原作品の所有者による展示' },
  { article: '第46条', title: '公開の美術の著作物等の利用' },
  { article: '第47条', title: '美術の著作物等の展示に伴う複製等' },
  { article: '第47条の2', title: '美術の著作物等の譲渡等の申出に伴う複製等' },
  { article: '第47条の3', title: 'プログラムの著作物の複製物の所有者による複製等' },
  { article: '第47条の4', title: '電子計算機における著作物の利用に付随する利用等' },
  { article: '第47条の5', title: '電子計算機による情報処理及びその結果の提供に付随する軽微利用等' },
  { article: '第47条の6', title: '翻訳、翻案等による利用' },
  { article: '第47条の7', title: '複製権の制限により作成された複製物の譲渡' },
] as const;

function LimitationRow({
  item,
  index,
}: {
  item: (typeof LIMITATIONS)[number];
  index: number;
}) {
  const highlighted = HIGHLIGHTED_ARTICLES.has(item.article);
  const badgeAccent = highlighted ? HIGHLIGHT_ACCENT : LAW_ACCENT;

  return (
    <motion.div
      className="flex items-start gap-2.5 px-2 py-1.5 md:py-2 rounded-lg border min-w-0 transition-colors"
      style={
        highlighted
          ? {
              borderColor: `${HIGHLIGHT_ACCENT}66`,
              background: `linear-gradient(90deg, ${HIGHLIGHT_ACCENT}18 0%, rgba(255,255,255,0.04) 100%)`,
              boxShadow: `0 0 20px -6px ${HIGHLIGHT_ACCENT}44`,
            }
          : { borderColor: 'transparent' }
      }
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.04 + index * 0.015 }}
    >
      <span
        className="shrink-0 font-mono tabular-nums text-center py-0.5 rounded border font-semibold"
        style={{
          color: badgeAccent,
          borderColor: `${badgeAccent}${highlighted ? '88' : '44'}`,
          background: `${badgeAccent}${highlighted ? '22' : '10'}`,
          fontSize: 'clamp(11px, 0.95vw, 14px)',
          minWidth: 'clamp(60px, 5.8vw, 78px)',
          boxShadow: highlighted ? `0 0 12px ${HIGHLIGHT_ACCENT}33` : undefined,
        }}
      >
        {item.article}
      </span>
      <span
        className={`leading-relaxed min-w-0 ${highlighted ? 'text-white font-semibold' : 'text-white/85'}`}
        style={{ fontSize: 'clamp(12px, 1.02vw, 15px)' }}
      >
        {item.title}
      </span>
    </motion.div>
  );
}

export default function Slide51CopyrightLimitations() {
  const mid = Math.ceil(LIMITATIONS.length / 2);
  const leftCol = LIMITATIONS.slice(0, mid);
  const rightCol = LIMITATIONS.slice(mid);

  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-3 md:gap-4 w-full max-w-6xl h-full justify-center py-5 md:py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-1 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(11px, 1.1vw, 15px)' }}
          >
            4-6 · 著作物 · 権利制限
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(24px, 2.6vw, 40px)' }}
          >
            著作権法における
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: `linear-gradient(90deg, ${LAW_ACCENT} 0%, ${CHAPTER_ACCENT} 100%)`,
              }}
            >
              権利制限
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-6 gap-y-0.5 md:gap-y-1 px-1 md:px-2 py-2 md:py-3 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex flex-col min-w-0">
            {leftCol.map((item, i) => (
              <LimitationRow key={item.article} item={item} index={i} />
            ))}
          </div>
          <div className="flex flex-col min-w-0">
            {rightCol.map((item, i) => (
              <LimitationRow key={item.article} item={item} index={mid + i} />
            ))}
          </div>
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
