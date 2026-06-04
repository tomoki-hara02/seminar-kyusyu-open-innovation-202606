'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';

/**
 * p26: 生成AIの問題を4つの分析軸に分ける
 *
 * 左: PC / 右: AI モデル — INPUT・OUTPUT の双方向データフロー（図のみ）
 * 下段: ①〜④の説明テキスト
 */

/* ────────── PC メッシュ（p8 と同じ） ────────── */
function PCMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const screenGlowRef = useRef<THREE.Mesh>(null);

  const kbGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pts: number[] = [];
    for (let row = 0; row < 4; row++) {
      const z = -0.38 + row * 0.26;
      pts.push(-0.78, 0.06, z,  0.78, 0.06, z);
    }
    for (let col = 0; col < 6; col++) {
      const x = -0.78 + col * 0.312;
      pts.push(x, 0.06, -0.38,  x, 0.06, 0.38);
    }
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, []);

  const screenContentGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pts: number[] = [];
    pts.push(-0.72, 0.50, 0.05,  0.72, 0.50, 0.05);
    pts.push(-0.72, 0.36, 0.05,  0.72, 0.36, 0.05);
    const rows = [0.18, 0.02, -0.14, -0.30, -0.44];
    const widths = [1.1, 0.8, 1.0, 0.6, 0.9];
    rows.forEach((y, i) => {
      const hw = widths[i] / 2;
      pts.push(-hw, y, 0.05,  hw, y, 0.05);
    });
    pts.push(-0.45, 0.36, 0.05, -0.45, -0.52, 0.05);
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.18;
      groupRef.current.rotation.x = Math.sin(t * 0.28) * 0.06;
    }
    if (screenGlowRef.current && screenGlowRef.current.material instanceof THREE.MeshBasicMaterial) {
      screenGlowRef.current.material.opacity = 0.15 + Math.sin(t * 1.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <group position={[0, -0.5, 0]}>
        <mesh>
          <boxGeometry args={[1.85, 0.1, 1.25]} />
          <meshBasicMaterial color="#4F8EF7" transparent opacity={0.1} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.85, 0.1, 1.25)]} />
          <lineBasicMaterial color="#88bbff" />
        </lineSegments>
        <lineSegments geometry={kbGeo}>
          <lineBasicMaterial color="#c8a8ff" transparent opacity={0.4} />
        </lineSegments>
        <group position={[0, 0.06, 0.35]}>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.55, 0.02, 0.32)]} />
            <lineBasicMaterial color="#88bbff" transparent opacity={0.5} />
          </lineSegments>
        </group>
      </group>

      <group position={[0, 0.27, -0.62]} rotation={[-0.28, 0, 0]}>
        <mesh ref={screenGlowRef}>
          <boxGeometry args={[1.85, 1.22, 0.06]} />
          <meshBasicMaterial color="#4F8EF7" transparent opacity={0.15} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.85, 1.22, 0.06)]} />
          <lineBasicMaterial color="#88bbff" />
        </lineSegments>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.62, 1.0, 0.07)]} />
          <lineBasicMaterial color="#c8a8ff" transparent opacity={0.55} />
        </lineSegments>
        <lineSegments geometry={screenContentGeo}>
          <lineBasicMaterial color="#88bbff" transparent opacity={0.5} />
        </lineSegments>
      </group>
    </group>
  );
}

