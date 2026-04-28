import { useRef, Suspense, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, Html } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

const MODELS_BASE = '/assets/models3d';
const S = 0.1;

function fc2three(fx: number, fy: number, fz: number): [number, number, number] {
  return [fx * S, fz * S, -fy * S];
}

// explodeDelay: 0-1 stagger (0=moves first, 1=moves last)
// explodeRotTarget: rotation when fully exploded (null = keep original)
const CARDS_DEF = [
  { file: `${MODELS_BASE}/bmu_v2.glb`, name: 'BMU v2',
    position: fc2three(0, 0, 0), rotation: [-Math.PI / 2, 0, 0] as [number, number, number],
    explodeDir: [0, 0.8, 0] as [number, number, number], explodeDist: 1.5,
    explodeDelay: 0, explodeRotTarget: null as [number, number, number] | null },
  { file: `${MODELS_BASE}/i2c_repeater.glb`, name: 'I2C Repeater',
    position: fc2three(-52, 33, 4), rotation: [-Math.PI / 2, 0, 0] as [number, number, number],
    explodeDir: [-0.8, 0.2, -0.6] as [number, number, number], explodeDist: 2.0,
    explodeDelay: 0.15, explodeRotTarget: null as [number, number, number] | null },
  { file: `${MODELS_BASE}/mosfet_switch.glb`, name: 'Mosfet #1',
    position: fc2three(23.2, 20, -11.2), rotation: [Math.PI / 2, 0, Math.PI] as [number, number, number],
    explodeDir: [0.5, -0.8, 0.4] as [number, number, number], explodeDist: 4.0,
    explodeDelay: 0.25,
    explodeRotTarget: [0, 0, Math.PI] as [number, number, number] },
  { file: `${MODELS_BASE}/mosfet_switch.glb`, name: 'Mosfet #2',
    position: fc2three(-15.56, 20, -11.16), rotation: [Math.PI / 2, 0, Math.PI] as [number, number, number],
    explodeDir: [-0.2, -0.8, 0.5] as [number, number, number], explodeDist: 4.0,
    explodeDelay: 0.35,
    explodeRotTarget: [0, 0, Math.PI] as [number, number, number] },
  { file: `${MODELS_BASE}/mosfet_switch.glb`, name: 'Mosfet #3',
    position: fc2three(-54.72, 20, -11.12), rotation: [Math.PI / 2, 0, Math.PI] as [number, number, number],
    explodeDir: [-0.6, -0.8, 0.3] as [number, number, number], explodeDist: 4.0,
    explodeDelay: 0.45,
    explodeRotTarget: [0, 0, Math.PI] as [number, number, number] },
  { file: `${MODELS_BASE}/mosfet_switch.glb`, name: 'Mosfet #4',
    position: fc2three(62.12, 20, -11.16), rotation: [Math.PI / 2, 0, Math.PI] as [number, number, number],
    explodeDir: [0.7, -0.8, 0.2] as [number, number, number], explodeDist: 4.0,
    explodeDelay: 0.55,
    explodeRotTarget: [0, 0, Math.PI] as [number, number, number] },
];

CARDS_DEF.forEach((c) => useGLTF.preload(c.file));

/* ── Sections ── */
// Camera positions are relative: offset from card center when focused
// 'focus' = which card index camera should look at (null = assembly center)
interface Section {
  id: string; start: number; end: number;
  camOffset: [number, number, number]; // camera position offset from target
  camOffsetEnd?: [number, number, number];
  targetShift?: [number, number, number]; // shift lookAt from card center (start)
  targetShiftEnd?: [number, number, number]; // shift lookAt (end) — for dolly movement
  focus: number | null; // card index to focus on, null = center
  focusEnd?: number | null;
  explode: number; explodeEnd?: number;
}

