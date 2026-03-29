import { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Scanline, Glitch as GlitchEffect } from '@react-three/postprocessing';
import { GlitchMode, BlendFunction } from 'postprocessing';
import * as THREE from 'three';

/* ===================================================================
   ATOM GLITCH — cinematic WebGL countdown for L'Electron Rare
   - Nucleus core with pulsing energy
   - 3 electron orbits with trail particles
   - Particle cloud (electrons as sparks)
   - Post-processing: bloom, chromatic aberration, glitch, scanlines
   - Mouse-reactive + auto-orbit
   =================================================================== */

const COLORS = {
  cyan: new THREE.Color('#5bd1d8'),
  amber: new THREE.Color('#f1c27a'),
  green: new THREE.Color('#b6d18f'),
  electric: new THREE.Color('#0071e3'),
  white: new THREE.Color('#ffffff'),
  nucleus: new THREE.Color('#ff6b35'),
};

/* ---------- Particle cloud around the atom ---------- */
function ParticleField({ count = 600 }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, velocities, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [COLORS.cyan, COLORS.amber, COLORS.green, COLORS.electric];

    for (let i = 0; i < count; i++) {
      const r = 2 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      vel[i * 3] = (Math.random() - 0.5) * 0.004;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.004;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.004;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, velocities: vel, colors: col };
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const posAttr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const t = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3] + Math.sin(t * 0.5 + i) * 0.002;
      arr[i * 3 + 1] += velocities[i * 3 + 1] + Math.cos(t * 0.3 + i) * 0.002;
      arr[i * 3 + 2] += velocities[i * 3 + 2];

      // respawn far particles
      const dist = Math.sqrt(arr[i * 3] ** 2 + arr[i * 3 + 1] ** 2 + arr[i * 3 + 2] ** 2);
      if (dist > 8) {
        const r = 2 + Math.random() * 2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        arr[i * 3 + 2] = r * Math.cos(phi);
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.7} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

/* ---------- Orbit trail (instanced tube of spheres) ---------- */
function OrbitTrail({ tilt, speed, color, trailCount = 30 }: { tilt: number[]; speed: number; color: THREE.Color; trailCount?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const orbitA = 3.2;
  const orbitB = orbitA * 0.38;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * speed + phase;

    for (let i = 0; i < trailCount; i++) {
      const age = i / trailCount;
      const angle = t - age * 0.8;
      dummy.position.set(Math.cos(angle) * orbitA, Math.sin(angle) * orbitB, 0);
      const s = (1 - age) * 0.14 + 0.02;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group rotation={tilt as [number, number, number]}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, trailCount]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.9} />
      </instancedMesh>
    </group>
  );
}

/* ---------- Orbit ring (thin glowing line) ---------- */
function OrbitRing({ tilt, color }: { tilt: number[]; color: THREE.Color }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const t = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(t) * 3.2, Math.sin(t) * 3.2 * 0.38, 0));
    }
    return pts;
  }, []);
  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <group rotation={tilt as [number, number, number]}>
      <line geometry={geo}>
        <lineBasicMaterial color={color} transparent opacity={0.12} />
      </line>
    </group>
  );
}