/* ────────── AI モデル（icosahedron + リング + 中心コア） ────────── */
function AIModel() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const coreRef  = useRef<THREE.Mesh>(null);

  // 外周のノード（ニューラルネット風）
  const nodes = useMemo<[number, number, number][]>(() => {
    const out: [number, number, number][] = [];
    const N = 12;
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(2 * (i + 0.5) / N - 1);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 0.95;
      out.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ]);
    }
    return out;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = -t * 0.18;
      groupRef.current.rotation.x = Math.sin(t * 0.25) * 0.08;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.5;
    if (ring2Ref.current) ring2Ref.current.rotation.x = t * 0.35;
    if (ring3Ref.current) ring3Ref.current.rotation.y = t * 0.6;
    if (coreRef.current && coreRef.current.material instanceof THREE.MeshBasicMaterial) {
      coreRef.current.material.opacity = 0.45 + Math.sin(t * 1.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 外殻 (icosahedron wireframe) */}
      <mesh>
        <icosahedronGeometry args={[0.85, 0]} />
        <meshBasicMaterial color="#c8a8ff" transparent opacity={0.08} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(0.85, 0)]} />
        <lineBasicMaterial color="#c8a8ff" />
      </lineSegments>

      {/* 内部のもう一層 */}
      <lineSegments>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(0.55, 1)]} />
        <lineBasicMaterial color="#88bbff" transparent opacity={0.5} />
      </lineSegments>

      {/* 中心コア（パルス） */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshBasicMaterial color="#FF6B9D" transparent opacity={0.5} />
      </mesh>

      {/* 回転リング 3 本 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.15, 0.012, 8, 96]} />
        <meshBasicMaterial color="#88bbff" transparent opacity={0.7} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.3, 0.01, 8, 96]} />
        <meshBasicMaterial color="#ffaacc" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[1.45, 0.008, 8, 96]} />
        <meshBasicMaterial color="#c8a8ff" transparent opacity={0.35} />
      </mesh>

      {/* 外周ノード */}
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color={i % 3 === 0 ? '#FF6B9D' : i % 3 === 1 ? '#88bbff' : '#c8a8ff'} />
        </mesh>
      ))}
    </group>
  );
}

/* ────────── データストリーム（粒子が直線+波形でループ） ────────── */
function DataStream({
  startX,
  endX,
  yBase,
  zBase,
  color,
  count = 60,
  speed = 0.35,
  amp = 0.15,
  freq = 4,
}: {
  startX: number;
  endX: number;
  yBase: number;
  zBase: number;
  color: string;
  count?: number;
  speed?: number;
  amp?: number;
  freq?: number;
}) {
  const ref = useRef<THREE.Points>(null);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const phase = ((t + i / count) % 1 + 1) % 1;
      const x = startX + (endX - startX) * phase;
      const y = yBase + Math.sin(phase * Math.PI * freq) * amp;
      arr[i * 3]     = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = zBase + Math.cos(phase * Math.PI * freq) * (amp * 0.4);
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        color={color}
        size={0.08}
        sizeAttenuation
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ────────── 接続ライン（中央に薄く） ────────── */
function ConnectionLine({ startX, endX, y, color }: { startX: number; endX: number; y: number; color: string }) {
  const lineObj = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pts: number[] = [];
    const segs = 60;
    for (let i = 0; i <= segs; i++) {
      const x = startX + (endX - startX) * (i / segs);
      pts.push(x, y, 0);
    }
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.28 });
    return new THREE.Line(g, mat);
  }, [startX, endX, y, color]);

  useFrame(({ clock }) => {
    const mat = lineObj.material as THREE.LineBasicMaterial;
    mat.opacity = 0.25 + Math.sin(clock.getElapsedTime() * 0.8) * 0.08;
  });

  return <primitive object={lineObj} />;
}

/* ────────── 分析項目データ ────────── */
const ANALYSIS_ITEMS = [
  {
    id: 'literacy',
    index: '①',
    sectionLabel: 'ユーザー',
    title: 'ユーザー',
    titleGradient: 'linear-gradient(90deg, #f7c46c 0%, #ffaacc 100%)',
    accent: '#f7c46c',
    bullets: [
      'アカウント管理',
      'ユーザー属性',
      'リテラシー',
    ],
  },
  {
    id: 'input',
    index: '②',
    sectionLabel: 'INPUT',
    title: '入力情報の権利処理',
    titleGradient: 'linear-gradient(90deg, #4F8EF7 0%, #88bbff 100%)',
    accent: '#88bbff',
    bullets: [
      '社内データ・顧客情報の取扱い',
      '著作物・第三者情報の権利確認',
      '個人情報の同意・匿名化',
    ],
  },
  {
    id: 'compute',
    index: '③',
    sectionLabel: '演算環境',
    title: 'モデル基盤',
    titleGradient: 'linear-gradient(90deg, #c8a8ff 0%, #88bbff 100%)',
    accent: '#c8a8ff',
    bullets: [
      '利用規約',
      'データレジデンシー',
      'サービス提供者',
    ],
  },
  {
    id: 'output',
    index: '④',
    sectionLabel: 'OUTPUT',
    title: '出力の取扱い',
    titleGradient: 'linear-gradient(90deg, #c8a8ff 0%, #FF6B9D 100%)',
    accent: '#FF6B9D',
    bullets: [
      '守秘義務との関係',
      '利用前の社内審査',
    ],
  },
] as const;

