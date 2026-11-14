import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Globe, Search } from 'lucide-react';
import { FullLang, getWorldLanguageOption, WORLD_LANGUAGES, WorldLanguageOption } from '../translations';

const FLAG_BY_LANG: Record<FullLang, string> = {
  en: '🇺🇸',
  id: '🇮🇩',
  fr: '🇫🇷',
  de: '🇩🇪',
  nl: '🇳🇱',
  sv: '🇸🇪',
  no: '🇳🇴',
  th: '🇹🇭',
  ja: '🇯🇵',
  ko: '🇰🇷',
  it: '🇮🇹',
  ar: '🇸🇦',
  es: '🇪🇸',
  pt: '🇧🇷',
  hi: '🇮🇳',
};

const SUPPORTED_FULL_LANGS = new Set<FullLang>([
  'en',
  'id',
  'fr',
  'de',
  'nl',
  'sv',
  'no',
  'th',
  'ja',
  'ko',
  'it',
  'ar',
  'es',
  'pt',
  'hi',
]);

export function normalizeLanguageCode(code: string): FullLang {
  const clean = code.trim().toLowerCase();
  const base = clean.split('-')[0];
  if (base === 'nb' || base === 'nn') {
    return 'no';
  }
  if (SUPPORTED_FULL_LANGS.has(base as FullLang)) {
    return base as FullLang;
  }
  return 'en';
}

export function isRtlLanguageCode(code: string): boolean {
  return normalizeLanguageCode(code) === 'ar';
}

export function clearExternalTranslationArtifacts(): void {
  try {
    const expired = 'expires=Thu, 01 Jan 1970 00:00:00 UTC';
    document.cookie = `googtrans=; ${expired}; path=/;`;
    if (typeof window !== 'undefined' && window.location.hostname) {
      document.cookie = `googtrans=; ${expired}; path=/; domain=${window.location.hostname};`;
      document.cookie = `googtrans=; ${expired}; path=/; domain=.${window.location.hostname};`;
    }
  } catch {
    // Ignore cookie errors in restricted iframes
  }

  if (typeof document === 'undefined') return;

  try {
    const gtScript = document.getElementById('google-translate-script');
    gtScript?.remove();

    const gtElement = document.getElementById('google_translate_element');
    gtElement?.remove();

    document.querySelectorAll('.skiptranslate, iframe.goog-te-banner-frame, .goog-te-spinner-pos').forEach((node) => {
      node.remove();
    });

    document.documentElement.classList.remove('translated-ltr', 'translated-rtl');
    if (document.body) {
      document.body.classList.remove('translated-ltr', 'translated-rtl');
      document.body.style.top = '';
    }
  } catch {
    // Ignore DOM cleanup errors
  }
}

export function readPersistedLanguage(): FullLang {
  try {
    const saved = localStorage.getItem('solvara_lang');
    if (saved && saved.trim().length > 0) {
      return normalizeLanguageCode(saved);
    }
  } catch {
    // Ignore storage read errors in restricted iframes
  }
  return 'en';
}

export function persistLanguagePreference(code: FullLang): void {
  const normalized = normalizeLanguageCode(code);
  try {
    localStorage.setItem('solvara_lang', normalized);
  } catch {
    // Ignore storage quota errors
  }
  clearExternalTranslationArtifacts();
}

export function syncHtmlDirection(code: FullLang): boolean {
  const normalized = normalizeLanguageCode(code);
  const rtl = normalized === 'ar';
  const dir = rtl ? 'rtl' : 'ltr';
  const htmlLang = normalized;

  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', htmlLang);
    if (document.body) {
      document.body.setAttribute('dir', dir);
    }
  }

  return rtl;
}

