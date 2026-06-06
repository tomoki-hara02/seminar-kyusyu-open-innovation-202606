'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import SlideDesignCanvas, { SLIDE_DESIGN_HEIGHT, SLIDE_DESIGN_WIDTH } from '@/components/SlideDesignCanvas';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import SlideWrapper from '../../SlideWrapper';
import { mulberry32 } from '@/lib/random';

const PHONE_X  = -2.8;
const CLAUDE_X =  0.0;
const STORE_X  =  2.8;
const FLOW_Y   =  0.2;

// ─── 中央：Claude コア（スマホと Firestore の間を仲介する） ───────────────
function ClaudeCore() {
  const wireRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.28;
      wireRef.current.rotation.x = t * 0.12;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.6;
    }
    if (glowRef.current && glowRef.current.material instanceof THREE.MeshBasicMaterial) {
      glowRef.current.material.opacity = 0.32 + Math.sin(t * 2.2) * 0.12;
    }
  });

  return (
    <group position={[CLAUDE_X, FLOW_Y + 0.05, 0]}>
      <group ref={wireRef}>
        <lineSegments>
          <edgesGeometry args={[new THREE.IcosahedronGeometry(0.95, 1)]} />
          <lineBasicMaterial color="#c8a8ff" transparent opacity={0.7} />
        </lineSegments>
        <lineSegments scale={[0.75, 0.75, 0.75]}>
          <edgesGeometry args={[new THREE.IcosahedronGeometry(0.95, 0)]} />
          <lineBasicMaterial color="#88bbff" transparent opacity={0.5} />
        </lineSegments>
      </group>

      <mesh>
        <sphereGeometry args={[0.68, 32, 32]} />
        <meshBasicMaterial color="#7B5EA7" transparent opacity={0.18} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.48, 32, 32]} />
        <meshBasicMaterial
          color="#4F8EF7"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 2.3, 0.3, 0]}>
        <torusGeometry args={[1.2, 0.012, 8, 96]} />
        <meshBasicMaterial color="#ffaacc" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

