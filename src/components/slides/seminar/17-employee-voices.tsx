'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * ワークショップ用 架空企業：経営目標に対する従業員の声 3 名。
 *
 * - カードはペルソナのプロフィールを中心にコンパクト表示（core capabilities 風）
 * - カードクリックでフルスクリーン展開（詳細＋💡ヒントボタン）
 * - 「ワークショップでの検討ヒント」はさらにクリックで展開
 * - ダブルクリック / Esc / 背景クリック で閉じる
 */

type Employee = {
  dept: string;
  role: string;
  problem: string;
  name: string;
  meta: string;
  voice: string;
  hints: string[];
  accent: string;
  avatar: 'female' | 'male';
};

const EMPLOYEES: Employee[] = [
  {
    dept: '商品本部',
    role: 'チーフデザイナー',
    problem: '過去データの発掘と試作の往復に\n時間が奪われている',
    name: '佐藤さん',
    meta: '46歳 / 女性 / 勤続18年',
    voice:
      '社長からは「新規商品のリードタイムを3ヶ月に半減させろ」と言われていますが、現状では不可能です。新しい企画を考える際、過去の売れ筋の仕様書や生地データを共有フォルダから探すだけで半日潰れます。ファイル名も「最終_25SS_ワンピ_修正2.xlsx」のようにバラバラで検索も機能しません。また、デザインイメージを工場（菊池工場）に伝えるため、手書きのラフから詳細な仕様書に落とし込むのですが、ここの認識合わせで何度もサンプルの作り直しが発生しています。企画をもっと早く回すには、このアナログな「探す時間」と「試作の往復」をどうにかしないと…。',
    hints: [
      '社内ローカルサーバーとAIを連携させ、「3年前の春物で一番売れたリネンワンピースの仕様書を探して」と自然言語で検索・抽出させる',
      '画像生成AIを使って、初期アイデア出しの段階で高精細な完成イメージ（モックアップ）を作成し、工場との認識のズレをなくす',
    ],
    accent: '#c8a8ff',
    avatar: 'female',
  },
  {
    dept: '営業本部',
    role: 'OEM担当 / 中堅営業',
    problem: 'バラバラの発注書の手入力ミスが\n利益を削っている',
    name: '田中さん',
    meta: '38歳 / 男性 / 勤続10年',
    voice:
      'OEMの既存3社からの脱却を目指して新規開拓に動きたいのですが、毎日の「受注処理」に追われて営業に出る時間がありません。取引先によって発注書の形式がバラバラ（A社はFAX、B社は独自のExcel、C社はPDF）で、それを15年前からある古い基幹システムに手入力で転記しています。先月もサイズ指定を間違えて工場に発注してしまい、再加工と特急便の手配で数十万円の無駄なコスト（利益の圧迫）を出してしまいました。手入力の作業をなくさない限り、新規開拓なんて夢のまた夢です。',
    hints: [
      'AI-OCRと生成AIを組み合わせ、FAXやPDFなどの非定型フォーマットから必要な情報を自動抽出する',
      'MCPを使って古い基幹システムのDBに直接APIアクセス（またはRPA連携）し、AIに自動入力と入力内容のダブルチェックを行わせる',
    ],
    accent: '#f7c46c',
    avatar: 'male',
  },
  {
    dept: '店舗・EC本部',
    role: 'EC・SNS運用担当',
    problem: '情報が分断されていてECコンテンツ\n作成が手作業の限界',
    name: '渡辺さん',
    meta: '29歳 / 女性 / 入社4年目',
    voice:
      'ECの売上比率を30%に上げるため、SNSの更新頻度を増やし、商品の魅力が伝わるページを作りたいです。でも、1つの商品をShopifyに登録する作業が本当に大変で…。商品番号は基幹システムから検索、素材情報は商品本部のExcelからコピペ、「お客様に刺さるポイント」を探すために店舗スタッフのLINE WORKSの会話履歴を遡って読んでいます。情報がいろんな場所に散らばっていて、それを繋ぎ合わせて商品説明文やInstagramの投稿文を手打ちで作るだけで毎日残業です。もっとお客様のリピート分析やCRM施策に時間を使いたいのに…。',
    hints: [
      'MCPを活用して「Excel仕様書」「LINE WORKSの会話履歴」「Shopify」の3つを生成AIに同時連携させる',
      '「商品番号〇〇の仕様書と店舗の接客メモをもとに、30〜50代女性向けのInstagramキャプションとShopify商品説明文を生成し、Shopifyの下書きに登録して」という一連の作業をAIに一任する',
    ],
    accent: '#9ee0a8',
    avatar: 'female',
  },
];