const SECTIONS: Section[] = [
  // 1. HERO — vue large, focus sur l'assemblage (card 0 = BMU)
  { id: 'hero', start: 0.00, end: 0.10,
    camOffset: [2.0, 1.5, 2.0], camOffsetEnd: [1.5, 1.2, 1.5], focus: 0, explode: 0 },
  // 1→2 TRANSITION — zoom progressif vers la zone I2C (haut-gauche)
  { id: 'hero-to-exp', start: 0.10, end: 0.16,
    camOffset: [1.5, 1.2, 1.5], camOffsetEnd: [0.6, 0.7, 0.7],
    targetShift: [0, 0, 0], targetShiftEnd: [-0.7, 0.35, 0],
    focus: 0, explode: 0 },
  // 2a. Électronique — vise la zone I2C sur la BMU
  { id: 'exp-elec', start: 0.16, end: 0.20,
    camOffset: [0.4, 0.6, 0.5], camOffsetEnd: [0.2, 0.5, 0.4],
    targetShift: [-0.7, 0.35, 0],
    focus: 0, explode: 0 },
  // 2b. BAS — tuile card-local [0.85, 0, 0.45] → Rx(-π/2) → [0.85, 0.45, 0]
  { id: 'exp-auto', start: 0.20, end: 0.24,
    camOffset: [-0.3, 0.35, -0.2], camOffsetEnd: [-0.15, 0.3, -0.15],
    targetShift: [0.85, 0.45, 0],
    focus: 0, explode: 0 },
  // 2c. HAUT — tuile card-local [-0.5, 0, -0.45] → Rx(-π/2) → [-0.5, -0.45, 0]
  { id: 'exp-energie', start: 0.24, end: 0.28,
    camOffset: [0.25, 0.35, 0.3], camOffsetEnd: [0.12, 0.3, 0.2],
    targetShift: [-0.5, -0.45, 0],
    focus: 0, explode: 0 },
  // 2d. BAS — tuile card-local [-0.85, 0, 0.45] → Rx(-π/2) → [-0.85, 0.45, 0]
  { id: 'exp-dispositifs', start: 0.28, end: 0.31,
    camOffset: [0.3, 0.35, -0.2], camOffsetEnd: [0.15, 0.3, -0.1],
    targetShift: [-0.85, 0.45, 0],
    focus: 0, explode: 0 },
  // 2e. HAUT — tuile card-local [0.3, 0, -0.45] → Rx(-π/2) → [0.3, -0.45, 0]
  { id: 'exp-consulting', start: 0.31, end: 0.34,
    camOffset: [-0.2, 0.35, 0.3], camOffsetEnd: [0.1, 0.3, 0.2],
    targetShift: [0.3, -0.45, 0],
    focus: 0, explode: 0 },
  // 3a. RECUL — rapide
  { id: 'eclate-recul', start: 0.34, end: 0.36,
    camOffset: [0.0, 1.0, 0.8], camOffsetEnd: [1.0, 3.0, 4.0], focus: 0, focusEnd: null,
    explode: 0 },
  // 3b. SÉPARATION — rapide
  { id: 'eclate-sep', start: 0.36, end: 0.39,
    camOffset: [1.0, 3.0, 4.0], camOffsetEnd: [1.6, 3.6, 4.4], focus: null,
    explode: 0, explodeEnd: 0.7 },
  // 3c. MISE À 90° — rapide
  { id: 'eclate-plat', start: 0.39, end: 0.41,
    camOffset: [1.6, 3.6, 4.4], camOffsetEnd: [2.0, 3.6, 5.0], focus: null,
    explode: 0.7, explodeEnd: 1 },
  // 4. CAS — recul caméra, vue des 4 mosfets, tuiles + médias visibles
  { id: 'cas', start: 0.41, end: 0.65,
    camOffset: [0.5, -0.5, -3.0], camOffsetEnd: [-0.5, -0.3, -2.5], focus: null, explode: 1 },
  // 7a. MEDIA — vidéo 1, caméra de l'autre côté (Z négatif)
  { id: 'media', start: 0.65, end: 0.69,
    camOffset: [0.2, 0.0, -1.0], camOffsetEnd: [0.0, 0.0, -0.8], focus: 2, explode: 1 },
  // 7b. MEDIA — vidéo 2
  { id: 'media', start: 0.69, end: 0.73,
    camOffset: [0.2, 0.0, -1.0], camOffsetEnd: [-0.1, 0.0, -0.8], focus: 3, explode: 1 },
  // 7c. MEDIA — vidéo 3
  { id: 'media', start: 0.73, end: 0.77,
    camOffset: [-0.1, 0.0, -1.0], camOffsetEnd: [-0.3, 0.0, -0.8], focus: 4, explode: 1 },
  // 7d. MEDIA — carrousel photos
  { id: 'media', start: 0.77, end: 0.81,
    camOffset: [-0.2, 0.0, -1.0], camOffsetEnd: [0.1, 0.0, -0.8], focus: 5, explode: 1 },
  // 8. FORMATS
  { id: 'formats', start: 0.81, end: 0.91,
    camOffset: [2.4, 3.0, 4.0], camOffsetEnd: [1.6, 2.4, 3.0], focus: null, explode: 1, explodeEnd: 0 },
  // 9. CONTACT — zoom serré sur la tuile contact au centre de la BMU
  { id: 'contact', start: 0.91, end: 1.00,
    camOffset: [0.15, 0.3, 0.2], camOffsetEnd: [0.0, 0.25, 0.15], focus: 0, explode: 0 },
];