/* ---------- Nucleus: pulsing energy core ---------- */
function Nucleus() {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    const mouseDist = Math.sqrt(pointer.x ** 2 + pointer.y ** 2);
    const mouseProximity = Math.max(0, 1 - mouseDist); // 1 at center, 0 at edges

    if (coreRef.current) {
      const s = 1 + Math.sin(t * 3) * 0.08 + Math.sin(t * 7.3) * 0.03 + mouseProximity * 0.15;
      coreRef.current.scale.setScalar(s);
      (coreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 2 + mouseProximity * 3;
    }
    if (glowRef.current) {
      const s = 1 + Math.sin(t * 2) * 0.15 + mouseProximity * 0.3;
      glowRef.current.scale.setScalar(s);
      (glowRef.current.material as THREE.MeshStandardMaterial).opacity = 0.15 + Math.sin(t * 4) * 0.08 + mouseProximity * 0.2;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = t * (0.5 + mouseProximity * 2);
      outerRef.current.rotation.x = t * (0.3 + mouseProximity * 1.5);
    }
  });

  return (
    <group>
      {/* outer energy shell */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial color={COLORS.electric} wireframe transparent opacity={0.08} emissive={COLORS.electric} emissiveIntensity={0.5} />
      </mesh>
      {/* glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color={COLORS.nucleus} transparent opacity={0.15} emissive={COLORS.nucleus} emissiveIntensity={1.2} />
      </mesh>
      {/* solid core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial color="#ffffff" emissive={COLORS.amber} emissiveIntensity={2} metalness={0.6} roughness={0.2} />
      </mesh>
    </group>
  );
}

/* ---------- Energy arcs (random lightning) ---------- */
function EnergyArc({ color }: { color: THREE.Color }) {
  const ref = useRef<THREE.Line>(null);
  const [visible, setVisible] = useState(true);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // flash randomly
    setVisible(Math.sin(t * 12 + Math.random() * 100) > 0.7);

    if (ref.current && visible) {
      const geo = ref.current.geometry;
      const pts: THREE.Vector3[] = [];
      const segments = 8;
      const startAngle = Math.sin(t * 2) * Math.PI;
      for (let i = 0; i <= segments; i++) {
        const frac = i / segments;
        const r = 0.4 + frac * 2.5;
        const angle = startAngle + frac * 1.5;
        pts.push(new THREE.Vector3(
          Math.cos(angle) * r + (Math.random() - 0.5) * 0.3,
          Math.sin(angle) * r * 0.4 + (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.4,
        ));
      }
      geo.setFromPoints(pts);
    }
  });

  if (!visible) return null;

  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color={color} transparent opacity={0.4} blending={THREE.AdditiveBlending} />
    </line>
  );
}

/* ---------- 3D Circular / Orbital text ---------- */
const LAUNCH = new Date('2026-05-01T00:00:00+02:00').getTime();
const FONT_URL = '/assets/fonts/manrope-regular.ttf';

function pad(n: number) { return String(n).padStart(2, '0'); }

/* Each character placed on a circle arc, rotating together */
function CircularText({ text, radius, speed, tilt, fontSize, color, emissive, opacity = 0.9, spread = 0.8 }: {
  text: string; radius: number; speed: number; tilt: number[];
  fontSize: number; color: string; emissive: string; opacity?: number; spread?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const chars = useMemo(() => text.split(''), [text]);
  const charWidth = fontSize * 0.55;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime() * speed;
    groupRef.current.rotation.y = t;
  });

  return (
    <group rotation={tilt as [number, number, number]}>
      <group ref={groupRef}>
        {chars.map((char, i) => {
          const angle = ((i - chars.length / 2) * charWidth * spread) / radius;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          return (
            <Text
              key={i}
              position={[x, 0, z]}
              rotation={[0, -angle, 0]}
              fontSize={fontSize}
              font={FONT_URL}
              anchorX="center"
              anchorY="middle"
            >
              {char}
              <meshStandardMaterial
                color={color}
                emissive={emissive}
                emissiveIntensity={0.6}
                transparent
                opacity={opacity}
                side={THREE.DoubleSide}
              />
            </Text>
          );
        })}
      </group>
    </group>
  );
}

