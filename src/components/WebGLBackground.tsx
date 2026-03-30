import { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, useGLTF } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Scanline } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

/* ===================================================================
   PCB JOURNEY v2 — Real KiCad PCB + real component GLBs

   The BMU v2 PCB is loaded as the central 3D object.
   Camera orbits around it, zooming into component zones on scroll.
   Real GLB components from KiCad library placed on the board.
   Current flows along the copper traces.
   =================================================================== */

const COLORS = {
  copper: new THREE.Color('#c87533'),
  copperBright: new THREE.Color('#e8a040'),
  current: new THREE.Color('#5bd1d8'),
  currentWarm: new THREE.Color('#f1c27a'),
  silkscreen: new THREE.Color('#e8e8d0'),
};

const FONT_URL = '/assets/fonts/orbitron-bold.ttf';

/* ---------- Scroll state ---------- */
let scrollProgress = 0;

/* ---------- Real PCB Board (full 3D with components from FreeCAD) ---------- */
function RealPCB() {
  let glb: any = null;
  try { glb = useGLTF('/assets/models3d/bmu-assembly.glb'); } catch {}

  if (!glb?.scene) return null;

  return (
    <primitive
      object={glb.scene.clone()}
      scale={0.15}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
    />
  );
}

/* ---------- Switch MOSFET board ---------- */
function SwitchBoard() {
  let glb: any = null;
  try { glb = useGLTF('/assets/models3d/bmu-switch-mosfet.glb'); } catch {}
  if (!glb?.scene) return null;
  return (
    <primitive
      object={glb.scene.clone()}
      scale={120}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[12, 0, 5]}
    />
  );
}

/* ---------- GLB Component placement ---------- */
function GLBComponent({ modelUrl, position, scale = 1, rotation = [0, 0, 0] as [number, number, number] }: {
  modelUrl: string; position: [number, number, number]; scale?: number; rotation?: [number, number, number];
}) {
  let glb: any = null;
  try { glb = useGLTF(modelUrl); } catch {}
  if (!glb?.scene) return null;
  return (
    <primitive
      object={glb.scene.clone()}
      position={position}
      scale={scale}
      rotation={rotation}
    />
  );
}

/* ---------- Section label (silkscreen on board, clickable) ---------- */
function SectionLabel({ position, text, subtitle, scrollTarget }: {
  position: [number, number, number]; text: string; subtitle?: string; scrollTarget?: string;
}) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ camera }) => {
    if (!ref.current) return;
    const worldPos = new THREE.Vector3();
    ref.current.getWorldPosition(worldPos);
    const dist = camera.position.distanceTo(worldPos);
    const glow = Math.max(0, 1 - dist / 12);
    // Dynamic opacity based on camera distance
    ref.current.children.forEach(child => {
      if ((child as any).material) {
        (child as any).material.opacity = hovered ? 0.9 : 0.3 + glow * 0.4;
      }
    });
  });

  const handleClick = () => {
    if (!scrollTarget) return;
    if (scrollTarget === '#contact') {
      // Open contact popup
      document.getElementById('contact')?.classList.add('contact-3d-popup--open');
    } else {
      const el = document.querySelector(scrollTarget);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <group
      ref={ref}
      position={position}
      onClick={handleClick}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = scrollTarget ? 'pointer' : 'default'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
    >
      {/* Clickable hit area (invisible plane) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0.4]}>
        <planeGeometry args={[text.length * 0.55, 2.5]} />
        <meshBasicMaterial transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      {/* Main label */}
      <Text
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={hovered ? 0.9 : 0.8}
        font={FONT_URL}
        color={hovered ? '#ffffff' : '#5bd1d8'}
        anchorX="center"
        anchorY="middle"
        material-transparent
        material-opacity={0.4}
        letterSpacing={0.08}
      >
        {text}
        <meshStandardMaterial
          color={hovered ? '#ffffff' : '#5bd1d8'}
          emissive={hovered ? '#5bd1d8' : '#5bd1d8'}
          emissiveIntensity={hovered ? 1.5 : 0.3}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </Text>

      {/* Subtitle */}
      {subtitle && (
        <Text
          position={[0, 0, 1.2]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.3}
          font={FONT_URL}
          color="#e8e8d0"
          anchorX="center"
          anchorY="middle"
          material-transparent
          material-opacity={hovered ? 0.5 : 0.2}
          letterSpacing={0.04}
        >
          {subtitle}
        </Text>
      )}

      {/* Hover glow ring */}
      {hovered && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0.4]}>
          <ringGeometry args={[text.length * 0.25, text.length * 0.28, 32]} />
          <meshStandardMaterial color="#5bd1d8" emissive="#5bd1d8" emissiveIntensity={2} transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}

