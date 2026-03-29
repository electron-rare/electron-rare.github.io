import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Scanline } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

/* ===================================================================
   PCB JOURNEY — Scroll follows copper traces on a circuit board

   The camera travels along PCB traces as the user scrolls.
   Current flows through the traces as glowing particles.
   Site sections are "components" soldered onto the board.
   =================================================================== */

const COLORS = {
  copper: new THREE.Color('#c87533'),
  copperBright: new THREE.Color('#e8a040'),
  substrate: new THREE.Color('#1a3a1a'),
  substrateDark: new THREE.Color('#0d1f0d'),
  solder: new THREE.Color('#c0c0c0'),
  current: new THREE.Color('#5bd1d8'),
  currentWarm: new THREE.Color('#f1c27a'),
  silkscreen: new THREE.Color('#e8e8d0'),
  via: new THREE.Color('#888888'),
};

/* ---------- Scroll state ---------- */
let scrollProgress = 0;

/* ---------- PCB Trace path (the main route the camera follows) ---------- */
const TRACE_POINTS = [
  // Start — top of board
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(2, 0, -4),
  new THREE.Vector3(5, 0, -5),
  // First bend (Hero section)
  new THREE.Vector3(8, 0, -5),
  new THREE.Vector3(8, 0, -8),
  // Horizontal run (About)
  new THREE.Vector3(5, 0, -12),
  new THREE.Vector3(0, 0, -14),
  // Via + layer change (Cases)
  new THREE.Vector3(-3, -0.1, -16),
  new THREE.Vector3(-6, -0.1, -18),
  // Right angle bend (Photos)
  new THREE.Vector3(-6, -0.1, -22),
  new THREE.Vector3(-3, 0, -24),
  // Long straight (Sprints)
  new THREE.Vector3(2, 0, -26),
  new THREE.Vector3(6, 0, -28),
  // Final destination (Contact)
  new THREE.Vector3(6, 0, -32),
  new THREE.Vector3(3, 0, -35),
  new THREE.Vector3(0, 0, -38),
];

function createTraceCurve() {
  return new THREE.CatmullRomCurve3(TRACE_POINTS, false, 'catmullrom', 0.3);
}

