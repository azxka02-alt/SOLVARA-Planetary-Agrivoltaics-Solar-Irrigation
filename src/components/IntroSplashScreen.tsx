import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { FullLang } from '../translations';
import { LanguageSwitcher } from './LanguageSwitcher';

type IntroPhase =
  | 'idle'
  | 'logo-exit'
  | 'sol-in'
  | 'vara-in'
  | 'docking'
  | 'shockwave';

interface StarSpec {
  id: number;
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  duration: number;
  delay: number;
  isCyan: boolean;
  isCross: boolean;
}

interface DockTransform {
  dx: number;
  dy: number;
  scale: number;
  anchorX: number;
  anchorY: number;
  waveDiameter: number;
}

interface IntroSplashScreenProps {
  lang: FullLang;
  onSelectLanguage: (code: FullLang | string) => void;
  startButtonLabel: string;
  logoAriaLabel: string;
  searchPlaceholder: string;
  noMatchLabel: string;
  switcherLabel: string;
  targetBrandRef: React.RefObject<HTMLSpanElement | null>;
  onRevealStart: () => void;
  onComplete: () => void;
}

function buildStarfield(count: number): StarSpec[] {
  const stars: StarSpec[] = [];
  for (let i = 0; i < count; i++) {
    const s1 = Math.sin(i * 12.9898 + 4.1414) * 43758.5453;
    const s2 = Math.sin(i * 78.233 + 1.732) * 29183.1921;
    const s3 = Math.sin(i * 39.425 + 9.211) * 19482.7311;
    const r1 = s1 - Math.floor(s1);
    const r2 = s2 - Math.floor(s2);
    const r3 = s3 - Math.floor(s3);

    stars.push({
      id: i,
      x: Number((r1 * 96 + 2).toFixed(2)),
      y: Number((r2 * 96 + 2).toFixed(2)),
      size: i % 11 === 0 ? 2.4 : i % 3 === 0 ? 1.7 : 1.1,
      baseOpacity: 0.18 + r3 * 0.52,
      duration: 3.2 + (i % 7) * 0.65,
      delay: (i % 9) * 0.42,
      isCyan: i % 4 === 0,
      isCross: i === 7 || i === 23 || i === 44 || i === 61,
    });
  }
  return stars;
}

