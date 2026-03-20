// Pakistan land measurement conversions to sq ft
export const UNIT_CONVERSIONS: Record<string, number> = {
  sqft:  1,
  marla: 272.25,    // 1 marla = 272.25 sq ft
  kanal: 5445,      // 1 kanal = 20 marla
  acre:  43560,     // 1 acre  = 8 kanal
};

export type LandUnit = 'sqft' | 'marla' | 'kanal' | 'acre';

export const UNIT_LABELS: Record<LandUnit, string> = {
  sqft:  'Square Feet',
  marla: 'Marla',
  kanal: 'Kanal',
  acre:  'Acre',
};

export function toSqFt(value: number, unit: LandUnit): number {
  return value * UNIT_CONVERSIONS[unit];
}

export function formatPKR(amount: number): string {
  if (amount >= 10_000_000) {
    return `PKR ${(amount / 10_000_000).toFixed(2)} Crore`;
  }
  if (amount >= 100_000) {
    return `PKR ${(amount / 100_000).toFixed(2)} Lakh`;
  }
  return `PKR ${amount.toLocaleString('en-PK')}`;
}

// e.g. 15000000 → "PKR 1.50 Crore"
// e.g.  2500000 → "PKR 25.00 Lakh"
