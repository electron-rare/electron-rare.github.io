import { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Scanline, Glitch as GlitchEffect } from '@react-three/postprocessing';
import { GlitchMode, BlendFunction } from 'postprocessing';
import * as THREE from 'three';

/* ===================================================================
   WEBGL BACKGROUND — Full-page immersive dark tech layer

   Sections (scroll-driven):
   - HERO (0-100vh): Full atom + particles + text rings
   - ABOUT (100-200vh): Circuit traces + node grid
   - CASES (200-300vh): Floating card planes
   - SPRINTS (300-400vh): Orbital rings
   - CONTACT (400vh+): Atom returns, particles intensify
   =================================================================== */

const COLORS = {
  cyan: new THREE.Color('#5bd1d8'),
  amber: new THREE.Color('#f1c27a'),
  green: new THREE.Color('#b6d18f'),
  electric: new THREE.Color('#0071e3'),
  nucleus: new THREE.Color('#ff6b35'),
  white: new THREE.Color('#ffffff'),
};

const FONT_URL = '/assets/fonts/manrope-regular.ttf';

/* ---------- Shared scroll state ---------- */
let globalScroll = 0;
let globalMaxScroll = 1;

/* ---------- Particle system (persistent across sections) ---------- */
function ParticleField({ count = 800 }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, velocities, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const palette = [COLORS.cyan, COLORS.amber, COLORS.green, COLORS.electric];

    for (let i = 0; i < count; i++) {
      // Spread across a tall vertical volume
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;

      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      sz[i] = 0.02 + Math.random() * 0.04;
    }
    return { positions: pos, velocities: vel, colors: col, sizes: sz };
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const posAttr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const t = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3] + Math.sin(t * 0.3 + i * 0.1) * 0.001;
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];

      // Wrap around
      if (Math.abs(arr[i * 3]) > 12) arr[i * 3] *= -0.5;
      if (Math.abs(arr[i * 3 + 1]) > 35) arr[i * 3 + 1] *= -0.5;
      if (Math.abs(arr[i * 3 + 2]) > 8) arr[i * 3 + 2] *= -0.5;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ---------- Nucleus (Hero center) ---------- */
function Nucleus() {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    const scrollFade = 1; // atome fixe, toujours visible
    const mouseProx = Math.max(0, 1 - Math.sqrt(pointer.x ** 2 + pointer.y ** 2));

    if (coreRef.current) {
      const s = (1 + Math.sin(t * 3) * 0.08 + mouseProx * 0.15) * scrollFade;
      coreRef.current.scale.setScalar(Math.max(0.01, s));
      (coreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.8 + mouseProx * 1;
    }
    if (glowRef.current) {
      const s = (1 + Math.sin(t * 2) * 0.15 + mouseProx * 0.3) * scrollFade;
      glowRef.current.scale.setScalar(Math.max(0.01, s));
      (glowRef.current.material as THREE.MeshStandardMaterial).opacity = (0.15 + mouseProx * 0.2) * scrollFade;
    }
    if (shellRef.current) {
      shellRef.current.rotation.y = t * (0.5 + mouseProx * 2);
      shellRef.current.rotation.x = t * 0.3;
      shellRef.current.scale.setScalar(Math.max(0.01, scrollFade));
    }
  });

  return (
    <group>
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial color={COLORS.electric} wireframe transparent opacity={0.08} emissive={COLORS.electric} emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color={COLORS.nucleus} transparent opacity={0.15} emissive={COLORS.nucleus} emissiveIntensity={1.2} />
      </mesh>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial color="#ffffff" emissive={COLORS.amber} emissiveIntensity={2} metalness={0.6} roughness={0.2} />
      </mesh>
    </group>
  );
}

/* ---------- Orbit ring + electron trail ---------- */
function Orbit({ tilt, speed, color, trailCount = 25 }: {
  tilt: number[]; speed: number; color: THREE.Color; trailCount?: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const ringRef = useRef<THREE.Group>(null);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const R = 3.2;
  const E = 0.38;

  const ringGeo = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * R, Math.sin(a) * R * E, 0));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current || !ringRef.current) return;
    const t = clock.getElapsedTime() * speed + phase;
    const scrollFade = 1; // orbites fixes
    ringRef.current.scale.setScalar(Math.max(0.01, scrollFade));

    for (let i = 0; i < trailCount; i++) {
      const age = i / trailCount;
      const angle = t - age * 0.8;
      dummy.position.set(Math.cos(angle) * R, Math.sin(angle) * R * E, 0);
      dummy.scale.setScalar(Math.max(0.001, ((1 - age) * 0.14 + 0.02)));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={ringRef} rotation={tilt as [number, number, number]}>
      <line geometry={ringGeo}>
        <lineBasicMaterial color={color} transparent opacity={0.12} />
      </line>
      <instancedMesh ref={meshRef} args={[undefined, undefined, trailCount]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.9} />
      </instancedMesh>
    </group>
  );
}

