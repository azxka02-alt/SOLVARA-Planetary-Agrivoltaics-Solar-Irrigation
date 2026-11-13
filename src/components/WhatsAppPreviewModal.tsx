import React, { useEffect, useState } from 'react';
import { FullLang, TRANSLATIONS } from '../translations';

interface WhatsAppPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  sentAt: string;
  lang: FullLang;
  isRtl?: boolean;
  isDark: boolean;
}

function renderWhatsAppFormattedLine(line: string): React.ReactNode {
  if (!line.trim()) {
    return <span className="block h-1.5" />;
  }
  const parts = line.split(/(\*[^*]+\*|_[^_]+_)/g);
  return (
    <>
      {parts.map((part, idx) => {
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
          return (
            <strong key={idx} className="font-bold">
              {part.slice(1, -1)}
            </strong>
          );
        }
        if (part.startsWith('_') && part.endsWith('_') && part.length > 2) {
          return (
            <em key={idx} className="italic opacity-90">
              {part.slice(1, -1)}
            </em>
          );
        }
        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </>
  );
}

export const WhatsAppPreviewModal: React.FC<WhatsAppPreviewModalProps> = ({
  isOpen,
  onClose,
  message,
  sentAt,
  lang,
  isRtl = lang === 'ar',
  isDark,
}) => {
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[lang].whatsappPreview;

  useEffect(() => {
    setCopied(false);
  }, [message, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = message;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  const shortTime = sentAt.split(' ')[0] || sentAt;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={t.previewTag}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-[350px] animate-fadeIn"
    >
      <div
        className={`relative rounded-[1.85rem] border-[3px] shadow-2xl overflow-hidden transition-all ${
          isDark
            ? 'border-slate-700 bg-slate-950 shadow-black/85'
            : 'border-slate-800 bg-white shadow-slate-900/35'
        }`}
      >
        {/* Mini Smartphone Status & Notch Bar */}
        <div className="bg-[#05463E] px-4 pt-2 pb-1 flex items-center justify-between text-[10px] font-mono text-emerald-100/85">
          <span>{shortTime}</span>
          <div className="w-14 h-1.5 rounded-full bg-black/40" />
          <span>Sat-SMS • 4G</span>
        </div>

        {/* WhatsApp Official Dark Green Header */}
        <div
          dir={isRtl ? 'rtl' : 'ltr'}
          className="bg-gradient-to-r from-[#075E54] to-[#128C7E] text-white px-3.5 py-2.5 flex items-center justify-between gap-2 shadow-md"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-9 h-9 rounded-full bg-emerald-950/70 border border-emerald-300/50 flex items-center justify-center shrink-0">
              <svg
                className="w-4.5 h-4.5 text-emerald-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 7 9 3 5 7l4 4" />
                <path d="m17 11 4 4-4 4-4-4" />
                <path d="m8 12 4 4 6-6-4-4Z" />
                <path d="m16 8 3-3" />
                <path d="M9 21a6 6 0 0 0-6-6" />
              </svg>
              <span className="absolute -bottom-0.5 -end-0.5 w-2.5 h-2.5 rounded-full bg-[#25D366] border-2 border-[#075E54]" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold truncate">{t.botName} ✓</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-100/90">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                <span>{t.onlineStatus}</span>
                <span className="opacity-70">• {t.previewTag}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t.closeBtn}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white/85 hover:text-white hover:bg-white/15 transition-colors cursor-pointer shrink-0 text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* WhatsApp Chat Wallpaper Area */}
        <div
          className={`relative px-3 py-3.5 max-h-[320px] overflow-y-auto ${
            isDark ? 'bg-[#0B141A]' : 'bg-[#EFEAE2]'
          }`}
          style={{
            backgroundImage: isDark
              ? 'radial-gradient(rgba(255,255,255,0.035) 1px, transparent 0)'
              : 'radial-gradient(rgba(7,94,84,0.06) 1px, transparent 0)',
            backgroundSize: '16px 16px',
          }}
        >
          {/* TODAY Pill */}
          <div className="flex justify-center mb-2.5">
            <span
              className={`px-2.5 py-0.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider shadow-xs ${
                isDark ? 'bg-[#182229] text-slate-300' : 'bg-white/90 text-slate-600'
              }`}
            >
              {t.todayLabel}
            </span>
          </div>

          {/* Outgoing / Received Alert Chat Bubble */}
          <div className="flex justify-end">
            <div
              dir={isRtl ? 'rtl' : 'ltr'}
              className={`relative max-w-[95%] rounded-2xl rounded-te-sm px-3.5 py-2.5 shadow-sm text-[11px] leading-relaxed ${
                isDark
                  ? 'bg-[#005C4B] text-[#E9EDEF]'
                  : 'bg-[#D9FDD3] text-[#111B21]'
              }`}
            >
              <div className="space-y-0.5 break-words">
                {message.split('\n').map((line, i) => (
                  <div key={i}>{renderWhatsAppFormattedLine(line)}</div>
                ))}
              </div>

              {/* Timestamp & Double Blue Checkmarks */}
              <div
                dir="ltr"
                className={`mt-1.5 flex items-center justify-end gap-1 text-[10px] font-mono ${
                  isDark ? 'text-[#8696A0]' : 'text-[#667781]'
                }`}
              >
                <span>{shortTime}</span>
                <span className="text-[#53BDEB] font-bold tracking-tighter text-[11px]" aria-label="Read">
                  ✓✓
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Smartphone Action Bar */}
        <div
          dir={isRtl ? 'rtl' : 'ltr'}
          className={`px-3 py-2.5 border-t flex items-center gap-2 ${
            isDark
              ? 'bg-[#111B21] border-slate-800'
              : 'bg-[#F0F2F5] border-slate-200'
          }`}
        >
          <button
            type="button"
            onClick={handleCopy}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1.5 whitespace-nowrap ${
              copied
                ? 'bg-emerald-500 text-slate-950'
                : isDark
                ? 'bg-[#00A884] hover:bg-[#06CF9C] text-slate-950'
                : 'bg-[#075E54] hover:bg-[#128C7E] text-white'
            }`}
          >
            <span>{copied ? '✓' : '📋'}</span>
            <span>{copied ? t.copiedBtn : t.copyBtn}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className={`py-2 px-3.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
