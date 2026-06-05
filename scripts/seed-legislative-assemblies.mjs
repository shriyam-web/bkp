/**
 * Seeds all Indian legislative assembly constituencies from public electoral data.
 * Source: HindustanTimesLabs/shapefiles (ECI-derived assembly constituency data)
 * Run: node scripts/seed-legislative-assemblies.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

// Load .env
const envPath = path.join(projectRoot, '.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq > 0) {
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

const BASE =
  'https://raw.githubusercontent.com/HindustanTimesLabs/shapefiles/master/state_ut';

const STATE_SOURCES = [
  { folder: 'andhrapradesh', state: 'Andhra Pradesh' },
  { folder: 'arunachalpradesh', state: 'Arunachal Pradesh' },
  { folder: 'assam', state: 'Assam' },
  { folder: 'bihar', state: 'Bihar' },
  { folder: 'chhattisgarh', state: 'Chhattisgarh' },
  { folder: 'delhi', state: 'Delhi' },
  { folder: 'goa', state: 'Goa' },
  { folder: 'gujarat', state: 'Gujarat' },
  { folder: 'haryana', state: 'Haryana' },
  { folder: 'himachalpradesh', state: 'Himachal Pradesh' },
  { folder: 'jammukashmir', state: 'Jammu and Kashmir' },
  { folder: 'jharkhand', state: 'Jharkhand' },
  { folder: 'karnataka', state: 'Karnataka' },
  { folder: 'kerala', state: 'Kerala' },
  { folder: 'madhyapradesh', state: 'Madhya Pradesh' },
  { folder: 'maharashtra', state: 'Maharashtra' },
  { folder: 'manipur', state: 'Manipur' },
  { folder: 'meghalaya', state: 'Meghalaya' },
  { folder: 'mizoram', state: 'Mizoram' },
  { folder: 'nagaland', state: 'Nagaland' },
  { folder: 'odisha', state: 'Odisha' },
  { folder: 'puducherry', state: 'Puducherry' },
  { folder: 'punjab', state: 'Punjab' },
  { folder: 'rajasthan', state: 'Rajasthan' },
  { folder: 'sikkim', state: 'Sikkim' },
  { folder: 'tamilnadu', state: 'Tamil Nadu' },
  { folder: 'telangana', state: 'Telangana' },
  { folder: 'tripura', state: 'Tripura' },
  { folder: 'uttarakhand', state: 'Uttarakhand' },
  { folder: 'uttarpradesh', state: 'Uttar Pradesh' },
  { folder: 'westbengal', state: 'West Bengal' },
];

const LegislativeAssemblySchema = new mongoose.Schema(
  {
    state: { type: String, required: true, index: true },
    name: { en: { type: String, required: true }, hi: { type: String, default: '' } },
    constituencyNumber: { type: Number, default: null },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);
LegislativeAssemblySchema.index({ state: 1, 'name.en': 1 }, { unique: true });

const LegislativeAssembly =
  mongoose.models.LegislativeAssembly ||
  mongoose.model('LegislativeAssembly', LegislativeAssemblySchema);

function parseCsv(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
  const nameIdx = headers.indexOf('ac_name');
  const noIdx = headers.indexOf('ac_no');
  const results = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    const name = (cols[nameIdx] || '').trim();
    const num = parseInt(cols[noIdx] || '0', 10);
    if (!name || !num) continue;
    results.push({ name, number: num });
  }
  return results;
}

function parseGeoJson(json, state) {
  if (!json?.features) return [];
  return json.features
    .map((f) => {
      const p = f.properties || {};
      const name = (p.AC_NAME || p.ac_name || '').trim();
      const num = parseInt(p.AC_NO || p.ac_no || '0', 10);
      return name && num ? { name, number: num } : null;
    })
    .filter(Boolean);
}

async function fetchConstituencies(folder, state) {
  const csvUrl = `${BASE}/${folder}/assembly/${folder}_AC.csv`;
  const jsonUrl = `${BASE}/${folder}/assembly/${folder}_AC.json`;

  try {
    const csvRes = await fetch(csvUrl);
    if (csvRes.ok) {
      const text = await csvRes.text();
      const rows = parseCsv(text);
      if (rows.length > 0) return rows;
    }
  } catch {
    /* try json */
  }

  try {
    const jsonRes = await fetch(jsonUrl);
    if (jsonRes.ok) {
      const json = await jsonRes.json();
      return parseGeoJson(json, state);
    }
  } catch {
    /* skip */
  }

  return [];
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI not set in .env');

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  const existing = await LegislativeAssembly.countDocuments();
  if (existing > 0) {
    console.log(`Clearing ${existing} existing records...`);
    await LegislativeAssembly.deleteMany({});
  }

  let total = 0;
  const summary = [];

  for (const { folder, state } of STATE_SOURCES) {
    process.stdout.write(`Fetching ${state}... `);
    const rows = await fetchConstituencies(folder, state);

    // Deduplicate by constituency number
    const seen = new Set();
    const unique = rows.filter((r) => {
      const key = `${r.number}-${r.name}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    if (unique.length === 0) {
      console.log('no data');
      continue;
    }

    const docs = unique.map((r) => ({
      state,
      name: { en: r.name, hi: '' },
      constituencyNumber: r.number,
      order: r.number,
    }));

    await LegislativeAssembly.insertMany(docs, { ordered: false }).catch((err) => {
      if (err.code !== 11000) throw err;
    });

    total += unique.length;
    summary.push({ state, count: unique.length });
    console.log(`${unique.length} assemblies`);
  }

  console.log('\n--- Seed complete ---');
  console.log(`Total assemblies seeded: ${total}`);
  for (const s of summary) {
    console.log(`  ${s.state}: ${s.count}`);
  }

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