// ─── 左：スマホ（画面に Claude が整えたデータを表示） ────────────────────
function SourcePhone() {
  const groupRef   = useRef<THREE.Group>(null);
  const glowRef    = useRef<THREE.Mesh>(null);
  const sparkRef   = useRef<THREE.Group>(null);
  const syncBarRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = FLOW_Y + Math.sin(t * 0.7) * 0.05;
      groupRef.current.rotation.y = 0.25 + Math.sin(t * 0.4) * 0.04;
    }
    if (glowRef.current && glowRef.current.material instanceof THREE.MeshBasicMaterial) {
      glowRef.current.material.opacity = 0.38 + Math.sin(t * 2.4) * 0.12;
    }
    if (sparkRef.current) {
      sparkRef.current.rotation.z = t * 0.6;
      const s = 0.9 + Math.sin(t * 3) * 0.14;
      sparkRef.current.scale.set(s, s, 1);
    }
    if (syncBarRef.current && syncBarRef.current.material instanceof THREE.MeshBasicMaterial) {
      syncBarRef.current.material.opacity = 0.45 + Math.sin(t * 2.8) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[PHONE_X, FLOW_Y, 0]} rotation={[0, 0.25, 0]}>
      {/* 本体 */}
      <mesh>
        <boxGeometry args={[1.1, 2.0, 0.08]} />
        <meshBasicMaterial color="#15151c" />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1.1, 2.0, 0.08)]} />
        <lineBasicMaterial color="#88bbff" transparent opacity={0.45} />
      </lineSegments>

      {/* スクリーン地 */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[0.98, 1.82]} />
        <meshBasicMaterial color="#0a0a14" />
      </mesh>

      {/* Claude を匂わせる薄紫の全体グロー */}
      <mesh ref={glowRef} position={[0, 0, 0.046]}>
        <planeGeometry args={[0.98, 1.82]} />
        <meshBasicMaterial
          color="#7B5EA7"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* スピーカーグリル（本体上端） */}
      <mesh position={[0, 0.92, 0.047]}>
        <planeGeometry args={[0.12, 0.018]} />
        <meshBasicMaterial color="#2a2a36" />
      </mesh>

      {/* AI 処理を示すヘッダ帯 */}
      <mesh position={[0, 0.75, 0.047]}>
        <planeGeometry args={[0.88, 0.13]} />
        <meshBasicMaterial color="#1a1a26" />
      </mesh>
      {/* ヘッダ左端：4 点星のスパークル（AI 処理ずみマーカー） */}
      <group ref={sparkRef} position={[-0.34, 0.75, 0.048]}>
        <mesh>
          <planeGeometry args={[0.038, 0.18]} />
          <meshBasicMaterial
            color="#c8a8ff"
            transparent
            opacity={1}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <mesh>
          <planeGeometry args={[0.18, 0.038]} />
          <meshBasicMaterial
            color="#c8a8ff"
            transparent
            opacity={1}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
      {/* ヘッダ中央：Claude ラベル風の細い薄紫帯 */}
      <mesh position={[-0.08, 0.75, 0.048]}>
        <planeGeometry args={[0.32, 0.05]} />
        <meshBasicMaterial color="#c8a8ff" transparent opacity={0.72} />
      </mesh>
      {/* ヘッダ右端：同期完了の緑点 */}
      <mesh position={[0.34, 0.75, 0.048]}>
        <circleGeometry args={[0.025, 14]} />
        <meshBasicMaterial color="#9ee0a8" />
      </mesh>

      {/* セクション区切り（青ヘッダ） */}
      <mesh position={[0, 0.58, 0.047]}>
        <planeGeometry args={[0.88, 0.04]} />
        <meshBasicMaterial color="#4F8EF7" />
      </mesh>

      {/* 抽出済みの key-value 行 */}
      {[0.42, 0.28, 0.14, 0.00, -0.14, -0.28].map((y, i) => (
        <group key={i} position={[0, y, 0.047]}>
          <mesh position={[-0.3, 0, 0]}>
            <planeGeometry args={[0.22, 0.05]} />
            <meshBasicMaterial color="#88bbff" transparent opacity={0.85} />
          </mesh>
          <mesh position={[0.18, 0, 0]}>
            <planeGeometry args={[0.46, 0.05]} />
            <meshBasicMaterial color="#dcdce6" />
          </mesh>
        </group>
      ))}

      {/* 下部：同期ステータスバー（明滅で「いま同期中」感） */}
      <mesh ref={syncBarRef} position={[0, -0.58, 0.047]}>
        <planeGeometry args={[0.88, 0.04]} />
        <meshBasicMaterial
          color="#c8a8ff"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* 双方向同期のプログレスドット（中央だけ緑＝完了側） */}
      {[-0.3, -0.15, 0, 0.15, 0.3].map((x, i) => (
        <mesh key={i} position={[x, -0.72, 0.047]}>
          <circleGeometry args={[0.022, 12]} />
          <meshBasicMaterial
            color={i === 2 ? '#9ee0a8' : '#88bbff'}
            transparent
            opacity={0.75}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── 右：Firestore（古典的な円柱型 DB 表現 + 浮遊するドキュメント） ───────
function FloatingDocument({
  y,
  z,
  delay,
}: {
  y: number;
  z: number;
  delay: number;
}) {
  const ref   = useRef<THREE.Group>(null);
  const bgRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y = y + Math.sin(t * 0.8 + delay) * 0.05;
      ref.current.rotation.y = -0.25 + Math.sin(t * 0.45 + delay) * 0.06;
    }
    if (bgRef.current && bgRef.current.material instanceof THREE.MeshBasicMaterial) {
      bgRef.current.material.opacity = 0.78 + Math.sin(t * 1.1 + delay) * 0.1;
    }
  });

  return (
    <group ref={ref} position={[0, y, z]} rotation={[0, -0.25, 0]}>
      {/* ドキュメントの背景 */}
      <mesh ref={bgRef}>
        <planeGeometry args={[1.0, 0.58]} />
        <meshBasicMaterial color="#0d0d18" transparent opacity={0.85} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(1.0, 0.58)]} />
        <lineBasicMaterial color="#c8a8ff" transparent opacity={0.55} />
      </lineSegments>

      {/* ドキュメント ID チップ */}
      <mesh position={[-0.38, 0.2, 0.01]}>
        <planeGeometry args={[0.18, 0.08]} />
        <meshBasicMaterial color="#4F8EF7" />
      </mesh>

      {/* 内側の key-value 行（簡易表現） */}
      {[0.05, -0.07, -0.19].map((rowY, ri) => (
        <group key={ri} position={[0, rowY, 0.01]}>
          <mesh position={[-0.28, 0, 0]}>
            <planeGeometry args={[0.2, 0.035]} />
            <meshBasicMaterial color="#88bbff" />
          </mesh>
          <mesh position={[0.13, 0, 0]}>
            <planeGeometry args={[0.48, 0.035]} />
            <meshBasicMaterial color="#dcdce6" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function FirestoreVault() {
  const groupRef = useRef<THREE.Group>(null);
  const topPulseRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = FLOW_Y + Math.sin(t * 0.55) * 0.04;
      groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.08;
    }
    if (topPulseRef.current && topPulseRef.current.material instanceof THREE.MeshBasicMaterial) {
      topPulseRef.current.material.opacity = 0.5 + Math.sin(t * 1.8) * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={[STORE_X, FLOW_Y, 0]}>
      {/* シリンダー本体（半透明シェル） */}
      <mesh>
        <cylinderGeometry args={[0.95, 0.95, 2.4, 48, 1, true]} />
        <meshBasicMaterial
          color="#4F8EF7"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* シリンダー縦エッジ */}
      <lineSegments>
        <edgesGeometry args={[new THREE.CylinderGeometry(0.95, 0.95, 2.4, 14, 1, true)]} />
        <lineBasicMaterial color="#88bbff" transparent opacity={0.35} />
      </lineSegments>

      {/* 古典的 DB アイコンのスタック層を表す水平リング */}
      {[1.2, 0.4, -0.4, -1.2].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.95, 0.012, 8, 64]} />
          <meshBasicMaterial
            color={i === 0 ? '#c8a8ff' : '#88bbff'}
            transparent
            opacity={i === 0 ? 0.85 : 0.55}
          />
        </mesh>
      ))}

      {/* 上端リング — 書込中インジケータ */}
      <mesh ref={topPulseRef} position={[0, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.02, 0.022, 8, 64]} />
        <meshBasicMaterial
          color="#c8a8ff"
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 浮遊するドキュメント — シリンダー前面に3枚 */}
      <FloatingDocument y={ 0.75} z={1.15} delay={0.0} />
      <FloatingDocument y={-0.05} z={1.05} delay={1.2} />
      <FloatingDocument y={-0.85} z={1.10} delay={2.4} />

      {/* 接地リング */}
      <mesh position={[0, -1.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.92, 1.45, 48]} />
        <meshBasicMaterial
          color="#4F8EF7"
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// ─── 双方向データストリーム（書込/読出で色が違う） ──────────────────────
function DataStream({
  from,
  to,
  count,
  seed,
  color,
  speed = 0.45,
}: {
  from: [number, number, number];
  to: [number, number, number];
  count: number;
  seed: number;
  color: string;
  speed?: number;
}) {
  const packetsRef = useRef<THREE.Group>(null);

  const offsets = useMemo(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: count }, () => rand());
  }, [count, seed]);

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setFromPoints([new THREE.Vector3(...from), new THREE.Vector3(...to)]);
    return g;
  }, [from, to]);

  useEffect(() => () => lineGeo.dispose(), [lineGeo]);

  useFrame(({ clock }) => {
    if (!packetsRef.current) return;
    const t = clock.getElapsedTime();
    packetsRef.current.children.forEach((child, i) => {
      const phase = (t * speed + offsets[i]) % 1;
      child.position.x = from[0] + (to[0] - from[0]) * phase;
      child.position.y =
        from[1] + (to[1] - from[1]) * phase + Math.sin(phase * Math.PI * 2.5) * 0.04;
      child.position.z = from[2] + (to[2] - from[2]) * phase;
      const visible = Math.sin(phase * Math.PI);
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
        child.material.opacity = visible;
      }
      child.scale.setScalar(0.5 + visible * 0.9);
    });
  });

  return (
    <group>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color={color} transparent opacity={0.25} />
      </lineSegments>

      <group ref={packetsRef}>
        {offsets.map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.05, 14, 14]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ─── 周囲を漂うパーティクル ────────────────────────────────────────────────
function ParticleHalo({ count = 1100 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const geo = useMemo(() => {
    const rand = mulberry32(0x2bd14e ^ count);
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#88bbff'),
      new THREE.Color('#c8a8ff'),
      new THREE.Color('#ffaacc'),
    ];
    for (let i = 0; i < count; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const r = 4.2 + rand() * 2.6;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      pos[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[i % palette.length];
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    return g;
  }, [count]);

  useEffect(() => () => geo.dispose(), [geo]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = -clock.getElapsedTime() * 0.04;
      ref.current.rotation.x =  clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial vertexColors size={0.026} sizeAttenuation transparent opacity={0.55} />
    </points>
  );
}

export default function Slide12FirestoreSync3D() {
  return (
    <SlideWrapper>
      <div
        className="absolute z-0 overflow-hidden"
        style={{ left: 0, top: 0, width: SLIDE_DESIGN_WIDTH, height: SLIDE_DESIGN_HEIGHT }}
      >
        <SlideDesignCanvas
          camera={{ position: [0, 1.35, 7.4], fov: 50 }}
          style={{ background: '#0a0a0f' }}
          onCreated={({ camera }) => camera.lookAt(0, 0.15, 0)}
        >
          <color attach="background" args={['#0a0a0f']} />

          <SourcePhone />
          <ClaudeCore />

          {/* 上段：スマホ → Claude → Firestore（書込） */}
          <DataStream
            from={[PHONE_X + 0.7, FLOW_Y + 0.4, 0.05]}
            to={[CLAUDE_X - 0.9, FLOW_Y + 0.4, 0]}
            count={6}
            seed={0xb2c4}
            color="#88bbff"
            speed={0.6}
          />
          <DataStream
            from={[CLAUDE_X + 0.9, FLOW_Y + 0.4, 0]}
            to={[STORE_X - 1.0, FLOW_Y + 0.4, 0]}
            count={6}
            seed={0x3a5e}
            color="#88bbff"
            speed={0.6}
          />

          {/* 下段：Firestore → Claude → スマホ（読出） */}
          <DataStream
            from={[STORE_X - 1.0, FLOW_Y - 0.4, 0]}
            to={[CLAUDE_X + 0.9, FLOW_Y - 0.4, 0]}
            count={6}
            seed={0xe17a}
            color="#ffaacc"
            speed={0.6}
          />
          <DataStream
            from={[CLAUDE_X - 0.9, FLOW_Y - 0.4, 0]}
            to={[PHONE_X + 0.7, FLOW_Y - 0.4, 0.05]}
            count={6}
            seed={0x912d}
            color="#ffaacc"
            speed={0.6}
          />

          <FirestoreVault />
          <ParticleHalo count={1100} />
        </SlideDesignCanvas>
      </div>

      <div
        className="absolute inset-y-0 left-0 z-10 w-[52%] pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(10,10,15,0.96) 0%, rgba(10,10,15,0.65) 50%, transparent 100%)',
        }}
      />

      <motion.div
        className="absolute z-20 flex flex-col items-start gap-3 w-full max-w-xl pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        style={{ top: '12%', left: '8%' }}
      >
        <span className="text-[10px] tracking-[0.22em] uppercase text-white/40">
          実例③ · 同期
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-snug">
          データにAIでアクセス
        </h2>
        <p className="text-sm md:text-base text-white leading-relaxed mt-2 max-w-md">
          スマホと Firestore のあいだに Claude を置くと、保存・検索・整形・連携まで会話で完結します
        </p>
      </motion.div>

      <div
        className="absolute z-20 flex items-center justify-between pointer-events-none"
        style={{ left: '12%', right: '12%', bottom: '11%' }}
      >
        <span
          className="tracking-[0.22em] uppercase text-white/45"
          style={{ fontSize: 'clamp(10px, 0.85vw, 11px)' }}
        >
          Mobile App
        </span>
        <span
          className="tracking-[0.28em] uppercase text-white/80"
          style={{ fontSize: 'clamp(11px, 0.95vw, 13px)' }}
        >
          Claude
        </span>
        <span
          className="tracking-[0.22em] uppercase text-white/45"
          style={{ fontSize: 'clamp(10px, 0.85vw, 11px)' }}
        >
          Firestore
        </span>
      </div>

      <div
        className="absolute z-20 flex items-center justify-between pointer-events-none"
        style={{ left: '8%', right: '8%', bottom: '5%' }}
      >
        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-2 text-[#88bbff]/85 uppercase"
            style={{ fontSize: 'clamp(10px, 0.85vw, 11px)', letterSpacing: '0.22em' }}
          >
            <span className="h-px w-5 bg-[#88bbff]/70" />
            write
          </div>
          <div
            className="flex items-center gap-2 text-[#ffaacc]/85 uppercase"
            style={{ fontSize: 'clamp(10px, 0.85vw, 11px)', letterSpacing: '0.22em' }}
          >
            <span className="h-px w-5 bg-[#ffaacc]/70" />
            read
          </div>
        </div>

        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-[#88bbff]"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <span
            className="tracking-[0.22em] uppercase text-white/40"
            style={{ fontSize: 'clamp(10px, 0.85vw, 11px)' }}
          >
            Write · Index · Recall
          </span>
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
