import { SITE_URL } from '@/lib/site';
import { formatMemberAddress } from '@/lib/format-address';

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

const PLEDGE_TEXT =
  'हम घोषणा करते हैं बहुजन क्रांति पार्टी (मार्क्सवाद अंबेडकरवाद) समाज में सामाजिक आर्थिक विषमता को समाप्त करके समाज के हर व्यक्ति को समानता के स्तर पर पहुंचना। कोई भी व्यक्ति बिना श्रम के नहीं खाएगा, हर किसी को श्रम करना होगा। मशीन आदि से उत्पादन होगा उसे समाज के सभी व्यक्तियों की हिस्सेदारी होगी। अंधविश्वास, आडंबर के नाम पर कोई शोषण नहीं कर सकेगा। धार्मिक उन्माद फैलाकर कोई जनता में कोई भी विघटन नहीं पैदा करेगा। व्यक्तिगत गरिमा के साथ सामाजिक आर्थिक राजनैतिक एवं सांस्कृतिक स्तर पर व्यवहारिक रूप से सभी बराबर होंगे, कोई छोटा व बड़ा नहीं होगा। ईमानदारी नैतिकता और पारदर्शता हमारी पार्टी के अलंकार होंगे। नए और बेहतर किस्म के इस समाज को समाजवादी समाज कहते हैं इस प्रकार के समाज की स्थापना करना ही डॉ. कार्लमार्क्स व डॉ. भीमराव अंबेडकर जी का सपना था। इसकी स्थापना किए बगैर मानव समाज एक सुखी, समृद्ध समाज नहीं बन सकता है जीवन की भारी से भारी कीमत देकर भी ऐसे समाज की स्थापना महंगी नहीं है। आओ हम सब प्राण पर से इस काम में जुट जाएं।';

const FONT = '"Noto Sans Devanagari", "Noto Sans", Georgia, serif';

const C = {
  white: '#ffffff',
  ink: '#1a1523',
  inkSoft: '#3f3a47',
  muted: '#6b6570',
  line: '#e8e2d9',
  crimson: '#b91c1c',
  crimsonDeep: '#7f1d1d',
  gold: '#b45309',
  goldLite: '#d4a017',
  cream: '#faf7f2',
  photoBg: '#f0ebe3',
};

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
  return (
    /incharge|in-charge|प्रभारी|इंचार्ज/i.test(en) ||
    /incharge|in-charge|प्रभारी|इंचार्ज/i.test(hi)
  );
}

function getText(obj: { en: string; hi: string }, locale: string) {
  return locale === 'hi' && obj.hi ? obj.hi : obj.en;
}

function formatAddress(member: BoothCardMember) {
  return formatMemberAddress(member.address);
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

function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  font: string
): string[] {
  ctx.font = font;
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [''];
}

function drawWrapped(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  font: string
) {
  const lines = wrapLines(ctx, text, maxWidth, font);
  ctx.font = font;
  for (const line of lines) {
    ctx.fillText(line, x, y);
    y += lineHeight;
  }
  return y;
}