/* ---------- Circuit traces (About section) ---------- */
function CircuitTraces() {
  const groupRef = useRef<THREE.Group>(null);
  const traces = useMemo(() => {
    const lines: { points: THREE.Vector3[]; color: THREE.Color }[] = [];
    for (let i = 0; i < 30; i++) {
      const pts: THREE.Vector3[] = [];
      let x = (Math.random() - 0.5) * 16;
      let y = -15 + (Math.random() - 0.5) * 10;
      pts.push(new THREE.Vector3(x, y, (Math.random() - 0.5) * 4));
      for (let j = 0; j < 4 + Math.floor(Math.random() * 4); j++) {
        // PCB-style: horizontal or vertical segments
        if (Math.random() > 0.5) x += (Math.random() - 0.5) * 3;
        else y += (Math.random() - 0.5) * 2;
        pts.push(new THREE.Vector3(x, y, pts[0].z));
      }
      lines.push({
        points: pts,
        color: [COLORS.cyan, COLORS.green, COLORS.electric][Math.floor(Math.random() * 3)],
      });
    }
    return lines;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const scrollPos = globalScroll;
    // Visible between 20-50% scroll
    const fade = Math.max(0, Math.min(1, (scrollPos - 0.15) * 5)) * Math.max(0, Math.min(1, (0.45 - scrollPos) * 5));
    groupRef.current.children.forEach((child, i) => {
      (child as THREE.Line).material.opacity = fade * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      {traces.map((trace, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints(trace.points);
        return (
          <line key={i} geometry={geo}>
            <lineBasicMaterial color={trace.color} transparent opacity={0.3} blending={THREE.AdditiveBlending} />
          </line>
        );
      })}
    </group>
  );
}

/* ---------- Circuit nodes (solder points) ---------- */
function CircuitNodes() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const count = 40;

  const nodePositions = useMemo(() => {
    const pos: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      pos.push([
        (Math.random() - 0.5) * 16,
        -15 + (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 4,
      ]);
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const scrollPos = globalScroll;
    const fade = Math.max(0, Math.min(1, (scrollPos - 0.15) * 5)) * Math.max(0, Math.min(1, (0.45 - scrollPos) * 5));

    for (let i = 0; i < count; i++) {
      const [x, y, z] = nodePositions[i];
      dummy.position.set(x, y, z);
      const pulse = 1 + Math.sin(t * 2 + i) * 0.3;
      dummy.scale.setScalar(0.06 * pulse * fade);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color={COLORS.cyan} emissive={COLORS.cyan} emissiveIntensity={2} transparent />
    </instancedMesh>
  );
}

/* ---------- Sprint orbital rings ---------- */
function SprintRings() {
  const groupRef = useRef<THREE.Group>(null);
  const rings = [
    { radius: 2.5, color: COLORS.cyan, label: '28%', speed: 0.3 },
    { radius: 3.5, color: COLORS.amber, label: '55%', speed: 0.2 },
    { radius: 4.5, color: COLORS.green, label: '100%', speed: 0.15 },
  ];

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const scrollPos = globalScroll;
    const fade = Math.max(0, Math.min(1, (scrollPos - 0.5) * 5)) * Math.max(0, Math.min(1, (0.8 - scrollPos) * 5));
    groupRef.current.position.y = -35;
    groupRef.current.children.forEach(child => {
      child.scale.setScalar(Math.max(0.01, fade));
    });
  });

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => {
        const pts: THREE.Vector3[] = [];
        for (let j = 0; j <= 128; j++) {
          const a = (j / 128) * Math.PI * 2;
          pts.push(new THREE.Vector3(Math.cos(a) * ring.radius, 0, Math.sin(a) * ring.radius));
        }
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        return (
          <group key={i} rotation={[0.5 + i * 0.3, 0, i * 0.2]}>
            <line geometry={geo}>
              <lineBasicMaterial color={ring.color} transparent opacity={0.25} />
            </line>
          </group>
        );
      })}
    </group>
  );
}