/* ────────── スライド本体 ────────── */
export default function Slide26DataFlow() {
  return (
    <SlideWrapper>
      <div className="flex flex-col w-full h-full min-h-0">

        {/* ── ① タイトル（中央寄せ・上部固定） ── */}
        <motion.div
          className="shrink-0 flex flex-col items-center gap-2 pt-12 px-6 pb-1 z-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2
            className="font-bold tracking-tight text-white leading-snug text-center"
            style={{ fontSize: 'clamp(20px, 2.55vw, 36px)' }}
          >
            生成AI社内規程に関する
            <span
              className="bg-clip-text text-transparent ml-1"
              style={{ backgroundImage: 'linear-gradient(90deg, #4F8EF7 0%, #c8a8ff 50%, #FF6B9D 100%)' }}
            >
              ４つの分析セグメント
            </span>
          </h2>
        </motion.div>

        {/* ── ② 3D キャンバス（タイトルと下段テキストの間で中央配置） ── */}
        <div className="relative flex-1 min-h-0 flex items-center justify-center px-4 z-0">
          <div className="relative w-full h-full max-h-[min(58vh,540px)]">
          <Canvas
            camera={{ position: [0, 0.2, 5.4], fov: 44 }}
            gl={{ antialias: true, alpha: false }}
            style={{ background: '#0a0a0f', width: '100%', height: '100%' }}
          >
            <color attach="background" args={['#0a0a0f']} />

            {/* PC（左） */}
            <group position={[-3, 0.08, 0]} scale={1.12}>
              <PCMesh />
            </group>

            {/* AI モデル（右） */}
            <group position={[3, 0.08, 0]} scale={1.12}>
              <AIModel />
            </group>

            {/* 接続ライン */}
            <ConnectionLine startX={-1.9} endX={1.9} y={0.15}  color="#88bbff" />
            <ConnectionLine startX={-1.9} endX={1.9} y={-0.3}  color="#FF6B9D" />

            {/* 入力ストリーム: PC → AI */}
            <DataStream
              startX={-1.9} endX={1.9}
              yBase={0.15} zBase={0}
              color="#88bbff"
              count={45} speed={0.32} amp={0.14} freq={3.5}
            />
            {/* 出力ストリーム: AI → PC */}
            <DataStream
              startX={1.9} endX={-1.9}
              yBase={-0.3} zBase={0}
              color="#FF6B9D"
              count={45} speed={0.32} amp={0.14} freq={3.5}
            />
          </Canvas>
          </div>
        </div>

        {/* ── ③ テキストブロック（4列並列） ── */}
        <div className="shrink-0 flex-1 grid grid-cols-4 gap-3 content-start px-5 pt-2 pb-8 z-10">
          {ANALYSIS_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              className="flex flex-col items-center text-center gap-1.5 min-w-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 + i * 0.08 }}
            >
              <div className="flex items-center gap-1.5 w-full justify-center">
                <span
                  className="h-px flex-1 max-w-6"
                  style={{ background: `linear-gradient(90deg, transparent, ${item.accent}66)` }}
                />
                <span
                  className="font-mono tracking-widest whitespace-nowrap shrink-0"
                  style={{ color: item.accent, fontSize: 'clamp(10px, 0.95vw, 13px)' }}
                >
                  {item.index} {item.sectionLabel}
                </span>
                <span
                  className="h-px flex-1 max-w-6"
                  style={{ background: `linear-gradient(90deg, ${item.accent}66, transparent)` }}
                />
              </div>
              <h3
                className="font-bold text-white leading-tight"
                style={{ fontSize: 'clamp(13px, 1.25vw, 18px)' }}
              >
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: item.titleGradient }}
                >
                  {item.title}
                </span>
              </h3>
              <div className="flex flex-col gap-0.5 w-full max-w-[220px] mx-auto">
                {item.bullets.map((bullet) => (
                  <div key={bullet} className="grid grid-cols-[1em_1fr] gap-x-1.5 items-baseline w-full">
                    <span
                      className="shrink-0 leading-none"
                      style={{ color: item.accent, fontSize: 'clamp(11px, 1vw, 14px)' }}
                    >
                      ▸
                    </span>
                    <span
                      className="text-white/70 leading-snug text-left"
                      style={{ fontSize: 'clamp(11px, 1vw, 14px)' }}
                    >
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </SlideWrapper>
  );
}