/* Countdown — characters on a spinning ring */
function CountdownRing() {
  const [time, setTime] = useState('');
  const groupRef = useRef<THREE.Group>(null);
  const radius = 4.2;

  useEffect(() => {
    function tick() {
      const diff = Math.max(0, LAUNCH - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTime(`${pad(d)}J  ${pad(h)}H  ${pad(m)}M  ${pad(s)}S`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * -0.2;
  });

  const chars = time.split('');
  const fontSize = 0.28;
  const charWidth = fontSize * 0.5;

  return (
    <group rotation={[0.3, 0, 0.1]}>
      <group ref={groupRef}>
        {chars.map((char, i) => {
          const angle = ((i - chars.length / 2) * charWidth * 0.9) / radius;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          return (
            <Text
              key={i}
              position={[x, 0, z]}
              rotation={[0, -angle, 0]}
              fontSize={fontSize}
              font={FONT_URL}
              anchorX="center"
              anchorY="middle"
            >
              {char}
              <meshStandardMaterial
                color="#ffffff"
                emissive="#5bd1d8"
                emissiveIntensity={0.8}
                transparent
                opacity={0.95}
                side={THREE.DoubleSide}
              />
            </Text>
          );
        })}
      </group>
    </group>
  );
}

/* All circular texts assembled */
function CountdownText() {
  return (
    <group>
      {/* "L'electron" — large ring, slow spin */}
      <CircularText
        text={"L'\u00e9lectron"}
        radius={3.8}
        speed={0.15}
        tilt={[-0.3, 0, 0]}
        fontSize={0.55}
        color="#ffffff"
        emissive="#ffffff"
        spread={0.9}
      />

      {/* "rare" — opposite tilt, bigger */}
      <CircularText
        text="rare"
        radius={3.5}
        speed={-0.2}
        tilt={[0.5, 0.2, 0]}
        fontSize={0.85}
        color="#ffffff"
        emissive="#5bd1d8"
        spread={1.0}
      />

      {/* Subtitle — wider ring, slow */}
      <CircularText
        text="SYSTEMES  ELECTRONIQUES  SPECIFIQUES"
        radius={5.2}
        speed={0.08}
        tilt={[1.3, 0.2, 0.4]}
        fontSize={0.11}
        color="#ffffff"
        emissive="#5bd1d8"
        opacity={0.35}
        spread={0.7}
      />

      {/* "LANCEMENT DANS" — small ring */}
      <CircularText
        text="LANCEMENT  DANS"
        radius={3.2}
        speed={0.25}
        tilt={[-0.7, -0.3, 0.2]}
        fontSize={0.1}
        color="#5bd1d8"
        emissive="#5bd1d8"
        opacity={0.5}
        spread={0.8}
      />

      {/* Countdown timer — spinning ring */}
      <CountdownRing />

      {/* Extra decorative text rings */}
      <CircularText
        text="electronique  automatisme  energie  stockage  prototypage  formation"
        radius={5.8}
        speed={-0.05}
        tilt={[0.8, -0.4, 0.6]}
        fontSize={0.07}
        color="#5bd1d8"
        emissive="#5bd1d8"
        opacity={0.2}
        spread={0.5}
      />
    </group>
  );
}

/* ---------- Main scene ---------- */
function AtomScene() {
  const groupRef = useRef<THREE.Group>(null);

  const orbits = useMemo(() => [
    { tilt: [-0.5, 0, 0], speed: 1.0, color: COLORS.cyan },
    { tilt: [0.5, 0.3, 0], speed: 0.72, color: COLORS.amber },
    { tilt: [1.57, 0.2, 0.4], speed: 0.55, color: COLORS.green },
  ], []);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    // Mouse distance from center = speed boost
    const mouseDist = Math.sqrt(pointer.x ** 2 + pointer.y ** 2);
    const speedMul = 1 + mouseDist * 0.8;
    groupRef.current.rotation.y = t * 0.12 * speedMul + pointer.x * 0.6;
    groupRef.current.rotation.x = -0.2 + pointer.y * 0.4;
    groupRef.current.rotation.z = pointer.x * 0.1;
  });

  return (
    <group ref={groupRef}>
      <Nucleus />
      {orbits.map((o, i) => (
        <OrbitRing key={`ring-${i}`} tilt={o.tilt} color={o.color} />
      ))}
      {orbits.map((o, i) => (
        <OrbitTrail key={`trail-${i}`} tilt={o.tilt} speed={o.speed} color={o.color} />
      ))}
      <EnergyArc color={COLORS.cyan} />
      <EnergyArc color={COLORS.amber} />
      <ParticleField />
      {/* Textes orbitants — dans le groupe, tournent avec l'atome */}
      <CountdownText />
    </group>
  );
}

/* ---------- Camera with mouse parallax ---------- */
function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();

    // Smooth mouse follow (lerp)
    mouse.current.x = pointer.x;
    mouse.current.y = pointer.y;
    smooth.current.x += (mouse.current.x - smooth.current.x) * 0.05;
    smooth.current.y += (mouse.current.y - smooth.current.y) * 0.05;

    // Camera orbits gently + follows mouse
    camera.position.x = Math.sin(t * 0.08) * 0.5 + smooth.current.x * 2.5;
    camera.position.y = Math.cos(t * 0.06) * 0.3 + smooth.current.y * 1.5;
    camera.position.z = 9 + Math.sin(t * 0.1) * 0.3;
    camera.lookAt(smooth.current.x * 0.5, smooth.current.y * 0.3, 0);
  });

  return null;
}

/* ---------- Exported component ---------- */
export default function AtomGlitch() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
      aria-label="Atome 3D animé — L'Electron Rare"
      role="img"
    >
      <Canvas
        camera={{ position: [0, -0.5, 9], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 8, 18]} />

        <ambientLight intensity={0.15} />
        <pointLight position={[5, 3, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-4, -2, 3]} intensity={0.4} color="#5bd1d8" />
        <pointLight position={[0, 4, -3]} intensity={0.3} color="#f1c27a" />

        <CameraRig />
        <AtomScene />

        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.8} mipmapBlur />
          <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={new THREE.Vector2(0.002, 0.002)} />
          <GlitchEffect delay={new THREE.Vector2(3, 8)} duration={new THREE.Vector2(0.1, 0.4)} strength={new THREE.Vector2(0.05, 0.15)} mode={GlitchMode.SPORADIC} />
          <Scanline blendFunction={BlendFunction.OVERLAY} density={1.8} opacity={0.05} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