/* ---------- Contact section atom (returns at bottom) ---------- */
function ContactAtom() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const scrollPos = globalScroll;
    const t = clock.getElapsedTime();
    const fade = Math.max(0, (scrollPos - 0.75) * 4);
    groupRef.current.position.y = -55;
    groupRef.current.scale.setScalar(Math.max(0.01, fade * 0.6));
    groupRef.current.rotation.y = t * 0.2;
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.2;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[2, 1]} />
        <meshStandardMaterial color={COLORS.electric} wireframe transparent opacity={0.15} emissive={COLORS.electric} emissiveIntensity={0.5} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color={COLORS.nucleus} transparent opacity={0.2} emissive={COLORS.nucleus} emissiveIntensity={1} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#ffffff" emissive={COLORS.amber} emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

/* ---------- Full scene ---------- */
function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  const orbits = useMemo(() => [
    { tilt: [-0.5, 0, 0], speed: 1.0, color: COLORS.cyan },
    { tilt: [0.5, 0.3, 0], speed: 0.72, color: COLORS.amber },
    { tilt: [1.57, 0.2, 0.4], speed: 0.55, color: COLORS.green },
  ], []);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const mouseDist = Math.sqrt(pointer.x ** 2 + pointer.y ** 2);
    const speedMul = 1 + mouseDist * 0.5;

    // Only the hero atom group rotates with mouse
    const heroGroup = groupRef.current.children[0] as THREE.Group;
    if (heroGroup) {
      heroGroup.rotation.y = t * 0.12 * speedMul + pointer.x * 0.4;
      heroGroup.rotation.x = -0.2 + pointer.y * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Hero atom group */}
      <group>
        <Nucleus />
        {orbits.map((o, i) => (
          <Orbit key={i} tilt={o.tilt} speed={o.speed} color={o.color} />
        ))}
      </group>

      {/* Persistent particles */}
      <ParticleField />
    </group>
  );
}

/* ---------- Scroll-reactive camera ---------- */
function ScrollCamera() {
  const { camera } = useThree();
  const smooth = useRef({ x: 0, y: 0, scroll: 0 });

  useFrame(({ pointer }) => {
    // Smooth interpolation
    smooth.current.x += (pointer.x - smooth.current.x) * 0.05;
    smooth.current.y += (pointer.y - smooth.current.y) * 0.05;
    smooth.current.scroll += (globalScroll - smooth.current.scroll) * 0.08;

    const s = smooth.current.scroll;

    // Camera FIXED — slight parallax from mouse only, no scroll movement
    camera.position.x = smooth.current.x * 1.2;
    camera.position.y = smooth.current.y * 0.6;
    camera.position.z = 14;

    camera.lookAt(
      smooth.current.x * 0.2,
      smooth.current.y * 0.1,
      0
    );
  });

  return null;
}

/* ---------- Exported component ---------- */
export default function WebGLBackground() {
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      globalMaxScroll = Math.max(1, el.scrollHeight - el.clientHeight);
      globalScroll = el.scrollTop / globalMaxScroll;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'auto' }}
      >
        <color attach="background" args={['#080808']} />
        <fog attach="fog" args={['#080808', 6, 22]} />

        <ambientLight intensity={0.06} />
        <pointLight position={[5, 3, 5]} intensity={0.3} color="#ffffff" />
        <pointLight position={[-4, -2, 3]} intensity={0.15} color="#5bd1d8" />
        <pointLight position={[0, -20, -3]} intensity={0.1} color="#f1c27a" />
        <pointLight position={[0, -50, 5]} intensity={0.1} color="#5bd1d8" />

        <ScrollCamera />
        <Scene />

        <EffectComposer>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={0.6} mipmapBlur />
          <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={new THREE.Vector2(0.001, 0.001)} />
          <GlitchEffect delay={new THREE.Vector2(5, 15)} duration={new THREE.Vector2(0.05, 0.2)} strength={new THREE.Vector2(0.02, 0.08)} mode={GlitchMode.SPORADIC} />
          <Scanline blendFunction={BlendFunction.OVERLAY} density={1.5} opacity={0.03} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