/* ─── アバターアイコン ─── */
const AvatarFemale: React.FC<{ color: string; size?: number }> = ({ color, size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="32" cy="22" r="11" />
    <path d="M32 8c6 0 10 4 10 10c0 3-1 5-2 6c1-1 3-1 4 1c2 3-1 7-3 7" />
    <path d="M32 8c-6 0-10 4-10 10c0 3 1 5 2 6c-1-1-3-1-4 1c-2 3 1 7 3 7" />
    <path d="M12 58c0-10 9-18 20-18s20 8 20 18" />
  </svg>
);
const AvatarMale: React.FC<{ color: string; size?: number }> = ({ color, size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="32" cy="24" r="11" />
    <path d="M22 16c2-6 8-8 10-8s8 2 10 8c-3 0-7-1-10-3c-3 2-7 3-10 3z" />
    <path d="M12 58c0-10 9-18 20-18s20 8 20 18" />
  </svg>
);

/* ─── ヒントトグル ─── */
function HintsBlock({ accent, hints }: { accent: string; hints: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ borderColor: `${accent}55`, background: `${accent}0a` }}
    >
      <button
        type="button"
        className="w-full flex items-center justify-between gap-3 px-4 py-2.5 transition-colors duration-150 cursor-pointer"
        style={{ background: open ? `${accent}22` : 'transparent' }}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        <div className="flex items-center gap-2.5">
          <span style={{ fontSize: '16px' }}>💡</span>
          <span
            className="font-bold tracking-wide"
            style={{ color: accent, fontSize: 'clamp(11px, 1.1vw, 15px)' }}
          >
            ワークショップでの検討ヒント（MCP 連携イメージ）
          </span>
        </div>
        <motion.svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent}
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="hints"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 py-3 flex flex-col gap-2 border-t" style={{ borderColor: `${accent}33` }}>
              {hints.map((hint, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span
                    className="shrink-0 font-bold mt-0.5"
                    style={{ color: accent, fontSize: 'clamp(11px, 1.1vw, 14px)' }}
                  >
                    ▸
                  </span>
                  <p
                    className="leading-relaxed text-white/85"
                    style={{ fontSize: 'clamp(11px, 1.05vw, 14px)' }}
                  >
                    {hint}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── ペルソナカード（コンパクト・選択可） ─── */
function PersonaCard({
  emp,
  index,
  onClick,
}: {
  emp: Employee;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl border overflow-hidden text-left cursor-pointer"
      style={{
        borderColor: `${emp.accent}44`,
        background: `linear-gradient(160deg, ${emp.accent}14 0%, rgba(255,255,255,0.02) 70%)`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
      whileHover={{
        scale: 1.03,
        y: -4,
        transition: { duration: 0.2 },
      }}
    >
      {/* グロー（ホバー時） */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${emp.accent}33, transparent 70%)`,
        }}
      />

      {/* ヘッダー：部署 */}
      <div className="relative w-full flex items-center justify-between">
        <span
          className="font-mono tracking-[0.22em] uppercase"
          style={{ color: `${emp.accent}cc`, fontSize: 'clamp(8px, 0.8vw, 11px)' }}
        >
          {emp.dept}
        </span>
        <span
          className="font-mono"
          style={{ color: `${emp.accent}66`, fontSize: 'clamp(9px, 0.9vw, 12px)' }}
        >
          0{index + 1}
        </span>
      </div>

      {/* アバター */}
      <div
        className="relative rounded-full flex items-center justify-center shrink-0"
        style={{
          width: 'clamp(80px, 8vw, 110px)',
          height: 'clamp(80px, 8vw, 110px)',
          background: `radial-gradient(circle, ${emp.accent}28, ${emp.accent}08)`,
          border: `1.5px solid ${emp.accent}55`,
        }}
      >
        {emp.avatar === 'female'
          ? <AvatarFemale color={emp.accent} />
          : <AvatarMale color={emp.accent} />
        }
      </div>

      {/* 氏名 + メタ */}
      <div className="relative flex flex-col items-center gap-0.5">
        <span
          className="font-bold text-white tracking-wide"
          style={{ fontSize: 'clamp(15px, 1.6vw, 22px)' }}
        >
          {emp.name}
        </span>
        <span
          className="text-white/55 font-mono"
          style={{ fontSize: 'clamp(9px, 0.95vw, 12px)' }}
        >
          {emp.meta}
        </span>
      </div>

      {/* ロール */}
      <span
        className="relative px-3 py-1 rounded-full font-semibold"
        style={{
          color: emp.accent,
          background: `${emp.accent}22`,
          border: `1px solid ${emp.accent}44`,
          fontSize: 'clamp(10px, 1vw, 13px)',
        }}
      >
        {emp.role}
      </span>

      {/* セパレータ */}
      <div className="relative w-2/3 h-px" style={{ background: `${emp.accent}33` }} />

      {/* 問題タイトル（要約） */}
      <p
        className="relative font-bold text-white/85 text-center leading-snug whitespace-pre-line"
        style={{ fontSize: 'clamp(11px, 1.1vw, 14px)' }}
      >
        「{emp.problem}」
      </p>

      {/* フッターヒント */}
      <div
        className="relative mt-auto pt-2 w-full flex items-center justify-center gap-1.5"
        style={{ color: `${emp.accent}aa`, fontSize: 'clamp(9px, 0.85vw, 11px)' }}
      >
        <span>クリックで詳細を表示</span>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>

      {/* 下辺アクセントライン */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 pointer-events-none"
        style={{ background: `linear-gradient(90deg, ${emp.accent} 0%, ${emp.accent}00 70%)` }}
      />
    </motion.button>
  );
}

/* ─── スライド本体 ─── */
export default function Slide17EmployeeVoices() {
  const [focused, setFocused] = useState<number | null>(null);

  const close = useCallback(() => setFocused(null), []);

  // Esc で閉じる
  useEffect(() => {
    if (focused === null) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [focused, close]);

  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center w-full h-full max-w-7xl px-4 py-2 pt-14 gap-5"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: focused !== null ? 0.15 : 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {/* ヘッダー */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#c8a8ff]" />
            <span
              className="tracking-[0.32em] uppercase text-white/35"
              style={{ fontSize: 'clamp(9px, 0.9vw, 12px)' }}
            >
              Employee Voices
            </span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#9ee0a8]" />
          </div>
          <h2
            className="font-bold tracking-tight text-white text-center"
            style={{ fontSize: 'clamp(22px, 3vw, 42px)' }}
          >
            経営目標に対する
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{ backgroundImage: 'linear-gradient(90deg, #c8a8ff 0%, #f7c46c 50%, #9ee0a8 100%)' }}
            >
              従業員の声
            </span>
          </h2>
          <span
            className="text-white/45 text-center"
            style={{ fontSize: 'clamp(10px, 1vw, 13px)' }}
          >
            カードをクリックで詳細展開・💡 で MCP 連携ヒントを表示
          </span>
        </div>

        {/* 3カード */}
        <div className="grid grid-cols-3 gap-5 w-full flex-1 min-h-0">
          {EMPLOYEES.map((emp, i) => (
            <PersonaCard
              key={emp.dept}
              emp={emp}
              index={i}
              onClick={() => setFocused(i)}
            />
          ))}
        </div>
      </motion.div>

      {/* ─── フルスクリーン詳細オーバーレイ ─── */}
      <AnimatePresence>
        {focused !== null && (
          <motion.div
            key="fullscreen"
            className="fixed inset-0 z-[200] flex items-center justify-center p-6"
            style={{ background: 'rgba(4,5,12,0.96)', cursor: 'zoom-out' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={close}
            onDoubleClick={close}
          >
            <motion.div
              className="relative w-full max-w-5xl max-h-full rounded-3xl border overflow-hidden flex flex-col"
              style={{
                borderColor: `${EMPLOYEES[focused].accent}66`,
                background:
                  `linear-gradient(160deg, ${EMPLOYEES[focused].accent}18 0%, rgba(10,11,20,0.95) 60%)`,
                boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 80px ${EMPLOYEES[focused].accent}44`,
                cursor: 'default',
              }}
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 10 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={close}
            >
              {/* 上部メタ + 閉じるボタン */}
              <div
                className="shrink-0 flex items-center justify-between px-7 py-4 border-b"
                style={{ borderColor: `${EMPLOYEES[focused].accent}33` }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="rounded-full flex items-center justify-center shrink-0"
                    style={{
                      width: 'clamp(56px, 5.5vw, 72px)',
                      height: 'clamp(56px, 5.5vw, 72px)',
                      background: `radial-gradient(circle, ${EMPLOYEES[focused].accent}33, ${EMPLOYEES[focused].accent}0d)`,
                      border: `1.5px solid ${EMPLOYEES[focused].accent}66`,
                    }}
                  >
                    {EMPLOYEES[focused].avatar === 'female'
                      ? <AvatarFemale color={EMPLOYEES[focused].accent} size={42} />
                      : <AvatarMale color={EMPLOYEES[focused].accent} size={42} />
                    }
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="font-mono tracking-[0.22em] uppercase"
                        style={{ color: `${EMPLOYEES[focused].accent}cc`, fontSize: 'clamp(9px, 0.9vw, 12px)' }}
                      >
                        {EMPLOYEES[focused].dept}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-full font-semibold"
                        style={{
                          color: EMPLOYEES[focused].accent,
                          background: `${EMPLOYEES[focused].accent}22`,
                          border: `1px solid ${EMPLOYEES[focused].accent}44`,
                          fontSize: 'clamp(9px, 0.9vw, 12px)',
                        }}
                      >
                        {EMPLOYEES[focused].role}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span
                        className="font-bold text-white tracking-wide"
                        style={{ fontSize: 'clamp(18px, 2vw, 28px)' }}
                      >
                        {EMPLOYEES[focused].name}
                      </span>
                      <span
                        className="text-white/55 font-mono"
                        style={{ fontSize: 'clamp(10px, 1vw, 13px)' }}
                      >
                        {EMPLOYEES[focused].meta}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 閉じるボタン */}
                <button
                  type="button"
                  onClick={close}
                  className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                  aria-label="閉じる"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* 本体 */}
              <div className="flex-1 overflow-y-auto px-7 py-5 flex flex-col gap-4 min-h-0">
                {/* 問題見出し */}
                <div className="flex items-start gap-3">
                  <span
                    className="shrink-0 mt-1"
                    style={{
                      color: EMPLOYEES[focused].accent,
                      fontSize: 'clamp(20px, 2vw, 28px)',
                      lineHeight: 1,
                    }}
                  >
                    “
                  </span>
                  <p
                    className="font-bold text-white leading-snug whitespace-pre-line"
                    style={{ fontSize: 'clamp(16px, 1.7vw, 24px)' }}
                  >
                    {EMPLOYEES[focused].problem}
                  </p>
                </div>

                {/* 声 */}
                <div
                  className="rounded-xl border px-5 py-4"
                  style={{
                    borderColor: `${EMPLOYEES[focused].accent}22`,
                    background: 'rgba(255,255,255,0.02)',
                  }}
                >
                  <p
                    className="leading-relaxed text-white/80"
                    style={{ fontSize: 'clamp(12px, 1.15vw, 16px)' }}
                  >
                    {EMPLOYEES[focused].voice}
                  </p>
                </div>

                {/* ヒント */}
                <HintsBlock
                  accent={EMPLOYEES[focused].accent}
                  hints={EMPLOYEES[focused].hints}
                />
              </div>

              {/* フッター操作ヒント */}
              <div
                className="shrink-0 flex items-center justify-end gap-2 px-7 py-2 border-t text-white/35"
                style={{
                  borderColor: `${EMPLOYEES[focused].accent}22`,
                  fontSize: 'clamp(9px, 0.85vw, 11px)',
                }}
              >
                <kbd className="px-1.5 py-0.5 rounded border border-white/15 font-mono">Esc</kbd>
                <span>/ ダブルクリック / 背景クリックで閉じる</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SlideWrapper>
  );
}