function drawCornerOrnament(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  flipX: boolean,
  flipY: boolean
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
  ctx.strokeStyle = C.goldLite;
  ctx.lineWidth = 1.25;
  ctx.beginPath();
  ctx.moveTo(0, size);
  ctx.lineTo(0, 0);
  ctx.lineTo(size, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(4, size - 4);
  ctx.lineTo(4, 4);
  ctx.lineTo(size - 4, 4);
  ctx.stroke();
  ctx.restore();
}

function drawPhotoFrame(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  // Soft shadow plate
  ctx.fillStyle = 'rgba(26, 21, 35, 0.06)';
  ctx.fillRect(x - 2, y + 4, w + 8, h + 4);
  // Outer gold frame
  ctx.strokeStyle = C.goldLite;
  ctx.lineWidth = 3.5;
  ctx.strokeRect(x - 7, y - 7, w + 14, h + 14);
  // Mid white gap
  ctx.strokeStyle = C.white;
  ctx.lineWidth = 3;
  ctx.strokeRect(x - 4, y - 4, w + 8, h + 8);
  // Inner crimson rule
  ctx.strokeStyle = C.crimson;
  ctx.lineWidth = 1.75;
  ctx.strokeRect(x - 1.5, y - 1.5, w + 3, h + 3);
  // Soft fill behind photo
  ctx.fillStyle = C.photoBg;
  ctx.fillRect(x, y, w, h);
}

function drawSeal(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number
) {
  ctx.save();
  ctx.strokeStyle = C.goldLite;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, r - 4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = C.crimsonDeep;
  ctx.font = `700 ${Math.round(r * 0.55)}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('BKP', cx, cy);
  ctx.textBaseline = 'alphabetic';
  ctx.restore();
}

export async function renderMemberCardPng(
  member: BoothCardMember,
  context: BoothCardContext
): Promise<Blob> {
  const W = 780;
  const OUTER = 18;
  const PAD = 40;
  const scale = 2.5;
  const CONTENT_W = W - PAD * 2;
  const isHi = context.locale === 'hi';

  const measure = document.createElement('canvas').getContext('2d');
  if (!measure) throw new Error('Canvas not supported');

  const pledgeFont = `400 13.5px ${FONT}`;
  const pledgeLineH = 21;
  const pledgeMaxW = CONTENT_W;
  const pledgeLines = wrapLines(measure, PLEDGE_TEXT, pledgeMaxW, pledgeFont);
  const pledgeBlockH = 52 + pledgeLines.length * pledgeLineH + 36;

  const photoW = 220;
  const photoH = 275;
  const headerH = 118;
  const bodyTop = headerH + 8;
  const bodyH = Math.max(photoH + 16, 290);
  const dividerH = 28;
  const H = OUTER + headerH + bodyH + dividerH + pledgeBlockH + OUTER + 8;

  const canvas = document.createElement('canvas');
  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');

  ctx.scale(scale, scale);

  // Full white card
  ctx.fillStyle = C.white;
  ctx.fillRect(0, 0, W, H);

  // Outer premium border
  ctx.strokeStyle = C.crimsonDeep;
  ctx.lineWidth = 2.5;
  ctx.strokeRect(OUTER / 2, OUTER / 2, W - OUTER, H - OUTER);

  // Fine inner border
  ctx.strokeStyle = C.goldLite;
  ctx.lineWidth = 1;
  ctx.strokeRect(OUTER / 2 + 5, OUTER / 2 + 5, W - OUTER - 10, H - OUTER - 10);

  // Corner ornaments
  const orn = 22;
  drawCornerOrnament(ctx, OUTER + 10, OUTER + 10, orn, false, false);
  drawCornerOrnament(ctx, W - OUTER - 10, OUTER + 10, orn, true, false);
  drawCornerOrnament(ctx, OUTER + 10, H - OUTER - 10, orn, false, true);
  drawCornerOrnament(ctx, W - OUTER - 10, H - OUTER - 10, orn, true, true);

  // Top crimson + gold ribbon
  ctx.fillStyle = C.crimson;
  ctx.fillRect(OUTER + 8, OUTER + 8, W - OUTER * 2 - 16, 5);
  ctx.fillStyle = C.goldLite;
  ctx.fillRect(OUTER + 8, OUTER + 13, W - OUTER * 2 - 16, 1.5);

  // Brand header
  let y = OUTER + 42;
  ctx.textAlign = 'center';
  ctx.fillStyle = C.crimsonDeep;
  ctx.font = `700 11px ${FONT}`;
  ctx.fillText(
    isHi ? 'आधिकारिक सदस्य पहचान पत्र' : 'OFFICIAL MEMBER IDENTITY CARD',
    W / 2,
    y
  );

  y += 26;
  ctx.fillStyle = C.ink;
  ctx.font = `700 28px ${FONT}`;
  ctx.fillText(
    isHi ? 'बहुजन क्रान्ति पार्टी' : 'Bahujan Kranti Party',
    W / 2,
    y
  );

  y += 18;
  // Gold underline flourish
  const lineW = 120;
  ctx.strokeStyle = C.goldLite;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(W / 2 - lineW / 2, y);
  ctx.lineTo(W / 2 + lineW / 2, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(W / 2, y, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = C.crimson;
  ctx.fill();

  y += 20;
  ctx.fillStyle = C.gold;
  ctx.font = `600 13px ${FONT}`;
  ctx.fillText(
    isHi ? 'बूथ स्तर समिति' : 'Booth Level Committee',
    W / 2,
    y
  );

  y += 18;
  ctx.fillStyle = C.muted;
  ctx.font = `400 12px ${FONT}`;
  ctx.fillText(
    `${context.booth}  ·  ${context.assembly}  ·  ${context.state}`,
    W / 2,
    y
  );
  ctx.textAlign = 'left';

  // Body: photo + details
  const photoX = PAD + 4;
  const photoY = bodyTop + 10;
  drawPhotoFrame(ctx, photoX, photoY, photoW, photoH);

  if (member.image) {
    try {
      const img = await loadImage(member.image);
      ctx.save();
      ctx.beginPath();
      ctx.rect(photoX, photoY, photoW, photoH);
      ctx.clip();
      ctx.drawImage(img, photoX, photoY, photoW, photoH);
      ctx.restore();
    } catch {
      ctx.fillStyle = C.muted;
      ctx.font = `600 40px ${FONT}`;
      ctx.textAlign = 'center';
      const initials = getText(member.name, context.locale)
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
      ctx.fillText(initials, photoX + photoW / 2, photoY + photoH / 2 + 14);
      ctx.textAlign = 'left';
    }
  } else {
    ctx.fillStyle = C.muted;
    ctx.font = `600 40px ${FONT}`;
    ctx.textAlign = 'center';
    const initials = getText(member.name, context.locale)
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    ctx.fillText(initials, photoX + photoW / 2, photoY + photoH / 2 + 14);
    ctx.textAlign = 'left';
  }

  const textX = photoX + photoW + 32;
  const textMaxW = W - textX - PAD;
  let textY = photoY + 36;

  if (isBoothIncharge(member)) {
    const badge = isHi ? 'बूथ प्रभारी' : 'BOOTH INCHARGE';
    ctx.font = `700 11px ${FONT}`;
    const badgeW = ctx.measureText(badge).width + 24;
    ctx.fillStyle = C.crimson;
    ctx.fillRect(textX, textY - 12, badgeW, 22);
    ctx.fillStyle = C.white;
    ctx.fillText(badge, textX + 12, textY + 3);
    textY += 34;
  }

  ctx.fillStyle = C.ink;
  ctx.font = `700 30px ${FONT}`;
  textY = drawWrapped(
    ctx,
    getText(member.name, context.locale),
    textX,
    textY,
    textMaxW,
    34,
    `700 30px ${FONT}`
  );
  textY += 6;

  ctx.fillStyle = C.crimson;
  ctx.font = `600 16px ${FONT}`;
  textY = drawWrapped(
    ctx,
    getText(member.position, context.locale),
    textX,
    textY,
    textMaxW,
    22,
    `600 16px ${FONT}`
  );
  textY += 16;

  // Detail rows
  const drawDetail = (label: string, value: string) => {
    ctx.fillStyle = C.gold;
    ctx.font = `700 10px ${FONT}`;
    ctx.fillText(label.toUpperCase(), textX, textY);
    textY += 16;
    ctx.fillStyle = C.inkSoft;
    textY = drawWrapped(ctx, value, textX, textY, textMaxW, 20, `500 14px ${FONT}`);
    textY += 14;
  };

  const address = formatAddress(member);
  if (address) drawDetail(isHi ? 'पता' : 'Address', address);
  if (member.mobileNumber) drawDetail(isHi ? 'मोबाइल' : 'Mobile', member.mobileNumber);

  // Subtle official seal in the lower-right of the body
  drawSeal(ctx, W - PAD - 36, photoY + photoH - 28, 28);

  // Divider before pledge
  const pledgeStart = bodyTop + bodyH;
  ctx.strokeStyle = C.line;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(PAD, pledgeStart + 4);
  ctx.lineTo(W - PAD, pledgeStart + 4);
  ctx.stroke();

  // Centered crimson diamond on divider
  ctx.fillStyle = C.crimson;
  ctx.beginPath();
  ctx.moveTo(W / 2, pledgeStart);
  ctx.lineTo(W / 2 + 5, pledgeStart + 5);
  ctx.lineTo(W / 2, pledgeStart + 10);
  ctx.lineTo(W / 2 - 5, pledgeStart + 5);
  ctx.closePath();
  ctx.fill();

  // घोषणा — white background, high-contrast text
  let pledgeY = pledgeStart + 36;
  ctx.textAlign = 'center';
  ctx.fillStyle = C.crimsonDeep;
  ctx.font = `700 15px ${FONT}`;
  ctx.fillText('घोषणा  /  PLEDGE', W / 2, pledgeY);

  pledgeY += 8;
  ctx.strokeStyle = C.goldLite;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 50, pledgeY);
  ctx.lineTo(W / 2 + 50, pledgeY);
  ctx.stroke();

  pledgeY += 22;
  ctx.textAlign = 'left';
  ctx.fillStyle = C.ink; // deep near-black for clear reading on white
  ctx.font = pledgeFont;
  for (const line of pledgeLines) {
    ctx.fillText(line, PAD, pledgeY);
    pledgeY += pledgeLineH;
  }

  // Footer micro line
  ctx.fillStyle = C.muted;
  ctx.font = `400 10px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.fillText(
    isHi
      ? 'बहुजन क्रान्ति पार्टी · मार्क्सवाद – अम्बेडकरवाद'
      : 'Bahujan Kranti Party · Marxwaad – Ambedkarwaad',
    W / 2,
    H - OUTER - 14
  );
  ctx.textAlign = 'left';

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