/* ── Tuiles plaquées sur les faces PCB ── */
interface PcbLabel {
  section: string; cardIndex: number;
  localOffset: [number, number, number];
  title: string; sub?: string; color?: string;
  href?: string;
}

const PCB_LABELS: PcbLabel[] = [
  // Expertise — alternance haut/bas du PCB BMU
  // 1. HAUT — côté I2C (card 1)
  { section: 'exp-elec', cardIndex: 1, localOffset: [0.0, 0.005, 0.0],
    title: 'Électronique spécifique', sub: 'Cartes · Interfaces · Capteurs · Alimentation' },
  // 2. BAS — bas-droit BMU
  { section: 'exp-auto', cardIndex: 0, localOffset: [0.85, 0.005, 0.45],
    title: 'Instrumentation & Automatisme', sub: 'Bancs · Automates · Variateurs · Protocoles' },
  // 3. HAUT — haut BMU, à droite de I2C
  { section: 'exp-energie', cardIndex: 0, localOffset: [-0.5, 0.005, -0.45],
    title: 'Énergie & Stockage', sub: 'Batterie · Conversion · Supervision · Télémétrie' },
  // 4. BAS — bas-gauche BMU
  { section: 'exp-dispositifs', cardIndex: 0, localOffset: [-0.85, 0.005, 0.45],
    title: 'Dispositifs pour le réel', sub: 'Audio · LED · Scène · Robustesse terrain' },
  // 5. HAUT — centre-haut BMU
  { section: 'exp-consulting', cardIndex: 0, localOffset: [0.3, 0.005, -0.45],
    title: 'Consulting & Formation', sub: 'Audit · Transfert · Pédagogie · Projet' },
  // 6-9. CAS — les 4 tuiles visibles en même temps, face bottom des mosfets
  { section: 'cas', cardIndex: 2, localOffset: [0.0, 0.0, -0.08],
    title: 'Industries créatives', sub: 'Audio embarqué · Batterie LiFePO4 · KXKM' },
  { section: 'cas', cardIndex: 3, localOffset: [0.0, 0.0, -0.08],
    title: 'Industrie', sub: 'Production V3.2 · KXKM ESP32 → STM32F030' },
  { section: 'cas', cardIndex: 4, localOffset: [0.0, 0.0, -0.08],
    title: 'Formation', sub: 'PCB · KiCad · µC' },
  { section: 'cas', cardIndex: 5, localOffset: [0.0, 0.0, -0.08],
    title: 'Service', sub: 'Mise en service · Maintenance · Support terrain' },
  // 9. Conception — Mosfet #1 (card 2)
  { section: 'formats', cardIndex: 2, localOffset: [0.0, 0.005, 0.0],
    title: 'Conception', sub: 'Schéma · PCB · Firmware · Validation',
    href: '/conception/' },
  // 10. Formation — Mosfet #2 (card 3)
  { section: 'formats', cardIndex: 3, localOffset: [0.0, 0.005, 0.0],
    title: 'Formation', sub: 'PCB · KiCad · µC · Soudure',
    href: '/formation/' },
  // 11. Consulting — Mosfet #3 (card 4)
  { section: 'formats', cardIndex: 4, localOffset: [0.0, 0.005, 0.0],
    title: 'Consulting', sub: 'Audit · Diagnostic · Transfert',
    href: '/consulting/' },
  // 12. Contact — sur BMU (card 0)
  { section: 'contact', cardIndex: 0, localOffset: [0.0, 0.005, 0.0],
    title: 'Parlons de votre projet', sub: 'Premier échange sans engagement',
    href: '/contact/' },
];

