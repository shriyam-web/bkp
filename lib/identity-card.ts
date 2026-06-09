import { formatDate } from '@/lib/utils';
import jsPDF from 'jspdf';

export interface IdentityCardMember {
  _id: string;
  name: { en: string; hi: string } | string;
  position: { en: string; hi: string } | string;
  image?: string | null;
  bio?: { en: string; hi: string } | string | null;
  mobileNumber?: string;
  email?: string;
  state?: string;
  district?: string;
  constituency?: string;
  booth?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
}

const PLEDGE_TEXT =
  'हम घोषणा करते हैं बहुजन क्रांति पार्टी (मार्क्सवाद अंबेडकरवाद) समाज में सामाजिक आर्थिक विषमता को समाप्त करके समाज के हर व्यक्ति को समानता के स्तर पर पहुंचना। कोई भी व्यक्ति बिना श्रम के नहीं खाएगा, हर किसी को श्रम करना होगा। मशीन आदि से उत्पादन होगा उसे समाज के सभी व्यक्तियों की हिस्सेदारी होगी। अंधविश्वास, आडंबर के नाम पर कोई शोषण नहीं कर सकेगा। धार्मिक उन्माद फैलाकर कोई जनता में कोई भी विघटन नहीं पैदा करेगा। व्यक्तिगत गरिमा के साथ सामाजिक आर्थिक राजनैतिक एवं सांस्कृतिक स्तर पर व्यवहारिक रूप से सभी बराबर होंगे, कोई छोटा व बड़ा नहीं होगा। ईमानदारी नैतिकता और पारदर्शता हमारी पार्टी के अलंकार होंगे। नए और बेहतर किस्म के इस समाज को समाजवादी समाज कहते हैं इस प्रकार के समाज की स्थापना करना ही डॉ. कार्लमार्क्स व डॉ. भीमराव अंबेडकर जी का सपना था। इसकी स्थापना किए बगैर मानव समाज एक सुखी, समृद्ध समाज नहीं बन सकता है जीवन की भारी से भारी कीमत देकर भी ऐसे समाज की स्थापना महंगी नहीं है। आओ हम सब प्राण पर से इस काम में जुट जाएं।';

const SCALE = 2;
const BASE_W = 540;
const W = BASE_W * SCALE;
const PAD = 36 * SCALE;
const CONTENT_W = W - PAD * 2;
const FONT = 'Arial, "Noto Sans Devanagari", sans-serif';

const COLORS = {
  red: '#dc2626',
  blue: '#2563eb',
  footer: '#0f172a',
  yellow: '#FACC15',
  yellowLabel: '#FDE047',
  muted: '#6b7280',
  text: '#1f2937',
  white: '#ffffff',
  photoBg: '#e5e7eb',
};

function getName(member: IdentityCardMember) {
  if (typeof member.name === 'string') {
    return { en: member.name, hi: member.name };
  }
  return member.name;
}

function getPosition(member: IdentityCardMember) {
  if (typeof member.position === 'string') {
    return { en: member.position, hi: member.position };
  }
  return member.position;
}

function getBio(member: IdentityCardMember) {
  if (!member.bio) return { en: '', hi: '' };
  if (typeof member.bio === 'string') {
    return { en: member.bio, hi: member.bio };
  }
  return member.bio;
}

function clean(value?: string | null) {
  const v = value?.trim();
  return v || '';
}

