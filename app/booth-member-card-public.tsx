'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Star, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslations } from '@/lib/TranslationContext';
import { isBoothIncharge, type BoothCardMember } from '@/lib/booth-member-card';
import { formatMemberAddress } from '@/lib/format-address';
import { cn } from '@/lib/utils';

interface Props {
  member: BoothCardMember & {
    state?: string;
    constituency?: string;
    booth?: string;
  };
}

export default function BoothMemberCardPublic({ member }: Props) {
  const { locale } = useTranslations();
  const isHi = locale === 'hi';

  const getText = (obj: { en: string; hi: string }) =>
    isHi && obj.hi ? obj.hi : obj.en;

  const formatAddress = () => formatMemberAddress(member.address);

  const incharge = isBoothIncharge(member);

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-background">
      <Header />

      <main className="mx-auto max-w-lg px-4 sm:px-6 pt-28 pb-12">
        <Link
          href={`/${locale}/booth-committee`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {isHi ? 'बूथ समिति' : 'Booth Committee'}
        </Link>

        <p className="text-[13px] text-muted-foreground mb-2">
          {isHi ? 'बहुजन क्रांति पार्टी · बूथ स्तर समिति' : 'Bahujan Kranti Party · Booth Level Committee'}
        </p>

        <article
          className={cn(
            'bg-white dark:bg-card border rounded-xl overflow-hidden shadow-sm',
            incharge
              ? 'border-orange-300/80 dark:border-orange-500/40 ring-1 ring-orange-200/50'
              : 'border-border/70'
          )}
        >
          <div className="h-2 bg-orange-600" />

          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-6">
              <div
                className={cn(
                  'relative mx-auto sm:mx-0 shrink-0 rounded-lg overflow-hidden bg-muted',
                  incharge ? 'w-32 h-40' : 'w-28 h-36'
                )}
              >
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={getText(member.name)}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-light text-muted-foreground/40 uppercase">
                      {getText(member.name)
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1 text-center sm:text-left min-w-0">
                {incharge && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 mb-3 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-500/15 dark:text-orange-300">
                    <Star className="h-3 w-3 fill-current" />
                    {isHi ? 'बूथ प्रभारी' : 'Booth Incharge'}
                  </span>
                )}
                <h1 className="text-2xl font-semibold text-foreground leading-tight">
                  {getText(member.name)}
                </h1>
                <p className="text-base text-muted-foreground mt-1">
                  {getText(member.position)}
                </p>

                {(member.booth || member.constituency || member.state) && (
                  <p className="text-sm text-muted-foreground mt-3">
                    {[member.booth, member.constituency, member.state].filter(Boolean).join(' · ')}
                  </p>
                )}

                {formatAddress() && (
                  <p className="text-sm text-muted-foreground mt-3 flex items-start justify-center sm:justify-start gap-1.5">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5 opacity-60" />
                    <span>{formatAddress()}</span>
                  </p>
                )}

                {member.mobileNumber && (
                  <a
                    href={`tel:${member.mobileNumber}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-foreground mt-4 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    {member.mobileNumber}
                  </a>
                )}
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