/* ── Tuile plaquée sur la face du PCB ── */
function PcbTile({ offset, title, sub, visible, section, href }: {
  offset: [number, number, number];
  title: string; sub?: string; color?: string; visible: boolean; section?: string; href?: string;
}) {
  const isContact = section === 'contact';
  const isClickable = !!href || isContact;
  const linkHref = isContact ? undefined : href;

  const isBig = isContact;

  const content = (
    <div style={{
      minWidth: isBig ? '680px' : '520px',
      padding: isBig ? '48px 72px' : '28px 48px',
      textAlign: 'center',
      background: isClickable ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.55)',
      border: isClickable ? '4px solid #5bd1d8' : '3px solid rgba(255,255,255,0.4)',
      borderRadius: isClickable ? '24px' : '16px',
      cursor: isClickable ? 'pointer' : 'default',
      transform: 'translate3d(0,0,0)',
    }}>
      <div style={{
        fontSize: isBig ? '48px' : '36px',
        fontWeight: 800,
        color: isClickable ? '#5bd1d8' : '#fff',
        letterSpacing: '0.05em', textTransform: 'uppercase',
        fontFamily: "'Courier New', monospace",
      }}>{title}</div>
      {sub && <div style={{
        fontSize: isBig ? '28px' : '24px',
        color: 'rgba(255,255,255,0.55)',
        marginTop: isBig ? '20px' : '12px',
        fontFamily: "'Courier New', monospace", letterSpacing: '0.03em',
      }}>{sub}</div>}
    </div>
  );

  return (
    <Html position={offset} center distanceFactor={isBig ? 0.2 : 0.4}
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.5s',
        pointerEvents: isClickable && visible ? 'auto' : 'none',
        whiteSpace: 'nowrap',
      }}>
      {isContact ? (
        <div onClick={() => window.dispatchEvent(new CustomEvent('open-contact-drawer', { detail: { source: 'pcb_contact' } }))}
          style={{ textDecoration: 'none', display: 'block' }}>{content}</div>
      ) : linkHref ? (
        <a href={linkHref} style={{ textDecoration: 'none', display: 'block' }}>{content}</a>
      ) : content}
    </Html>
  );
}

/* ── Card ── */
function CardModel({ file }: { file: string }) {
  const { scene } = useGLTF(file);
  const cloned = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((child) => { if (child instanceof THREE.Mesh && child.material) child.material.envMapIntensity = 1.5; });
    return c;
  }, [scene]);
  return <primitive object={cloned} />;
}