interface LanguageSwitcherProps {
  selectedLang: FullLang;
  onSelectLanguage: (code: FullLang) => void;
  isDark: boolean;
  searchPlaceholder?: string;
  noMatchLabel?: string;
  switcherLabel?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  selectedLang,
  onSelectLanguage,
  isDark,
  searchPlaceholder = 'Search language...',
  noMatchLabel = 'No matching language found',
  switcherLabel = 'Language switcher',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const containerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const normalizedLang = normalizeLanguageCode(selectedLang);
  const isRtl = normalizedLang === 'ar';

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 40);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  const activeLanguageItem: WorldLanguageOption = useMemo(
    () => getWorldLanguageOption(normalizedLang),
    [normalizedLang]
  );

  const filteredLanguages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return WORLD_LANGUAGES;
    return WORLD_LANGUAGES.filter(
      (item) =>
        item.nativeName.toLowerCase().includes(q) ||
        item.englishName.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.shortCode.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handlePickLanguage = (code: FullLang) => {
    setIsOpen(false);
    setSearchQuery('');
    onSelectLanguage(code);
  };

  return (
    <div ref={containerRef} className="relative notranslate" translate="no" dir="ltr">
      {/* Compact Globe Trigger Button */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={switcherLabel}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap ${
          isOpen
            ? isDark
              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
              : 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm'
            : isDark
            ? 'bg-slate-900/80 hover:bg-slate-800 border-slate-700/80 text-slate-200'
            : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800 shadow-xs'
        }`}
      >
        <Globe className={`w-4 h-4 shrink-0 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
        <span>{FLAG_BY_LANG[activeLanguageItem.dictLang]}</span>
        <span>{activeLanguageItem.shortCode}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Clean Searchable Internal i18n Dropdown */}
      {isOpen && (
        <div
          role="dialog"
          aria-label={switcherLabel}
          dir={isRtl ? 'rtl' : 'ltr'}
          className={`absolute ${isRtl ? 'left-0' : 'right-0'} mt-2 w-72 rounded-2xl border shadow-2xl overflow-hidden z-50 animate-fadeIn ${
            isDark
              ? 'bg-[#0F172A] border-slate-700/90 text-slate-100 shadow-black/80'
              : 'bg-white border-slate-200 text-slate-900 shadow-slate-900/15'
          }`}
        >
          {/* Search Bar Header */}
          <div className={`p-2.5 border-b ${isDark ? 'border-slate-800 bg-slate-900/80' : 'border-slate-100 bg-slate-50'}`}>
            <div
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border ${
                isDark ? 'bg-slate-950 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
              }`}
            >
              <Search className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-transparent text-xs outline-none placeholder:text-slate-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-[11px] text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
            <div
              className={`flex items-center justify-between px-1 pt-1.5 text-[10px] ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              <span>i18n ({WORLD_LANGUAGES.length})</span>
              <span className="font-mono">{isRtl ? 'RTL (AR)' : 'LTR'}</span>
            </div>
          </div>

          {/* Scrollable Language Options */}
          <div className="max-h-72 overflow-y-auto p-1.5 space-y-0.5" role="listbox">
            {filteredLanguages.length === 0 ? (
              <div className={`py-6 text-center text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {noMatchLabel}
              </div>
            ) : (
              filteredLanguages.map((item) => {
                const isSelected = normalizedLang === item.dictLang;
                const itemRtl = item.dir === 'rtl';
                return (
                  <button
                    key={item.code}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handlePickLanguage(item.dictLang)}
                    className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-start transition-colors cursor-pointer ${
                      isSelected
                        ? isDark
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-emerald-50 text-emerald-800'
                        : isDark
                        ? 'hover:bg-slate-800/80 text-slate-200'
                        : 'hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-base leading-none shrink-0">{FLAG_BY_LANG[item.dictLang]}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold truncate">{item.nativeName}</span>
                          {itemRtl && (
                            <span
                              className={`text-[9px] font-mono px-1 py-0.2 rounded ${
                                isDark ? 'bg-cyan-950 text-cyan-300' : 'bg-cyan-100 text-cyan-800'
                              }`}
                            >
                              RTL
                            </span>
                          )}
                        </div>
                        <div className={`text-[10px] truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {item.englishName} · {item.shortCode}
                        </div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 shrink-0 text-emerald-400" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
