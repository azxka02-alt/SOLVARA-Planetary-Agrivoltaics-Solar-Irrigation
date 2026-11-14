import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  buildSparklineGeometry,
  fetchNasaPowerForCoords,
  formatCoordinates,
  geocodeGlobalCity,
  getFallbackNasaTelemetry,
  GLOBAL_LOCATION_PRESETS,
  GlobalLocationPreset,
  NasaTelemetryState,
  resolveCustomGlobalLocation,
} from './services/nasaPower';
import {
  AdvisorPromptId,
  buildWhatsAppAlertMessage,
  FullLang,
  getAdvisorPromptAnswer,
  getAdvisorSummary,
  getEcosystemRiskCopy,
  getNumberLocale,
  getVfdRegimeCopy,
  TRANSLATIONS,
} from './translations';
import { WhatsAppPreviewModal } from './components/WhatsAppPreviewModal';
import {
  clearExternalTranslationArtifacts,
  LanguageSwitcher,
  normalizeLanguageCode,
  persistLanguagePreference,
  readPersistedLanguage,
  syncHtmlDirection,
} from './components/LanguageSwitcher';

// --- CUSTOM SOLVARA EMBLEM & GLOWING DUOTONE SVG ICONS ---
const SolvaraLogo = ({ className = 'w-11 h-11' }: { className?: string }) => {
  const uid = React.useId().replace(/:/g, '');
  const bgId = `solvara-bg-${uid}`;
  const orbitId = `solvara-orbit-${uid}`;
  const dropId = `solvara-drop-${uid}`;
  const panelId = `solvara-panel-${uid}`;
  const glowId = `solvara-glow-${uid}`;

  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="SOLVARA Emblem">
      <defs>
        <radialGradient id={bgId} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#0f294d" />
          <stop offset="65%" stopColor="#07162e" />
          <stop offset="100%" stopColor="#030916" />
        </radialGradient>
        <linearGradient id={orbitId} x1="10%" y1="90%" x2="90%" y2="10%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id={dropId} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="38%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id={panelId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e40af" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#0c2654" stopOpacity="0.96" />
        </linearGradient>
        <filter id={glowId} x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="60" cy="60" r="54" fill={`url(#${bgId})`} stroke={`url(#${orbitId})`} strokeOpacity="0.45" strokeWidth="1.6" />
      <circle cx="60" cy="60" r="49" stroke="#22d3ee" strokeOpacity="0.18" strokeWidth="1" />

      <circle cx="24" cy="34" r="1" fill="#bae6fd" fillOpacity="0.7" />
      <circle cx="95" cy="30" r="1.2" fill="#6ee7b7" fillOpacity="0.75" />
      <circle cx="28" cy="88" r="1" fill="#7dd3fc" fillOpacity="0.55" />

      <path
        d="M 21 63 A 39 39 0 0 1 99 63"
        stroke={`url(#${orbitId})`}
        strokeWidth="2.8"
        strokeLinecap="round"
        filter={`url(#${glowId})`}
      />
      <path
        d="M 27.5 62 A 32.5 32.5 0 0 1 92.5 62"
        stroke="#6ee7b7"
        strokeOpacity="0.85"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="73" y="29.5" width="5.5" height="3.2" rx="0.8" transform="rotate(26 73 29.5)" fill="#6ee7b7" />
      <rect x="80.5" y="33.5" width="7" height="3.6" rx="0.8" transform="rotate(34 80.5 33.5)" fill="#22d3ee" />

      <path d="M22 61 L46 42 L53 77 L27 77 Z" fill={`url(#${panelId})`} stroke="#7dd3fc" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M28 56.5 L48 64 M34 51.5 L50 58 M36 49.5 L31 77 M42 45 L40 77" stroke="#bae6fd" strokeOpacity="0.55" strokeWidth="1" />
      <path d="M98 61 L74 42 L67 77 L93 77 Z" fill={`url(#${panelId})`} stroke="#7dd3fc" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M92 56.5 L72 64 M86 51.5 L70 58 M84 49.5 L89 77 M78 45 L80 77" stroke="#bae6fd" strokeOpacity="0.55" strokeWidth="1" />
      <path d="M32 80 L58 80 L58 97 C46 96 36 89 32 80 Z" fill={`url(#${panelId})`} stroke="#7dd3fc" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M88 80 L62 80 L62 97 C74 96 84 89 88 80 Z" fill={`url(#${panelId})`} stroke="#7dd3fc" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M45 80 L47 93 M75 80 L73 93 M37 86 L58 87 M83 86 L62 87" stroke="#bae6fd" strokeOpacity="0.55" strokeWidth="1" />

      <g filter={`url(#${glowId})`}>
        <path
          d="M60 21 C60 21 81 46 81 62 C81 73.6 71.6 83 60 83 C48.4 83 39 73.6 39 62 C39 46 60 21 60 21 Z"
          fill={`url(#${dropId})`}
          stroke="#bae6fd"
          strokeWidth="1.6"
        />
      </g>
      <path
        d="M60 30 C60 30 75 49 75 61.5 C75 69.8 68.3 76.5 60 76.5 C51.7 76.5 45 69.8 45 61.5 C45 49 60 30 60 30 Z"
        fill="#0ea5e9"
        fillOpacity="0.35"
        stroke="#e0f2fe"
        strokeOpacity="0.7"
        strokeWidth="1.2"
      />
      <path
        d="M60 39.5 C60 39.5 69 52 69 60.5 C69 65.5 65 69.5 60 69.5 C55 69.5 51 65.5 51 60.5 C51 52 60 39.5 60 39.5 Z"
        fill="#7dd3fc"
        fillOpacity="0.75"
        stroke="#ffffff"
        strokeOpacity="0.85"
        strokeWidth="1"
      />
      <ellipse cx="57.5" cy="54" rx="2.4" ry="5" transform="rotate(-12 57.5 54)" fill="#ffffff" fillOpacity="0.85" />

      <path
        d="M 15 73 C 23 95, 67 96, 94 70 C 110 54, 110 35, 96 29 C 90 26.5, 81 28, 72 32"
        stroke={`url(#${orbitId})`}
        strokeWidth="3.2"
        strokeLinecap="round"
        filter={`url(#${glowId})`}
      />
      <rect x="74" y="75.5" width="11" height="5.2" rx="1.6" transform="rotate(-38 74 75.5)" fill="#064e3b" stroke="#6ee7b7" strokeWidth="1.3" />
      <line x1="78" y1="74" x2="80.5" y2="77" stroke="#22d3ee" strokeWidth="1.1" />
    </svg>
  );
};

const SunIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={`${className} drop-shadow-[0_0_5px_currentColor]`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
    <circle cx="12" cy="12" r="4.8" fill="currentColor" fillOpacity="0.26" />
    <circle cx="12" cy="12" r="2.2" fill="currentColor" fillOpacity="0.55" stroke="none" />
    <path strokeLinecap="round" d="M12 2v2.4M12 19.6V22M4.93 4.93l1.7 1.7M17.37 17.37l1.7 1.7M2 12h2.4M19.6 12H22M4.93 19.07l1.7-1.7M17.37 6.63l1.7-1.7" />
  </svg>
);

const MoonIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={`${className} drop-shadow-[0_0_5px_currentColor]`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.22"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="19.5" cy="10" r="0.7" fill="currentColor" fillOpacity="0.7" stroke="none" />
  </svg>
);

const SatelliteIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={`${className} drop-shadow-[0_0_5px_currentColor]`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.85}>
    <rect x="2.5" y="7.5" width="5.5" height="4" rx="0.8" transform="rotate(-35 2.5 7.5)" fill="currentColor" fillOpacity="0.22" />
    <rect x="14.5" y="15.5" width="5.5" height="4" rx="0.8" transform="rotate(-35 14.5 15.5)" fill="currentColor" fillOpacity="0.22" />
    <rect x="9.2" y="8.2" width="5.6" height="5.6" rx="1.2" transform="rotate(-35 9.2 8.2)" fill="currentColor" fillOpacity="0.38" />
    <path strokeLinecap="round" d="M6.5 16.5a5 5 0 005 5" />
    <path strokeLinecap="round" d="M3.5 16.5a8 8 0 008 8" strokeOpacity="0.6" />
    <circle cx="9.2" cy="17.2" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const DropletIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={`${className} drop-shadow-[0_0_5px_currentColor]`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.25"
      d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"
    />
    <path strokeLinecap="round" d="M9.5 14.5a3.2 3.2 0 003.2 3.2" strokeOpacity="0.8" />
    <circle cx="10.2" cy="10.8" r="0.9" fill="currentColor" fillOpacity="0.7" stroke="none" />
  </svg>
);

const ActivityIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={`${className} drop-shadow-[0_0_5px_currentColor]`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
    <path d="M2 12h4l3-9 6 18 3-9h4v6H2z" fill="currentColor" fillOpacity="0.16" stroke="none" />
    <polyline strokeLinecap="round" strokeLinejoin="round" points="22 12 18 12 15 21 9 3 6 12 2 12" />
    <circle cx="9" cy="3" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="15" cy="21" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

const MapPinIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={`${className} drop-shadow-[0_0_5px_currentColor]`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.22"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <circle cx="12" cy="11" r="3.2" fill="currentColor" fillOpacity="0.35" />
    <circle cx="12" cy="11" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

const AlertTriangleIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={`${className} drop-shadow-[0_0_5px_currentColor]`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.22"
      d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
    />
    <path strokeLinecap="round" d="M12 9v4" />
    <circle cx="12" cy="16.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const ShieldCheckIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={`${className} drop-shadow-[0_0_5px_currentColor]`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.22"
      d="M12 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016A11.955 11.955 0 0112 2.944z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.2l2 2 4-4.2" />
  </svg>
);

const RefreshCwIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={`${className} drop-shadow-[0_0_4px_currentColor]`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
    <circle cx="12" cy="12" r="3.5" fill="currentColor" fillOpacity="0.2" stroke="none" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const LayersIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={`${className} drop-shadow-[0_0_5px_currentColor]`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" fill="currentColor" fillOpacity="0.28" strokeLinejoin="round" />
    <polyline strokeLinecap="round" strokeLinejoin="round" points="2 12 12 17 22 12" />
    <polyline strokeLinecap="round" strokeLinejoin="round" points="2 17 12 22 22 17" strokeOpacity="0.75" />
  </svg>
);

const PlayIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={`${className} drop-shadow-[0_0_5px_currentColor]`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
    <polygon points="7 4.5 19.5 12 7 19.5 7 4.5" fill="currentColor" fillOpacity="0.35" strokeLinejoin="round" />
    <polygon points="9.5 8.5 15.5 12 9.5 15.5 9.5 8.5" fill="currentColor" stroke="none" />
  </svg>
);

const FilterIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={`${className} drop-shadow-[0_0_4px_currentColor]`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" fill="currentColor" fillOpacity="0.22" strokeLinejoin="round" />
  </svg>
);

const MessageCircleIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={`${className} drop-shadow-[0_0_5px_currentColor]`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.22"
      d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
    />
    <circle cx="9" cy="11.5" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="12" cy="11.5" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="15" cy="11.5" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

const AiSparkIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={`${className} drop-shadow-[0_0_6px_currentColor]`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.85}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.24"
      d="M12 2.5l1.95 5.55L19.5 10l-5.55 1.95L12 17.5l-1.95-5.55L4.5 10l5.55-1.95L12 2.5z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.4"
      d="M18.5 15.5l.85 2.15 2.15.85-2.15.85-.85 2.15-.85-2.15-2.15-.85 2.15-.85.85-2.15z"
    />
    <circle cx="5.5" cy="18.5" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

const SolarPumpPinIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg
    className={`${className} drop-shadow-[0_0_8px_rgba(16,185,129,0.85)]`}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <polygon
      points="6.5,4.2 22.8,2.8 19.6,10.2 3.3,11.6"
      fill="#10b981"
      fillOpacity="0.28"
      stroke="#6ee7b7"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <line x1="11.8" y1="3.7" x2="8.7" y2="11.1" stroke="#a7f3d0" strokeOpacity="0.85" strokeWidth="1" />
    <line x1="17.2" y1="3.3" x2="14.1" y2="10.7" stroke="#a7f3d0" strokeOpacity="0.85" strokeWidth="1" />
    <line x1="4.9" y1="7.9" x2="21.2" y2="6.5" stroke="#a7f3d0" strokeOpacity="0.8" strokeWidth="1" />
    <line x1="13.2" y1="10.9" x2="13.2" y2="13.8" stroke="#34d399" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="13.2" cy="18.2" r="4.5" fill="#059669" fillOpacity="0.34" stroke="#34d399" strokeWidth="1.6" />
    <path d="M13.2 14.9 C14.6 15.6, 14.7 17.3, 13.2 18.2 C11.7 17.3, 11.8 15.6, 13.2 14.9 Z" fill="#6ee7b7" />
    <path d="M16.2 19.9 C14.9 20.6, 13.5 19.8, 13.2 18.2 C14.8 17.9, 16.2 18.5, 16.2 19.9 Z" fill="#34d399" />
    <path d="M10.2 19.9 C10.2 18.5, 11.6 17.9, 13.2 18.2 C12.9 19.8, 11.5 20.6, 10.2 19.9 Z" fill="#a7f3d0" />
    <circle cx="13.2" cy="18.2" r="1.1" fill="#ecfdf5" />
    <path d="M18.6 17.2 C20.4 17.2, 21.4 16.2, 23.8 16.4" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18.5 20.1 C20.3 20.1, 21.6 21.1, 24.2 20.8" stroke="#6ee7b7" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M4.2 22.8 C7.5 24.4, 11.2 24.4, 14.2 23.4 C17.4 22.3, 20.6 22.6, 23.6 23.8" stroke="#10b981" strokeOpacity="0.9" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

interface DroughtZone {
  id: string;
  name: string;
  region: string;
  crop: string;
  severity: 'Severe' | 'Moderate' | 'Mild';
  moisture: number;
  solar: number;
  x: number;
  y: number;
  recommendedPump: string;
  moistureOffset: number;
}

export default function SolvaraCommand() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selectedLang, setSelectedLang] = useState<FullLang>(() => readPersistedLanguage());

  const [activeTab, setActiveTab] = useState<'macro' | 'ops' | 'feasibility'>('macro');

  const lang: FullLang = normalizeLanguageCode(selectedLang);
  const isRtl = lang === 'ar';
  const t = TRANSLATIONS[lang];
  const numLocale = getNumberLocale(lang);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    clearExternalTranslationArtifacts();
  }, []);

  useEffect(() => {
    syncHtmlDirection(lang);
  }, [lang]);

  // Global Satellite Coordinate & City Explorer State (Default: Pontianak, Indonesia)
  const [activeLocation, setActiveLocation] = useState<GlobalLocationPreset>(GLOBAL_LOCATION_PRESETS[0]);
  const [citySearchInput, setCitySearchInput] = useState<string>('');
  const [latInput, setLatInput] = useState<string>(GLOBAL_LOCATION_PRESETS[0].latitude.toFixed(4));
  const [lonInput, setLonInput] = useState<string>(GLOBAL_LOCATION_PRESETS[0].longitude.toFixed(4));
  const [isFetchingLocation, setIsFetchingLocation] = useState<boolean>(false);
  const [explorerError, setExplorerError] = useState<string | null>(null);
  const locationRequestIdRef = useRef<number>(0);

  // NASA POWER Live & Fallback Telemetry State (starts on Pontianak -0.0677, 109.2400)
  const [nasaTelemetry, setNasaTelemetry] = useState<NasaTelemetryState>(() => ({
    ...getFallbackNasaTelemetry(-0.0677, 109.24, 'peatland'),
    isLoading: true,
  }));

  useEffect(() => {
    const reqId = ++locationRequestIdRef.current;
    const defaultLoc = GLOBAL_LOCATION_PRESETS[0];
    fetchNasaPowerForCoords(defaultLoc.latitude, defaultLoc.longitude, defaultLoc.ecosystem, 6500).then((data) => {
      if (reqId === locationRequestIdRef.current) {
        setNasaTelemetry(data);
      }
    });
    return () => {
      locationRequestIdRef.current += 1;
    };
  }, []);

  // What-If Extreme Weather Simulator State
  const [simOverride, setSimOverride] = useState<{
    active: boolean;
    rainfallMm: number;
    solarKwh: number;
  }>({
    active: false,
    rainfallMm: 5,
    solarKwh: 5.15,
  });

  const activeRainfallInput = simOverride.active
    ? simOverride.rainfallMm
    : Number(Math.min(50, Math.max(0, nasaTelemetry.precipMm)).toFixed(1));

  const activeSolarInput = simOverride.active
    ? simOverride.solarKwh
    : Number(Math.min(8.0, Math.max(3.0, nasaTelemetry.solarKwh)).toFixed(1));

  // Filter States for Tab 1
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [selectedZoneId, setSelectedZoneId] = useState<string>('Z-3');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const activeCoords = useMemo(
    () => formatCoordinates(activeLocation.latitude, activeLocation.longitude),
    [activeLocation.latitude, activeLocation.longitude]
  );

  const regionOptions = useMemo(
    () => Array.from(new Set(activeLocation.zones.map((z) => z.region))),
    [activeLocation.zones]
  );

  const cropOptions = useMemo(
    () => Array.from(new Set(activeLocation.zones.map((z) => z.crop))),
    [activeLocation.zones]
  );

  // Derive agricultural zones anchored to real NASA POWER telemetry for active global location
  const droughtZones: DroughtZone[] = useMemo(() => {
    const computeSimulatedAnchorMoisture = (rainMm: number, solarKwh: number): number => {
      const evapPenalty = solarKwh > 6.2 ? Math.round((solarKwh - 6.2) * 1.5) : 0;
      if (rainMm < 10) {
        const base = 8 + (rainMm / 10) * 11;
        return Math.min(19, Math.max(5, Math.round(base - evapPenalty)));
      }
      if (rainMm < 25) {
        const base = 20 + ((rainMm - 10) / 15) * 22;
        return Math.min(48, Math.max(20, Math.round(base - evapPenalty)));
      }
      const base = 43 + ((rainMm - 25) / 25) * 45;
      return Math.min(92, Math.max(40, Math.round(base - evapPenalty)));
    };

    const simAnchorMoisture = simOverride.active
      ? computeSimulatedAnchorMoisture(simOverride.rainfallMm, simOverride.solarKwh)
      : nasaTelemetry.soilMoisturePct;

    const anchorSolar = simOverride.active ? simOverride.solarKwh : nasaTelemetry.solarKwh;
    const anchorCfg =
      activeLocation.zones.find((z) => z.nasaAnchored) ?? activeLocation.zones[0];
    const deltaScale = activeLocation.id === 'pontianak' ? 0.25 : 0.35;
    const nasaRegionalDelta = Math.round(
      (nasaTelemetry.soilMoisturePct - anchorCfg.baseMoisture) * deltaScale
    );

    return activeLocation.zones.map((cfg) => {
      const isSelected = cfg.id === selectedZoneId;
      const baselineZoneMoisture = cfg.nasaAnchored
        ? nasaTelemetry.soilMoisturePct
        : Math.min(95, Math.max(8, cfg.baseMoisture + nasaRegionalDelta));

      const computedMoisture =
        simOverride.active && isSelected
          ? simAnchorMoisture
          : baselineZoneMoisture;

      const computedSolar =
        simOverride.active && isSelected
          ? Number(anchorSolar.toFixed(2))
          : Number(Math.max(1.5, nasaTelemetry.solarKwh + cfg.solarOffset).toFixed(2));

      const computedSeverity: 'Severe' | 'Moderate' | 'Mild' =
        computedMoisture < 20
          ? 'Severe'
          : computedMoisture <= 29
          ? 'Moderate'
          : 'Mild';

      const baselineOffset = baselineZoneMoisture - nasaTelemetry.soilMoisturePct;

      return {
        id: cfg.id,
        name: cfg.name,
        region: cfg.region,
        crop: cfg.crop,
        severity: computedSeverity,
        moisture: computedMoisture,
        solar: computedSolar,
        x: cfg.x,
        y: cfg.y,
        recommendedPump: cfg.recommendedPump,
        moistureOffset: baselineOffset,
      };
    });
  }, [
    activeLocation,
    nasaTelemetry.soilMoisturePct,
    nasaTelemetry.solarKwh,
    simOverride.active,
    simOverride.rainfallMm,
    simOverride.solarKwh,
    selectedZoneId,
  ]);

  const selectedZone = useMemo(
    () => droughtZones.find((z) => z.id === selectedZoneId) ?? droughtZones[0],
    [droughtZones, selectedZoneId]
  );

  const driestZone = useMemo(
    () =>
      [...droughtZones].sort((a, b) => a.moisture - b.moisture)[0] ??
      selectedZone,
    [droughtZones, selectedZone]
  );

  const connectedPump = useMemo(
    () =>
      activeLocation.pumps.find((p) => p.id === selectedZone.recommendedPump) ??
      activeLocation.pumps[0],
    [activeLocation.pumps, selectedZone.recommendedPump]
  );

  // Tab 2: Irrigation Grid State (14x10 = 140 cells)
  const initialGrid = useMemo(() => {
    return Array.from({ length: 140 }, (_, idx) => {
      const row = Math.floor(idx / 14);
      const col = idx % 14;
      const distFromCenter = Math.hypot(row - 4, col - 6);
      if (distFromCenter < 2.5) return 0;
      if (distFromCenter < 4.2) return 1;
      if (distFromCenter < 5.8) return 2;
      if ((row + col) % 3 === 0) return 3;
      return 4;
    });
  }, []);

  const [fieldCells, setFieldCells] = useState<number[]>(initialGrid);
  const [isSimulating, setIsSimulating] = useState(false);
  const [yieldSaved, setYieldSaved] = useState(42);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const irrigationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (irrigationIntervalRef.current) {
        clearInterval(irrigationIntervalRef.current);
      }
    };
  }, []);

  const filteredZones = useMemo(() => {
    return droughtZones.filter((z) => {
      if (selectedRegion !== 'All' && z.region !== selectedRegion) return false;
      if (selectedCrop !== 'All' && z.crop !== selectedCrop) return false;
      if (selectedSeverity !== 'All' && z.severity !== selectedSeverity) return false;
      return true;
    });
  }, [droughtZones, selectedRegion, selectedCrop, selectedSeverity]);

  const zoneSparkline = useMemo(() => {
    const series = nasaTelemetry.sevenDayMoistureTrend.map((v) =>
      Math.min(100, Math.max(5, v + selectedZone.moistureOffset))
    );
    if (simOverride.active && series.length > 0) {
      series[series.length - 1] = selectedZone.moisture;
    }
    return buildSparklineGeometry(series);
  }, [nasaTelemetry.sevenDayMoistureTrend, selectedZone.moistureOffset, simOverride.active, selectedZone.moisture]);

  const effectiveMoistureDeltaPct = useMemo(() => {
    if (!simOverride.active) return nasaTelemetry.moistureDeltaPct;
    const baseStart = nasaTelemetry.sevenDayMoistureTrend[0] ?? nasaTelemetry.soilMoisturePct;
    return Number((selectedZone.moisture - (baseStart + selectedZone.moistureOffset)).toFixed(1));
  }, [simOverride.active, nasaTelemetry.moistureDeltaPct, nasaTelemetry.sevenDayMoistureTrend, nasaTelemetry.soilMoisturePct, selectedZone.moisture, selectedZone.moistureOffset]);

  const solarCapacityBars = useMemo(
    () => Math.min(5, Math.max(1, Math.round((selectedZone.solar / 6.4) * 5))),
    [selectedZone.solar]
  );

  // Smart Solar Sizing & Farmer Cost-Saving Calculator
  const solarSizing = useMemo(() => {
    const drynessDeficit = Math.max(0, 100 - selectedZone.moisture);
    const irradianceFactor = Math.max(0.85, 5.5 / Math.max(3.0, selectedZone.solar));
    const rawWp = (1200 + drynessDeficit * 65) * irradianceFactor;
    const recommendedWp = Math.round(rawWp / 100) * 100;
    const moduleCount = Math.ceil(recommendedWp / 550);

    const dailyEnergyKwh = (recommendedWp / 1000) * selectedZone.solar * 0.78;
    const dailyWaterLiters = Math.round((dailyEnergyKwh * 3850) / 100) * 100;

    const monthlyDieselLiters = Math.round(dailyEnergyKwh * 30 * 0.42);
    const monthlySavingsIdr = monthlyDieselLiters * 14500;
    const monthlySavingsUsd = Math.round(monthlyDieselLiters * 1.15);

    const monthlySavingsDisplay =
      activeLocation.currency === 'IDR'
        ? `Rp ${monthlySavingsIdr.toLocaleString(numLocale)}`
        : `$${monthlySavingsUsd.toLocaleString(numLocale)} USD`;

    return {
      recommendedWp,
      moduleCount,
      dailyEnergyKwh,
      dailyWaterLiters,
      monthlyDieselLiters,
      monthlySavingsIdr,
      monthlySavingsUsd,
      monthlySavingsDisplay,
    };
  }, [selectedZone.moisture, selectedZone.solar, activeLocation.currency, numLocale]);

  // Ecosystem Drought / Fire & Crop Wilting Risk Evaluation
  const peatlandRisk = useMemo(() => {
    const level =
      selectedZone.moisture < 20
        ? ('critical' as const)
        : selectedZone.moisture <= 29
        ? ('moderate' as const)
        : ('low' as const);
    const copy = getEcosystemRiskCopy(lang, activeLocation.ecosystem, level);
    return {
      level,
      cardTitle: copy.cardTitle,
      label: copy.label,
      advice: copy.advice,
    };
  }, [lang, activeLocation.ecosystem, selectedZone.moisture]);

  const [earlyWarningToast, setEarlyWarningToast] = useState<{
    zoneName: string;
    region: string;
    moisture: number;
    riskLabel: string;
    sentAtWib: string;
  } | null>(null);
  const [whatsappPreviewData, setWhatsappPreviewData] = useState<{
    isOpen: boolean;
    message: string;
    sentAt: string;
  }>({
    isOpen: false,
    message: '',
    sentAt: '',
  });
  const warningTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (warningTimerRef.current) {
        clearTimeout(warningTimerRef.current);
      }
    };
  }, []);

  const handleSendFarmerEarlyWarning = () => {
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
    }
    let nowTime: string;
    try {
      const intlLocale = getNumberLocale(lang);
      nowTime = new Intl.DateTimeFormat(intlLocale, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date());
    } catch {
      nowTime = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date());
    }

    const sentBadgeTime =
      activeLocation.id === 'pontianak' ? `${nowTime} WIB` : `${nowTime} Local`;

    const whatsappMsg = buildWhatsAppAlertMessage({
      lang,
      locationName: activeLocation.name,
      ecosystem: activeLocation.ecosystem,
      riskLevel: peatlandRisk.level,
      zoneName: selectedZone.name,
      region: selectedZone.region,
      coordsStr: activeCoords.full,
      moisturePct: selectedZone.moisture,
      solarKwh: selectedZone.solar,
      tempC: nasaTelemetry.tempC,
      pumpId: connectedPump.id,
      pumpName: connectedPump.name,
      dailyWaterLiters: solarSizing.dailyWaterLiters,
      optimalWindow: activeLocation.optimalWindow,
      sentAt: sentBadgeTime,
    });

    setEarlyWarningToast({
      zoneName: selectedZone.name,
      region: selectedZone.region,
      moisture: selectedZone.moisture,
      riskLabel: peatlandRisk.label,
      sentAtWib: sentBadgeTime,
    });
    setWhatsappPreviewData({
      isOpen: true,
      message: whatsappMsg,
      sentAt: sentBadgeTime,
    });

    warningTimerRef.current = setTimeout(() => {
      setEarlyWarningToast(null);
    }, 6000);
  };

  const handleRunEmergencyIrrigation = () => {
    if (isSimulating) return;
    if (irrigationIntervalRef.current) {
      clearInterval(irrigationIntervalRef.current);
    }

    const startCells = fieldCells.every((c) => c === 4) ? initialGrid : fieldCells;
    if (startCells === initialGrid) {
      setFieldCells(initialGrid);
      setYieldSaved(42);
    }

    setIsSimulating(true);
    setSimulationProgress(0);

    const startTime = Date.now();
    const duration = 3600;

    irrigationIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setSimulationProgress(Math.round(progress * 100));

      setFieldCells(
        startCells.map((initialVal, idx) => {
          const row = Math.floor(idx / 14);
          const col = idx % 14;
          const normDist = Math.hypot(row - 4.5, col - 6.5) / 7.9;
          const localProgress = Math.max(0, Math.min(1, (progress - normDist * 0.42) / 0.58));

          if (localProgress >= 0.92 || progress >= 1) return 4;
          if (localProgress >= 0.65) return Math.max(initialVal, 3);
          if (localProgress >= 0.38) return Math.max(initialVal, 2);
          if (localProgress >= 0.14) return Math.max(initialVal, 1);
          return initialVal;
        })
      );

      setYieldSaved(Math.round(42 + progress * 47));

      if (progress >= 1) {
        if (irrigationIntervalRef.current) {
          clearInterval(irrigationIntervalRef.current);
          irrigationIntervalRef.current = null;
        }
        setIsSimulating(false);
      }
    }, 100);
  };

  const handleResetDemoField = () => {
    if (irrigationIntervalRef.current) {
      clearInterval(irrigationIntervalRef.current);
      irrigationIntervalRef.current = null;
    }
    setFieldCells(initialGrid);
    setYieldSaved(42);
    setSimulationProgress(0);
    setIsSimulating(false);
  };

  const resetFilters = () => {
    setSelectedRegion('All');
    setSelectedCrop('All');
    setSelectedSeverity('All');
  };

  // Tab 2: VFD Efficiency Optimizer State & Real-Time Affinity-Law Telemetry
  const [vfdSource, setVfdSource] = useState<'field' | 'zone'>('field');
  const [vfdCurrentHz, setVfdCurrentHz] = useState<number>(50);
  const [vfdAutoSync, setVfdAutoSync] = useState<boolean>(false);

  const fieldMoistureMetrics = useMemo(() => {
    const moistureMap = [11, 21, 33, 55, 78];
    let total = 0;
    let severeCount = 0;
    let stressedCount = 0;
    let hydratedCount = 0;
    for (const cell of fieldCells) {
      total += moistureMap[cell] ?? 78;
      if (cell === 0) severeCount += 1;
      if (cell <= 1) stressedCount += 1;
      if (cell >= 3) hydratedCount += 1;
    }
    const meanPct = Math.round(total / Math.max(1, fieldCells.length));
    const hotspotPenalty = Math.round((severeCount / 140) * 35 + ((stressedCount - severeCount) / 140) * 14);
    const effectivePct = Math.max(8, Math.min(85, meanPct - hotspotPenalty));
    return {
      meanPct,
      effectivePct,
      severeCount,
      stressedCount,
      hydratedCount,
    };
  }, [fieldCells]);

  const vfdOptimization = useMemo(() => {
    const activeMoisturePct =
      vfdSource === 'field' ? fieldMoistureMetrics.effectivePct : selectedZone.moisture;
    const activeIrradianceKwh =
      vfdSource === 'zone' ? selectedZone.solar : nasaTelemetry.solarKwh;

    let targetHz = 50;
    let regime: 'boost' | 'adaptive' | 'cruise' | 'eco' = 'boost';

    if (activeMoisturePct < 20) {
      targetHz = Math.min(50, Math.max(47.2, 50 - ((activeMoisturePct - 8) / 12) * 2.5));
      regime = 'boost';
    } else if (activeMoisturePct < 35) {
      targetHz = 46.5 - ((activeMoisturePct - 20) / 15) * 8.5;
      regime = 'adaptive';
    } else if (activeMoisturePct < 55) {
      targetHz = 37.5 - ((activeMoisturePct - 35) / 20) * 8.0;
      regime = 'cruise';
    } else {
      targetHz = Math.max(22, 29.0 - ((activeMoisturePct - 55) / 30) * 7.0);
      regime = 'eco';
    }

    const { regimeLabel, actionAdvice } = getVfdRegimeCopy(lang, regime);

    const recommendedHz = Number(targetHz.toFixed(1));
    const speedRatio = recommendedHz / 50;
    const recommendedRpm = Math.round(2900 * speedRatio);
    const recommendedFlowLph = Math.round(12000 * speedRatio);
    const recommendedPowerKw = Number((5.4 * Math.pow(speedRatio, 3)).toFixed(2));

    const effectiveCurrentHz = vfdAutoSync ? recommendedHz : vfdCurrentHz;
    const currentRatio = effectiveCurrentHz / 50;
    const currentRpm = Math.round(2900 * currentRatio);
    const currentFlowLph = Math.round(12000 * currentRatio);
    const currentPowerKw = Number((5.4 * Math.pow(currentRatio, 3)).toFixed(2));

    const hzDelta = Number((recommendedHz - effectiveCurrentHz).toFixed(1));
    const powerSavedPctVsFixed = Math.max(0, Math.round((1 - Math.pow(speedRatio, 3)) * 100));
    const kwSavedVsCurrent = Number(Math.max(0, currentPowerKw - recommendedPowerKw).toFixed(2));
    const dailyKwhSavedVsFixed = Number(
      ((5.4 - recommendedPowerKw) * Math.max(4.5, activeIrradianceKwh * 1.15)).toFixed(1)
    );
    const isSynced = Math.abs(hzDelta) < 0.2;

    return {
      activeMoisturePct,
      activeIrradianceKwh,
      recommendedHz,
      recommendedRpm,
      recommendedFlowLph,
      recommendedPowerKw,
      effectiveCurrentHz,
      currentRpm,
      currentFlowLph,
      currentPowerKw,
      hzDelta,
      powerSavedPctVsFixed,
      kwSavedVsCurrent,
      dailyKwhSavedVsFixed,
      regime,
      regimeLabel,
      actionAdvice,
      isSynced,
    };
  }, [
    lang,
    vfdSource,
    fieldMoistureMetrics.effectivePct,
    selectedZone.moisture,
    selectedZone.solar,
    nasaTelemetry.solarKwh,
    vfdAutoSync,
    vfdCurrentHz,
  ]);

  // Tab 1: SOLVARA AI Agronomist Advisor
  const [advisorActivePrompt, setAdvisorActivePrompt] = useState<AdvisorPromptId | null>(null);
  const [advisorIsTyping, setAdvisorIsTyping] = useState<boolean>(false);
  const advisorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (advisorTimerRef.current) {
        clearTimeout(advisorTimerRef.current);
      }
    };
  }, []);

  const handleSelectLanguage = (code: FullLang | string) => {
    const normalized = normalizeLanguageCode(code);

    if (advisorTimerRef.current) {
      clearTimeout(advisorTimerRef.current);
      advisorTimerRef.current = null;
    }
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
      warningTimerRef.current = null;
    }

    setAdvisorActivePrompt(null);
    setAdvisorIsTyping(false);
    setEarlyWarningToast(null);
    setWhatsappPreviewData({ isOpen: false, message: '', sentAt: '' });
    setExplorerError(null);

    clearExternalTranslationArtifacts();
    persistLanguagePreference(normalized);
    syncHtmlDirection(normalized);
    setSelectedLang(normalized);
  };

  const advisorPrompts: { id: AdvisorPromptId; label: string }[] = useMemo(
    () => [
      { id: 'schedule', label: t.tab1.advisor.prompts.schedule },
      { id: 'peatland', label: t.tab1.advisor.prompts.peatland },
      { id: 'roi', label: t.tab1.advisor.prompts.roi },
    ],
    [t]
  );

  const handleTriggerAdvisorPrompt = (promptId: AdvisorPromptId) => {
    if (advisorTimerRef.current) {
      clearTimeout(advisorTimerRef.current);
    }
    setAdvisorActivePrompt(promptId);
    setAdvisorIsTyping(true);
    advisorTimerRef.current = setTimeout(() => {
      setAdvisorIsTyping(false);
      advisorTimerRef.current = null;
    }, 800);
  };

  const applyPresetOrResolvedLocation = async (
    nextLoc: GlobalLocationPreset,
    preFetchedTelemetry?: NasaTelemetryState
  ) => {
    const reqId = ++locationRequestIdRef.current;
    setExplorerError(null);
    setActiveLocation(nextLoc);
    setLatInput(nextLoc.latitude.toFixed(4));
    setLonInput(nextLoc.longitude.toFixed(4));
    setSelectedRegion('All');
    setSelectedCrop('All');
    setSelectedSeverity('All');
    setSimOverride({
      active: false,
      rainfallMm: 5,
      solarKwh: 5.15,
    });
    setAdvisorActivePrompt(null);
    setAdvisorIsTyping(false);
    setWhatsappPreviewData((prev) => ({ ...prev, isOpen: false }));

    const anchoredZone = nextLoc.zones.find((z) => z.nasaAnchored) ?? nextLoc.zones[0];
    setSelectedZoneId(anchoredZone.id);

    if (preFetchedTelemetry) {
      setNasaTelemetry(preFetchedTelemetry);
      setIsFetchingLocation(false);
      return;
    }

    setIsFetchingLocation(true);
    setNasaTelemetry((prev) => ({ ...prev, isLoading: true }));

    const telemetry = await fetchNasaPowerForCoords(
      nextLoc.latitude,
      nextLoc.longitude,
      nextLoc.ecosystem,
      6500
    );

    if (reqId === locationRequestIdRef.current) {
      setNasaTelemetry(telemetry);
      setIsFetchingLocation(false);
    }
  };

  const handleSelectPresetLocation = (preset: GlobalLocationPreset) => {
    setCitySearchInput('');
    void applyPresetOrResolvedLocation(preset);
  };

  const handleFetchGlobalExplorer = async (mode: 'auto' | 'coords' = 'auto') => {
    setExplorerError(null);
    const trimmedQuery = citySearchInput.trim();
    const reqId = ++locationRequestIdRef.current;

    if (mode === 'auto' && trimmedQuery.length > 0) {
      setIsFetchingLocation(true);
      const geo = await geocodeGlobalCity(trimmedQuery, 6000);
      if (reqId !== locationRequestIdRef.current) return;
      if (!geo) {
        setIsFetchingLocation(false);
        setExplorerError(t.tab1.globalExplorer.geocodeError);
        return;
      }

      // Parallel: Resolve 6 surrounding real districts (BigDataCloud) + Live NASA POWER telemetry
      const [customLoc, telemetry] = await Promise.all([
        resolveCustomGlobalLocation({
          cityLabel: geo.name,
          country: geo.country,
          countryCode: geo.countryCode,
          latitude: geo.latitude,
          longitude: geo.longitude,
        }),
        fetchNasaPowerForCoords(geo.latitude, geo.longitude, 'global_agrivoltaic', 6500),
      ]);

      if (reqId !== locationRequestIdRef.current) return;
      await applyPresetOrResolvedLocation(customLoc, telemetry);
      return;
    }

    const parsedLat = Number(latInput);
    const parsedLon = Number(lonInput);
    if (
      !Number.isFinite(parsedLat) ||
      !Number.isFinite(parsedLon) ||
      parsedLat < -90 ||
      parsedLat > 90 ||
      parsedLon < -180 ||
      parsedLon > 180
    ) {
      setExplorerError(t.tab1.globalExplorer.invalidCoordsError);
      return;
    }

    setIsFetchingLocation(true);
    const [coordLoc, telemetry] = await Promise.all([
      resolveCustomGlobalLocation({
        latitude: Number(parsedLat.toFixed(4)),
        longitude: Number(parsedLon.toFixed(4)),
      }),
      fetchNasaPowerForCoords(parsedLat, parsedLon, 'global_agrivoltaic', 6500),
    ]);

    if (reqId !== locationRequestIdRef.current) return;
    await applyPresetOrResolvedLocation(coordLoc, telemetry);
  };

  const advisorSummaryTwoSentences = useMemo(() => {
    return getAdvisorSummary(lang, {
      moisture: selectedZone.moisture,
      crop: selectedZone.crop,
      cropLocalized: t.tab1.crops[selectedZone.crop] ?? selectedZone.crop,
      zoneName: selectedZone.name,
      locationName: activeLocation.name,
      solar: selectedZone.solar,
      pumpId: connectedPump.id,
      dailyWaterLiters: solarSizing.dailyWaterLiters,
    });
  }, [
    lang,
    t.tab1.crops,
    activeLocation.name,
    selectedZone.moisture,
    selectedZone.crop,
    selectedZone.name,
    selectedZone.solar,
    connectedPump.id,
    solarSizing.dailyWaterLiters,
  ]);

  const advisorPromptResponse = useMemo(() => {
    if (!advisorActivePrompt) return null;
    return getAdvisorPromptAnswer(lang, advisorActivePrompt, {
      moisture: selectedZone.moisture,
      zoneName: selectedZone.name,
      region: selectedZone.region,
      locationName: activeLocation.name,
      ecosystem: activeLocation.ecosystem,
      solar: selectedZone.solar,
      pumpId: connectedPump.id,
      pumpFlowRate: connectedPump.flowRate,
      dailyWaterLiters: solarSizing.dailyWaterLiters,
      dailyEnergyKwh: solarSizing.dailyEnergyKwh,
      recommendedWp: solarSizing.recommendedWp,
      moduleCount: solarSizing.moduleCount,
      monthlySavingsDisplay: solarSizing.monthlySavingsDisplay,
      monthlyDieselLiters: solarSizing.monthlyDieselLiters,
      optimalWindow: activeLocation.optimalWindow,
    });
  }, [
    lang,
    advisorActivePrompt,
    activeLocation.name,
    activeLocation.ecosystem,
    activeLocation.optimalWindow,
    selectedZone.moisture,
    selectedZone.name,
    selectedZone.region,
    selectedZone.solar,
    connectedPump.id,
    connectedPump.flowRate,
    solarSizing.dailyWaterLiters,
    solarSizing.dailyEnergyKwh,
    solarSizing.recommendedWp,
    solarSizing.moduleCount,
    solarSizing.monthlySavingsDisplay,
    solarSizing.monthlyDieselLiters,
  ]);

  // Top 4 zones for Tab 2 dispatch allocation bar
  const topAllocationZones = useMemo(() => {
    const weights = [34, 28, 22, 16];
    const colors = ['bg-emerald-400', 'bg-cyan-400', 'bg-blue-400', 'bg-indigo-400'];
    const totalKw = 5.4;
    return droughtZones.slice(0, 4).map((z, idx) => ({
      name: z.region,
      crop: t.tab1.crops[z.crop] ?? z.crop,
      pct: weights[idx],
      kw: (totalKw * (weights[idx] / 100)).toFixed(2),
      color: colors[idx],
    }));
  }, [droughtZones, t.tab1.crops]);

  const isDark = theme === 'dark';

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      lang={lang}
      className={`min-h-screen font-sans transition-colors duration-300 ${
        isDark ? 'bg-[#0A0F1C] text-slate-100' : 'bg-[#F8FAFC] text-slate-800'
      }`}
    >
      {/* ===================== TOP NAVIGATION HEADER ===================== */}
      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors ${
          isDark
            ? 'bg-[#0A0F1C]/85 border-slate-800/80 text-white'
            : 'bg-white/85 border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex items-center justify-center shrink-0">
              <SolvaraLogo className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-[0_0_12px_rgba(34,211,238,0.38)]" />
              <div
                className={`absolute -bottom-0.5 -end-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.7)] ${
                  isDark ? 'border-[#0A0F1C]' : 'border-white'
                }`}
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span dir="ltr" translate="no" className={`notranslate font-extrabold tracking-wider text-lg sm:text-xl whitespace-nowrap ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  SOL<span className={`bg-gradient-to-r bg-clip-text text-transparent ${
                    isDark ? 'from-emerald-400 via-teal-300 to-cyan-400' : 'from-emerald-600 via-teal-600 to-cyan-600'
                  }`}>VARA</span>
                </span>
                <span translate="no" className={`notranslate hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full border whitespace-nowrap ${
                  isDark
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  SMAP • NASA POWER
                </span>
              </div>
              <p className={`text-[11px] hidden sm:block truncate ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {t.header.subtitle}
              </p>
            </div>
          </div>

          {/* Module Switcher Tabs (Desktop) */}
          <nav className={`hidden md:flex items-center gap-1 p-1 rounded-xl border ${
            isDark
              ? 'bg-slate-900/40 border-slate-800/60'
              : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              onClick={() => setActiveTab('macro')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'macro'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/25'
                  : isDark
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <SatelliteIcon className="w-4 h-4 shrink-0" />
              {t.header.tabs.macro}
            </button>
            <button
              onClick={() => setActiveTab('ops')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'ops'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/25'
                  : isDark
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <ActivityIcon className="w-4 h-4 shrink-0" />
              {t.header.tabs.ops}
            </button>
            <button
              onClick={() => setActiveTab('feasibility')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'feasibility'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/25'
                  : isDark
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <LayersIcon className="w-4 h-4 shrink-0" />
              {t.header.tabs.feasibility}
            </button>
          </nav>

          {/* Right Controls: Live Status, Globe Language Picker & Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <div
              title={`${nasaTelemetry.source === 'live' ? t.header.telemetry.sourceLive : t.header.telemetry.sourceFallback} • ${t.header.telemetry.solarDate}: ${nasaTelemetry.solarDate} • ${t.header.telemetry.moistureDate}: ${nasaTelemetry.latestDate}`}
              className={`hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border whitespace-nowrap ${
                isDark
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}
            >
              <span className={`w-2 h-2 rounded-full animate-pulse ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'}`}></span>
              {nasaTelemetry.isLoading
                ? t.header.telemetry.syncing
                : nasaTelemetry.source === 'live'
                ? t.header.telemetry.live
                : t.header.telemetry.ready}
            </div>

            {/* Internal i18n Globe Switcher */}
            <LanguageSwitcher
              selectedLang={lang}
              onSelectLanguage={handleSelectLanguage}
              isDark={isDark}
              searchPlaceholder={t.header.langSearchPlaceholder}
              noMatchLabel={t.header.langNoMatch}
              switcherLabel={t.header.langSwitcherLabel}
            />

            {/* Dark / Light High-Visibility Toggle */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              title={isDark ? t.header.themeTooltip.toLight : t.header.themeTooltip.toDark}
              className={`p-2 rounded-xl transition-all border cursor-pointer ${
                isDark
                  ? 'bg-slate-800/80 hover:bg-slate-700 text-amber-300 border-slate-700/80 shadow-inner'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-sm'
              }`}
            >
              {isDark ? <SunIcon className="w-5 h-5 text-amber-400" /> : <MoonIcon className="w-5 h-5 text-indigo-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className={`md:hidden flex border-t px-2 py-1.5 overflow-x-auto gap-2 ${
          isDark ? 'border-slate-800/40 bg-slate-900/30' : 'border-slate-200 bg-slate-100/80'
        }`}>
          <button
            onClick={() => setActiveTab('macro')}
            className={`flex-1 min-w-[115px] text-center py-1.5 px-2 text-xs font-medium rounded-lg whitespace-nowrap ${
              activeTab === 'macro'
                ? 'bg-emerald-500 text-white font-semibold'
                : isDark
                ? 'text-slate-400'
                : 'text-slate-600'
            }`}
          >
            {t.header.mobileTabs.macro}
          </button>
          <button
            onClick={() => setActiveTab('ops')}
            className={`flex-1 min-w-[115px] text-center py-1.5 px-2 text-xs font-medium rounded-lg whitespace-nowrap ${
              activeTab === 'ops'
                ? 'bg-emerald-500 text-white font-semibold'
                : isDark
                ? 'text-slate-400'
                : 'text-slate-600'
            }`}
          >
            {t.header.mobileTabs.ops}
          </button>
          <button
            onClick={() => setActiveTab('feasibility')}
            className={`flex-1 min-w-[115px] text-center py-1.5 px-2 text-xs font-medium rounded-lg whitespace-nowrap ${
              activeTab === 'feasibility'
                ? 'bg-emerald-500 text-white font-semibold'
                : isDark
                ? 'text-slate-400'
                : 'text-slate-600'
            }`}
          >
            {t.header.mobileTabs.feasibility}
          </button>
        </div>
      </header>

      {/* ===================== MAIN CONTENT WRAPPER ===================== */}
      <main key={lang} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ============================================================== */}
        {/* ===================== TAB 1: DROUGHT & PUMP MAP =============== */}
        {/* ============================================================== */}
        {activeTab === 'macro' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Top Operational Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className={`group text-2xl font-bold tracking-tight flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <SatelliteIcon className={`w-6 h-6 shrink-0 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-12 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  <span>{t.tab1.title}</span>
                </h1>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t.tab1.subtitle}
                </p>
              </div>

              <button
                onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
                className={`sm:hidden flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs font-medium border ${
                  isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  <FilterIcon className="w-4 h-4" />
                  {t.tab1.mobileFilterBtn} ({filteredZones.length}/{droughtZones.length} {t.tab1.zonesWord})
                </span>
                {filteredZones.length < droughtZones.length && (
                  <span className="text-[10px] font-bold text-amber-400">{t.tab1.filteredBadge}</span>
                )}
              </button>
            </div>

            {/* Global Satellite Coordinate & City Explorer Bar */}
            <div
              className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-3.5 ${
                isDark
                  ? 'bg-gradient-to-br from-[#0f172a]/95 via-[#111827]/95 to-[#0b1523]/95 border-cyan-500/30 shadow-xl shadow-black/25'
                  : 'bg-white border-slate-200 shadow-md'
              }`}
            >
              {/* Header + Benchmark Partnership Badge + Optional Sync Language */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 ${
                      isDark ? 'text-cyan-400' : 'text-cyan-700'
                    }`}>
                      <SatelliteIcon className="w-4 h-4 shrink-0" />
                      {t.tab1.globalExplorer.title}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      nasaTelemetry.source === 'live'
                        ? isDark
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : isDark
                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                        : 'bg-amber-50 text-amber-700 border-amber-300'
                    }`}>
                      {nasaTelemetry.source === 'live'
                        ? t.tab1.globalExplorer.liveSourceBadge
                        : t.tab1.globalExplorer.fallbackSourceBadge}
                    </span>
                  </div>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {t.tab1.globalExplorer.subtitle}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <span className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border ${
                    isDark
                      ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  }`}>
                    🛰️ {activeLocation.benchmarkBadge[lang]}
                  </span>
                  {normalizeLanguageCode(activeLocation.suggestedLang) !== lang && (
                    <button
                      type="button"
                      onClick={() => handleSelectLanguage(activeLocation.suggestedLang)}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all cursor-pointer active:scale-95 ${
                        isDark
                          ? 'bg-cyan-500/15 hover:bg-cyan-500/25 border-cyan-400/50 text-cyan-300'
                          : 'bg-cyan-50 hover:bg-cyan-100 border-cyan-300 text-cyan-800'
                      }`}
                    >
                      🌐 {t.tab1.globalExplorer.syncLangBtn}: <span translate="no" className="notranslate">{t.tab1.globalExplorer.langNames[activeLocation.suggestedLang]}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Worldwide City Search & Manual Lat/Lon Inputs */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void handleFetchGlobalExplorer('auto');
                }}
                className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center"
              >
                <div className="md:col-span-5">
                  <input
                    type="text"
                    value={citySearchInput}
                    onChange={(e) => setCitySearchInput(e.target.value)}
                    placeholder={t.tab1.globalExplorer.cityPlaceholder}
                    className={`w-full px-3.5 py-2 rounded-xl text-xs font-medium border outline-none transition-colors focus:ring-2 focus:ring-cyan-500/50 ${
                      isDark
                        ? 'bg-slate-900/90 border-slate-700 text-slate-100 placeholder:text-slate-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                    }`}
                  />
                </div>

                <div dir="ltr" className="md:col-span-4 grid grid-cols-2 gap-2">
                  <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border ${
                    isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-slate-50 border-slate-300'
                  }`}>
                    <span className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {t.tab1.globalExplorer.latLabel}
                    </span>
                    <input
                      type="number"
                      step="0.0001"
                      min={-90}
                      max={90}
                      value={latInput}
                      onChange={(e) => {
                        setCitySearchInput('');
                        setLatInput(e.target.value);
                      }}
                      className={`w-full bg-transparent text-xs font-mono font-semibold outline-none ${
                        isDark ? 'text-slate-100' : 'text-slate-900'
                      }`}
                    />
                  </div>
                  <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border ${
                    isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-slate-50 border-slate-300'
                  }`}>
                    <span className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {t.tab1.globalExplorer.lonLabel}
                    </span>
                    <input
                      type="number"
                      step="0.0001"
                      min={-180}
                      max={180}
                      value={lonInput}
                      onChange={(e) => {
                        setCitySearchInput('');
                        setLonInput(e.target.value);
                      }}
                      className={`w-full bg-transparent text-xs font-mono font-semibold outline-none ${
                        isDark ? 'text-slate-100' : 'text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div className="md:col-span-3">
                  <button
                    type="submit"
                    disabled={isFetchingLocation}
                    className={`w-full py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap ${
                      isFetchingLocation
                        ? 'bg-slate-700 text-slate-300 cursor-wait'
                        : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-md shadow-emerald-500/20'
                    }`}
                  >
                    <SatelliteIcon className={`w-3.5 h-3.5 shrink-0 ${isFetchingLocation ? 'animate-spin' : ''}`} />
                    <span>{isFetchingLocation ? t.tab1.globalExplorer.fetchingBtn : t.tab1.globalExplorer.fetchBtn}</span>
                  </button>
                </div>
              </form>

              {explorerError && (
                <div className={`px-3 py-2 rounded-xl text-xs font-medium border ${
                  isDark
                    ? 'bg-rose-950/50 border-rose-500/40 text-rose-300'
                    : 'bg-rose-50 border-rose-300 text-rose-700'
                }`}>
                  {explorerError}
                </div>
              )}

              {/* 5 NASA Partner Quick Preset Buttons + Active Basin Focus */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider me-1 ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {t.tab1.globalExplorer.presetsLabel}
                  </span>
                  {GLOBAL_LOCATION_PRESETS.map((preset) => {
                    const isActive = activeLocation.id === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPresetLocation(preset)}
                        className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition-all cursor-pointer active:scale-95 flex items-center gap-1.5 whitespace-nowrap ${
                          isActive
                            ? isDark
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.28)]'
                              : 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                            : isDark
                            ? 'bg-slate-900/70 border-slate-700/80 text-slate-300 hover:border-cyan-500/50 hover:text-white'
                            : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{preset.flag}</span>
                        <span>{preset.shortLabel}</span>
                      </button>
                    );
                  })}
                </div>

                <div className={`text-[11px] font-medium flex flex-wrap items-center gap-1.5 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  <span>{activeLocation.flag}</span>
                  <strong className={isDark ? 'text-white' : 'text-slate-900'}>{activeLocation.name}</strong>
                  <span className="opacity-50">•</span>
                  <span className={isDark ? 'text-cyan-300' : 'text-cyan-700'}>{activeLocation.focus[lang]}</span>
                </div>
              </div>
            </div>

            {/* Layout Grid: Sidebar Filters + Interactive Satellite Canvas + Right Telemetry */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Filter Sidebar */}
              <div
                className={`lg:col-span-3 ${
                  filterDrawerOpen ? 'block' : 'hidden lg:block'
                } rounded-2xl p-5 border transition-all ${
                  isDark
                    ? 'bg-[#111827]/90 border-slate-800/80 shadow-xl shadow-black/20'
                    : 'bg-white border-slate-200 shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-4 gap-2">
                  <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                    isDark ? 'text-emerald-400' : 'text-emerald-700'
                  }`}>
                    <FilterIcon className="w-4 h-4 shrink-0" /> {t.tab1.filtersTitle}
                  </span>
                  <button
                    onClick={resetFilters}
                    className={`text-xs transition-colors whitespace-nowrap cursor-pointer ${
                      isDark ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-600 hover:text-emerald-700'
                    }`}
                  >
                    {t.tab1.resetFilters}
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Region Filter */}
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>{t.tab1.targetRegionLabel}</label>
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-medium border transition-colors outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                        isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                      }`}
                    >
                      <option value="All">{t.tab1.allRegionsOption} ({activeLocation.shortLabel})</option>
                      {regionOptions.map((reg) => (
                        <option key={reg} value={reg}>{reg}</option>
                      ))}
                    </select>
                  </div>

                  {/* Crop Filter */}
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>{t.tab1.stapleCropLabel}</label>
                    <select
                      value={selectedCrop}
                      onChange={(e) => setSelectedCrop(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-medium border transition-colors outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                        isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                      }`}
                    >
                      <option value="All">{t.tab1.allCropsOption}</option>
                      {cropOptions.map((cropKey) => (
                        <option key={cropKey} value={cropKey}>
                          {t.tab1.crops[cropKey] ?? cropKey}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Drought Severity Filter */}
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>{t.tab1.severityLabel}</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-1.5">
                      {(['All', 'Severe', 'Moderate', 'Mild'] as const).map((sev) => (
                        <button
                          key={sev}
                          onClick={() => setSelectedSeverity(sev)}
                          className={`py-1.5 px-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                            selectedSeverity === sev
                              ? isDark
                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                                : 'bg-emerald-50 border-emerald-600 text-emerald-700'
                              : isDark
                              ? 'border-slate-800 text-slate-400 hover:bg-slate-800'
                              : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {t.tab1.severities[sev]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Legend */}
                  <div className={`pt-3 border-t space-y-2 text-xs ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
                    <div className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.tab1.mapLegendTitle}</div>
                    <div className={`flex items-center gap-2 ${isDark ? 'text-rose-400' : 'text-rose-600 font-medium'}`}>
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping shrink-0"></span>
                      <span>{t.tab1.legendSevere}</span>
                    </div>
                    <div className={`flex items-center gap-2 ${isDark ? 'text-amber-400' : 'text-amber-700 font-medium'}`}>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0"></span>
                      <span>{t.tab1.legendModerate}</span>
                    </div>
                    <div className={`flex items-center gap-2 ${isDark ? 'text-teal-400' : 'text-teal-700 font-medium'}`}>
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-400 shrink-0"></span>
                      <span>{t.tab1.legendMild}</span>
                    </div>
                    <div className={`flex items-center gap-2 ${isDark ? 'text-emerald-400' : 'text-emerald-700 font-medium'}`}>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0"></span>
                      <span>{t.tab1.legendPump}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Central Map Canvas */}
              <div className="lg:col-span-6 flex flex-col space-y-4">
                {/* What-If Extreme Weather Simulator */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    isDark
                      ? 'bg-[#111827]/90 border-slate-800/80 shadow-xl shadow-black/20'
                      : 'bg-white border-slate-200 shadow-md'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        <ActivityIcon className={`w-4 h-4 shrink-0 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                        {t.tab1.simulator.title}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                        simOverride.active
                          ? isDark
                            ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                            : 'bg-amber-50 text-amber-700 border-amber-300'
                          : isDark
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {simOverride.active ? t.tab1.simulator.simActive : t.tab1.simulator.liveBaseline}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setSimOverride({
                          active: false,
                          rainfallMm: Number(Math.min(50, Math.max(0, nasaTelemetry.precipMm)).toFixed(1)),
                          solarKwh: Number(Math.min(8.0, Math.max(3.0, nasaTelemetry.solarKwh)).toFixed(1)),
                        })
                      }
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer self-start sm:self-auto whitespace-nowrap ${
                        isDark
                          ? 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border-slate-700'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                      }`}
                    >
                      <RefreshCwIcon className="w-3 h-3" />
                      {t.tab1.simulator.resetBtn}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className={`p-3 rounded-xl border ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <label
                          htmlFor="sim-rainfall-slider"
                          className={`text-[11px] font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
                        >
                          {t.tab1.simulator.rainfallLabel}
                        </label>
                        <span dir="ltr" translate="no" className={`notranslate text-xs font-extrabold tabular-nums shrink-0 ${
                          activeRainfallInput < 10
                            ? isDark
                              ? 'text-rose-400'
                              : 'text-rose-600'
                            : isDark
                            ? 'text-cyan-400'
                            : 'text-cyan-700'
                        }`}>
                          {activeRainfallInput.toFixed(1)} mm
                        </span>
                      </div>
                      <input
                        id="sim-rainfall-slider"
                        dir="ltr"
                        type="range"
                        min={0}
                        max={50}
                        step={0.5}
                        value={activeRainfallInput}
                        onChange={(e) => {
                          const nextRain = parseFloat(e.target.value);
                          setSimOverride({
                            active: true,
                            rainfallMm: nextRain,
                            solarKwh: activeSolarInput,
                          });
                        }}
                        className="w-full h-2 rounded-lg cursor-pointer accent-cyan-500"
                      />
                      <div dir="ltr" className="flex justify-between text-[10px] font-mono mt-1 text-slate-500">
                        <span>{t.tab1.simulator.extremeDry}</span>
                        <span translate="no" className="notranslate">50 mm</span>
                      </div>
                    </div>

                    <div className={`p-3 rounded-xl border ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <label
                          htmlFor="sim-solar-slider"
                          className={`text-[11px] font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
                        >
                          {t.tab1.simulator.solarLabel}
                        </label>
                        <span dir="ltr" translate="no" className={`notranslate text-xs font-extrabold tabular-nums shrink-0 ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                          {activeSolarInput.toFixed(1)} kWh/m²
                        </span>
                      </div>
                      <input
                        id="sim-solar-slider"
                        dir="ltr"
                        type="range"
                        min={3.0}
                        max={8.0}
                        step={0.1}
                        value={activeSolarInput}
                        onChange={(e) => {
                          const nextSolar = parseFloat(e.target.value);
                          setSimOverride({
                            active: true,
                            rainfallMm: activeRainfallInput,
                            solarKwh: nextSolar,
                          });
                        }}
                        className="w-full h-2 rounded-lg cursor-pointer accent-amber-500"
                      />
                      <div dir="ltr" translate="no" className="notranslate flex justify-between text-[10px] font-mono mt-1 text-slate-500">
                        <span>3.0 kWh/m²</span>
                        <span>8.0 kWh/m²</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Satellite Topographic Map Canvas */}
                <div
                  dir="ltr"
                  className={`relative rounded-2xl overflow-hidden border transition-all h-[420px] sm:h-[480px] select-none ${
                    isDark
                      ? 'bg-gradient-to-br from-[#0c1322] via-[#09111e] to-[#040810] border-slate-800/80'
                      : 'bg-gradient-to-br from-slate-100 via-emerald-50/20 to-slate-200 border-slate-300 shadow-inner'
                  }`}
                >
                  <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke={isDark ? '#1e293b' : '#cbd5e1'} strokeWidth="0.8" strokeDasharray="3 3" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#gridPattern)" />
                    <path d="M -50 150 C 150 100, 200 350, 600 280 C 800 240, 900 150, 1100 220" fill="none" stroke={isDark ? '#334155' : '#94a3b8'} strokeWidth="1.2" />
                    <path d="M -30 220 C 170 190, 220 420, 620 330 C 840 280, 920 230, 1100 300" fill="none" stroke={isDark ? '#334155' : '#94a3b8'} strokeWidth="1.2" />
                    <path d="M 50 -20 C 250 120, 350 40, 650 100 C 850 180, 950 80, 1100 90" fill="none" stroke={isDark ? '#1e293b' : '#cbd5e1'} strokeWidth="1.5" />
                    <circle cx="34%" cy="28%" r="140" fill="none" stroke={isDark ? '#1e293b' : '#cbd5e1'} strokeWidth="0.8" strokeDasharray="4 4" />
                    <circle cx="70%" cy="65%" r="180" fill="none" stroke={isDark ? '#1e293b' : '#cbd5e1'} strokeWidth="0.8" strokeDasharray="4 4" />
                  </svg>

                  {/* Satellite Orbital Scanline Sweep */}
                  <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-20 z-[5] animate-orbital-scanline">
                    <div
                      className={`w-full h-full ${
                        isDark
                          ? 'bg-gradient-to-b from-transparent via-cyan-400/10 to-emerald-400/25 border-b border-cyan-300/45 shadow-[0_2px_18px_rgba(34,211,238,0.28)]'
                          : 'bg-gradient-to-b from-transparent via-emerald-500/10 to-cyan-500/20 border-b border-emerald-500/40'
                      }`}
                    />
                  </div>

                  {/* Animated Water & Energy Pipeline */}
                  {connectedPump && (
                    <svg
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 w-full h-full z-[15]"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="pipelineEnergyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#10B981" />
                          <stop offset="50%" stopColor="#06B6D4" />
                          <stop offset="100%" stopColor="#38BDF8" />
                        </linearGradient>
                      </defs>
                      {(() => {
                        const x1 = connectedPump.x;
                        const y1 = connectedPump.y;
                        const x2 = selectedZone.x;
                        const y2 = selectedZone.y;
                        const mx = (x1 + x2) / 2;
                        const my = (y1 + y2) / 2;
                        const dx = x2 - x1;
                        const dy = y2 - y1;
                        const cx = mx - dy * 0.22;
                        const cy = my + dx * 0.22;
                        const d = `M ${x1} ${y1} Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${x2} ${y2}`;

                        return (
                          <>
                            <path
                              d={d}
                              fill="none"
                              stroke={isDark ? 'rgba(6, 182, 212, 0.24)' : 'rgba(14, 116, 144, 0.22)'}
                              strokeWidth="6"
                              strokeLinecap="round"
                              vectorEffect="non-scaling-stroke"
                            />
                            <path
                              d={d}
                              fill="none"
                              stroke="url(#pipelineEnergyGrad)"
                              strokeWidth="2.5"
                              strokeDasharray="6 8"
                              strokeLinecap="round"
                              vectorEffect="non-scaling-stroke"
                              className="animate-pipeline-flow"
                            />
                            <path
                              d={d}
                              fill="none"
                              stroke={isDark ? '#E0F2FE' : '#0284C7'}
                              strokeWidth="4"
                              strokeDasharray="1.5 12.5"
                              strokeLinecap="round"
                              vectorEffect="non-scaling-stroke"
                              className="animate-pipeline-dots"
                            />
                          </>
                        );
                      })()}
                    </svg>
                  )}

                  {/* Satellite Compass & GPS Coordinate Overlay */}
                  <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                    <div translate="no" className="notranslate bg-slate-900/85 backdrop-blur border border-slate-700/60 rounded-xl px-2.5 py-1 text-[10px] sm:text-[11px] font-mono text-emerald-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0"></span>
                      <span>
                        LAT: {activeCoords.latStr} | LON: {activeCoords.lonStr} • {activeLocation.shortLabel}
                      </span>
                    </div>

                    <div dir={isRtl ? 'rtl' : 'ltr'} className="bg-slate-900/85 backdrop-blur border border-slate-700/60 rounded-xl px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold text-slate-300">
                      {t.tab1.map.resolutionLabel} <span translate="no" className="notranslate text-cyan-400">{t.tab1.map.resolutionValue}</span>
                    </div>
                  </div>

                  {/* Render 7 Interactive Drought Stress Zones */}
                  {filteredZones.map((zone) => {
                    const isSelected = selectedZone.id === zone.id;
                    const isSevere = zone.severity === 'Severe';
                    const isMod = zone.severity === 'Moderate';

                    return (
                      <div
                        key={zone.id}
                        onClick={() => setSelectedZoneId(zone.id)}
                        style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                      >
                        {isSevere ? (
                          <>
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-0 rounded-full border-2 border-rose-400/75 bg-rose-500/20 animate-severe-ripple"
                            />
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-0 rounded-full border border-rose-400/60 bg-rose-500/15 animate-severe-ripple-delayed"
                            />
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-2 rounded-full bg-rose-500/25 blur-[2px] animate-pulse"
                            />
                          </>
                        ) : (
                          <div
                            className={`absolute -inset-3 rounded-full opacity-40 animate-pulse ${
                              isMod ? 'bg-amber-500/40' : 'bg-teal-500/30'
                            }`}
                          />
                        )}
                        <div
                          className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 ring-1 ring-inset ring-white/20 transition-transform transform group-hover:scale-125 ${
                            isSelected ? 'ring-4 ring-cyan-400 ring-offset-2 ring-offset-slate-900' : ''
                          } ${
                            isSevere
                              ? 'bg-gradient-to-br from-rose-950 via-rose-900/90 to-slate-950 border-rose-400 text-rose-300 shadow-[0_0_18px_rgba(244,63,94,0.55)]'
                              : isMod
                              ? 'bg-gradient-to-br from-amber-950 via-amber-900/90 to-slate-950 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.45)]'
                              : 'bg-gradient-to-br from-emerald-950 via-teal-900/90 to-slate-950 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.45)]'
                          }`}
                        >
                          <DropletIcon className="w-4 h-4" />
                          <span className="absolute -bottom-5 whitespace-nowrap text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-950/95 text-white border border-slate-700/90 shadow-md flex items-center gap-1">
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isSevere ? 'bg-rose-400' : isMod ? 'bg-amber-400' : 'bg-emerald-400'
                              }`}
                            />
                            {zone.moisture}%
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {/* Render Solar Pump Pins */}
                  {activeLocation.pumps.map((pump) => {
                    const isConnectedPump = connectedPump?.id === pump.id;
                    const isPumpActive = pump.status === 'Active' || pump.status === 'Optimizing';
                    return (
                      <div
                        key={pump.id}
                        style={{ left: `${pump.x}%`, top: `${pump.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 hover:z-40 group"
                      >
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none absolute -inset-1.5 rounded-full border transition-all ${
                            isConnectedPump
                              ? 'border-emerald-300/90 bg-emerald-400/20 shadow-[0_0_18px_rgba(16,185,129,0.75)] animate-pulse'
                              : isPumpActive
                              ? 'border-emerald-400/70 bg-emerald-500/15 shadow-[0_0_14px_rgba(16,185,129,0.5)] animate-pulse'
                              : 'border-emerald-500/35 bg-emerald-500/5'
                          }`}
                        />

                        <div
                          className={`relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-slate-950 via-emerald-950/95 to-slate-900 border-2 transform transition-transform group-hover:scale-125 ${
                            isConnectedPump
                              ? 'border-emerald-300 ring-2 ring-emerald-400/80 shadow-[0_0_22px_rgba(16,185,129,0.8)]'
                              : isPumpActive
                              ? 'border-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.6)]'
                              : 'border-emerald-600/80 shadow-[0_0_10px_rgba(16,185,129,0.35)]'
                          }`}
                        >
                          <SolarPumpPinIcon className="w-6 h-6" />

                          <span aria-hidden="true" className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                            {isPumpActive && (
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            )}
                            <span
                              className={`relative inline-flex rounded-full h-3 w-3 border border-slate-950 ${
                                pump.status === 'Active'
                                  ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.95)]'
                                  : pump.status === 'Optimizing'
                                  ? 'bg-teal-300 shadow-[0_0_8px_rgba(94,234,212,0.95)]'
                                  : 'bg-amber-400'
                              }`}
                            />
                          </span>

                          <div dir={isRtl ? 'rtl' : 'ltr'} className="absolute bottom-11 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center bg-slate-950/95 text-white text-[11px] py-1.5 px-2.5 rounded-xl shadow-2xl border border-emerald-400/50 whitespace-nowrap z-50">
                            <span translate="no" className="notranslate font-bold text-emerald-300">{pump.name}</span>
                            <span className="text-slate-200">{t.tab1.map.pumpCapPrefix} <span translate="no" className="notranslate">{pump.flowRate}</span> • {t.tab1.map.pumpStatuses[pump.status]}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div dir={isRtl ? 'rtl' : 'ltr'} className="absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between gap-2 text-[11px] font-mono text-slate-300 bg-slate-950/75 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-800">
                    <span className="truncate">💡 {t.tab1.map.interactiveHint}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      {filteredZones.length < droughtZones.length && (
                        <button
                          type="button"
                          onClick={resetFilters}
                          className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-sans font-semibold text-[10px] hover:bg-emerald-500/30 cursor-pointer"
                        >
                          {t.tab1.map.showAllPrefix} {droughtZones.length}
                        </button>
                      )}
                      <span className="text-cyan-400 font-semibold">{filteredZones.length} {t.tab1.zonesWord}</span>
                    </div>
                  </div>
                </div>

                {/* All Districts Status Strip */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    isDark
                      ? 'bg-[#111827]/90 border-slate-800/80 shadow-xl shadow-black/20'
                      : 'bg-white border-slate-200 shadow-md'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      <MapPinIcon className={`w-4 h-4 shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      {activeLocation.id === 'pontianak'
                        ? t.tab1.districtsStrip.title
                        : `${t.tab1.globalExplorer.districtsPrefix}: ${activeLocation.name}`}{' '}
                      ({droughtZones.length} {t.tab1.zonesWord})
                    </span>
                    <div className="flex items-center gap-2 text-[10px] font-semibold">
                      <span className={isDark ? 'text-rose-400' : 'text-rose-600'}>
                        {droughtZones.filter((z) => z.severity === 'Severe').length} {t.tab1.severities.Severe}
                      </span>
                      <span className={isDark ? 'text-slate-600' : 'text-slate-300'}>•</span>
                      <span className={isDark ? 'text-amber-400' : 'text-amber-700'}>
                        {droughtZones.filter((z) => z.severity === 'Moderate').length} {t.tab1.severities.Moderate}
                      </span>
                      <span className={isDark ? 'text-slate-600' : 'text-slate-300'}>•</span>
                      <span className={isDark ? 'text-emerald-400' : 'text-emerald-700'}>
                        {droughtZones.filter((z) => z.severity === 'Mild').length} {t.tab1.severities.Mild}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {droughtZones.map((zone) => {
                      const isSelected = zone.id === selectedZone.id;
                      const isSevere = zone.severity === 'Severe';
                      const isMod = zone.severity === 'Moderate';

                      return (
                        <button
                          key={zone.id}
                          type="button"
                          onClick={() => setSelectedZoneId(zone.id)}
                          className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl border text-start transition-all cursor-pointer ${
                            isSelected
                              ? isDark
                                ? 'bg-cyan-950/40 border-cyan-500/60 ring-1 ring-cyan-500/40'
                                : 'bg-cyan-50 border-cyan-500 ring-1 ring-cyan-400/40'
                              : isDark
                              ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                              : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                                isSevere
                                  ? 'bg-rose-500 animate-pulse'
                                  : isMod
                                  ? 'bg-amber-400'
                                  : 'bg-emerald-400'
                              }`}
                            />
                            <div className="min-w-0">
                              <div className={`text-xs font-bold truncate ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                                {zone.name}
                              </div>
                              <div className={`text-[10px] truncate ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                {zone.region} • {t.tab1.crops[zone.crop] ?? zone.crop}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className={`text-xs font-extrabold tabular-nums ${
                              isSevere
                                ? isDark
                                  ? 'text-rose-400'
                                  : 'text-rose-600'
                                : isMod
                                ? isDark
                                  ? 'text-amber-400'
                                  : 'text-amber-700'
                                : isDark
                                ? 'text-emerald-400'
                                : 'text-emerald-700'
                            }`}>
                              {zone.moisture}%
                            </span>
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                              isSevere
                                ? isDark
                                  ? 'bg-rose-500/20 text-rose-300'
                                  : 'bg-rose-100 text-rose-700'
                                : isMod
                                ? isDark
                                  ? 'bg-amber-500/20 text-amber-300'
                                  : 'bg-amber-100 text-amber-800'
                                : isDark
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {t.tab1.severities[zone.severity]}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* AI Actionable Pump Priority Banner */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    isDark
                      ? 'bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/30 border-emerald-500/30'
                      : 'bg-emerald-50/90 border-emerald-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl mt-0.5 shrink-0 ${isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>
                      <ShieldCheckIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-800'}`}>
                        {t.tab1.priorityBanner.title}
                      </h4>
                      <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <strong className={isDark ? 'text-cyan-400' : 'text-cyan-700'}>
                          {t.tab1.priorityBanner.pumpSitePrefix} <span translate="no" className="notranslate">{driestZone.recommendedPump}</span> — {driestZone.name}
                        </strong>{' '}
                        ({t.tab1.priorityBanner.criticalMoistureText} <strong translate="no" className="notranslate">{driestZone.moisture}%</strong>).{' '}
                        {activeLocation.name} <span translate="no" className="notranslate">NASA POWER ({nasaTelemetry.latestDate})</span> {t.tab1.priorityBanner.recordsText}{' '}
                        <strong dir="ltr" translate="no" className="notranslate">{nasaTelemetry.solarKwh.toFixed(2)} kWh/m²/day</strong> (<span translate="no" className="notranslate">{nasaTelemetry.solarMj.toFixed(2)} MJ/m²</span>),{' '}
                        <strong dir="ltr" translate="no" className="notranslate">{nasaTelemetry.tempC.toFixed(1)}°C</strong> &amp; {t.tab1.priorityBanner.macroWetnessText}{' '}
                        <strong translate="no" className="notranslate">{nasaTelemetry.soilMoisturePct}%</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Selected Zone Satellite Telemetry */}
              <div className="lg:col-span-3 space-y-4">
                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    isDark
                      ? 'bg-[#111827]/90 border-slate-800/80 shadow-xl shadow-black/20'
                      : 'bg-white border-slate-200 shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.tab1.telemetryPanel.title}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border whitespace-nowrap ${
                      selectedZone.severity === 'Severe'
                        ? isDark
                          ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                        : selectedZone.severity === 'Moderate'
                        ? isDark
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                        : isDark
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {t.tab1.severities[selectedZone.severity]} {t.tab1.telemetryPanel.droughtSuffix}
                    </span>
                  </div>

                  <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{selectedZone.name}</h3>
                  <p className={`text-xs mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {selectedZone.region} • {t.tab1.crops[selectedZone.crop] ?? selectedZone.crop} ({t.tab1.telemetryPanel.plantationSuffix})
                  </p>

                  {/* Telemetry Card 1: Soil Moisture */}
                  <div className={`group p-3.5 rounded-xl border space-y-2 mb-3 transition-colors ${
                    isDark ? 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/40' : 'bg-slate-50 border-slate-200 hover:border-cyan-300'
                  }`}>
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-xs flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        <DropletIcon className={`w-4 h-4 shrink-0 transition-transform duration-300 ease-out group-hover:scale-125 group-hover:-rotate-12 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} /> {t.tab1.telemetryPanel.smapMoisture}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded whitespace-nowrap ${
                        selectedZone.moisture < 20
                          ? isDark
                            ? 'bg-rose-500/10 text-rose-400'
                            : 'bg-rose-100 text-rose-700'
                          : selectedZone.moisture < 30
                          ? isDark
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-amber-100 text-amber-700'
                          : isDark
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {selectedZone.moisture < 20
                          ? t.tab1.telemetryPanel.criticalDry
                          : selectedZone.moisture < 30
                          ? t.tab1.telemetryPanel.moderate
                          : t.tab1.telemetryPanel.humidOptimal}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-3xl font-extrabold tabular-nums ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>{selectedZone.moisture}%</span>
                      <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t.tab1.telemetryPanel.volumetricDepth}</span>
                    </div>

                    <div dir="ltr" className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                      <div
                        className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-cyan-400 transition-all duration-500"
                        style={{ width: `${selectedZone.moisture}%` }}
                      ></div>
                    </div>

                    <div className="pt-2">
                      <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                        <span>{t.tab1.telemetryPanel.sevenDayTrend}</span>
                        <span className={`font-semibold ${
                          effectiveMoistureDeltaPct < 0
                            ? isDark
                              ? 'text-rose-400'
                              : 'text-rose-600'
                            : isDark
                            ? 'text-emerald-400'
                            : 'text-emerald-700'
                        }`}>
                          {effectiveMoistureDeltaPct > 0 ? '+' : ''}
                          {effectiveMoistureDeltaPct}% {effectiveMoistureDeltaPct < 0 ? t.tab1.telemetryPanel.deficit : t.tab1.telemetryPanel.gain}
                        </span>
                      </div>
                      <div dir="ltr">
                        <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 24">
                          <path
                            d={zoneSparkline.pathD}
                            fill="none"
                            stroke={effectiveMoistureDeltaPct < 0 ? '#F43F5E' : '#10B981'}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle
                            cx="100"
                            cy={zoneSparkline.lastY}
                            r="3"
                            fill={effectiveMoistureDeltaPct < 0 ? '#F43F5E' : '#10B981'}
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Telemetry Card 2: Solar Radiation (NASA POWER) */}
                  <div className={`group p-3.5 rounded-xl border space-y-2 mb-3 transition-colors ${
                    isDark ? 'bg-slate-900/60 border-slate-800 hover:border-amber-500/40' : 'bg-slate-50 border-slate-200 hover:border-amber-300'
                  }`}>
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-xs flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        <SunIcon className={`w-4 h-4 shrink-0 transition-transform duration-500 ease-out group-hover:rotate-45 group-hover:scale-125 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} /> {t.tab1.telemetryPanel.nasaRadiance}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded whitespace-nowrap ${
                        isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {selectedZone.solar >= 4.8 ? t.tab1.telemetryPanel.strong : t.tab1.telemetryPanel.moderateSolar}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2" title={`${(selectedZone.solar * 3.6).toFixed(2)} MJ/m²/day`}>
                      <span translate="no" className={`notranslate text-3xl font-extrabold tabular-nums ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>{selectedZone.solar.toFixed(2)}</span>
                      <span dir="ltr" translate="no" className={`notranslate text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>kWh/m²/day</span>
                    </div>

                    <div className="pt-1">
                      <div className={`flex justify-between text-[10px] mb-1 font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        <span>{t.tab1.telemetryPanel.solarPumpYield}</span>
                        <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}><span translate="no" className="notranslate">{solarCapacityBars} / 5</span> {t.tab1.telemetryPanel.capacityUnit}</span>
                      </div>
                      <div dir="ltr" className="flex gap-1.5 h-2">
                        {[1, 2, 3, 4, 5].map((bar) => (
                          <div
                            key={bar}
                            className={`flex-1 rounded-full ${
                              bar <= solarCapacityBars ? (isDark ? 'bg-emerald-400' : 'bg-emerald-500') : (isDark ? 'bg-slate-700' : 'bg-slate-200')
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Telemetry Card 3: Surface Air Temperature (T2M) & Precipitation */}
                  <div className={`p-3 rounded-xl border flex items-center justify-between gap-2 ${
                    isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div>
                      <div className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {t.tab1.telemetryPanel.surfaceTempLabel}
                      </div>
                      <div dir="ltr" translate="no" className={`notranslate text-lg font-extrabold tabular-nums ${isDark ? 'text-orange-300' : 'text-orange-600'} ${isRtl ? 'text-end' : ''}`}>
                        {nasaTelemetry.tempC.toFixed(1)} °C
                      </div>
                    </div>
                    <div className="text-end">
                      <div translate="no" className={`notranslate text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        PRECTOTCORR
                      </div>
                      <div dir="ltr" translate="no" className={`notranslate text-xs font-bold tabular-nums ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>
                        {nasaTelemetry.precipMm.toFixed(2)} mm/d
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ecosystem Early Warning & WhatsApp Mobile Preview Trigger */}
                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    isDark
                      ? 'bg-[#111827]/90 border-slate-800/80 shadow-xl shadow-black/20'
                      : 'bg-white border-slate-200 shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        peatlandRisk.level === 'critical'
                          ? isDark
                            ? 'text-rose-400'
                            : 'text-rose-700'
                          : peatlandRisk.level === 'moderate'
                          ? isDark
                            ? 'text-amber-400'
                            : 'text-amber-700'
                          : isDark
                          ? 'text-emerald-400'
                          : 'text-emerald-700'
                      }`}>
                        {t.tab1.peatland.eyebrow}
                      </span>
                      <h4 className={`text-sm font-bold leading-snug mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {peatlandRisk.cardTitle}
                      </h4>
                    </div>
                    <div className={`p-2 rounded-xl shrink-0 ${
                      peatlandRisk.level === 'critical'
                        ? isDark
                          ? 'bg-rose-500/20 text-rose-400'
                          : 'bg-rose-100 text-rose-700'
                        : peatlandRisk.level === 'moderate'
                        ? isDark
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-amber-100 text-amber-700'
                        : isDark
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      <AlertTriangleIcon className="w-4 h-4" />
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-xl border mb-3 ${
                      peatlandRisk.level === 'critical'
                        ? isDark
                          ? 'bg-rose-950/50 border-rose-500/60 text-rose-300'
                          : 'bg-rose-50 border-rose-300 text-rose-800'
                        : peatlandRisk.level === 'moderate'
                        ? isDark
                          ? 'bg-amber-950/40 border-amber-500/50 text-amber-300'
                          : 'bg-amber-50 border-amber-300 text-amber-900'
                        : isDark
                        ? 'bg-emerald-950/35 border-emerald-500/40 text-emerald-300'
                        : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                          peatlandRisk.level === 'critical'
                            ? 'bg-rose-500 animate-ping'
                            : peatlandRisk.level === 'moderate'
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                      />
                      <span className="text-[11px] font-extrabold tracking-wide leading-tight">
                        {peatlandRisk.label}
                      </span>
                    </div>
                    <p className={`text-[11px] mt-1.5 leading-relaxed ${
                      peatlandRisk.level === 'critical'
                        ? isDark
                          ? 'text-rose-200'
                          : 'text-rose-900'
                        : peatlandRisk.level === 'moderate'
                        ? isDark
                          ? 'text-amber-200'
                          : 'text-amber-900'
                        : isDark
                        ? 'text-slate-300'
                        : 'text-slate-700'
                    }`}>
                      {t.tab1.peatland.moisturePrefix} {selectedZone.moisture}% ({selectedZone.region}). {peatlandRisk.advice}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleSendFarmerEarlyWarning}
                    className={`w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-sm cursor-pointer ${
                      isDark
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                    }`}
                  >
                    <MessageCircleIcon className="w-4 h-4 shrink-0" />
                    <span>{t.tab1.peatland.sendWarningBtn}</span>
                  </button>

                  {earlyWarningToast && (
                    <div
                      role="status"
                      className={`mt-3 p-2.5 rounded-xl border text-[11px] leading-relaxed ${
                        isDark
                          ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-200'
                          : 'bg-cyan-50 border-cyan-300 text-cyan-900'
                      }`}
                    >
                      <div className={`font-bold flex items-center gap-1.5 ${isDark ? 'text-cyan-300' : 'text-cyan-800'}`}>
                        <ShieldCheckIcon className="w-3.5 h-3.5 shrink-0" />
                        {t.tab1.peatland.confirmedTitle} ({earlyWarningToast.sentAtWib})
                      </div>
                      <p className="mt-0.5">
                        {t.tab1.peatland.confirmedBodyPrefix} <strong>{earlyWarningToast.region}</strong> ({earlyWarningToast.zoneName} • {earlyWarningToast.moisture}%).
                      </p>
                    </div>
                  )}
                </div>

                {/* Smart Solar Sizing & Farmer Cost-Saving Calculator */}
                <div
                  className={`group p-5 rounded-2xl border transition-all ${
                    isDark
                      ? 'bg-[#111827]/90 border-slate-800/80 shadow-xl shadow-black/20'
                      : 'bg-white border-slate-200 shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                        {t.tab1.solarSizing.eyebrow}
                      </span>
                      <h4 className={`text-sm font-bold leading-snug mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {t.tab1.solarSizing.title}
                      </h4>
                    </div>
                    <div className={`p-2 rounded-xl shrink-0 ${isDark ? 'bg-emerald-500/15 text-emerald-400' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                      <SunIcon className="w-4 h-4 transition-transform duration-500 ease-out group-hover:rotate-45 group-hover:scale-125" />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div className={`p-3 rounded-xl border ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {t.tab1.solarSizing.arraySizeLabel}
                      </div>
                      <div className="flex items-baseline justify-between gap-2 mt-0.5">
                        <span dir="ltr" translate="no" className={`notranslate text-xl font-extrabold tabular-nums ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                          {solarSizing.recommendedWp.toLocaleString(numLocale)} <span className="text-xs font-bold">Wp</span>
                        </span>
                        <span className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          <span translate="no" className="notranslate">{solarSizing.moduleCount}×</span> {t.tab1.solarSizing.panelUnit}
                        </span>
                      </div>
                    </div>

                    <div className={`p-3 rounded-xl border ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {t.tab1.solarSizing.dailyWaterLabel}
                      </div>
                      <div className="flex items-baseline justify-between gap-2 mt-0.5">
                        <span translate="no" className={`notranslate text-xl font-extrabold tabular-nums ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
                          {solarSizing.dailyWaterLiters.toLocaleString(numLocale)} <span className="text-xs font-bold">{t.tab1.solarSizing.dailyWaterUnit}</span>
                        </span>
                        <span translate="no" className={`notranslate text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {solarSizing.dailyEnergyKwh.toFixed(1)} {t.tab1.solarSizing.dailyEnergyUnit}
                        </span>
                      </div>
                    </div>

                    <div className={`p-3 rounded-xl border ${
                      isDark
                        ? 'bg-gradient-to-br from-emerald-950/40 to-slate-900/70 border-emerald-500/30'
                        : 'bg-emerald-50/80 border-emerald-200'
                    }`}>
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[11px] font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-800'}`}>
                          {t.tab1.solarSizing.monthlySavingsLabel}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap ${
                          isDark ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {t.tab1.solarSizing.vsDiesel}
                        </span>
                      </div>
                      <div dir="ltr" translate="no" className={`notranslate text-xl font-black mt-1 tabular-nums ${isDark ? 'text-white' : 'text-slate-900'} ${isRtl ? 'text-end' : ''}`}>
                        {solarSizing.monthlySavingsDisplay}
                      </div>
                      <div className={`text-[11px] font-medium mt-0.5 ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>
                        {t.tab1.solarSizing.saveFuelPrefix} <span translate="no" className="notranslate">{solarSizing.monthlyDieselLiters.toLocaleString(numLocale)}</span> {t.tab1.solarSizing.saveFuelSuffix}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SOLVARA AI Agronomist Advisor */}
                <div
                  className={`relative overflow-hidden p-5 rounded-2xl border transition-all ${
                    isDark
                      ? 'bg-gradient-to-br from-[#0e172a] via-[#111827] to-[#0a1a24] border-cyan-500/35 shadow-xl shadow-cyan-950/30'
                      : 'bg-gradient-to-br from-white via-cyan-50/40 to-emerald-50/40 border-cyan-200 shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`notranslate text-[10px] font-extrabold uppercase tracking-wider ${
                          isDark ? 'text-cyan-400' : 'text-cyan-700'
                        }`}>
                          {t.tab1.advisor.eyebrow}
                        </span>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isDark ? 'bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.9)]' : 'bg-cyan-600'
                        }`} />
                      </div>
                      <h4 className={`text-sm font-bold leading-snug mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {t.tab1.advisor.title}
                      </h4>
                    </div>
                    <div className={`p-2 rounded-xl shrink-0 border ${
                      isDark
                        ? 'bg-cyan-500/15 text-cyan-300 border-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.28)]'
                        : 'bg-cyan-50 text-cyan-700 border-cyan-300'
                    }`}>
                      <AiSparkIcon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className={`p-3 rounded-xl border mb-3 ${
                    isDark
                      ? 'bg-slate-950/70 border-slate-800/90 text-slate-200'
                      : 'bg-white/90 border-slate-200 text-slate-800'
                  }`}>
                    <div className={`flex items-center justify-between text-[10px] font-mono mb-1.5 ${
                      isDark ? 'text-cyan-400' : 'text-cyan-700'
                    }`}>
                      <span>{t.tab1.advisor.liveBriefPrefix} · <span translate="no" className="notranslate">{selectedZone.id} ({selectedZone.moisture}%)</span></span>
                      <span dir="ltr" translate="no" className="notranslate">{selectedZone.solar.toFixed(2)} kWh/m²</span>
                    </div>
                    <p className="text-xs leading-relaxed">
                      {advisorSummaryTwoSentences}
                    </p>
                  </div>

                  <div className="space-y-1.5 mb-3">
                    <div className={`text-[10px] font-bold uppercase tracking-wider ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {t.tab1.advisor.quickPromptsTitle}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {advisorPrompts.map((prompt) => {
                        const isActive = advisorActivePrompt === prompt.id;
                        return (
                          <button
                            key={prompt.id}
                            type="button"
                            onClick={() => handleTriggerAdvisorPrompt(prompt.id)}
                            className={`text-start px-2.5 py-1.5 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer active:scale-95 ${
                              isActive
                                ? isDark
                                  ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400/70 shadow-[0_0_10px_rgba(34,211,238,0.25)]'
                                  : 'bg-cyan-600 text-white border-cyan-600 shadow-sm'
                                : isDark
                                ? 'bg-slate-900/70 text-slate-300 border-slate-700/80 hover:border-cyan-500/50 hover:text-cyan-200'
                                : 'bg-white text-slate-700 border-slate-300 hover:border-cyan-400 hover:bg-cyan-50/70'
                            }`}
                          >
                            {prompt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {(advisorIsTyping || advisorPromptResponse) && (
                    <div
                      aria-live="polite"
                      className={`p-3 rounded-xl border transition-all ${
                        isDark
                          ? 'bg-gradient-to-br from-cyan-950/45 to-slate-950/80 border-cyan-500/40 text-slate-200'
                          : 'bg-cyan-50/80 border-cyan-300 text-slate-800'
                      }`}
                    >
                      {advisorIsTyping ? (
                        <div className="flex items-center gap-2.5 py-1">
                          <div className="flex items-center gap-1" aria-hidden="true">
                            <span className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`} />
                            <span className={`w-2 h-2 rounded-full animate-bounce [animation-delay:150ms] ${isDark ? 'bg-emerald-400' : 'bg-emerald-600'}`} />
                            <span className={`w-2 h-2 rounded-full animate-bounce [animation-delay:300ms] ${isDark ? 'bg-cyan-300' : 'bg-cyan-500'}`} />
                          </div>
                          <span className={`text-[11px] font-medium ${isDark ? 'text-cyan-300' : 'text-cyan-800'}`}>
                            {t.tab1.advisor.analyzingPrefix} {selectedZone.id}...
                          </span>
                        </div>
                      ) : advisorPromptResponse ? (
                        <div>
                          <div className={`flex items-center gap-1.5 text-[11px] font-bold mb-1 ${
                            isDark ? 'text-cyan-300' : 'text-cyan-800'
                          }`}>
                            <AiSparkIcon className="w-3.5 h-3.5 shrink-0" />
                            <span>{advisorPromptResponse.title}</span>
                          </div>
                          <p className="text-xs leading-relaxed">
                            {advisorPromptResponse.body}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ===================== TAB 2: PRECISION IRRIGATION OPS ========= */}
        {/* ============================================================== */}
        {activeTab === 'ops' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Live Status Banner */}
            <div
              className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                isDark
                  ? 'bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/50 border-emerald-500/40 text-emerald-300'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="relative flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                </span>
                <div>
                  <h4 className="text-sm font-bold tracking-tight">
                    {t.tab2.bannerTitle} — {activeLocation.flag} {activeLocation.name}
                  </h4>
                  <p className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-emerald-700'}`}>
                    {t.tab2.bannerSubtitle} (<span translate="no" className="notranslate">{activeCoords.full}</span>)
                  </p>
                </div>
              </div>
              <div className={`text-end text-xs font-mono font-medium px-3 py-1.5 rounded-xl border whitespace-nowrap ${
                isDark
                  ? 'text-emerald-400 bg-slate-900/60 border-emerald-500/30'
                  : 'text-emerald-800 bg-emerald-100/80 border-emerald-300'
              }`}>
                <span dir="ltr" translate="no" className="notranslate">{nasaTelemetry.latestDate}</span> • {t.tab2.telemetryOk}
              </div>
            </div>

            {/* Core Hardware & Weather KPIs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div
                className={`group p-4 rounded-2xl border transition-colors ${
                  isDark ? 'bg-[#111827] border-slate-800 hover:border-amber-500/40' : 'bg-white border-slate-200 shadow-sm hover:border-amber-300'
                }`}
              >
                <div className={`text-xs flex items-center justify-between mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  <span>{t.tab2.kpis.solarOutput}</span>
                  <SunIcon className={`w-4 h-4 shrink-0 transition-transform duration-500 ease-out group-hover:rotate-45 group-hover:scale-125 ${isDark ? 'text-amber-400' : 'text-amber-500'}`} />
                </div>
                <div dir="ltr" translate="no" className={`notranslate text-2xl font-extrabold tabular-nums ${isDark ? 'text-white' : 'text-slate-900'} ${isRtl ? 'text-end' : ''}`}>
                  {((5.4 * nasaTelemetry.solarKwh) / 5.15).toFixed(1)} <span className={`text-sm font-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>kW</span>
                </div>
                <div className={`text-[11px] mt-1 font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>{t.tab2.kpis.solarSub}</div>
              </div>

              <div
                className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className={`text-xs flex items-center justify-between mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  <span>{t.tab2.kpis.pumpCapacity}</span>
                  <ActivityIcon className={`w-4 h-4 shrink-0 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                </div>
                <div dir="ltr" translate="no" className={`notranslate text-2xl font-extrabold tabular-nums ${isDark ? 'text-white' : 'text-slate-900'} ${isRtl ? 'text-end' : ''}`}>
                  {(12000).toLocaleString(numLocale)} <span className={`text-sm font-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>L/hr</span>
                </div>
                <div className={`text-[11px] mt-1 font-medium ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>{t.tab2.kpis.pumpSub}</div>
              </div>

              <div
                className={`group p-4 rounded-2xl border transition-colors ${
                  isDark ? 'bg-[#111827] border-slate-800 hover:border-blue-500/40' : 'bg-white border-slate-200 shadow-sm hover:border-blue-300'
                }`}
              >
                <div className={`text-xs flex items-center justify-between mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  <span>{t.tab2.kpis.waterReserve}</span>
                  <DropletIcon className={`w-4 h-4 shrink-0 transition-transform duration-300 ease-out group-hover:scale-125 group-hover:-rotate-12 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div dir="ltr" translate="no" className={`notranslate text-2xl font-extrabold tabular-nums ${isDark ? 'text-white' : 'text-slate-900'} ${isRtl ? 'text-end' : ''}`}>
                  78% <span className={`text-xs font-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>(15,600 L)</span>
                </div>
                <div className={`text-[11px] mt-1 font-medium ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>{t.tab2.kpis.waterSub}</div>
              </div>

              <div
                className={`group p-4 rounded-2xl border transition-colors ${
                  isDark ? 'bg-[#111827] border-slate-800 hover:border-purple-500/40' : 'bg-white border-slate-200 shadow-sm hover:border-purple-300'
                }`}
              >
                <div className={`text-xs flex items-center justify-between mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  <span>{t.tab2.kpis.rain3Day}</span>
                  <SatelliteIcon className={`w-4 h-4 shrink-0 transition-transform duration-300 ease-out group-hover:scale-125 group-hover:rotate-12 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                </div>
                <div dir="ltr" translate="no" className={`notranslate text-2xl font-extrabold tabular-nums ${isDark ? 'text-white' : 'text-slate-900'} ${isRtl ? 'text-end' : ''}`}>
                  {nasaTelemetry.avg3DayPrecipMm.toFixed(1)} <span className={`text-sm font-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>mm/d</span>
                </div>
                <div className={`text-[11px] mt-1 font-medium truncate ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                  {t.tab2.kpis.rainLatestPrefix} <span translate="no" className="notranslate">{nasaTelemetry.precipMm.toFixed(1)} mm/d</span> • {nasaTelemetry.avg3DayPrecipMm < 3 ? t.tab2.kpis.rainOptimalSolar : t.tab2.kpis.rainActiveRecharge}
                </div>
              </div>

              <div
                className={`p-4 rounded-2xl border col-span-2 md:col-span-1 ${
                  isDark ? 'bg-gradient-to-br from-emerald-950/40 to-[#111827] border-emerald-500/50' : 'bg-emerald-50/70 border-emerald-300'
                }`}
              >
                <div className={`text-xs flex items-center justify-between mb-1 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                  <span className="font-semibold">{t.tab2.kpis.yieldSaved}</span>
                  <ShieldCheckIcon className={`w-4 h-4 shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                </div>
                <div className={`text-2xl font-extrabold tabular-nums ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>{yieldSaved}%</div>
                <div className={`text-[11px] mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t.tab2.kpis.yieldSub}</div>
              </div>
            </div>

            {/* Interactive 140-Cell Field Stress Monitor & Simulation */}
            <div
              className={`p-6 rounded-2xl border ${
                isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-md'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className={`text-base font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <ActivityIcon className={`w-5 h-5 shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    {t.tab2.heatmap.title}
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {t.tab2.heatmap.subtitle} ({selectedZone.name})
                  </p>
                </div>

                <div dir="ltr" className={`flex items-center gap-3 px-3 py-1.5 rounded-xl border text-xs font-mono shrink-0 ${
                  isDark
                    ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                    : 'bg-slate-100 border-slate-300 text-slate-700'
                }`}>
                  <span>{t.tab2.heatmap.scaleLabel}</span>
                  <div className={`w-20 h-1 relative ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`}>
                    <span className="absolute -top-4 left-0 text-[10px]">0</span>
                    <span className="absolute -top-4 right-0 text-[10px]">500 M</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <button
                  onClick={handleRunEmergencyIrrigation}
                  disabled={isSimulating}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all transform active:scale-95 shadow-lg cursor-pointer whitespace-nowrap ${
                    isSimulating
                      ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-emerald-500/25 ring-2 ring-emerald-400/50'
                  }`}
                >
                  <PlayIcon className="w-4 h-4 shrink-0" />
                  {isSimulating ? `${t.tab2.heatmap.pumpingActive} (${simulationProgress}%)` : t.tab2.heatmap.reRunBtn}
                </button>

                <button
                  onClick={handleResetDemoField}
                  disabled={isSimulating}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs border transition-all cursor-pointer whitespace-nowrap ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300'
                      : 'bg-slate-100 border-slate-300 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <RefreshCwIcon className="w-4 h-4 shrink-0" />
                  {t.tab2.heatmap.resetDemoBtn}
                </button>

                <div className="ms-auto hidden lg:flex items-center gap-3 text-xs">
                  <div className={`flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
                    <span className="w-3 h-3 rounded bg-rose-500"></span> {t.tab2.heatmap.legend.severe}
                  </div>
                  <div className={`flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
                    <span className="w-3 h-3 rounded bg-amber-500"></span> {t.tab2.heatmap.legend.high}
                  </div>
                  <div className={`flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
                    <span className="w-3 h-3 rounded bg-yellow-400"></span> {t.tab2.heatmap.legend.moderate}
                  </div>
                  <div className={`flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
                    <span className="w-3 h-3 rounded bg-teal-500"></span> {t.tab2.heatmap.legend.low}
                  </div>
                  <div className={`flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
                    <span className="w-3 h-3 rounded bg-cyan-400 shadow-sm shadow-cyan-400"></span> {t.tab2.heatmap.legend.hydrated}
                  </div>
                </div>
              </div>

              {/* 14x10 Heatmap Grid */}
              <div dir="ltr" className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 overflow-x-auto">
                <div
                  className="grid grid-cols-14 gap-1.5 min-w-[620px]"
                  style={{ gridTemplateColumns: 'repeat(14, minmax(0, 1fr))' }}
                >
                  {fieldCells.map((state, idx) => {
                    const row = Math.floor(idx / 14);
                    const col = idx % 14;
                    const rippleRing = Math.min(6, Math.floor(Math.hypot(row - 4.5, col - 6.5) / 1.3));
                    const rippleDelayClass = isSimulating ? `ripple-delay-${rippleRing}` : '';
                    const shimmerClass = isSimulating && state >= 3 ? 'animate-hydration-shimmer' : '';

                    let bg = 'bg-cyan-400 shadow-sm shadow-cyan-400/40';
                    let label = t.tab2.heatmap.cellLabels.hydrated;
                    if (state === 0) {
                      bg = 'bg-rose-500 animate-pulse';
                      label = t.tab2.heatmap.cellLabels.severe;
                    } else if (state === 1) {
                      bg = 'bg-amber-500';
                      label = t.tab2.heatmap.cellLabels.high;
                    } else if (state === 2) {
                      bg = 'bg-yellow-400';
                      label = t.tab2.heatmap.cellLabels.moderate;
                    } else if (state === 3) {
                      bg = 'bg-teal-500';
                      label = t.tab2.heatmap.cellLabels.low;
                    }

                    return (
                      <div
                        key={idx}
                        title={`${t.tab2.heatmap.plotPrefix}${idx + 1}: ${label}`}
                        className={`h-7 rounded-md transition-all duration-700 ease-out transform hover:scale-110 cursor-pointer ${bg} ${rippleDelayClass} ${shimmerClass}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* VFD Efficiency Optimizer */}
            <div
              className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                isDark
                  ? 'bg-[#111827] border-slate-800 shadow-xl shadow-black/20'
                  : 'bg-white border-slate-200 shadow-md'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                      vfdOptimization.regime === 'boost'
                        ? isDark
                          ? 'bg-rose-500/15 text-rose-300 border-rose-500/40'
                          : 'bg-rose-100 text-rose-800 border-rose-300'
                        : vfdOptimization.regime === 'adaptive'
                        ? isDark
                          ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                          : 'bg-amber-100 text-amber-800 border-amber-300'
                        : vfdOptimization.regime === 'cruise'
                        ? isDark
                          ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
                          : 'bg-cyan-100 text-cyan-800 border-cyan-300'
                        : isDark
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                        : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    }`}>
                      {vfdOptimization.regimeLabel}
                    </span>
                    <span dir="ltr" translate="no" className={`notranslate text-[11px] font-mono tabular-nums ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {t.tab2.vfd.affinityLawPrefix}
                    </span>
                  </div>
                  <h3 className={`text-base sm:text-lg font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <ActivityIcon className={`w-5 h-5 shrink-0 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                    {t.tab2.vfd.title}
                  </h3>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {t.tab2.vfd.subtitle}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className={`inline-flex p-1 rounded-xl border text-xs font-semibold ${
                    isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-100 border-slate-200'
                  }`}>
                    <button
                      type="button"
                      onClick={() => setVfdSource('field')}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                        vfdSource === 'field'
                          ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                          : isDark
                          ? 'text-slate-400 hover:text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {t.tab2.vfd.sourcePlotArray} ({fieldMoistureMetrics.effectivePct}%)
                    </button>
                    <button
                      type="button"
                      onClick={() => setVfdSource('zone')}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                        vfdSource === 'zone'
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                          : isDark
                          ? 'text-slate-400 hover:text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {selectedZone.id} ({selectedZone.moisture}%)
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const next = !vfdAutoSync;
                      setVfdAutoSync(next);
                      if (next) {
                        setVfdCurrentHz(vfdOptimization.recommendedHz);
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap ${
                      vfdAutoSync
                        ? isDark
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/60 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                          : 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : isDark
                        ? 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-emerald-500/40'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <RefreshCwIcon className={`w-3.5 h-3.5 ${vfdAutoSync ? 'animate-spin-slow' : ''}`} />
                    {vfdAutoSync ? t.tab2.vfd.autoSyncOn : t.tab2.vfd.autoSyncOff}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                <div className={`lg:col-span-7 p-4 sm:p-5 rounded-2xl border flex flex-col justify-between gap-4 ${
                  isDark ? 'bg-slate-900/60 border-slate-800/90' : 'bg-slate-50/90 border-slate-200'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl shrink-0 ${isDark ? 'bg-cyan-500/15 text-cyan-400' : 'bg-cyan-100 text-cyan-700'}`}>
                        <DropletIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className={`text-[11px] font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {vfdSource === 'field'
                            ? `${t.tab2.vfd.liveRootMoisturePrefix} (${fieldMoistureMetrics.severeCount} ${t.tab2.vfd.criticalWord} · ${fieldMoistureMetrics.hydratedCount} ${t.tab2.vfd.hydratedWord})`
                            : `${t.tab2.vfd.zoneTelemetryPrefix} · ${selectedZone.name}`}
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className={`text-2xl font-black tabular-nums ${
                            vfdOptimization.activeMoisturePct < 20
                              ? isDark ? 'text-rose-400' : 'text-rose-600'
                              : vfdOptimization.activeMoisturePct < 35
                              ? isDark ? 'text-amber-400' : 'text-amber-600'
                              : isDark ? 'text-cyan-400' : 'text-cyan-700'
                          }`}>
                            {vfdOptimization.activeMoisturePct}%
                          </span>
                          <span className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            {vfdSource === 'field'
                              ? `${t.tab2.vfd.meanArrayPrefix} ${fieldMoistureMetrics.meanPct}%`
                              : `${selectedZone.region} · ${t.tab1.crops[selectedZone.crop] ?? selectedZone.crop}`}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-end">
                      <div className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {t.tab2.vfd.suggestedAdjustment}
                      </div>
                      <div className={`text-sm font-extrabold tabular-nums ${
                        vfdOptimization.isSynced
                          ? isDark ? 'text-emerald-400' : 'text-emerald-700'
                          : vfdOptimization.hzDelta < 0
                          ? isDark ? 'text-cyan-400' : 'text-cyan-700'
                          : isDark ? 'text-amber-400' : 'text-amber-700'
                      }`}>
                        {vfdOptimization.isSynced
                          ? t.tab2.vfd.optimalSynced
                          : `${vfdOptimization.hzDelta > 0 ? '+' : ''}${vfdOptimization.hzDelta.toFixed(1)} Hz (${vfdOptimization.hzDelta < 0 ? t.tab2.vfd.rampDown : t.tab2.vfd.rampUp})`}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {t.tab2.vfd.activeInverterSpeed} <strong dir="ltr" translate="no" className="notranslate tabular-nums font-mono">{vfdOptimization.effectiveCurrentHz.toFixed(1)} Hz</strong> <span translate="no" className="notranslate">({vfdOptimization.currentRpm.toLocaleString(numLocale)} RPM)</span>
                      </span>
                      <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                        {t.tab2.vfd.targetPrefix} <span dir="ltr" translate="no" className="notranslate tabular-nums font-mono">{vfdOptimization.recommendedHz.toFixed(1)} Hz</span>
                      </span>
                    </div>

                    <div dir="ltr" className={`relative h-4 w-full rounded-full overflow-hidden border ${
                      isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-200 border-slate-300'
                    }`}>
                      <div
                        style={{ width: `${((vfdOptimization.effectiveCurrentHz - 20) / 30) * 100}%` }}
                        className={`h-full transition-all duration-300 rounded-full ${
                          vfdOptimization.isSynced
                            ? 'bg-gradient-to-r from-emerald-500 to-cyan-400'
                            : 'bg-gradient-to-r from-amber-500 to-orange-400'
                        }`}
                      />
                      <div
                        style={{ left: `calc(${((vfdOptimization.recommendedHz - 20) / 30) * 100}% - 2px)` }}
                        title={`${t.tab2.vfd.recommendedTooltipPrefix} ${vfdOptimization.recommendedHz} Hz`}
                        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] transition-all duration-300"
                      />
                    </div>

                    <div className="pt-1">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <label
                          htmlFor="vfd-frequency-slider"
                          className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                        >
                          {t.tab2.vfd.manualSliderLabel}
                        </label>
                        <span className={`font-mono tabular-nums ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {Math.round((vfdOptimization.effectiveCurrentHz / 50) * 100)}% {t.tab2.vfd.nominalRpmSuffix}
                        </span>
                      </div>
                      <input
                        id="vfd-frequency-slider"
                        dir="ltr"
                        type="range"
                        min={20}
                        max={50}
                        step={0.5}
                        value={vfdOptimization.effectiveCurrentHz}
                        onChange={(e) => {
                          if (vfdAutoSync) setVfdAutoSync(false);
                          setVfdCurrentHz(Number(e.target.value));
                        }}
                        className="w-full h-2 rounded-lg accent-cyan-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200'
                  }`}>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {vfdOptimization.actionAdvice}
                    </p>
                    <button
                      type="button"
                      onClick={() => setVfdCurrentHz(vfdOptimization.recommendedHz)}
                      disabled={vfdOptimization.isSynced}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap ${
                        vfdOptimization.isSynced
                          ? isDark
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 cursor-default'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                          : isDark
                          ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 cursor-pointer active:scale-95'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm cursor-pointer active:scale-95'
                      }`}
                    >
                      {vfdOptimization.isSynced
                        ? t.tab2.vfd.syncedBtn
                        : `${t.tab2.vfd.applyBtnPrefix} ${vfdOptimization.recommendedHz.toFixed(1)} Hz`}
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                  <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
                    isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {t.tab2.vfd.kpiSuggestedSpeed}
                      </span>
                      <ActivityIcon className={`w-4 h-4 shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    </div>
                    <div className="mt-2">
                      <div dir="ltr" translate="no" className={`notranslate text-2xl font-black tabular-nums ${isDark ? 'text-emerald-400' : 'text-emerald-700'} ${isRtl ? 'text-end' : ''}`}>
                        {vfdOptimization.recommendedHz.toFixed(1)} <span className="text-xs font-bold">Hz</span>
                      </div>
                      <div dir="ltr" translate="no" className={`notranslate text-[11px] font-mono tabular-nums mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'} ${isRtl ? 'text-end' : ''}`}>
                        {vfdOptimization.recommendedRpm.toLocaleString(numLocale)} RPM
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
                    isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {t.tab2.vfd.kpiAdjustedFlow}
                      </span>
                      <DropletIcon className={`w-4 h-4 shrink-0 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                    </div>
                    <div className="mt-2">
                      <div dir="ltr" translate="no" className={`notranslate text-2xl font-black tabular-nums ${isDark ? 'text-cyan-400' : 'text-cyan-700'} ${isRtl ? 'text-end' : ''}`}>
                        {vfdOptimization.recommendedFlowLph.toLocaleString(numLocale)} <span className="text-xs font-bold">L/hr</span>
                      </div>
                      <div className={`text-[11px] font-mono tabular-nums mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {t.tab2.vfd.kpiVsActivePrefix} <span translate="no" className="notranslate">{vfdOptimization.currentFlowLph.toLocaleString(numLocale)}</span> {t.tab2.vfd.kpiVsActiveSuffix}
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
                    isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {t.tab2.vfd.kpiInverterLoad}
                      </span>
                      <SunIcon className={`w-4 h-4 shrink-0 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                    </div>
                    <div className="mt-2">
                      <div dir="ltr" translate="no" className={`notranslate text-2xl font-black tabular-nums ${isDark ? 'text-amber-400' : 'text-amber-600'} ${isRtl ? 'text-end' : ''}`}>
                        {vfdOptimization.recommendedPowerKw.toFixed(2)} <span className="text-xs font-bold">kW</span>
                      </div>
                      <div className={`text-[11px] font-mono tabular-nums mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {vfdOptimization.kwSavedVsCurrent > 0
                          ? `-${vfdOptimization.kwSavedVsCurrent.toFixed(2)} ${t.tab2.vfd.kpiVsCurrentSuffix}`
                          : t.tab2.vfd.kpiBaseline50Hz}
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
                    isDark
                      ? 'bg-gradient-to-br from-emerald-950/50 to-slate-900/80 border-emerald-500/35'
                      : 'bg-emerald-50/90 border-emerald-300'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-bold ${isDark ? 'text-emerald-300' : 'text-emerald-800'}`}>
                        {t.tab2.vfd.kpiEnergySaved}
                      </span>
                      <ShieldCheckIcon className={`w-4 h-4 shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
                    </div>
                    <div className="mt-2">
                      <div dir="ltr" translate="no" className={`notranslate text-2xl font-black tabular-nums ${isDark ? 'text-white' : 'text-slate-900'} ${isRtl ? 'text-end' : ''}`}>
                        {vfdOptimization.powerSavedPctVsFixed}% <span className={`text-xs font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>kWh</span>
                      </div>
                      <div className={`text-[11px] font-medium tabular-nums mt-0.5 ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>
                        <span translate="no" className="notranslate">+{vfdOptimization.dailyKwhSavedVsFixed.toFixed(1)}</span> {t.tab2.vfd.kpiToBatterySuffix}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Clean Energy Allocation & Water Output 24H Forecast Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div
                className={`group lg:col-span-5 p-5 rounded-2xl border transition-colors ${
                  isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <h4 className={`text-sm font-bold mb-1 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <SunIcon className={`w-4 h-4 shrink-0 transition-transform duration-500 ease-out group-hover:rotate-45 group-hover:scale-125 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  {t.tab2.allocation.title}
                </h4>
                <p className={`text-xs mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t.tab2.allocation.subtitle} ({activeLocation.shortLabel})
                </p>

                <div dir="ltr" className={`w-full h-4 rounded-full overflow-hidden flex p-0.5 mb-4 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                  {topAllocationZones.map((item, i) => (
                    <div
                      key={item.name}
                      style={{ width: `${item.pct}%` }}
                      className={`${item.color} h-full ${i === 0 ? 'rounded-l-full' : ''} ${i === topAllocationZones.length - 1 ? 'rounded-r-full' : ''}`}
                      title={`${item.name}: ${item.pct}%`}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {topAllocationZones.map((item) => (
                    <div key={item.name} className="flex items-center gap-2 min-w-0">
                      <span className={`w-3 h-3 rounded-full shrink-0 ${item.color}`}></span>
                      <span className={`truncate ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {item.name} ({item.crop}): <strong translate="no" className="notranslate">{item.pct}%</strong> <span translate="no" className="notranslate">({item.kw} kW)</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`group lg:col-span-7 p-5 rounded-2xl border transition-colors ${
                  isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div>
                    <h4 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      <DropletIcon className={`w-4 h-4 shrink-0 transition-transform duration-300 ease-out group-hover:scale-125 group-hover:-rotate-12 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                      {t.tab2.forecast.title}
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {t.tab2.forecast.subtitlePrefix} <strong dir="ltr" translate="no" className={`notranslate ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>{activeLocation.optimalWindow}</strong> {t.tab2.forecast.subtitleSuffix}
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border whitespace-nowrap ${
                    isDark
                      ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                      : 'bg-cyan-50 text-cyan-700 border-cyan-200'
                  }`}>
                    {t.tab2.forecast.estTotal}
                  </span>
                </div>

                <div dir="ltr" className="h-36 w-full pt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="30" x2="500" y2="30" stroke={isDark ? '#1e293b' : '#e2e8f0'} strokeDasharray="3 3" />
                    <line x1="0" y1="70" x2="500" y2="70" stroke={isDark ? '#1e293b' : '#e2e8f0'} strokeDasharray="3 3" />
                    <line x1="0" y1="110" x2="500" y2="110" stroke={isDark ? '#1e293b' : '#cbd5e1'} />

                    <path
                      d="M 0,115 L 0,110 C 60,110 120,95 180,60 C 220,35 250,15 280,15 C 320,15 360,50 400,80 C 440,105 470,112 500,115 Z"
                      fill="url(#waterGradient)"
                    />
                    <path
                      d="M 0,110 C 60,110 120,95 180,60 C 220,35 250,15 280,15 C 320,15 360,50 400,80 C 440,105 470,112 500,115"
                      fill="none"
                      stroke="#06B6D4"
                      strokeWidth="3"
                    />
                    <circle cx="280" cy="15" r="4.5" fill="#10B981" stroke="#fff" strokeWidth="2" />
                  </svg>
                  <div translate="no" className={`notranslate flex justify-between text-[10px] font-mono mt-1 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                    <span>00h</span>
                    <span>04h</span>
                    <span>08h</span>
                    <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>{t.tab2.forecast.peakLabel}</span>
                    <span>16h</span>
                    <span>20h</span>
                    <span>24h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ===================== TAB 3: SITE INTELLIGENCE =============== */}
        {/* ============================================================== */}
        {activeTab === 'feasibility' && (
          <div className="space-y-6 animate-fadeIn">
            <div
              className={`p-6 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                isDark
                  ? 'bg-gradient-to-r from-[#111827] via-[#0d1525] to-[#111827] border-slate-800'
                  : 'bg-white border-slate-200 shadow-md'
              }`}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                    isDark
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    {t.tab3.rankBadge}
                  </span>
                  <span dir="ltr" translate="no" className={`notranslate text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {t.tab3.siteCodePrefix} {activeLocation.id.toUpperCase()} • {activeCoords.full}
                  </span>
                </div>
                <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {activeLocation.flag} {activeLocation.name} — {t.tab3.siteTitleSuffix}
                </h2>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t.tab3.siteSubtitlePrefix} {activeLocation.name} ({activeLocation.focus[lang]})
                </p>
              </div>

              <div className={`flex items-center gap-4 border p-3.5 rounded-2xl shadow-xl shrink-0 ${
                isDark
                  ? 'bg-slate-900/80 border-emerald-500/30 shadow-emerald-500/10'
                  : 'bg-emerald-50/80 border-emerald-300 shadow-emerald-500/5'
              }`}>
                <div translate="no" className="notranslate relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 font-black text-2xl shadow-lg shadow-emerald-500/30 tabular-nums">
                  {(86 + Math.min(12, nasaTelemetry.solarKwh * 1.45)).toFixed(1)}
                </div>
                <div>
                  <div className={`text-[10px] uppercase font-bold tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t.tab3.suitabilityScore}</div>
                  <div className={`text-base font-extrabold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>{t.tab3.tierGrade}</div>
                  <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t.tab3.confidencePrefix} <span translate="no" className="notranslate">97.3%</span></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {t.tab3.metrics.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border ${
                    isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{item.label}</div>
                  <div dir="ltr" translate="no" className={`notranslate text-lg font-black mt-0.5 tabular-nums ${isDark ? 'text-white' : 'text-slate-900'} ${isRtl ? 'text-end' : ''}`}>{item.val}</div>
                  <div className={`text-[10px] mt-0.5 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>{item.sub}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div
                className={`lg:col-span-8 p-6 rounded-2xl border ${
                  isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-md'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <h3 className={`text-base font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <ShieldCheckIcon className={`w-5 h-5 shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    {t.tab3.reasoningTitle}
                  </h3>
                  <span className={`text-xs font-mono px-2.5 py-1 rounded-lg border whitespace-nowrap ${
                    isDark
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    {t.tab3.confidenceBadgePrefix} <span translate="no" className="notranslate">97.3%</span>
                  </span>
                </div>

                <div className={`space-y-3 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <div className={`flex items-start gap-2.5 p-3 rounded-xl border ${
                    isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <span className={`font-bold shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>✓</span>
                    <div>
                      <strong className={isDark ? 'text-white' : 'text-slate-900'}>{t.tab3.reasons[0].title}</strong>{' '}
                      {t.tab3.reasons[0].bodyBefore}{' '}
                      <span dir="ltr" translate="no" className={`notranslate font-semibold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                        {nasaTelemetry.solarKwh.toFixed(2)} kWh/m²/day ({nasaTelemetry.solarMj.toFixed(2)} MJ/m²)
                      </span>{' '}
                      {t.tab3.reasons[0].bodyAfter}
                    </div>
                  </div>

                  {t.tab3.reasons.slice(1).map((reason, rIdx) => (
                    <div
                      key={rIdx}
                      className={`flex items-start gap-2.5 p-3 rounded-xl border ${
                        isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <span className={`font-bold shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>✓</span>
                      <div>
                        <strong className={isDark ? 'text-white' : 'text-slate-900'}>{reason.title}</strong> {reason.body}
                      </div>
                    </div>
                  ))}
                </div>

                <div className={`mt-5 p-4 rounded-xl border ${
                  isDark ? 'bg-amber-950/20 border-amber-500/30' : 'bg-amber-50 border-amber-300'
                }`}>
                  <div className={`flex items-center gap-2 text-xs font-bold mb-1 ${isDark ? 'text-amber-400' : 'text-amber-800'}`}>
                    <AlertTriangleIcon className={`w-4 h-4 shrink-0 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                    {t.tab3.riskTitle}
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-amber-950'}`}>
                    {t.tab3.riskBodyBefore} <strong>{t.tab3.riskBodyHighlight}</strong> {t.tab3.riskBodyAfter}
                  </p>
                </div>
              </div>

              <div
                className={`lg:col-span-4 p-6 rounded-2xl border space-y-4 ${
                  isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-md'
                }`}
              >
                <h3 className={`text-base font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <LayersIcon className={`w-5 h-5 shrink-0 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                  {t.tab3.weightsTitle}
                </h3>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t.tab3.weightsSubtitle}
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    { label: t.tab3.weights[0], pct: 30, color: 'bg-amber-400' },
                    { label: t.tab3.weights[1], pct: 25, color: 'bg-emerald-400' },
                    { label: t.tab3.weights[2], pct: 20, color: 'bg-cyan-400' },
                    { label: t.tab3.weights[3], pct: 15, color: 'bg-lime-400' },
                    { label: t.tab3.weights[4], pct: 10, color: 'bg-indigo-400' },
                  ].map((w, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{w.label}</span>
                        <span className={`font-bold tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>{w.pct}%</span>
                      </div>
                      <div dir="ltr" className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                        <div className={`h-full ${w.color}`} style={{ width: `${w.pct * 2.5}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                className={`group p-6 rounded-2xl border transition-colors ${
                  isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-md'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div>
                    <h4 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      <SunIcon className={`w-4 h-4 shrink-0 transition-transform duration-500 ease-out group-hover:rotate-45 group-hover:scale-125 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                      {t.tab3.solarProfileTitle}
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t.tab3.solarProfileSubtitle}</p>
                  </div>
                  <span className={`text-xs font-mono px-2.5 py-1 rounded-md border whitespace-nowrap ${
                    isDark
                      ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                      : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                  }`}>
                    {t.tab3.solarMaxBadge}
                  </span>
                </div>

                <div dir="ltr" className="h-44 w-full">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="solarGenGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="30" x2="500" y2="30" stroke={isDark ? '#1e293b' : '#e2e8f0'} strokeDasharray="3 3" />
                    <line x1="0" y1="70" x2="500" y2="70" stroke={isDark ? '#1e293b' : '#e2e8f0'} strokeDasharray="3 3" />
                    <line x1="0" y1="110" x2="500" y2="110" stroke={isDark ? '#1e293b' : '#cbd5e1'} />

                    <path
                      d="M 0,110 C 100,110 150,110 180,75 C 220,25 250,10 280,10 C 310,10 340,30 380,80 C 410,110 450,110 500,110 Z"
                      fill="url(#solarGenGrad)"
                    />
                    <path
                      d="M 0,110 C 100,110 150,110 180,75 C 220,25 250,10 280,10 C 310,10 340,30 380,80 C 410,110 450,110 500,110"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="3"
                    />
                    <circle cx="280" cy="10" r="4.5" fill="#F59E0B" stroke="#fff" strokeWidth="2" />
                  </svg>
                  <div translate="no" className={`notranslate flex justify-between text-[10px] font-mono mt-1 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                    <span>06:00</span>
                    <span>09:00</span>
                    <span className={`font-bold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>{t.tab3.solarPeakZen}</span>
                    <span>15:00</span>
                    <span>18:30</span>
                  </div>
                </div>
              </div>

              <div
                className={`p-6 rounded-2xl border ${
                  isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-md'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div>
                    <h4 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      <ActivityIcon className={`w-4 h-4 shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      {t.tab3.irradianceMonthlyTitle}
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t.tab3.irradianceMonthlySubtitle}</p>
                  </div>
                  <span dir="ltr" translate="no" className={`notranslate text-xs font-mono px-2.5 py-1 rounded-md border whitespace-nowrap ${
                    isDark
                      ? 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
                      : 'text-cyan-700 bg-cyan-50 border-cyan-200'
                  }`}>
                    {t.tab3.irradianceAvgBadge}
                  </span>
                </div>

                <div dir="ltr" className="h-44 flex items-end justify-between gap-2 pt-4 px-2">
                  {[
                    { idx: 0, val: 5.2 },
                    { idx: 1, val: 5.8 },
                    { idx: 2, val: 6.5 },
                    { idx: 3, val: 7.1 },
                    { idx: 4, val: 7.4 },
                    { idx: 5, val: 6.9 },
                    { idx: 6, val: 5.4 },
                    { idx: 7, val: 5.1 },
                    { idx: 8, val: 6.3 },
                    { idx: 9, val: 6.6 },
                    { idx: 10, val: 5.7 },
                    { idx: 11, val: 4.9 },
                  ].map((item) => {
                    const heightPercent = (item.val / 7.5) * 100;
                    const isMonsoon = item.idx === 6 || item.idx === 7;
                    const monthLabel = t.tab3.months[item.idx];

                    return (
                      <div key={item.idx} className="flex-1 flex flex-col items-center gap-1 group">
                        <div className={`text-[10px] opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'text-slate-400' : 'text-slate-700 font-semibold'}`}>
                          {item.val}
                        </div>
                        <div className={`w-full rounded-t-md h-32 flex items-end overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className={`w-full transition-all duration-500 rounded-t-md group-hover:brightness-125 ${
                              isMonsoon
                                ? 'bg-gradient-to-t from-amber-600 to-amber-400'
                                : 'bg-gradient-to-t from-emerald-600 to-teal-400'
                            }`}
                          ></div>
                        </div>
                        <span className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{monthLabel}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ===================== CREDIBLE ATTRIBUTION FOOTER ===================== */}
      <footer
        key={`footer-${lang}`}
        className={`mt-12 border-t py-6 transition-colors ${
          isDark ? 'bg-[#080d17] border-slate-800/80 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full shrink-0 ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'}`}></span>
            <span className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
              <span translate="no" className="notranslate">SOLVARA</span>{' '}
              {t.footer.brandLine.replace(/^SOLVARA\s*/, '')}
            </span>
          </div>

          <div translate="no" className={`notranslate flex flex-wrap items-center justify-center gap-3 sm:gap-4 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
            <span>{t.footer.resolution}</span>
            <span>•</span>
            <span>{t.footer.iec}</span>
            <span>•</span>
            <span>{t.footer.vfdProtocol}</span>
          </div>
        </div>
      </footer>

      {/* Real-Time Farmer WhatsApp Mobile Preview Drawer (Bottom-Right Corner) */}
      <WhatsAppPreviewModal
        isOpen={whatsappPreviewData.isOpen}
        onClose={() => setWhatsappPreviewData((prev) => ({ ...prev, isOpen: false }))}
        message={whatsappPreviewData.message}
        sentAt={whatsappPreviewData.sentAt}
        lang={lang}
        isRtl={isRtl}
        isDark={isDark}
      />

      {/* Floating Early Warning Confirmation Toast (Bottom-Left so it never overlaps WhatsApp Phone Preview) */}
      {earlyWarningToast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-5 left-5 z-40 max-w-sm p-4 rounded-2xl border shadow-2xl backdrop-blur-md transition-all ${
            isDark
              ? 'bg-slate-900/95 border-emerald-500/50 text-slate-100 shadow-emerald-950/60'
              : 'bg-white/95 border-emerald-400 text-slate-900 shadow-slate-300/60'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-xl shrink-0 ${
              isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
            }`}>
              <MessageCircleIcon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className={`text-xs font-extrabold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                  {t.toast.title}
                </span>
                <button
                  type="button"
                  onClick={() => setEarlyWarningToast(null)}
                  className={`text-xs font-bold px-1.5 py-0.5 rounded cursor-pointer ${
                    isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  ✕
                </button>
              </div>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {t.toast.bodyPrefix} <strong>{earlyWarningToast.region}</strong> {t.toast.bodyMiddle} <strong>{earlyWarningToast.zoneName}</strong> ({earlyWarningToast.sentAtWib}).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