/* ── Video plane on PCB bottom (real 3D mesh with VideoTexture) ── */
function PcbVideoMesh({ offset, src, visible }: {
  offset: [number, number, number]; src: string; visible: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const texRef = useRef<THREE.VideoTexture | null>(null);

  // Mosfet card local space: ~0.38 x 0.86 (XZ), Y = thickness
  // Plane size: cover most of the bottom face
  const planeW = 1.9, planeH = 4.275;

  useEffect(() => {
    const video = document.createElement('video');
    video.src = src;
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';
    videoRef.current = video;

    const tex = new THREE.VideoTexture(video);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.colorSpace = THREE.SRGBColorSpace;
    texRef.current = tex;

    return () => { video.pause(); video.src = ''; tex.dispose(); };
  }, [src]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (visible) { videoRef.current.play().catch(() => {}); }
    else { videoRef.current.pause(); }
  }, [visible]);

  useFrame(() => {
    if (meshRef.current && texRef.current) {
      (meshRef.current.material as THREE.MeshStandardMaterial).opacity = visible ? 1 : 0;
      texRef.current.needsUpdate = visible;
    }
  });

  return (
    <mesh ref={meshRef} position={offset} rotation={[0, Math.PI, 0]} scale={[-1, -1, 1]}>
      <planeGeometry args={[planeW, planeH]} />
      <meshStandardMaterial
        map={texRef.current}
        transparent
        opacity={0}
        emissive="#ffffff"
        emissiveIntensity={0.3}
        emissiveMap={texRef.current}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ── Photo carousel plane on PCB bottom (real 3D mesh with swapping texture) ── */
const CAROUSEL_PHOTOS = [
  '/assets/photos/pcb-teensy-led-kxkm.webp',
  '/assets/photos/pcb-verso-soudures.webp',
  '/assets/photos/soudure-pcb-composants.webp',
  '/assets/photos/bench-bms-batteries-xt60.webp',
  '/assets/photos/automate-siemens-s7.webp',
  '/assets/photos/armoire-automate-schneider.webp',
  '/assets/photos/oscilloscope-philips-vintage.webp',
  '/assets/photos/workspace-dev-tektronix.webp',
  '/assets/photos/platine-automate-cablage.webp',
  '/assets/photos/bench-ampli-oscilloscope.webp',
  '/assets/photos/pcb-produit-embarque.webp',
  '/assets/photos/portrait-bench.webp',
];

function PcbCarouselMesh({ offset, visible }: {
  offset: [number, number, number]; visible: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const textures = useRef<THREE.Texture[]>([]);
  const [idx, setIdx] = useState(0);
  const autoTimer = useRef(0);
  const planeW = 1.9, planeH = 4.275;

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    textures.current = CAROUSEL_PHOTOS.map(url => {
      const t = loader.load(url);
      t.colorSpace = THREE.SRGBColorSpace;
      t.minFilter = THREE.LinearFilter;
      return t;
    });
    return () => textures.current.forEach(t => t.dispose());
  }, []);

  // Auto-advance every 3s when visible
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.opacity = visible ? 1 : 0;
    if (textures.current[idx]) {
      mat.map = textures.current[idx];
      mat.emissiveMap = textures.current[idx];
      mat.needsUpdate = true;
    }
    if (visible) {
      autoTimer.current += delta;
      if (autoTimer.current > 3) {
        autoTimer.current = 0;
        setIdx(i => (i + 1) % CAROUSEL_PHOTOS.length);
      }
    }
  });

  return (
    <mesh ref={meshRef} position={offset} rotation={[0, Math.PI, 0]} scale={[-1, -1, 1]}>
      <planeGeometry args={[planeW, planeH]} />
      <meshStandardMaterial
        transparent
        opacity={0}
        emissive="#ffffff"
        emissiveIntensity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ── Media definitions for mosfet bottoms ── */
const MOSFET_VIDEOS = [
  { cardIndex: 2, src: '/assets/videos/video-test-prototype.mp4' },
  { cardIndex: 3, src: '/assets/videos/video-bench-electronique.mp4' },
  { cardIndex: 4, src: '/assets/videos/video-atelier-terrain.mp4' },
];
const MOSFET_CAROUSEL_CARD = 5; // mosfet #4

/* ── Assembly ── */
function Assembly({ scrollRef, onSection }: {
  scrollRef: React.MutableRefObject<number>; onSection: (id: string) => void;
}) {
  const assemblyGroup = useRef<THREE.Group>(null);
  const cardsRef = useRef<THREE.Group[]>([]);
  const fitted = useRef(false);
  const { camera } = useThree();
  const smoothScroll = useRef(0);
  const origPositions = useRef<THREE.Vector3[]>([]);
  const assemblyScale = useRef(1);
  const [currentSection, setCurrentSection] = useState('hero');

  useFrame((_, delta) => {
    if (!assemblyGroup.current) return;

    // Auto-fit on first valid frame
    if (!fitted.current && cardsRef.current.filter(Boolean).length === CARDS_DEF.length) {
      fitted.current = true;
      const box = new THREE.Box3().setFromObject(assemblyGroup.current);
      const center = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(...box.getSize(new THREE.Vector3()).toArray());
      const scale = 2.2 / maxDim;
      assemblyScale.current = scale;
      assemblyGroup.current.scale.setScalar(scale);
      assemblyGroup.current.position.copy(center.multiplyScalar(-scale));
      assemblyGroup.current.updateMatrixWorld(true);
      origPositions.current = cardsRef.current.map(g => g.position.clone());
    }
    if (!fitted.current) return;

    // Smooth scroll
    smoothScroll.current += (scrollRef.current - smoothScroll.current) * Math.min(1, delta * 2);
    const t = Math.max(0, Math.min(1, smoothScroll.current));

    // Find current section
    let section = SECTIONS[SECTIONS.length - 1];
    for (const s of SECTIONS) { if (t >= s.start && t <= s.end) { section = s; break; } }

    const range = section.end - section.start || 1;
    let f = Math.max(0, Math.min(1, (t - section.start) / range));
    f = f * f * (3 - 2 * f); // smoothstep

    // Explode
    const explodeEnd = section.explodeEnd ?? section.explode;
    const explode = section.explode + (explodeEnd - section.explode) * f;

    // Apply explode to cards with stagger delay and rotation
    for (let i = 0; i < cardsRef.current.length; i++) {
      if (!cardsRef.current[i] || !origPositions.current[i]) continue;
      const g = cardsRef.current[i];
      const orig = origPositions.current[i];
      const def = CARDS_DEF[i];

      // Staggered explode: each card starts moving at its delay point
      const delay = def.explodeDelay;
      const cardExplode = Math.max(0, Math.min(1, (explode - delay) / (1 - delay)));

      // Position
      g.position.set(
        orig.x + def.explodeDir[0] * def.explodeDist * cardExplode,
        orig.y + def.explodeDir[1] * def.explodeDist * cardExplode,
        orig.z + def.explodeDir[2] * def.explodeDist * cardExplode,
      );

      // Rotation: interpolate toward flat when explodeRotTarget is set
      if (def.explodeRotTarget) {
        const origRot = def.rotation;
        // Mosfets flip to flat during the last phase (cardExplode > 0.5)
        const rotT = Math.max(0, Math.min(1, (cardExplode - 0.5) * 2));
        const smoothRot = rotT * rotT * (3 - 2 * rotT);
        g.rotation.set(
          origRot[0] + (def.explodeRotTarget[0] - origRot[0]) * smoothRot,
          origRot[1] + (def.explodeRotTarget[1] - origRot[1]) * smoothRot,
          origRot[2] + (def.explodeRotTarget[2] - origRot[2]) * smoothRot,
        );
      }
    }

    // Compute camera: focus on card or center
    const focusStart = section.focus;
    const focusEnd = section.focusEnd !== undefined ? section.focusEnd : focusStart;

    // Get world position of focused card
    function getCardWorldPos(cardIdx: number | null): THREE.Vector3 {
      if (cardIdx !== null && cardsRef.current[cardIdx]) {
        const wp = new THREE.Vector3();
        cardsRef.current[cardIdx].getWorldPosition(wp);
        return wp;
      }
      return new THREE.Vector3(0, 0, 0); // assembly center
    }

    const targetStart = getCardWorldPos(focusStart);
    const targetEnd = getCardWorldPos(focusEnd);
    const target = new THREE.Vector3().lerpVectors(targetStart, targetEnd, f);

    // Apply targetShift — interpolate between start and end for dolly effect
    if (section.targetShift) {
      const shiftStart = new THREE.Vector3(...section.targetShift);
      const shiftEnd = new THREE.Vector3(...(section.targetShiftEnd || section.targetShift));
      const shift = new THREE.Vector3().lerpVectors(shiftStart, shiftEnd, f);
      if (assemblyGroup.current) {
        shift.applyMatrix4(assemblyGroup.current.matrixWorld).sub(
          new THREE.Vector3().setFromMatrixPosition(assemblyGroup.current.matrixWorld)
        );
      }
      target.add(shift);
    }

    const offStart = new THREE.Vector3(...section.camOffset);
    const offEnd = new THREE.Vector3(...(section.camOffsetEnd || section.camOffset));
    const offset = new THREE.Vector3().lerpVectors(offStart, offEnd, f);

    const camPos = target.clone().add(offset);

    camera.position.lerp(camPos, Math.min(1, delta * 1));
    camera.lookAt(target);

    // Update section
    if (section.id !== currentSection) {
      setCurrentSection(section.id);
      onSection(section.id);
    }
  });

  return (
    <group ref={assemblyGroup} rotation={[-0.25, 0, 0]}>
      {CARDS_DEF.map((card, i) => (
        <group key={i}
          ref={(el) => { if (el) cardsRef.current[i] = el; }}
          position={card.position} rotation={card.rotation}
          onClick={(e) => { e.stopPropagation(); window.location.href = '/contact/'; }}
          onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { document.body.style.cursor = ''; }}>
          <CardModel file={card.file} />
          {/* Tuiles 3D plaquées sur les faces */}
          {PCB_LABELS.filter(l => l.cardIndex === i).map((label, li) => (
            <PcbTile key={`t${li}`} offset={label.localOffset}
              title={label.title} sub={label.sub} color={label.color}
              visible={currentSection === label.section || (label.section === 'cas' && currentSection === 'media')} section={label.section}
              href={label.href} />
          ))}
          {/* Videos on mosfet bottoms — real 3D mesh planes */}
          {MOSFET_VIDEOS.filter(v => v.cardIndex === i).map((v, vi) => (
            <PcbVideoMesh key={`v${vi}`} offset={[0, 0, -0.1]} src={v.src}
              visible={currentSection === 'media' || currentSection === 'cas'} />
          ))}
          {/* Carousel on mosfet #4 bottom — real 3D mesh plane */}
          {i === MOSFET_CAROUSEL_CARD && (
            <PcbCarouselMesh offset={[0, 0, -0.1]} visible={currentSection === 'media' || currentSection === 'cas'} />
          )}
        </group>
      ))}
    </group>
  );
}