export const IntroSplashScreen: React.FC<IntroSplashScreenProps> = ({
  lang,
  onSelectLanguage,
  startButtonLabel,
  logoAriaLabel,
  searchPlaceholder,
  noMatchLabel,
  switcherLabel,
  targetBrandRef,
  onRevealStart,
  onComplete,
}) => {
  const [phase, setPhase] = useState<IntroPhase>('idle');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [tilt, setTilt] = useState<{ rx: number; ry: number; gx: number; gy: number }>({
    rx: 0,
    ry: 0,
    gx: 50,
    gy: 50,
  });
  const [imgFailed, setImgFailed] = useState<boolean>(false);
  const [dockTransform, setDockTransform] = useState<DockTransform>({
    dx: -360,
    dy: -280,
    scale: 0.34,
    anchorX: 72,
    anchorY: 32,
    waveDiameter: 3800,
  });

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const logoStageRef = useRef<HTMLButtonElement | null>(null);
  const wordmarkRef = useRef<HTMLDivElement | null>(null);
  const isRtl = lang === 'ar';

  const stars = useMemo(() => buildStarfield(72), []);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current = [];
    };
  }, []);

  const computeDockTarget = (): DockTransform => {
    const viewportDiagonal =
      typeof window !== 'undefined'
        ? Math.hypot(window.innerWidth, window.innerHeight)
        : 1600;
    // Radius = 150% of screen diagonal => Diameter = 300% of screen diagonal
    const waveDiameter = Math.ceil(viewportDiagonal * 3);

    const wordmarkEl = wordmarkRef.current;
    const headerBrandEl = targetBrandRef.current;
    if (!wordmarkEl || !headerBrandEl) {
      return {
        dx: -360,
        dy: -280,
        scale: 0.34,
        anchorX: 72,
        anchorY: 32,
        waveDiameter,
      };
    }

    const fromRect = wordmarkEl.getBoundingClientRect();
    const toRect = headerBrandEl.getBoundingClientRect();

    const fromCenterX = fromRect.left + fromRect.width / 2;
    const fromCenterY = fromRect.top + fromRect.height / 2;
    const toCenterX = toRect.left + toRect.width / 2;
    const toCenterY = toRect.top + toRect.height / 2;

    const scaleByWidth = toRect.width / Math.max(1, fromRect.width);
    const scaleByHeight = toRect.height / Math.max(1, fromRect.height);
    const targetScale = Number(((scaleByWidth + scaleByHeight) / 2).toFixed(4));

    return {
      dx: Number((toCenterX - fromCenterX).toFixed(2)),
      dy: Number((toCenterY - fromCenterY).toFixed(2)),
      scale: Math.max(0.2, Math.min(0.85, targetScale)),
      anchorX: Number(toCenterX.toFixed(1)),
      anchorY: Number(toCenterY.toFixed(1)),
      waveDiameter,
    };
  };

  const handleStartSequence = () => {
    if (phase !== 'idle') return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      onRevealStart();
      setPhase('shockwave');
      const tDone = setTimeout(() => onComplete(), 350);
      timersRef.current.push(tDone);
      return;
    }

    // 1) Logo recedes into depth (scale 1 -> 0.3, blur 8px, fade-out ~0.7s) + backdrop glass blur
    setPhase('logo-exit');

    // 2) "SOL" gradually reveals from blur(10px) -> blur(0px), scale 0.92 -> 1 (~0.8s ease-out)
    const tSol = setTimeout(() => {
      setPhase('sol-in');
    }, 720);

    // 3) "VARA" emerges rapidly rightwards from behind/inside "SOL" (~0.6s)
    const tVara = setTimeout(() => {
      setPhase('vara-in');
    }, 1560);

    // 4) Hold complete "SOLVARA" for ~0.5s after VARA finishes (+600ms + 500ms = 2660ms),
    //    then measure exact top-left header brand coordinates and glide smoothly into place (0.6s)
    const tDock = setTimeout(() => {
      setDockTransform(computeDockTarget());
      setPhase('docking');
    }, 2660);

    // 5) Right when "SOLVARA" lands on the top-left navbar (+600ms = 3260ms):
    //    fire neon green-blue radial shockwave & unblur main dashboard from blur(8px) -> blur(0px)
    const tShockwave = setTimeout(() => {
      setPhase('shockwave');
      onRevealStart();
    }, 3260);

    // 6) Unmount splash after single 1.2s GPU shockwave & 0.8s page transition complete (+1220ms = 4480ms)
    const tDone = setTimeout(() => {
      onComplete();
    }, 4480);

    timersRef.current.push(tSol, tVara, tDock, tShockwave, tDone);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (phase !== 'idle' || !logoStageRef.current) return;
    const rect = logoStageRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const clampedX = Math.max(0, Math.min(1, px));
    const clampedY = Math.max(0, Math.min(1, py));

    const ry = (clampedX - 0.5) * 16;
    const rx = (0.5 - clampedY) * 16;
    setTilt({
      rx: Number(rx.toFixed(2)),
      ry: Number(ry.toFixed(2)),
      gx: Number((clampedX * 100).toFixed(1)),
      gy: Number((clampedY * 100).toFixed(1)),
    });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });
  };

  const isLogoExiting = phase !== 'idle';
  const isBackdropBlurred = phase !== 'idle';
  const isSolVisible =
    phase === 'sol-in' ||
    phase === 'vara-in' ||
    phase === 'docking' ||
    phase === 'shockwave';
  const isVaraRevealed =
    phase === 'vara-in' || phase === 'docking' || phase === 'shockwave';
  const isDockingOrDone = phase === 'docking' || phase === 'shockwave';
  const isShockwave = phase === 'shockwave';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="SOLVARA"
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center text-white overflow-hidden select-none ${
        isShockwave ? 'pointer-events-none' : ''
      }`}
    >
      {/* Solid Dark Space Cover (#030816) covering main page until shockwave triggers */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#030816]"
        style={{
          opacity: isShockwave ? 0 : 1,
          transition: 'opacity 380ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Subtle Deep-Space Radial Atmosphere Matching Emblem Palette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: isShockwave ? 0 : 1,
          transition: 'opacity 360ms ease-out',
          background:
            'radial-gradient(circle at 50% 47%, rgba(14, 116, 144, 0.16) 0%, rgba(16, 185, 129, 0.06) 28%, rgba(3, 8, 22, 0.94) 64%, #030816 100%)',
        }}
      />

      {/* Subtle Star Particle Field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          opacity: isShockwave ? 0 : 1,
          transition: 'opacity 320ms ease-out',
        }}
      >
        {stars.map((star) =>
          star.isCross ? (
            <span
              key={star.id}
              className="animate-intro-twinkle absolute block"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: '10px',
                height: '10px',
                animationDuration: `${star.duration}s`,
                animationDelay: `${star.delay}s`,
              }}
            >
              <svg viewBox="0 0 16 16" className="w-full h-full opacity-75">
                <path
                  d="M8 0 L9.4 6.6 L16 8 L9.4 9.4 L8 16 L6.6 9.4 L0 8 L6.6 6.6 Z"
                  fill={star.isCyan ? '#7dd3fc' : '#6ee7b7'}
                />
              </svg>
            </span>
          ) : (
            <span
              key={star.id}
              className="animate-intro-twinkle absolute rounded-full"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.baseOpacity,
                backgroundColor: star.isCyan ? '#bae6fd' : '#e2e8f0',
                boxShadow: star.size > 1.8 ? '0 0 6px rgba(125, 211, 252, 0.65)' : 'none',
                animationDuration: `${star.duration}s`,
                animationDelay: `${star.delay}s`,
              }}
            />
          )
        )}
      </div>

      {/* Frosted Glass Backdrop Overlay (Fades in as logo recedes, remains during docking, clears on shockwave) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          opacity: isShockwave ? 0 : isBackdropBlurred ? 1 : 0,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          transition: isShockwave ? 'opacity 380ms ease-out' : 'opacity 700ms ease-out',
          background:
            'radial-gradient(circle at 50% 50%, rgba(6, 18, 40, 0.42) 0%, rgba(3, 8, 22, 0.72) 70%, rgba(3, 8, 22, 0.88) 100%)',
        }}
      />

      {/* Single GPU-Accelerated Neon Cyan-Emerald Shockwave Ring (transform + opacity only, no heavy shadows/blurs) */}
      {isShockwave && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
        >
          <div
            className="animate-neon-shockwave pointer-events-none absolute rounded-full"
            style={{
              left: `${dockTransform.anchorX}px`,
              top: `${dockTransform.anchorY}px`,
              width: `${dockTransform.waveDiameter}px`,
              height: `${dockTransform.waveDiameter}px`,
              border: '4px solid #00f0ff',
              background:
                'radial-gradient(circle, transparent 90%, rgba(16, 185, 129, 0.22) 94%, rgba(16, 185, 129, 0.62) 97.2%, rgba(0, 240, 255, 0.85) 99%, rgba(16, 185, 129, 0.28) 99.7%, transparent 100%)',
              willChange: 'transform, opacity',
            }}
          />
        </div>
      )}

      {/* Top-Right Compact Language Selector */}
      <div
        className={`absolute top-5 end-5 z-20 transition-opacity duration-300 ${
          phase === 'idle' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <LanguageSwitcher
          selectedLang={lang}
          onSelectLanguage={onSelectLanguage}
          isDark={true}
          searchPlaceholder={searchPlaceholder}
          noMatchLabel={noMatchLabel}
          switcherLabel={switcherLabel}
        />
      </div>

      {/* CENTER STAGE */}
      <div className="relative z-10 flex items-center justify-center w-full max-w-3xl min-h-[420px] px-6">
        {/* Layer A: Interactive Logo + Launch System CTA */}
        <div
          className={`flex flex-col items-center justify-center ${
            isLogoExiting ? 'pointer-events-none' : ''
          }`}
        >
          {/* Logo Recedes Into Depth: scale(1 -> 0.3), blur(0 -> 8px), opacity(1 -> 0) over 0.7s */}
          <button
            ref={logoStageRef}
            type="button"
            tabIndex={phase === 'idle' ? 0 : -1}
            aria-label={logoAriaLabel}
            onClick={handleStartSequence}
            onPointerEnter={() => setIsHovered(true)}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            className="group relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
            style={{
              perspective: '950px',
              opacity: isLogoExiting ? 0 : 1,
              transform: isLogoExiting ? 'scale(0.3)' : 'scale(1)',
              filter: isLogoExiting ? 'blur(8px)' : 'blur(0px)',
              transition:
                'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1), filter 700ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {/* Soft Ambient Cyan-Emerald Back Glow */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute -inset-6 rounded-full blur-2xl transition-all duration-500 ${
                isHovered
                  ? 'opacity-95 scale-105 bg-gradient-to-tr from-emerald-500/30 via-cyan-400/25 to-sky-500/30'
                  : 'opacity-65 scale-95 bg-gradient-to-tr from-emerald-500/18 via-cyan-400/14 to-sky-500/18'
              }`}
            />

            {/* Pulsing Orbital Ring */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-1 rounded-full transition-all duration-500 ${
                isHovered ? 'scale-[1.045] opacity-100' : 'scale-100 opacity-75'
              }`}
            >
              <svg
                viewBox="0 0 240 240"
                className={`w-full h-full animate-orbit-pulse ${
                  isHovered ? '[animation-duration:4.5s]' : ''
                }`}
              >
                <defs>
                  <linearGradient id="intro-orbit-ring-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.85" />
                    <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#34d399" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <circle
                  cx="120"
                  cy="120"
                  r="114"
                  fill="none"
                  stroke="url(#intro-orbit-ring-grad)"
                  strokeWidth={isHovered ? '1.8' : '1.2'}
                  strokeDasharray="190 36 52 24"
                />
                <circle cx="206" cy="46" r="3" fill="#34d399" />
                <circle cx="34" cy="192" r="2.2" fill="#38bdf8" />
              </svg>
            </div>

            {/* Hover Expanding Pulse Halo */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-3 rounded-full border border-emerald-400/30 transition-all duration-500 ${
                isHovered && !isLogoExiting
                  ? 'scale-110 opacity-100 animate-ping [animation-duration:2.4s]'
                  : 'scale-95 opacity-0'
              }`}
            />

            {/* 3D Tilted Emblem Artwork */}
            <div
              className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full overflow-hidden flex items-center justify-center transition-transform duration-200 ease-out"
              style={{
                transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${
                  isHovered && !isLogoExiting ? 1.04 : 1
                })`,
                transformStyle: 'preserve-3d',
              }}
            >
              {!imgFailed ? (
                <img
                  src="/assets/aistudio/image_d5cdca3e.png"
                  alt="SOLVARA Emblem"
                  draggable={false}
                  referrerPolicy="no-referrer"
                  onError={() => setImgFailed(true)}
                  className="w-[108%] h-[108%] max-w-none object-cover object-center"
                />
              ) : (
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-sky-500/25 via-cyan-500/20 to-emerald-500/25 border border-cyan-400/40 flex items-center justify-center">
                  <span className="text-2xl font-extrabold tracking-widest text-cyan-200">SOLVARA</span>
                </div>
              )}

              {/* Specular pointer sheen on hover */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(125, 211, 252, 0.22), transparent 52%)`,
                }}
              />

              {/* Radial Feather Vignette */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(3, 8, 22, 0) 56%, rgba(3, 8, 22, 0.72) 74%, #030816 90%)',
                }}
              />
            </div>
          </button>

          {/* Primary Button Below Logo ("Launch System") */}
          <button
            type="button"
            tabIndex={phase === 'idle' ? 0 : -1}
            onClick={handleStartSequence}
            className="mt-7 group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold tracking-wide text-white bg-[#071429]/90 border border-emerald-400/45 shadow-[0_0_28px_rgba(16,185,129,0.22)] hover:border-emerald-300 hover:bg-[#0a1d3b] hover:shadow-[0_0_38px_rgba(34,211,238,0.38)] active:scale-[0.98] cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            style={{
              opacity: isLogoExiting ? 0 : 1,
              transform: isLogoExiting ? 'scale(0.86) translateY(8px)' : 'scale(1) translateY(0)',
              filter: isLogoExiting ? 'blur(4px)' : 'blur(0px)',
              transition:
                'opacity 420ms ease-out, transform 420ms ease-out, filter 420ms ease-out, border-color 200ms, background-color 200ms, box-shadow 200ms',
            }}
          >
            <span translate="no" className="notranslate">
              {startButtonLabel}
            </span>
            <ArrowRight
              className={`w-4 h-4 text-emerald-300 transition-transform duration-200 ${
                isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Layer B: SOLVARA Wordmark Reveal -> Fly & Scale to Top-Left Header Position */}
        <div
          dir="ltr"
          translate="no"
          aria-hidden={!isSolVisible}
          className="notranslate pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          {/* Ambient glow behind complete SOLVARA (fades once docking starts) */}
          <div
            aria-hidden="true"
            className="absolute w-72 h-28 rounded-full blur-3xl transition-opacity duration-500"
            style={{
              opacity: isDockingOrDone ? 0 : isVaraRevealed ? 0.65 : isSolVisible ? 0.35 : 0,
              background:
                'radial-gradient(circle, rgba(52, 211, 153, 0.28) 0%, rgba(56, 189, 248, 0.22) 55%, transparent 100%)',
            }}
          />

          {/* Outer Docker: Flies SOLVARA from screen center to exact header SOLVARA coordinates */}
          <div
            ref={wordmarkRef}
            className="relative inline-flex items-baseline justify-center font-extrabold text-5xl sm:text-6xl md:text-7xl will-change-transform"
            style={{
              letterSpacing: isDockingOrDone ? '0.05em' : '0.14em',
              opacity: isShockwave ? 0 : 1,
              transform: isDockingOrDone
                ? `translate3d(${dockTransform.dx}px, ${dockTransform.dy}px, 0) scale(${dockTransform.scale})`
                : 'translate3d(0px, 0px, 0) scale(1)',
              transition: isShockwave
                ? 'opacity 220ms ease-out'
                : 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1), letter-spacing 600ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {/* Shifts SOL smoothly left when VARA emerges */}
            <span
              className="inline-block"
              style={{
                transform: isVaraRevealed ? 'translateX(0)' : 'translateX(57%)',
                transition: 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Gradual 0.8s ease-out SOL reveal: opacity 0->1, blur 10px->0px, scale 0.92->1 */}
              <span
                className="inline-block text-white"
                style={{
                  opacity: isSolVisible ? 1 : 0,
                  filter: isSolVisible ? 'blur(0px)' : 'blur(10px)',
                  transform: isSolVisible ? 'scale(1)' : 'scale(0.92)',
                  textShadow:
                    '0 0 28px rgba(186, 230, 253, 0.55), 0 0 8px rgba(56, 189, 248, 0.38)',
                  transition:
                    'opacity 800ms ease-out, filter 800ms ease-out, transform 800ms ease-out',
                }}
              >
                SOL
              </span>
            </span>

            {/* "VARA" emerges rapidly rightwards from behind/inside "SOL" */}
            <span
              className="inline-block bg-gradient-to-r from-emerald-300 via-emerald-400 to-cyan-300 bg-clip-text text-transparent"
              style={{
                opacity: isVaraRevealed ? 1 : 0,
                transform: isVaraRevealed ? 'translateX(0)' : 'translateX(-40px)',
                clipPath: isVaraRevealed
                  ? 'inset(-25% -25% -25% -12%)'
                  : 'inset(-25% 100% -25% -12%)',
                filter: isVaraRevealed
                  ? 'blur(0px) drop-shadow(0 0 24px rgba(52, 211, 153, 0.6))'
                  : 'blur(8px) drop-shadow(0 0 0px rgba(52, 211, 153, 0))',
                transition:
                  'opacity 560ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1), clip-path 600ms cubic-bezier(0.16, 1, 0.3, 1), filter 580ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              VARA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
