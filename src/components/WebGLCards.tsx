import { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

/* ===================================================================
   WEBGL CARDS — Scroll-triggered tile animations + media lightbox

   Features:
   - Cards materialize with particle burst on scroll-in
   - Cards dissolve with particle scatter on scroll-out
   - Photos/videos appear in a front-view lightbox on click
   - Energy ring orbits around focused media
   =================================================================== */

/* ---------- Particle burst effect (CSS + JS, no Three.js needed) ---------- */
function createParticleBurst(el: HTMLElement, color: string = '#5bd1d8') {
  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const count = 12;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'webgl-particle-burst';
    const angle = (i / count) * Math.PI * 2;
    const dist = 40 + Math.random() * 60;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    const size = 2 + Math.random() * 4;

    Object.assign(particle.style, {
      position: 'fixed',
      left: `${cx}px`,
      top: `${cy}px`,
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      background: color,
      boxShadow: `0 0 ${size * 2}px ${color}`,
      pointerEvents: 'none',
      zIndex: '9999',
      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      opacity: '1',
    });

    document.body.appendChild(particle);

    requestAnimationFrame(() => {
      particle.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
      particle.style.opacity = '0';
    });

    setTimeout(() => particle.remove(), 700);
  }
}

/* ---------- Scroll-triggered card wrapper ---------- */
export function WebGLCard({ children, color = '#5bd1d8', delay = 0 }: {
  children: React.ReactNode;
  color?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setTimeout(() => {
            setVisible(true);
            hasAnimated.current = true;
            createParticleBurst(el, color);
          }, delay);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [color, delay]);

  return (
    <div
      ref={ref}
      className={`webgl-card ${visible ? 'webgl-card--visible' : ''}`}
      style={{ '--card-accent': color } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

/* ---------- Media lightbox (photo/video front view) ---------- */
export function MediaLightbox() {
  const [active, setActive] = useState<{ type: 'img' | 'video'; src: string; alt?: string } | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Listen for clicks on photos and videos
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Photo click
      if (target.matches('.photo-strip-img, .webgl-media-trigger img')) {
        e.preventDefault();
        e.stopPropagation();
        const img = target as HTMLImageElement;
        setActive({ type: 'img', src: img.src, alt: img.alt });
        createParticleBurst(target, '#5bd1d8');
      }

      // Video click
      if (target.matches('.video-strip-clip, .webgl-media-trigger video')) {
        e.preventDefault();
        e.stopPropagation();
        const video = target as HTMLVideoElement;
        setActive({ type: 'video', src: video.src });
        createParticleBurst(target, '#f1c27a');
      }
    };

    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={overlayRef}
      className="media-lightbox"
      onClick={(e) => { if (e.target === overlayRef.current) setActive(null); }}
    >
      {/* Energy ring animation */}
      <div className="lightbox-ring lightbox-ring--1" />
      <div className="lightbox-ring lightbox-ring--2" />
      <div className="lightbox-ring lightbox-ring--3" />

      <div className="lightbox-content">
        {active.type === 'img' ? (
          <img src={active.src} alt={active.alt || ''} className="lightbox-media" />
        ) : (
          <video src={active.src} controls autoPlay muted loop className="lightbox-media" />
        )}
        <button className="lightbox-close" onClick={() => setActive(null)} aria-label="Fermer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ---------- Scroll-triggered section with atomic reveal ---------- */
export function WebGLSection({ children, id, className = '' }: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`webgl-section ${visible ? 'webgl-section--visible' : ''} ${className}`}
    >
      {children}
    </section>
  );
}