/* ---------- Main copper trace ---------- */
function CopperTrace() {
  const curve = useMemo(() => createTraceCurve(), []);
  const tubeGeo = useMemo(() => {
    return new THREE.TubeGeometry(curve, 200, 0.08, 8, false);
  }, [curve]);

  return (
    <group>
      {/* Main trace — copper tube */}
      <mesh geometry={tubeGeo}>
        <meshStandardMaterial
          color={COLORS.copper}
          emissive={COLORS.copper}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
      {/* Glow around trace */}
      <mesh geometry={tubeGeo}>
        <meshStandardMaterial
          color={COLORS.copperBright}
          transparent
          opacity={0.08}
          emissive={COLORS.copperBright}
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

/* ---------- Secondary traces (decorative, branch off main) ---------- */
function SecondaryTraces() {
  const traces = useMemo(() => {
    const paths: THREE.Vector3[][] = [];
    // Branch traces at various points along the main route
    const branches = [
      // Hero area branches
      [new THREE.Vector3(3, 0, -4), new THREE.Vector3(3, 0, -2), new THREE.Vector3(5, 0, -1)],
      [new THREE.Vector3(5, 0, -5), new THREE.Vector3(7, 0, -3), new THREE.Vector3(10, 0, -3)],
      // About area
      [new THREE.Vector3(2, 0, -12), new THREE.Vector3(2, 0, -10), new THREE.Vector3(4, 0, -9)],
      [new THREE.Vector3(-1, 0, -13), new THREE.Vector3(-3, 0, -11), new THREE.Vector3(-5, 0, -11)],
      // Cases area
      [new THREE.Vector3(-4, -0.1, -17), new THREE.Vector3(-2, -0.1, -15), new THREE.Vector3(0, -0.1, -15)],
      [new THREE.Vector3(-6, -0.1, -20), new THREE.Vector3(-8, -0.1, -19), new THREE.Vector3(-10, -0.1, -18)],
      // Sprints area
      [new THREE.Vector3(4, 0, -27), new THREE.Vector3(4, 0, -25), new THREE.Vector3(6, 0, -24)],
      [new THREE.Vector3(1, 0, -27), new THREE.Vector3(-1, 0, -25), new THREE.Vector3(-3, 0, -25)],
      // Contact area
      [new THREE.Vector3(4, 0, -33), new THREE.Vector3(6, 0, -31), new THREE.Vector3(8, 0, -31)],
      [new THREE.Vector3(1, 0, -36), new THREE.Vector3(-1, 0, -34), new THREE.Vector3(-3, 0, -34)],
    ];

    branches.forEach(pts => {
      const curve = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.5);
      const tubePts = curve.getPoints(30);
      paths.push(tubePts);
    });
    return paths;
  }, []);

  return (
    <group>
      {traces.map((pts, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        return (
          <line key={i} geometry={geo}>
            <lineBasicMaterial
              color={COLORS.copper}
              transparent
              opacity={0.25}
              linewidth={1}
            />
          </line>
        );
      })}
    </group>
  );
}

/* ---------- Current flow particles along the trace ---------- */
function CurrentFlow({ count = 60 }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const curve = useMemo(() => createTraceCurve(), []);
  const phases = useMemo(() => Array.from({ length: count }, () => Math.random()), [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      // Each particle flows along the curve
      const progress = ((phases[i] + t * 0.06) % 1);
      const pos = curve.getPointAt(progress);

      // Add slight jitter
      dummy.position.set(
        pos.x + (Math.random() - 0.5) * 0.05,
        pos.y + 0.02 + Math.sin(t * 3 + i) * 0.02,
        pos.z + (Math.random() - 0.5) * 0.05,
      );

      // Size based on proximity to camera/scroll position
      const distToScroll = Math.abs(progress - scrollProgress);
      const brightness = Math.max(0.2, 1 - distToScroll * 3);
      dummy.scale.setScalar(0.03 * brightness + 0.01);

      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color={COLORS.current}
        emissive={COLORS.current}
        emissiveIntensity={3}
        transparent
        opacity={0.9}
      />
    </instancedMesh>
  );
}

/* ---------- Warm current (second layer) ---------- */
function WarmCurrentFlow({ count = 30 }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const curve = useMemo(() => createTraceCurve(), []);
  const phases = useMemo(() => Array.from({ length: count }, () => Math.random()), [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const progress = ((phases[i] + t * 0.04 + 0.5) % 1);
      const pos = curve.getPointAt(progress);
      dummy.position.set(pos.x, pos.y + 0.03, pos.z);
      const distToScroll = Math.abs(progress - scrollProgress);
      const brightness = Math.max(0.1, 1 - distToScroll * 4);
      dummy.scale.setScalar(0.02 * brightness + 0.005);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color={COLORS.currentWarm}
        emissive={COLORS.currentWarm}
        emissiveIntensity={2}
        transparent
        opacity={0.7}
      />
    </instancedMesh>
  );
}

/* ---------- PCB Substrate (green board) ---------- */
function Substrate() {
  return (
    <group>
      {/* Main board */}
      <mesh position={[0, -0.15, -19]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 50]} />
        <meshStandardMaterial
          color={COLORS.substrateDark}
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>
      {/* Solder mask grid pattern */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={`h${i}`} position={[0, -0.14, -2 - i * 2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[28, 0.01]} />
          <meshBasicMaterial color={COLORS.substrate} transparent opacity={0.15} />
        </mesh>
      ))}
      {Array.from({ length: 14 }).map((_, i) => (
        <mesh key={`v${i}`} position={[-13 + i * 2, -0.14, -19]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.01, 46]} />
          <meshBasicMaterial color={COLORS.substrate} transparent opacity={0.15} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Vias (through-hole connections) ---------- */
function Vias() {
  const positions: [number, number, number][] = [
    [8, 0, -6], [5, 0, -8], [2, 0, -11],
    [-2, 0, -15], [-5, 0, -17], [-4, 0, -21],
    [0, 0, -25], [4, 0, -29], [2, 0, -33],
    // Extra decorative vias
    [10, 0, -4], [-7, 0, -12], [7, 0, -22],
    [-8, 0, -27], [8, 0, -35], [-2, 0, -38],
  ];

  return (
    <group>
      {positions.map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          {/* Via ring */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.12, 0.2, 16]} />
            <meshStandardMaterial
              color={COLORS.solder}
              metalness={0.9}
              roughness={0.2}
              emissive={COLORS.via}
              emissiveIntensity={0.2}
            />
          </mesh>
          {/* Via hole */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.1, 16]} />
            <meshBasicMaterial color="#050505" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ---------- 3D Electronic components on PCB ---------- */

/* IC / Microcontroller (black rectangle with pins) */
function ICComponent({ position, size = [2, 0.3, 1.2], label, color = '#1a1a1a' }: {
  position: [number, number, number]; size?: [number, number, number]; label: string; color?: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const pins = Math.floor(size[0] / 0.3);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const cameraZ = -scrollProgress * 38;
    const dist = Math.abs(position[2] - cameraZ);
    const glow = Math.max(0, 1 - dist / 6);
    // Subtle float when active
    groupRef.current.position.y = position[1] + glow * Math.sin(clock.getElapsedTime() * 2) * 0.03;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* IC body */}
      <mesh position={[0, size[1] / 2, 0]}>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Dot (pin 1 marker) */}
      <mesh position={[-size[0] / 2 + 0.15, size[1] + 0.01, -size[2] / 2 + 0.15]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.05, 8]} />
        <meshBasicMaterial color="#e0e0e0" />
      </mesh>
      {/* Silkscreen label on IC body */}
      <Text
        position={[0, size[1] + 0.02, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.12}
        font="/assets/fonts/manrope-regular.ttf"
        color="#e8e8d0"
        anchorX="center"
        anchorY="middle"
        material-transparent
        material-opacity={0.6}
      >
        {label}
      </Text>
      {/* Pins — both sides */}
      {Array.from({ length: pins }).map((_, i) => (
        <group key={`pins-${i}`}>
          <mesh position={[-size[0] / 2 + 0.15 + i * 0.3, 0.05, -size[2] / 2 - 0.08]}>
            <boxGeometry args={[0.06, 0.02, 0.15]} />
            <meshStandardMaterial color={COLORS.solder} metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[-size[0] / 2 + 0.15 + i * 0.3, 0.05, size[2] / 2 + 0.08]}>
            <boxGeometry args={[0.06, 0.02, 0.15]} />
            <meshStandardMaterial color={COLORS.solder} metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}
      {/* Solder pads glow */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size[0] + 0.5, size[2] + 0.5]} />
        <meshStandardMaterial color={COLORS.copperBright} transparent opacity={0.04} emissive={COLORS.current} emissiveIntensity={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* Capacitor (cylinder) */
function Capacitor({ position, radius = 0.25, height = 0.5, color = '#2a4a8a' }: {
  position: [number, number, number]; radius?: number; height?: number; color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const cameraZ = -scrollProgress * 38;
    const dist = Math.abs(position[2] - cameraZ);
    const glow = Math.max(0, 1 - dist / 6);
    (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = glow * 0.5;
  });

  return (
    <group position={position}>
      <mesh ref={ref} position={[0, height / 2, 0]}>
        <cylinderGeometry args={[radius, radius, height, 16]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.2} emissive={COLORS.current} emissiveIntensity={0} />
      </mesh>
      {/* Top marking */}
      <mesh position={[0, height + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius * 0.7, 16]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Stripe */}
      <mesh position={[0, height * 0.7, radius + 0.01]}>
        <planeGeometry args={[radius * 1.2, height * 0.15]} />
        <meshBasicMaterial color={COLORS.silkscreen} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

/* Resistor (small rectangle with color bands) */
function Resistor({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[0.5, 0.08, 0.2]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.7} />
      </mesh>
      {/* Solder pads */}
      <mesh position={[-0.22, 0.02, 0]}>
        <boxGeometry args={[0.1, 0.04, 0.22]} />
        <meshStandardMaterial color={COLORS.solder} metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.22, 0.02, 0]}>
        <boxGeometry args={[0.1, 0.04, 0.22]} />
        <meshStandardMaterial color={COLORS.solder} metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

/* LED (small dome with glow) */
function LED({ position, color = '#5bd1d8' }: { position: [number, number, number]; color?: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const threeColor = useMemo(() => new THREE.Color(color), [color]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const cameraZ = -scrollProgress * 38;
    const dist = Math.abs(position[2] - cameraZ);
    const proximity = Math.max(0, 1 - dist / 5);
    (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = proximity * (1.5 + Math.sin(t * 3) * 0.5);
  });

  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.08, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color} emissive={threeColor} emissiveIntensity={0} transparent opacity={0.9} />
      </mesh>
      {/* LED pad */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.12, 8]} />
        <meshStandardMaterial color={COLORS.solder} metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

/* Silkscreen text (PCB printed labels) */
function Silk({ position, text, size = 0.15, color = '#e8e8d0', opacity = 0.5, rotation = [-Math.PI / 2, 0, 0] as [number, number, number] }: {
  position: [number, number, number]; text: string; size?: number; color?: string; opacity?: number; rotation?: [number, number, number];
}) {
  return (
    <Text
      position={position}
      rotation={rotation}
      fontSize={size}
      font="/assets/fonts/manrope-regular.ttf"
      color={color}
      anchorX="center"
      anchorY="middle"
      material-transparent
      material-opacity={opacity}
    >
      {text}
    </Text>
  );
}

/* Section title — larger, glows when camera is near */
function SectionLabel({ position, text, subtitle }: { position: [number, number, number]; text: string; subtitle?: string }) {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!ref.current) return;
    const cameraZ = -scrollProgress * 38;
    const dist = Math.abs(position[2] - cameraZ);
    const glow = Math.max(0, 1 - dist / 6);
    ref.current.children.forEach(child => {
      if ((child as any).material) {
        (child as any).material.opacity = 0.15 + glow * 0.7;
      }
    });
  });

  return (
    <group ref={ref}>
      <Text
        position={[position[0], position[1] + 0.02, position[2]]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.35}
        font="/assets/fonts/manrope-regular.ttf"
        color="#5bd1d8"
        anchorX="center"
        anchorY="middle"
        material-transparent
        material-opacity={0.15}
        letterSpacing={0.1}
      >
        {text}
      </Text>
      {subtitle && (
        <Text
          position={[position[0], position[1] + 0.02, position[2] + 0.55]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.12}
          font="/assets/fonts/manrope-regular.ttf"
          color="#e8e8d0"
          anchorX="center"
          anchorY="middle"
          material-transparent
          material-opacity={0.1}
          letterSpacing={0.05}
        >
          {subtitle}
        </Text>
      )}
    </group>
  );
}

/* All components assembled on the PCB */
function PCBComponents() {
  return (
    <group>
      {/* ── HERO — Main MCU ── */}
      <SectionLabel position={[6, 0.01, -4]} text="L'ELECTRON RARE" subtitle="Systemes electroniques specifiques" />
      <ICComponent position={[6, 0, -6]} size={[2.5, 0.35, 1.5]} label="U1 — ESP32-S3" />
      <Silk position={[4.5, 0.02, -5.2]} text="R1" size={0.08} />
      <Silk position={[4.5, 0.02, -6.6]} text="R2" size={0.08} />
      <Silk position={[7.5, 0.02, -4.7]} text="D1" size={0.08} />
      <Silk position={[7.5, 0.02, -5.7]} text="D2" size={0.08} />
      <LED position={[7.5, 0, -5]} color="#5bd1d8" />
      <LED position={[7.5, 0, -5.5]} color="#30d158" />
      <Resistor position={[4.5, 0, -5.5]} />
      <Resistor position={[4.5, 0, -6.3]} />

      {/* ── ABOUT — Approche & expertise ── */}
      <SectionLabel position={[1, 0.01, -11]} text="APPROCHE" subtitle="Diagnostic · Conception · Mise au point" />
      <ICComponent position={[1, 0, -13]} size={[1.8, 0.25, 0.8]} label="U2 — LM358N" color="#222" />
      <Silk position={[3, 0.02, -12.2]} text="C1 100uF" size={0.08} />
      <Silk position={[-1, 0.02, -13.2]} text="C2 10nF" size={0.08} />
      <Silk position={[2, 0.02, -14.3]} text="R3 10k" size={0.08} />
      <Silk position={[0, 0.02, -11.7]} text="R4 4k7" size={0.08} />
      <Capacitor position={[3, 0, -12.5]} radius={0.3} height={0.6} color="#8B4513" />
      <Capacitor position={[-1, 0, -13.5]} radius={0.2} height={0.4} color="#2a4a8a" />
      <Resistor position={[2, 0, -14]} rotation={[0, 0.5, 0]} />
      <Resistor position={[0, 0, -12]} rotation={[0, -0.3, 0]} />
      <LED position={[2.5, 0, -13]} color="#f1c27a" />
      <Silk position={[2.5, 0.02, -12.7]} text="D3" size={0.08} />

      {/* ── CASES — Cas concrets ── */}
      <SectionLabel position={[-5, 0.01, -17]} text="CAS CONCRETS" subtitle="Audio · Industrie · Formation" />
      <ICComponent position={[-5, -0.1, -19]} size={[1.5, 0.4, 1]} label="Q1 — IRFZ44N" color="#1a1a2a" />
      <Silk position={[-3, 0.02, -17.7]} text="C3 470uF/35V" size={0.08} />
      <Silk position={[-7, 0.02, -19.7]} text="C4 220uF/16V" size={0.08} />
      <Capacitor position={[-3, -0.1, -18]} radius={0.4} height={0.8} color="#1a3a1a" />
      <Capacitor position={[-7, -0.1, -20]} radius={0.35} height={0.7} color="#8B4513" />
      <Resistor position={[-4, -0.1, -20]} />
      <Silk position={[-4, 0.02, -20.3]} text="R5 0R1" size={0.08} />
      <LED position={[-6.5, -0.1, -18.5]} color="#ff6b6b" />
      <Silk position={[-6.5, 0.02, -18.2]} text="D4 PWR" size={0.08} />

      {/* ── MEDIA — Photos & videos ── */}
      <SectionLabel position={[-2, 0.01, -22]} text="TERRAIN" subtitle="Photos · Videos · Realisations" />
      <ICComponent position={[-2, 0, -23]} size={[2, 0.5, 0.8]} label="J1 — USB-C 3.1" color="#333" />
      <LED position={[-0.5, 0, -23]} color="#5bd1d8" />
      <LED position={[-3.5, 0, -23]} color="#30d158" />
      <Silk position={[-0.5, 0.02, -22.7]} text="TX" size={0.08} />
      <Silk position={[-3.5, 0.02, -22.7]} text="RX" size={0.08} />

      {/* ── SPRINTS — Missions ── */}
      <SectionLabel position={[4, 0.01, -25.5]} text="MISSIONS" subtitle="Diagnostic · Prototype · Mission complete" />
      <ICComponent position={[4, 0, -27]} size={[1.2, 0.3, 0.6]} label="U3 — LM7805CT" color="#1a1a1a" />
      <Silk position={[2.5, 0.02, -26.2]} text="C5 100nF" size={0.08} />
      <Silk position={[5.5, 0.02, -27.2]} text="C6 100nF" size={0.08} />
      <Silk position={[3, 0.02, -28.3]} text="R6 220R" size={0.08} />
      <Capacitor position={[2.5, 0, -26.5]} radius={0.25} height={0.5} color="#2a4a8a" />
      <Capacitor position={[5.5, 0, -27.5]} radius={0.25} height={0.5} color="#2a4a8a" />
      <Resistor position={[3, 0, -28]} rotation={[0, 0.8, 0]} />
      <LED position={[5, 0, -26.5]} color="#b6d18f" />
      <Silk position={[5, 0.02, -26.2]} text="D5 OK" size={0.08} />

      {/* ── CONTACT — Energy storage ── */}
      <SectionLabel position={[1, 0.01, -34.5]} text="CONTACT" subtitle="contact@lelectronrare.fr" />
      <Capacitor position={[1, 0, -36]} radius={0.5} height={1} color="#4a2a8a" />
      <Silk position={[1, 0.02, -35.3]} text="C7 1000uF/25V" size={0.08} />
      <Capacitor position={[-1, 0, -37]} radius={0.4} height={0.8} color="#8B4513" />
      <Silk position={[-1, 0.02, -36.3]} text="C8 470uF/16V" size={0.08} />
      <LED position={[2.5, 0, -36]} color="#ff6b35" />
      <Silk position={[2.5, 0.02, -35.7]} text="D6" size={0.08} />
      <LED position={[-0.5, 0, -36]} color="#5bd1d8" />
      <Silk position={[-0.5, 0.02, -35.7]} text="D7" size={0.08} />
      <Resistor position={[0, 0, -35]} rotation={[0, 1.2, 0]} />
      <Silk position={[0, 0.02, -34.7]} text="R7 1k" size={0.08} />

      {/* ── Extra scattered passives ── */}
      <Resistor position={[9, 0, -3]} rotation={[0, 0.7, 0]} />
      <Silk position={[9, 0.02, -2.7]} text="R8" size={0.06} opacity={0.3} />
      <Resistor position={[7, 0, -10]} rotation={[0, -0.4, 0]} />
      <Silk position={[7, 0.02, -9.7]} text="R9" size={0.06} opacity={0.3} />
      <Resistor position={[-3, 0, -10]} rotation={[0, 1.1, 0]} />
      <Resistor position={[-8, -0.1, -16]} />
      <Resistor position={[1, 0, -30]} rotation={[0, 0.3, 0]} />
      <Capacitor position={[10, 0, -7]} radius={0.15} height={0.3} />
      <Silk position={[10, 0.02, -6.7]} text="C9" size={0.06} opacity={0.3} />
      <Capacitor position={[-4, 0, -25]} radius={0.15} height={0.3} />
      <Silk position={[-4, 0.02, -24.7]} text="C10" size={0.06} opacity={0.3} />

      {/* ── Board title silkscreen ── */}
      <Silk position={[-8, 0.02, -2]} text="L'ELECTRON RARE" size={0.25} opacity={0.2} />
      <Silk position={[-8, 0.02, -2.5]} text="REV 2026.1" size={0.1} opacity={0.15} />
      <Silk position={[10, 0.02, -38]} text="Made in France" size={0.1} opacity={0.15} />
      <Silk position={[10, 0.02, -38.4]} text="lelectronrare.fr" size={0.08} opacity={0.12} />
    </group>
  );
}

/* ---------- Ambient floating particles (dust/solder flux) ---------- */
function AmbientDust({ count = 200 }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = Math.random() * 3;
      pos[i * 3 + 2] = Math.random() * -42;
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const arr = (ref.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += Math.sin(t * 0.5 + i) * 0.001;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={COLORS.current}
        transparent
        opacity={0.2}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ---------- Camera with zoom stops at each component ---------- */

// Define zoom stops — camera zooms in when scroll reaches each section
const ZOOM_STOPS = [
  { scroll: 0.00, pos: [0, 4, 2], look: [2, 0, -4], fov: 50 },     // Overview start
  { scroll: 0.10, pos: [6, 1.8, -4], look: [6, 0, -6], fov: 40 },   // HERO — zoom on ESP32
  { scroll: 0.25, pos: [1, 1.5, -11], look: [1, 0, -13], fov: 42 }, // ABOUT — zoom on LM358
  { scroll: 0.40, pos: [-5, 1.8, -17], look: [-5, 0, -19], fov: 40 }, // CASES — zoom on MOSFET
  { scroll: 0.52, pos: [-2, 1.5, -21.5], look: [-2, 0, -23], fov: 42 }, // MEDIA — zoom on USB-C
  { scroll: 0.65, pos: [4, 1.5, -25], look: [4, 0, -27], fov: 42 },  // SPRINTS — zoom on 7805
  { scroll: 0.80, pos: [1, 2, -33], look: [1, 0, -36], fov: 45 },    // CONTACT — zoom on caps
  { scroll: 1.00, pos: [0, 5, -20], look: [0, 0, -20], fov: 55 },    // End — pull out overview
];

function TraceCamera() {
  const { camera } = useThree();
  const smooth = useRef({ x: 0, y: 0, z: 0, lx: 0, ly: 0, lz: 0, fov: 50 });

  useFrame(({ pointer }) => {
    const s = scrollProgress;

    // Find the two nearest zoom stops
    let a = ZOOM_STOPS[0], b = ZOOM_STOPS[1];
    for (let i = 0; i < ZOOM_STOPS.length - 1; i++) {
      if (s >= ZOOM_STOPS[i].scroll && s <= ZOOM_STOPS[i + 1].scroll) {
        a = ZOOM_STOPS[i];
        b = ZOOM_STOPS[i + 1];
        break;
      }
    }

    // Interpolation factor between stops
    const range = b.scroll - a.scroll;
    const t = range > 0 ? (s - a.scroll) / range : 0;
    // Smooth easing
    const ease = t * t * (3 - 2 * t); // smoothstep

    // Interpolate position
    const tx = a.pos[0] + (b.pos[0] - a.pos[0]) * ease + pointer.x * 0.8;
    const ty = a.pos[1] + (b.pos[1] - a.pos[1]) * ease + pointer.y * 0.3;
    const tz = a.pos[2] + (b.pos[2] - a.pos[2]) * ease;

    // Interpolate lookAt
    const lx = a.look[0] + (b.look[0] - a.look[0]) * ease + pointer.x * 0.2;
    const ly = a.look[1] + (b.look[1] - a.look[1]) * ease;
    const lz = a.look[2] + (b.look[2] - a.look[2]) * ease;

    // Smooth camera movement
    smooth.current.x += (tx - smooth.current.x) * 0.06;
    smooth.current.y += (ty - smooth.current.y) * 0.06;
    smooth.current.z += (tz - smooth.current.z) * 0.06;
    smooth.current.lx += (lx - smooth.current.lx) * 0.06;
    smooth.current.ly += (ly - smooth.current.ly) * 0.06;
    smooth.current.lz += (lz - smooth.current.lz) * 0.06;

    camera.position.set(smooth.current.x, smooth.current.y, smooth.current.z);
    camera.lookAt(smooth.current.lx, smooth.current.ly, smooth.current.lz);

    // Smooth FOV (zoom effect)
    const targetFov = a.fov + (b.fov - a.fov) * ease;
    smooth.current.fov += (targetFov - smooth.current.fov) * 0.05;
    (camera as THREE.PerspectiveCamera).fov = smooth.current.fov;
    (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
  });

  return null;
}

/* ---------- Full scene ---------- */
function PCBScene() {
  return (
    <group>
      <Substrate />
      <CopperTrace />
      <SecondaryTraces />
      <Vias />
      <PCBComponents />
      <CurrentFlow />
      <WarmCurrentFlow />
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
        camera={{ position: [0, 3, 2], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'auto' }}
      >
        <color attach="background" args={['#060a06']} />
        <fog attach="fog" args={['#060a06', 4, 18]} />

        <ambientLight intensity={0.08} />
        <pointLight position={[0, 5, 0]} intensity={0.3} color="#ffffff" distance={20} />
        <directionalLight position={[5, 8, -10]} intensity={0.15} color="#5bd1d8" />
        <directionalLight position={[-5, 6, -25]} intensity={0.1} color="#f1c27a" />

        <TraceCamera />
        <PCBScene />

        <EffectComposer>
          <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.9} intensity={0.8} mipmapBlur />
          <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={new THREE.Vector2(0.0008, 0.0008)} />
          <Scanline blendFunction={BlendFunction.OVERLAY} density={2} opacity={0.04} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
