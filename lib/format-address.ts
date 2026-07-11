export type MemberAddress = {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
};

/** Values often entered as placeholders instead of a real address part */
const PLACEHOLDER = /^(0+|00+|n\/?a|nil|none|-|_|\.|null|undefined)$/i;

function isMeaningfulPart(value?: string | null): value is string {
  const trimmed = value?.trim();
  if (!trimmed) return false;
  if (PLACEHOLDER.test(trimmed)) return false;
  return true;
}

/**
 * Builds a display address, skipping empty or placeholder parts
 * (e.g. street/city saved as "00").
 */
export function formatMemberAddress(
  address?: MemberAddress | null,
  options?: { includeCountry?: boolean }
): string {
  if (!address) return '';

  const parts = [
    address.street,
    address.city,
    address.state,
    address.postalCode,
    options?.includeCountry ? address.country : undefined,
  ].filter(isMeaningfulPart);

  return parts.join(', ');
}
