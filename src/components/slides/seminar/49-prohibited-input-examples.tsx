'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p49: 4-2 入力禁止情報 — 規程に盛り込む具体例
 *
 * ベーステンプレート: `templates/FurtherReading.tsx`
 * 参照: `31-usage-purpose-restrictions.tsx`
 */

const CHAPTER_ACCENT = '#9ee0a8';

interface ProhibitedCategory {
  num: string;
  title: string;
  examples: string;
  risk: string;
  accent: string;
}

const CATEGORIES: ProhibitedCategory[] = [
  {
    num: '01',
    title: '個人・プライバシー情報',
    examples: '顧客・社員の氏名、住所、電話番号、メールアドレス、マイナンバー、人事評価など',
    risk: '個人情報保護法違反。AIの学習データとして取り込まれ、他者の回答に漏洩する恐れがあるため。',
    accent: '#7dd3fc',
  },
  {
    num: '02',
    title: '企業機密・未公開情報',
    examples: '未発表の決算データ、M&A情報、新規事業計画、製品の仕様書、特許出願前の技術情報など',
    risk: '重大な情報漏洩、インサイダー取引の誘発、企業の競争力低下に直結するため。',
    accent: '#88bbff',
  },
  {
    num: '03',
    title: '契約上の守秘義務情報',
    examples: '取引先とのNDA（秘密保持契約）対象情報、顧客から預かっている非公開データ、契約書の原文など',
    risk: '取引先との契約違反、損害賠償請求への発展、社会的信用の失墜を招くため。',
    accent: CHAPTER_ACCENT,
  },
  {
    num: '04',
    title: 'セキュリティ・認証情報',
    examples: 'システムのパスワード、APIキー、ログインID、非公開のソースコード、サーバー情報など',
    risk: 'サイバー攻撃の標的化や、社内システムへの不正アクセスを容易にしてしまうため。',
    accent: '#60a5fa',
  },
  {
    num: '05',
    title: '著作権/知的財産権侵害につながる情報',
    examples: '第三者の著作物（記事、小説、歌詞など）、他社の登録商標をそのまま入力して改変させる行為',
    risk: '著作権法違反、知的財産権の侵害。生成物が既存の著作物と類似・盗用となってしまうため。',
    accent: '#c8a8ff',
  },
  {
    num: '06',
    title: '倫理・法令に反する内容',
    examples: '差別的・暴力的な表現、フェイクニュースの作成指示、法律・医療などの専門的判断を求める入力',
    risk: '公序良俗違反、レピュテーション（風評）リスク、各種業法（弁護士法など）への抵触を防ぐため。',
    accent: '#f7c46c',
  },
];

function CategoryCard({ item, index }: { item: ProhibitedCategory; index: number }) {
  return (
    <motion.div
      className="relative flex flex-col gap-2.5 p-3.5 md:p-4 rounded-xl border min-w-0 overflow-hidden"
      style={{
        background: `linear-gradient(160deg, ${item.accent}10 0%, rgba(255,255,255,0.03) 100%)`,
        borderColor: `${item.accent}33`,
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.06 }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: item.accent, boxShadow: `0 0 10px ${item.accent}88` }}
      />

      <div className="flex items-start gap-2.5 pl-2 min-w-0">
        <span
          className="font-mono tabular-nums shrink-0 w-6 pt-0.5"
          style={{ color: item.accent, fontSize: 'clamp(11px, 0.95vw, 13px)' }}
        >
          {item.num}
        </span>
        <p
          className="font-bold text-white leading-snug"
          style={{ fontSize: 'clamp(14px, 1.18vw, 17px)' }}
        >
          {item.title}
        </p>
      </div>

      <div className="flex flex-col gap-2 pl-2">
        <div className="flex flex-col gap-1">
          <span
            className="tracking-wider text-white/35"
            style={{ fontSize: 'clamp(10px, 0.78vw, 11px)' }}
          >
            具体例
          </span>
          <p
            className="text-white/75 leading-snug"
            style={{ fontSize: 'clamp(11.5px, 0.95vw, 13.5px)' }}
          >
            {item.examples}
          </p>
        </div>

        <div
          className="flex flex-col gap-1 pt-1 border-t"
          style={{ borderColor: `${item.accent}22` }}
        >
          <span
            className="tracking-wider"
            style={{ color: `${item.accent}cc`, fontSize: 'clamp(10px, 0.78vw, 11px)' }}
          >
            リスク・理由
          </span>
          <p
            className="text-white/60 leading-snug"
            style={{ fontSize: 'clamp(11px, 0.92vw, 13px)' }}
          >
            {item.risk}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Slide49ProhibitedInputExamples() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-5 md:gap-6 w-full max-w-6xl px-2 py-6 md:py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-2 shrink-0">
          <span
            className="tracking-[0.32em] uppercase text-white/40"
            style={{ fontSize: 'clamp(10px, 0.9vw, 12px)' }}
          >
            4-2 · 入力禁止情報
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(22px, 2.6vw, 38px)' }}
          >
            規程に盛り込むべき
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage: `linear-gradient(90deg, ${CHAPTER_ACCENT} 0%, #88bbff 100%)`,
              }}
            >
              「入力禁止項目」の具体例
            </span>
          </h2>
          <p
            className="text-white/50 leading-relaxed max-w-4xl"
            style={{ fontSize: 'clamp(13px, 1vw, 16px)' }}
          >
            社員が「何を入力してはいけないのか」を直感的に判断できるよう、
            <span className="text-white/75 font-medium">具体的なデータ例</span>
            を併記することが重要
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-3.5 auto-rows-fr">
          {CATEGORIES.map((item, i) => (
            <CategoryCard key={item.num} item={item} index={i} />
          ))}
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
