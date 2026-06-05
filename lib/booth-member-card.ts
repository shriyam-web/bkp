import { SITE_URL } from '@/lib/site';

export interface BoothCardMember {
  _id: string;
  name: { en: string; hi: string };
  position: { en: string; hi: string };
  image?: string | null;
  mobileNumber?: string;
  isBoothIncharge?: boolean;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
  };
}

export interface BoothCardContext {
  state: string;
  assembly: string;
  booth: string;
  locale: string;
}

export function buildMemberCardUrl(
  memberId: string,
  locale: string,
  origin?: string
) {
  const base = (origin || SITE_URL).replace(/\/$/, '');
  return `${base}/${locale}/booth-committee/member/${memberId}`;
}

export function isBoothIncharge(member: BoothCardMember) {
  if (member.isBoothIncharge) return true;
  const en = member.position?.en || '';
  const hi = member.position?.hi || '';
  return /incharge|in-charge|प्रभारी|इंचार्ज/i.test(en) || /incharge|in-charge|प्रभारी|इंचार्ज/i.test(hi);
}

function getText(
  obj: { en: string; hi: string },
  locale: string
) {
  return locale === 'hi' && obj.hi ? obj.hi : obj.en;
}

function formatAddress(member: BoothCardMember) {
  return [
    member.address?.street,
    member.address?.city,
    member.address?.state,
    member.address?.postalCode,
  ]
    .filter(Boolean)
    .join(', ');
}

export function buildMemberShareText(
  member: BoothCardMember,
  context: BoothCardContext,
  pageUrl: string
) {
  const isHi = context.locale === 'hi';
  const name = getText(member.name, context.locale);
  const role = getText(member.position, context.locale);
  const incharge = isBoothIncharge(member)
    ? isHi
      ? 'बूथ प्रभारी'
      : 'Booth Incharge'
    : role;
  const address = formatAddress(member);
  const lines = [
    'Bahujan Kranti Party',
    isHi ? 'बूथ स्तर समिति' : 'Booth Level Committee',
    `${context.booth} · ${context.assembly}`,
    `${context.state}`,
    '',
    `${name}`,
    incharge,
  ];
  if (address) lines.push(address);
  if (member.mobileNumber) lines.push(member.mobileNumber);
  lines.push('', pageUrl);
  return lines.join('\n');
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  for (let i = 0; i < words.length; i++) {
    const test = line + words[i] + ' ';
    if (ctx.measureText(test).width > maxWidth && i > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[i] + ' ';
      currentY += lineHeight;
    } else {
      line = test;
    }
  }
  if (line.trim()) ctx.fillText(line.trim(), x, currentY);
  return currentY;
}

export async function renderMemberCardPng(
  member: BoothCardMember,
  context: BoothCardContext
): Promise<Blob> {
  const W = 600;
  const H = 380;
  const scale = 2;
  const canvas = document.createElement('canvas');
  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');

  ctx.scale(scale, scale);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = '#ea580c';
  ctx.fillRect(0, 0, W, 8);

  ctx.fillStyle = '#111827';
  ctx.font = '600 20px "Noto Sans", sans-serif';
  ctx.fillText('Bahujan Kranti Party', 24, 40);

  ctx.fillStyle = '#6b7280';
  ctx.font = '400 13px "Noto Sans", sans-serif';
  const subtitle =
    context.locale === 'hi' ? 'बूथ स्तर समिति' : 'Booth Level Committee';
  ctx.fillText(subtitle, 24, 62);

  ctx.fillStyle = '#9ca3af';
  ctx.font = '400 12px "Noto Sans", sans-serif';
  ctx.fillText(
    `${context.booth} · ${context.assembly} · ${context.state}`,
    24,
    82
  );

  const photoX = 24;
  const photoY = 100;
  const photoW = 96;
  const photoH = 120;

  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(photoX, photoY, photoW, photoH);

  if (member.image) {
    try {
      const img = await loadImage(member.image);
      ctx.drawImage(img, photoX, photoY, photoW, photoH);
    } catch {
      ctx.fillStyle = '#d1d5db';
      ctx.font = '500 28px sans-serif';
      ctx.textAlign = 'center';
      const initials = getText(member.name, context.locale)
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
      ctx.fillText(initials, photoX + photoW / 2, photoY + photoH / 2 + 10);
      ctx.textAlign = 'left';
    }
  }

  const textX = 140;
  let textY = 118;

  if (isBoothIncharge(member)) {
    ctx.fillStyle = '#fff7ed';
    ctx.strokeStyle = '#ea580c';
    ctx.lineWidth = 1;
    const badge =
      context.locale === 'hi' ? 'बूथ प्रभारी' : 'Booth Incharge';
    const badgeW = ctx.measureText(badge).width + 20;
    ctx.fillRect(textX, textY - 14, badgeW, 24);
    ctx.strokeRect(textX, textY - 14, badgeW, 24);
    ctx.fillStyle = '#c2410c';
    ctx.font = '600 11px "Noto Sans", sans-serif';
    ctx.fillText(badge, textX + 10, textY + 2);
    textY += 28;
  }

  ctx.fillStyle = '#111827';
  ctx.font = '600 22px "Noto Sans", sans-serif';
  ctx.fillText(getText(member.name, context.locale), textX, textY);
  textY += 28;

  ctx.fillStyle = '#4b5563';
  ctx.font = '400 15px "Noto Sans", sans-serif';
  ctx.fillText(getText(member.position, context.locale), textX, textY);
  textY += 28;

  const address = formatAddress(member);
  if (address) {
    ctx.fillStyle = '#6b7280';
    ctx.font = '400 13px "Noto Sans", sans-serif';
    textY = wrapText(ctx, address, textX, textY, W - textX - 24, 18) + 10;
  }

  if (member.mobileNumber) {
    ctx.fillStyle = '#374151';
    ctx.font = '500 14px "Noto Sans", sans-serif';
    ctx.fillText(member.mobileNumber, textX, textY + 8);
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Failed to export'))),
      'image/png'
    );
  });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export async function downloadMemberCard(
  member: BoothCardMember,
  context: BoothCardContext
) {
  const blob = await renderMemberCardPng(member, context);
  const safeName = getText(member.name, context.locale).replace(/\s+/g, '-');
  downloadBlob(blob, `bkp-${safeName}.png`);
}

export async function shareMemberCard(
  member: BoothCardMember,
  context: BoothCardContext
): Promise<'shared' | 'copied'> {
  const cardUrl = buildMemberCardUrl(
    member._id,
    context.locale,
    typeof window !== 'undefined' ? window.location.origin : undefined
  );
  const title = getText(member.name, context.locale);
  const text = buildMemberShareText(member, context, cardUrl);

  if (navigator.share) {
    try {
      await navigator.share({ title, text, url: cardUrl });
      return 'shared';
    } catch (err) {
      if ((err as Error).name === 'AbortError') return 'copied';
    }
  }

  await navigator.clipboard.writeText(cardUrl);
  return 'copied';
}
