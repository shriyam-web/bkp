import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale } from '@/i18n.config';
import { TranslationProvider } from '@/lib/TranslationContext';
import BoothMemberCardPublic from '@/app/booth-member-card-public';
import { getBoothMemberById } from '@/lib/booth-member';
import { isBoothIncharge } from '@/lib/booth-member-card';
import { absoluteUrl } from '@/lib/site';
import en from '@/public/locales/en.json';
import hi from '@/public/locales/hi.json';

const translations = { en, hi };

export const dynamic = 'force-dynamic';

interface Props {
  params: { locale: Locale; id: string };
}

function memberDisplayName(
  member: { name: { en: string; hi: string } },
  locale: Locale
) {
  return locale === 'hi' && member.name.hi ? member.name.hi : member.name.en;
}

function memberDisplayPosition(
  member: { position: { en: string; hi: string } },
  locale: Locale
) {
  return locale === 'hi' && member.position.hi
    ? member.position.hi
    : member.position.en;
}

function ogImageUrl(image?: string | null) {
  if (image && image.startsWith('http')) return image;
  return absoluteUrl('/flag.png');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const member = await getBoothMemberById(params.id);
  if (!member) {
    return { title: 'Member Not Found | Bahujan Kranti Party' };
  }

  const locale = params.locale;
  const isHi = locale === 'hi';
  const name = memberDisplayName(member, locale);
  const position = memberDisplayPosition(member, locale);
  const roleLabel = isBoothIncharge(member)
    ? isHi
      ? 'बूथ प्रभारी'
      : 'Booth Incharge'
    : position;

  const location = [member.booth, member.constituency, member.state]
    .filter(Boolean)
    .join(' · ');

  const description = location
    ? `${roleLabel} — ${location} | Bahujan Kranti Party`
    : `${roleLabel} | Bahujan Kranti Party`;

  const pageUrl = absoluteUrl(`/${locale}/booth-committee/member/${params.id}`);
  const image = ogImageUrl(member.image);

  return {
    title: `${name} | Bahujan Kranti Party`,
    description,
    openGraph: {
      type: 'profile',
      locale: isHi ? 'hi_IN' : 'en_IN',
      url: pageUrl,
      siteName: isHi ? 'बहुजन क्रांति पार्टी' : 'Bahujan Kranti Party',
      title: name,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: name,
      description,
      images: [image],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function BoothMemberCardPage({ params }: Props) {
  const locale = params.locale;
  const member = await getBoothMemberById(params.id);

  if (!member) notFound();

  const currentTranslations = translations[locale] || translations.en;

  return (
    <TranslationProvider locale={locale} translations={currentTranslations}>
      <BoothMemberCardPublic member={member} />
    </TranslationProvider>
  );
}
