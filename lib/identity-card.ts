import { formatDate } from '@/lib/utils';
import { formatMemberAddress } from '@/lib/format-address';
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
  photoBg: '#f0ebe3',
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

function buildDetailFields(member: IdentityCardMember): DetailField[] {
  const fields: DetailField[] = [];

  if (member._id) fields.push({ label: 'ID', value: member._id });
  if (member.mobileNumber) fields.push({ label: 'PHONE', value: member.mobileNumber });
  if (member.email) fields.push({ label: 'EMAIL', value: member.email });
  if (member.state) fields.push({ label: 'STATE', value: member.state });
  if (member.district) fields.push({ label: 'DISTRICT', value: member.district });
  if (member.constituency) fields.push({ label: 'CONSTITUENCY', value: member.constituency });
  if (member.booth) fields.push({ label: 'BOOTH', value: member.booth });

  if (member.address) {
    const fullAddress = formatMemberAddress(member.address, { includeCountry: true });
    if (fullAddress) {
      fields.push({ label: 'ADDRESS', value: fullAddress });
    }
  }

  return fields;
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
  ctx.fillStyle = 'rgba(26, 21, 35, 0.06)';
  ctx.fillRect(x - 2, y + 4, w + 8, h + 4);
  ctx.strokeStyle = C.goldLite;
  ctx.lineWidth = 3.5;
  ctx.strokeRect(x - 7, y - 7, w + 14, h + 14);
  ctx.strokeStyle = C.white;
  ctx.lineWidth = 3;
  ctx.strokeRect(x - 4, y - 4, w + 8, h + 8);
  ctx.strokeStyle = C.crimson;
  ctx.lineWidth = 1.75;
  ctx.strokeRect(x - 1.5, y - 1.5, w + 3, h + 3);
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

function measureDetailBlock(
  ctx: CanvasRenderingContext2D,
  fields: DetailField[],
  maxW: number
) {
  let h = 0;
  for (const field of fields) {
    const valueLines = wrapLines(ctx, field.value, maxW, `500 14px ${FONT}`);
    h += 16 + valueLines.length * 20 + 14;
  }
  return h;
}

export async function generateIdentityCardBlob(
  memberInput: IdentityCardMember
): Promise<Blob | null> {
  const member = normalizeMember(memberInput);
  const name = getName(member);
  const position = getPosition(member);
  const bio = getBio(member);

  const W = 780;
  const OUTER = 18;
  const PAD = 40;
  const scale = 2.5;
  const CONTENT_W = W - PAD * 2;

  const measure = document.createElement('canvas').getContext('2d');
  if (!measure) return null;

  const pledgeFont = `400 13.5px ${FONT}`;
  const pledgeLineH = 21;
  const pledgeLines = wrapLines(measure, PLEDGE_TEXT, CONTENT_W, pledgeFont);
  const pledgeBlockH = 52 + pledgeLines.length * pledgeLineH + 36;

  const detailFields = buildDetailFields(member);
  const photoW = 220;
  const photoH = 275;
  const textX = PAD + 4 + photoW + 32;
  const textMaxW = W - textX - PAD;

  const nameLines = wrapLines(measure, name.en, textMaxW, `700 30px ${FONT}`);
  const nameHiLines = name.hi
    ? wrapLines(measure, name.hi, textMaxW, `600 15px ${FONT}`)
    : [];
  const posLines = wrapLines(
    measure,
    `${position.en}${position.hi ? ` · ${position.hi}` : ''}`,
    textMaxW,
    `600 15px ${FONT}`
  );

  // Fields shown beside photo vs below
  const sideFields = detailFields.slice(0, 4);
  const belowFields = detailFields.slice(4);

  const sideDetailsH = measureDetailBlock(measure, sideFields, textMaxW);
  const bodyContentH =
    36 +
    nameLines.length * 34 +
    6 +
    nameHiLines.length * 20 +
    8 +
    posLines.length * 22 +
    16 +
    sideDetailsH;
  const bodyH = Math.max(photoH + 24, bodyContentH + 20);

  const belowMaxW = CONTENT_W;
  const belowDetailsH = measureDetailBlock(measure, belowFields, belowMaxW);

  const bioText = [bio.en, bio.hi].filter(Boolean).join(' · ');
  const bioLines = bioText
    ? wrapLines(measure, bioText, CONTENT_W, `400 13.5px ${FONT}`)
    : [];
  const bioH = bioLines.length > 0 ? 28 + bioLines.length * 20 + 16 : 0;

  const headerH = 118;
  const bodyTop = OUTER + headerH + 8;
  const belowBlockH =
    (belowFields.length > 0 || bioLines.length > 0 ? 24 : 0) + belowDetailsH + bioH;
  const dividerH = 28;
  const H =
    OUTER +
    headerH +
    bodyH +
    belowBlockH +
    dividerH +
    pledgeBlockH +
    OUTER +
    8;

  const canvas = document.createElement('canvas');
  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.scale(scale, scale);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  // Full white card
  ctx.fillStyle = C.white;
  ctx.fillRect(0, 0, W, H);

  // Outer premium border
  ctx.strokeStyle = C.crimsonDeep;
  ctx.lineWidth = 2.5;
  ctx.strokeRect(OUTER / 2, OUTER / 2, W - OUTER, H - OUTER);

  // Fine inner gold border
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
  ctx.fillText('OFFICIAL MEMBER IDENTITY CARD', W / 2, y);

  y += 26;
  ctx.fillStyle = C.ink;
  ctx.font = `700 28px ${FONT}`;
  ctx.fillText('बहुजन क्रान्ति पार्टी', W / 2, y);

  y += 18;
  const flourishW = 120;
  ctx.strokeStyle = C.goldLite;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(W / 2 - flourishW / 2, y);
  ctx.lineTo(W / 2 + flourishW / 2, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(W / 2, y, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = C.crimson;
  ctx.fill();

  y += 20;
  ctx.fillStyle = C.gold;
  ctx.font = `600 13px ${FONT}`;
  ctx.fillText('Bahujan Kranti Party · Leadership ID', W / 2, y);

  y += 18;
  ctx.fillStyle = C.muted;
  ctx.font = `400 12px ${FONT}`;
  const scopeBits = [member.state, member.district, member.constituency, member.booth].filter(
    Boolean
  );
  ctx.fillText(
    scopeBits.length ? scopeBits.join('  ·  ') : 'Marxwaad – Ambedkarwaad',
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
      const initials = name.en
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
      ctx.fillText(initials || 'ID', photoX + photoW / 2, photoY + photoH / 2 + 14);
      ctx.textAlign = 'left';
    }
  } else {
    ctx.fillStyle = C.muted;
    ctx.font = `600 40px ${FONT}`;
    ctx.textAlign = 'center';
    const initials = name.en
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    ctx.fillText(initials || 'ID', photoX + photoW / 2, photoY + photoH / 2 + 14);
    ctx.textAlign = 'left';
  }

  let textY = photoY + 36;

  // Position badge
  const badge = (position.en || 'LEADERSHIP').toUpperCase().slice(0, 42);
  ctx.font = `700 11px ${FONT}`;
  const badgeW = Math.min(ctx.measureText(badge).width + 24, textMaxW);
  ctx.fillStyle = C.crimson;
  ctx.fillRect(textX, textY - 12, badgeW, 22);
  ctx.fillStyle = C.white;
  ctx.fillText(badge, textX + 12, textY + 3);
  textY += 34;

  ctx.fillStyle = C.ink;
  textY = drawWrapped(ctx, name.en, textX, textY, textMaxW, 34, `700 30px ${FONT}`);
  textY += 4;

  if (name.hi && name.hi !== name.en) {
    ctx.fillStyle = C.crimson;
    textY = drawWrapped(ctx, name.hi, textX, textY, textMaxW, 20, `600 15px ${FONT}`);
    textY += 6;
  }

  ctx.fillStyle = C.crimson;
  textY = drawWrapped(
    ctx,
    `${position.en}${position.hi && position.hi !== position.en ? ` · ${position.hi}` : ''}`,
    textX,
    textY,
    textMaxW,
    22,
    `600 15px ${FONT}`
  );
  textY += 16;

  const drawDetail = (label: string, value: string, x: number, maxW: number) => {
    ctx.fillStyle = C.gold;
    ctx.font = `700 10px ${FONT}`;
    ctx.fillText(label.toUpperCase(), x, textY);
    textY += 16;
    ctx.fillStyle = C.inkSoft;
    textY = drawWrapped(ctx, value, x, textY, maxW, 20, `500 14px ${FONT}`);
    textY += 14;
  };

  for (const field of sideFields) {
    drawDetail(field.label, field.value, textX, textMaxW);
  }

  drawSeal(ctx, W - PAD - 36, photoY + photoH - 28, 28);

  // Extra fields + bio below the photo row
  let belowY = bodyTop + bodyH;
  if (belowFields.length > 0 || bioLines.length > 0) {
    ctx.strokeStyle = C.line;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(PAD, belowY);
    ctx.lineTo(W - PAD, belowY);
    ctx.stroke();
    belowY += 24;
    textY = belowY;

    for (const field of belowFields) {
      drawDetail(field.label, field.value, PAD, CONTENT_W);
    }

    if (bioLines.length > 0) {
      ctx.fillStyle = C.gold;
      ctx.font = `700 10px ${FONT}`;
      ctx.fillText('BIOGRAPHY', PAD, textY);
      textY += 18;
      ctx.fillStyle = C.inkSoft;
      ctx.font = `400 13.5px ${FONT}`;
      for (const line of bioLines) {
        ctx.fillText(line, PAD, textY);
        textY += 20;
      }
      textY += 8;
    }
    belowY = textY;
  }

  // Divider before pledge
  const pledgeStart = belowY + (belowFields.length > 0 || bioLines.length > 0 ? 4 : 0);
  ctx.strokeStyle = C.line;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(PAD, pledgeStart + 4);
  ctx.lineTo(W - PAD, pledgeStart + 4);
  ctx.stroke();

  ctx.fillStyle = C.crimson;
  ctx.beginPath();
  ctx.moveTo(W / 2, pledgeStart);
  ctx.lineTo(W / 2 + 5, pledgeStart + 5);
  ctx.lineTo(W / 2, pledgeStart + 10);
  ctx.lineTo(W / 2 - 5, pledgeStart + 5);
  ctx.closePath();
  ctx.fill();

  // घोषणा — white, high-contrast
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
  ctx.fillStyle = C.ink;
  ctx.font = pledgeFont;
  for (const line of pledgeLines) {
    ctx.fillText(line, PAD, pledgeY);
    pledgeY += pledgeLineH;
  }

  ctx.fillStyle = C.muted;
  ctx.font = `400 10px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.fillText(
    `Bahujan Kranti Party · Marxwaad – Ambedkarwaad · ${formatDate(new Date())}`,
    W / 2,
    H - OUTER - 14
  );
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
