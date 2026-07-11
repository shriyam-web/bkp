/**
 * Canonical booth label helpers.
 * Booths are free-text ("310 Milkya Pappri"); small entry differences
 * must not create duplicate list rows.
 */

/** Strip invisible chars, collapse whitespace, NFC-normalize. */
export function normalizeBoothLabel(value?: string | null): string {
  if (!value) return '';
  return value
    .normalize('NFC')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/\u00A0/g, ' ')
    .replace(/[\s\u00A0]+/g, ' ')
    .trim();
}

/** Case-insensitive identity key for merging near-duplicates. */
export function boothKey(value?: string | null): string {
  return normalizeBoothLabel(value).toLocaleLowerCase('en');
}

export function sameBooth(a?: string | null, b?: string | null): boolean {
  const ka = boothKey(a);
  return Boolean(ka) && ka === boothKey(b);
}

export function compareBoothLabels(a: string, b: string): number {
  const numA = parseInt(a, 10);
  const numB = parseInt(b, 10);
  const hasA = !Number.isNaN(numA);
  const hasB = !Number.isNaN(numB);
  if (hasA && hasB && numA !== numB) return numA - numB;
  if (hasA && !hasB) return -1;
  if (!hasA && hasB) return 1;
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

/** Unique booth labels from raw member values, merged by boothKey. */
export function uniqueBoothLabels(
  booths: Array<string | null | undefined>
): string[] {
  const map = new Map<string, string>();
  for (const raw of booths) {
    const label = normalizeBoothLabel(raw);
    if (!label) continue;
    const key = boothKey(label);
    if (!map.has(key)) map.set(key, label);
  }
  return Array.from(map.values()).sort(compareBoothLabels);
}

/**
 * Pick a canonical display string per boothKey (most frequent wins).
 * Used when healing DB rows that only differ by whitespace/case.
 */
export function pickCanonicalBoothLabels(
  booths: Array<string | null | undefined>
): Map<string, string> {
  const counts = new Map<string, Map<string, number>>();

  for (const raw of booths) {
    const label = normalizeBoothLabel(raw);
    if (!label) continue;
    const key = boothKey(label);
    if (!counts.has(key)) counts.set(key, new Map());
    const variants = counts.get(key)!;
    variants.set(label, (variants.get(label) || 0) + 1);
  }

  const canonical = new Map<string, string>();
  Array.from(counts.entries()).forEach(([key, variants]) => {
    let best = '';
    let bestCount = -1;
    Array.from(variants.entries()).forEach(([label, count]) => {
      if (
        count > bestCount ||
        (count === bestCount && label.localeCompare(best) < 0)
      ) {
        best = label;
        bestCount = count;
      }
    });
    canonical.set(key, best);
  });
  return canonical;
}