function normalizeMember(raw: IdentityCardMember): IdentityCardMember {
  const id =
    raw._id && typeof raw._id === 'object' && 'toString' in (raw._id as object)
      ? (raw._id as { toString(): string }).toString()
      : clean(String(raw._id ?? ''));

  const addr = raw.address;
  const address =
    addr && typeof addr === 'object'
      ? {
          street: clean(addr.street),
          city: clean(addr.city),
          state: clean(addr.state),
          postalCode: clean(addr.postalCode),
          country: clean(addr.country),
        }
      : undefined;

  const hasAddress = address && Object.values(address).some(Boolean);

  return {
    ...raw,
    _id: id,
    mobileNumber: clean(raw.mobileNumber),
    email: clean(raw.email),
    state: clean(raw.state),
    district: clean(raw.district),
    constituency: clean(raw.constituency),
    booth: clean(raw.booth),
    address: hasAddress ? address : undefined,
  };
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

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

type DetailField = { label: string; value: string };

function buildDetailFields(member: IdentityCardMember, position: { en: string; hi: string }): DetailField[] {
  const fields: DetailField[] = [
    { label: 'POSITION', value: `${position.en} (${position.hi})` },
  ];

  if (member._id) fields.push({ label: 'ID', value: member._id });
  if (member.mobileNumber) fields.push({ label: 'PHONE', value: member.mobileNumber });
  if (member.email) fields.push({ label: 'EMAIL', value: member.email });
  if (member.state) fields.push({ label: 'STATE', value: member.state });
  if (member.district) fields.push({ label: 'DISTRICT', value: member.district });
  if (member.constituency) fields.push({ label: 'CONSTITUENCY', value: member.constituency });
  if (member.booth) fields.push({ label: 'BOOTH', value: member.booth });

  if (member.address) {
    const parts = [
      member.address.street,
      member.address.city,
      member.address.state,
      member.address.postalCode ? `PIN: ${member.address.postalCode}` : '',
      member.address.country,
    ].filter(Boolean);
    if (parts.length) {
      fields.push({ label: 'ADDRESS', value: parts.join(', ') });
    }
  }

  return fields;
}

function measureFieldBlock(
  ctx: CanvasRenderingContext2D,
  fields: DetailField[],
  bioLines: string[],
  pledgeLines: string[]
) {
  const labelFont = `bold ${13 * SCALE}px ${FONT}`;
  const valueFont = `${15 * SCALE}px ${FONT}`;
  const lineGap = 22 * SCALE;
  const fieldGap = 12 * SCALE;

  let detailsH = 0;
  for (const field of fields) {
    const valueLines = wrapLines(ctx, field.value, CONTENT_W, valueFont);
    detailsH += 18 * SCALE + valueLines.length * lineGap + fieldGap;
  }

  const bioH =
    bioLines.length > 0 ? 28 * SCALE + bioLines.length * 24 * SCALE + 20 * SCALE : 0;
  const pledgeH = 50 * SCALE + pledgeLines.length * 26 * SCALE + 50 * SCALE;

  const headerH = 88 * SCALE;
  const photoW = Math.round(CONTENT_W * 0.28);
  const photoH = Math.round(photoW * 1.15);
  const nameH = 72 * SCALE;

  return headerH + photoH + nameH + detailsH + bioH + pledgeH;
}

export async function generateIdentityCardBlob(
  memberInput: IdentityCardMember
): Promise<Blob | null> {
  const member = normalizeMember(memberInput);
  const name = getName(member);
  const position = getPosition(member);
  const bio = getBio(member);

  const measureCanvas = document.createElement('canvas');
  const measureCtx = measureCanvas.getContext('2d');
  if (!measureCtx) return null;

  const pledgeLines = wrapLines(measureCtx, PLEDGE_TEXT, CONTENT_W, `${14 * SCALE}px ${FONT}`);
  const bioText = [bio.en, bio.hi].filter(Boolean).join(' · ');
  const bioLines = bioText
    ? wrapLines(measureCtx, bioText, CONTENT_W, `${14 * SCALE}px ${FONT}`)
    : [];
  const detailFields = buildDetailFields(member, position);
  const H = measureFieldBlock(measureCtx, detailFields, bioLines, pledgeLines);

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  ctx.fillStyle = COLORS.white;
  ctx.fillRect(0, 0, W, H);

  const gradient = ctx.createLinearGradient(0, 0, W, 0);
  gradient.addColorStop(0, COLORS.red);
  gradient.addColorStop(1, COLORS.blue);
  ctx.fillStyle = gradient;
  const headerH = 88 * SCALE;
  ctx.fillRect(0, 0, W, headerH);

  ctx.fillStyle = COLORS.white;
  ctx.font = `bold ${18 * SCALE}px ${FONT}`;
  ctx.fillText('बहुजन क्रांति पार्टी', PAD, 34 * SCALE);
  ctx.font = `${13 * SCALE}px ${FONT}`;
  ctx.fillText('Bahujan Kranti Party · Digital ID', PAD, 56 * SCALE);

  let y = headerH + 16 * SCALE;
  const photoW = Math.round(CONTENT_W * 0.28);
  const photoH = Math.round(photoW * 1.15);
  const photoX = PAD + Math.round((CONTENT_W - photoW) / 2);

  ctx.fillStyle = COLORS.photoBg;
  ctx.fillRect(photoX, y, photoW, photoH);
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2;
  ctx.strokeRect(photoX, y, photoW, photoH);

  if (member.image) {
    try {
      const img = await loadImage(member.image);
      ctx.drawImage(img, photoX, y, photoW, photoH);
    } catch {
      ctx.fillStyle = COLORS.muted;
      ctx.font = `${20 * SCALE}px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.fillText('Photo', photoX + photoW / 2, y + photoH / 2);
      ctx.textAlign = 'left';
    }
  } else {
    ctx.fillStyle = COLORS.muted;
    ctx.font = `${20 * SCALE}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.fillText('Photo', photoX + photoW / 2, y + photoH / 2);
    ctx.textAlign = 'left';
  }

  y += photoH + 20 * SCALE;

  ctx.fillStyle = COLORS.red;
  ctx.font = `bold ${22 * SCALE}px ${FONT}`;
  ctx.fillText(name.en, PAD, y);
  ctx.fillStyle = COLORS.blue;
  ctx.font = `bold ${18 * SCALE}px ${FONT}`;
  ctx.fillText(name.hi, PAD, y + 28 * SCALE);
  y += 52 * SCALE;

  const labelFont = `bold ${13 * SCALE}px ${FONT}`;
  const valueFont = `${15 * SCALE}px ${FONT}`;
  const lineGap = 22 * SCALE;

  for (const field of detailFields) {
    ctx.fillStyle = COLORS.red;
    ctx.font = labelFont;
    ctx.fillText(field.label, PAD, y);
    y += 18 * SCALE;

    ctx.fillStyle = COLORS.text;
    ctx.font = valueFont;
    const valueLines = wrapLines(ctx, field.value, CONTENT_W, valueFont);
    for (const line of valueLines) {
      ctx.fillText(line, PAD, y);
      y += lineGap;
    }
    y += 12 * SCALE;
  }

  if (bioLines.length > 0) {
    ctx.fillStyle = COLORS.text;
    ctx.font = `bold ${14 * SCALE}px ${FONT}`;
    ctx.fillText('BIOGRAPHY', PAD, y);
    y += 24 * SCALE;
    ctx.fillStyle = '#374151';
    ctx.font = `${14 * SCALE}px ${FONT}`;
    for (const line of bioLines) {
      ctx.fillText(line, PAD, y);
      y += 24 * SCALE;
    }
    y += 12 * SCALE;
  }

  const footerY = y;
  const footerH = H - footerY;

  ctx.fillStyle = COLORS.footer;
  ctx.fillRect(0, footerY, W, footerH);

  ctx.fillStyle = COLORS.yellowLabel;
  ctx.font = `bold ${14 * SCALE}px ${FONT}`;
  ctx.fillText('घोषणा / PLEDGE', PAD, footerY + 32 * SCALE);

  ctx.fillStyle = COLORS.yellow;
  ctx.font = `${14 * SCALE}px ${FONT}`;
  let pledgeY = footerY + 54 * SCALE;
  for (const line of pledgeLines) {
    ctx.fillText(line, PAD, pledgeY);
    pledgeY += 26 * SCALE;
  }

  ctx.fillStyle = COLORS.muted;
  ctx.font = `${11 * SCALE}px ${FONT}`;
  ctx.textAlign = 'right';
  ctx.fillText(`Generated: ${formatDate(new Date())}`, W - PAD, H - 16 * SCALE);
  ctx.textAlign = 'left';

  const canvasImage = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [W, H],
  });

  pdf.addImage(canvasImage, 'PNG', 0, 0, W, H);
  const pdfBlob = pdf.output('blob');
  if (pdfBlob instanceof Promise) {
    return pdfBlob;
  }
  return pdfBlob;
}