/* ── Pulsed Bloom — machine breathing ── */
function PulsedBloom() {
  const bloomRef = useRef<any>(null);
  useFrame(({ clock }) => {
    if (!bloomRef.current) return;
    const t = clock.getElapsedTime();
    bloomRef.current.intensity = 0.25 + Math.sin(t * 0.8) * 0.1;
  });
  return <Bloom ref={bloomRef} intensity={0.25} luminanceThreshold={0.8} luminanceSmoothing={0.9} mipmapBlur />;
}

/* ── Export ── */
export function BmuViewer() {
  const scrollRef = useRef(0);
  const [, setSectionId] = useState('hero');

  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? window.scrollY / max : 0;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'auto' }}>
      <Canvas gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]} camera={{ fov: 35, near: 0.01, far: 50 }}
        style={{ background: 'transparent', pointerEvents: 'auto', touchAction: 'pan-y' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 5]} intensity={2.2} color="#ffffff" />
        <directionalLight position={[-3, 4, -2]} intensity={0.9} color="#5bd1d8" />
        <directionalLight position={[0, -4, 2]} intensity={0.5} color="#f1c27a" />
        <Suspense fallback={null}>
          <Assembly scrollRef={scrollRef} onSection={setSectionId} />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.15} scale={10} blur={2.5} far={5} color="#000000" />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