/* ---------- Current flow particles ---------- */
function CurrentFlow({ count = 80 }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Particles follow a circular path around the PCB
  const phases = useMemo(() => Array.from({ length: count }, () => Math.random()), [count]);
  const radii = useMemo(() => Array.from({ length: count }, () => 3 + Math.random() * 8), [count]);
  const heights = useMemo(() => Array.from({ length: count }, () => 0.3 + Math.random() * 0.5), [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const angle = phases[i] * Math.PI * 2 + t * (0.1 + phases[i] * 0.1);
      const r = radii[i];
      dummy.position.set(
        Math.cos(angle) * r,
        heights[i] + Math.sin(t * 2 + i) * 0.1,
        Math.sin(angle) * r * 0.6,
      );
      const proximity = Math.max(0.2, 1 - Math.abs(scrollProgress - phases[i]) * 3);
      dummy.scale.setScalar(0.04 * proximity);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial color={COLORS.current} emissive={COLORS.current} emissiveIntensity={3} transparent opacity={0.8} />
    </instancedMesh>
  );
}

/* ---------- Warm current (second layer) ---------- */
function WarmCurrent({ count = 40 }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const phases = useMemo(() => Array.from({ length: count }, () => Math.random()), [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const angle = phases[i] * Math.PI * 2 + t * 0.06 + Math.PI;
      const r = 4 + phases[i] * 6;
      dummy.position.set(
        Math.cos(angle) * r,
        0.2 + Math.sin(t + i) * 0.05,
        Math.sin(angle) * r * 0.5,
      );
      dummy.scale.setScalar(0.025);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial color={COLORS.currentWarm} emissive={COLORS.currentWarm} emissiveIntensity={2} transparent opacity={0.6} />
    </instancedMesh>
  );
}

/* ---------- Ambient dust ---------- */
function AmbientDust({ count = 150 }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = Math.random() * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const arr = (ref.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += Math.sin(t * 0.3 + i * 0.5) * 0.001;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color={COLORS.current} transparent opacity={0.15} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

/* ---------- Component clusters around the PCB ---------- */
function ComponentCluster() {
  const R = [-Math.PI / 2, 0, 0] as [number, number, number];
  const S_RES = 8;
  const S_CAP = 10;
  const S_LED = 8;
  const S_IC_SM = 6;
  const S_IC_LG = 3;

  return (
    <group>
      {/* Zone 1 — MCU area (top-right of board) */}
      <SectionLabel position={[6, 0.5, -2]} text="MCU" subtitle="Approche & expertise" scrollTarget="#a-propos" />
      <GLBComponent modelUrl="/assets/models3d/qfp32.glb" position={[5, 0.3, -2]} scale={S_IC_LG} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/soic8.glb" position={[3, 0.3, -1]} scale={S_IC_SM} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/resistor_0603.glb" position={[4, 0.3, 0]} scale={S_RES} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/resistor_0603.glb" position={[4.5, 0.3, 0.5]} scale={S_RES} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/capacitor_0805.glb" position={[6.5, 0.3, -0.5]} scale={S_CAP} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/capacitor_0805.glb" position={[7, 0.3, -3]} scale={S_CAP} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/led_0603.glb" position={[7.5, 0.3, -1]} scale={S_LED} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/led_0603.glb" position={[7.5, 0.3, -2.5]} scale={S_LED} rotation={R} />

      {/* Zone 2 — Analog / Op-amp area (left of board) */}
      <SectionLabel position={[-5, 0.5, -1]} text="ANALOG" subtitle="Cas concrets" scrollTarget="#cas-concrets" />
      <GLBComponent modelUrl="/assets/models3d/soic8.glb" position={[-5, 0.3, -1]} scale={S_IC_SM} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/soic8.glb" position={[-3, 0.3, -2]} scale={S_IC_SM} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/resistor_0603.glb" position={[-4, 0.3, 0]} scale={S_RES} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/resistor_0603.glb" position={[-6, 0.3, -2]} scale={S_RES} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/resistor_0603.glb" position={[-4.5, 0.3, -3]} scale={S_RES} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/capacitor_0805.glb" position={[-6.5, 0.3, 0]} scale={S_CAP} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/inductor_0805.glb" position={[-3.5, 0.3, 1]} scale={S_CAP} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/led_0603.glb" position={[-2, 0.3, -1]} scale={S_LED} rotation={R} />

      {/* Zone 3 — Power stage (bottom-right) */}
      <SectionLabel position={[4, 0.5, 4]} text="POWER" subtitle="Photos & videos terrain" scrollTarget="#photos" />
      <GLBComponent modelUrl="/assets/models3d/qfp32.glb" position={[4, 0.3, 4]} scale={S_IC_LG} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/capacitor_0805.glb" position={[2, 0.3, 3]} scale={S_CAP * 1.5} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/capacitor_0805.glb" position={[6, 0.3, 5]} scale={S_CAP * 1.5} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/capacitor_0805.glb" position={[3, 0.3, 5.5]} scale={S_CAP} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/inductor_0805.glb" position={[5, 0.3, 3]} scale={S_CAP * 1.2} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/resistor_0603.glb" position={[5.5, 0.3, 6]} scale={S_RES} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/led_0603.glb" position={[7, 0.3, 4.5]} scale={S_LED} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/led_0603.glb" position={[1.5, 0.3, 4.5]} scale={S_LED} rotation={R} />

      {/* Zone 4 — Communication (bottom-left) */}
      <SectionLabel position={[-5, 0.5, 4]} text="FORMATION" subtitle="Workshops & programmes" scrollTarget="/formation/" />
      <GLBComponent modelUrl="/assets/models3d/soic8.glb" position={[-5, 0.3, 4]} scale={S_IC_SM} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/soic8.glb" position={[-3, 0.3, 5]} scale={S_IC_SM} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/resistor_0603.glb" position={[-6, 0.3, 3]} scale={S_RES} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/resistor_0603.glb" position={[-4, 0.3, 6]} scale={S_RES} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/capacitor_0805.glb" position={[-6.5, 0.3, 5]} scale={S_CAP} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/led_0603.glb" position={[-2, 0.3, 3.5]} scale={S_LED} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/led_0603.glb" position={[-7, 0.3, 4.5]} scale={S_LED} rotation={R} />

      {/* Zone 5 — DSP / Neural (center-top) */}
      <SectionLabel position={[0, 0.5, -4]} text="MISSIONS" subtitle="Diagnostic · Prototype · Production" scrollTarget="#graphic-sprints-title" />
      <GLBComponent modelUrl="/assets/models3d/qfp32.glb" position={[0, 0.3, -4]} scale={S_IC_LG} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/capacitor_0805.glb" position={[-2, 0.3, -4.5]} scale={S_CAP} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/capacitor_0805.glb" position={[2, 0.3, -3.5]} scale={S_CAP} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/resistor_0603.glb" position={[-1, 0.3, -5]} scale={S_RES} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/resistor_0603.glb" position={[1, 0.3, -5.5]} scale={S_RES} rotation={R} />
      <GLBComponent modelUrl="/assets/models3d/inductor_0805.glb" position={[0, 0.3, -6]} scale={S_CAP} rotation={R} />

      {/* Zone 6 — Contact area (center) */}
      <SectionLabel position={[0, 0.5, 1]} text="CONTACT" subtitle="Discuter de votre projet" scrollTarget="#contact" />

      {/* Scattered passives */}
      {Array.from({ length: 15 }).map((_, i) => (
        <GLBComponent
          key={`scat-r-${i}`}
          modelUrl="/assets/models3d/resistor_0603.glb"
          position={[(Math.random() - 0.5) * 16, 0.3, (Math.random() - 0.5) * 14]}
          scale={S_RES}
          rotation={[-Math.PI / 2, 0, Math.random() * Math.PI]}
        />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <GLBComponent
          key={`scat-c-${i}`}
          modelUrl="/assets/models3d/capacitor_0805.glb"
          position={[(Math.random() - 0.5) * 16, 0.3, (Math.random() - 0.5) * 14]}
          scale={S_CAP}
          rotation={R}
        />
      ))}
    </group>
  );
}

/* ---------- Board title silkscreen ---------- */
/* ---------- Light that follows the camera ---------- */
function CameraLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (!lightRef.current) return;
    lightRef.current.position.copy(camera.position);
    lightRef.current.position.y += 1;
  });

  return (
    <pointLight ref={lightRef} intensity={0.6} color="#ffffff" distance={15} decay={1.5} />
  );
}

/* ---------- Camera — orbits around PCB, zooms on scroll ---------- */
const CAMERA_STOPS = [
  { scroll: 0.00, pos: [0, 15, 12], look: [0, 0, 0] },      // Overview — full board
  { scroll: 0.12, pos: [7, 4, -2], look: [5, 0, -2] },       // MCU zone
  { scroll: 0.28, pos: [-6, 4, -1], look: [-5, 0, -1] },     // Analog zone
  { scroll: 0.42, pos: [5, 4, 5], look: [4, 0, 4] },         // Power zone
  { scroll: 0.56, pos: [-6, 4, 5], look: [-5, 0, 4] },       // COM zone
  { scroll: 0.70, pos: [0, 5, -6], look: [0, 0, -4] },       // Missions zone
  { scroll: 0.85, pos: [0, 3, 2], look: [0, 0, 1] },         // Contact zone (close)
  { scroll: 1.00, pos: [0, 18, 10], look: [0, 0, 0] },       // Pull back overview
];

function OrbitCamera() {
  const { camera } = useThree();
  const smooth = useRef({ x: 0, y: 0, z: 0, lx: 0, ly: 0, lz: 0 });

  useFrame(({ pointer }) => {
    const s = scrollProgress;

    let a = CAMERA_STOPS[0], b = CAMERA_STOPS[1];
    for (let i = 0; i < CAMERA_STOPS.length - 1; i++) {
      if (s >= CAMERA_STOPS[i].scroll && s <= CAMERA_STOPS[i + 1].scroll) {
        a = CAMERA_STOPS[i];
        b = CAMERA_STOPS[i + 1];
        break;
      }
    }

    const range = b.scroll - a.scroll;
    const t = range > 0 ? (s - a.scroll) / range : 0;
    const ease = t * t * (3 - 2 * t);

    const tx = a.pos[0] + (b.pos[0] - a.pos[0]) * ease + pointer.x * 1.5;
    const ty = a.pos[1] + (b.pos[1] - a.pos[1]) * ease + pointer.y * 0.5;
    const tz = a.pos[2] + (b.pos[2] - a.pos[2]) * ease;
    const lx = a.look[0] + (b.look[0] - a.look[0]) * ease + pointer.x * 0.3;
    const ly = a.look[1] + (b.look[1] - a.look[1]) * ease;
    const lz = a.look[2] + (b.look[2] - a.look[2]) * ease;

    smooth.current.x += (tx - smooth.current.x) * 0.05;
    smooth.current.y += (ty - smooth.current.y) * 0.05;
    smooth.current.z += (tz - smooth.current.z) * 0.05;
    smooth.current.lx += (lx - smooth.current.lx) * 0.05;
    smooth.current.ly += (ly - smooth.current.ly) * 0.05;
    smooth.current.lz += (lz - smooth.current.lz) * 0.05;

    camera.position.set(smooth.current.x, smooth.current.y, smooth.current.z);
    camera.lookAt(smooth.current.lx, smooth.current.ly, smooth.current.lz);
  });

  return null;
}

/* ---------- Full scene ---------- */
function PCBScene() {
  return (
    <group>
      <Suspense fallback={null}>
        <RealPCB />
        <ComponentCluster />
      </Suspense>
      <CurrentFlow />
      <WarmCurrent />
      <AmbientDust />
    </group>
  );
}

/* ---------- Exported component ---------- */
export default function WebGLBackground() {
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = Math.max(1, el.scrollHeight - el.clientHeight);
      scrollProgress = el.scrollTop / max;
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
        camera={{ position: [0, 15, 12], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'auto' }}
      >
        <color attach="background" args={['#060a06']} />
        <fog attach="fog" args={['#060a06', 12, 40]} />

        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 10, 5]} intensity={0.7} color="#ffffff" />
        <directionalLight position={[-5, 8, -5]} intensity={0.3} color="#5bd1d8" />
        <pointLight position={[0, 5, 0]} intensity={0.4} color="#f1c27a" distance={20} />
        <CameraLight />

        <OrbitCamera />
        <PCBScene />

        <EffectComposer>
          <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.9} intensity={0.7} mipmapBlur />
          <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={new THREE.Vector2(0.0006, 0.0006)} />
          <Scanline blendFunction={BlendFunction.OVERLAY} density={1.5} opacity={0.03} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

/* Preload all models */
useGLTF.preload('/assets/models3d/bmu-assembly.glb');
useGLTF.preload('/assets/models3d/resistor_0603.glb');
useGLTF.preload('/assets/models3d/capacitor_0805.glb');
useGLTF.preload('/assets/models3d/inductor_0805.glb');
useGLTF.preload('/assets/models3d/led_0603.glb');
useGLTF.preload('/assets/models3d/soic8.glb');
useGLTF.preload('/assets/models3d/qfp32.glb');
