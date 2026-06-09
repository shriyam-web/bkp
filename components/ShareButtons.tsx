'use client';

import { useState } from 'react';
import {
  Share2,
  MessageCircle,
  Twitter,
  Facebook,
  Linkedin,
  Link2,
  Check,
} from 'lucide-react';
import { ShareContent, shareContent } from '@/lib/share';
import { useTranslations } from '@/lib/TranslationContext';

interface ShareButtonsProps {
  content: ShareContent;
  variant?: 'inline' | 'compact' | 'bar';
  inverted?: boolean;
  className?: string;
}

export default function ShareButtons({
  content,
  variant = 'inline',
  inverted = false,
  className = '',
}: ShareButtonsProps) {
  const { locale } = useTranslations();
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const labels = {
    share: locale === 'hi' ? 'साझा करें' : 'Share',
    whatsapp: 'WhatsApp',
    twitter: 'X',
    facebook: 'Facebook',
    linkedin: 'LinkedIn',
    copy: locale === 'hi' ? 'लिंक कॉपी करें' : 'Copy link',
    copied: locale === 'hi' ? 'कॉपी हो गया' : 'Copied',
  };

  const handleShare = async (platform: Parameters<typeof shareContent>[1]) => {
    const result = await shareContent(content, platform);
    if (result === 'copied') {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    setMenuOpen(false);
  };

  const buttons = [
    { platform: 'whatsapp' as const, icon: MessageCircle, label: labels.whatsapp },
    { platform: 'twitter' as const, icon: Twitter, label: labels.twitter },
    { platform: 'facebook' as const, icon: Facebook, label: labels.facebook },
    { platform: 'linkedin' as const, icon: Linkedin, label: labels.linkedin },
    { platform: 'copy' as const, icon: copied ? Check : Link2, label: copied ? labels.copied : labels.copy },
  ];

  if (variant === 'bar') {
    return (
      <div className={`flex flex-wrap items-center gap-1 ${className}`}>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide mr-2">
          {labels.share}
        </span>
        {buttons.map(({ platform, icon: Icon, label }) => (
          <button
            key={platform}
            onClick={() => handleShare(platform)}
            title={label}
            className="inline-flex items-center justify-center h-8 w-8 rounded border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            aria-label={label}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded border text-sm font-medium transition-colors ${
            inverted
              ? 'border-white/25 text-white hover:bg-white/10'
              : 'border-border bg-background hover:bg-muted'
          }`}
          aria-label={labels.share}
        >
          <Share2 className="h-3.5 w-3.5" />
          {labels.share}
        </button>
        {menuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 top-full mt-1 z-50 bg-background border border-border rounded shadow-md py-1 min-w-[160px]">
              {buttons.map(({ platform, icon: Icon, label }) => (
                <button
                  key={platform}
                  onClick={() => handleShare(platform)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-muted transition-colors"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </button>
              ))}
              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  onClick={() => handleShare('native')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-muted transition-colors border-t border-border"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  {locale === 'hi' ? 'और विकल्प' : 'More'}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {buttons.map(({ platform, icon: Icon, label }) => (
        <button
          key={platform}
          onClick={() => handleShare(platform)}
          title={label}
          className="inline-flex items-center justify-center h-9 w-9 rounded border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
          aria-label={label}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
}
