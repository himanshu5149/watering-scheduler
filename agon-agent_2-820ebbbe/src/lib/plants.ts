/**
 * The plant table.
 *
 * `baseDays` is the baseline watering interval (in days) for a MEDIUM pot
 * in BRIGHT INDIRECT light during the GROWING season. Every other factor
 * (pot size, light, season) is applied on top of this number — see
 * src/lib/schedule.ts for the factors.
 *
 * To add a plant: append one line to PLANTS below, e.g.
 *   { name: 'Hoya', baseDays: 14 },
 * Nothing else needs to change — the picker, the search and the calculator
 * all read from this array.
 */
/**
 * How to judge dryness for a plant. Drives the moisture-check guidance shown
 * on the result card and the printed one. Deliberately coarse buckets —
 * no overconfident per-species claims.
 */
export type CheckKind = 'standard' | 'succulent' | 'moisture-loving' | 'orchid';

export interface Plant {
  name: string;
  /** Baseline watering interval in days. */
  baseDays: number;
  /**
   * True when the plant was entered by the user ("My plant isn't listed")
   * rather than picked from the list. It flows through the same calculation.
   */
  custom?: boolean;
  /**
   * Optional check method. When omitted the plant uses 'standard'
   * (finger 2–3 cm into the soil).
   */
  check?: CheckKind;
}

/** The plant's check method with the default applied. */
export function checkKind(plant: Plant): CheckKind {
  return plant.check ?? 'standard';
}

export const PLANTS: Plant[] = [
  { name: 'Snake Plant', baseDays: 21, check: 'succulent' },
  { name: 'ZZ Plant', baseDays: 18, check: 'succulent' },
  { name: 'Pothos', baseDays: 7 },
  { name: 'Monstera', baseDays: 7 },
  { name: 'Philodendron', baseDays: 7 },
  { name: 'Spider Plant', baseDays: 7 },
  { name: 'Peace Lily', baseDays: 5, check: 'moisture-loving' },
  { name: 'Fiddle Leaf Fig', baseDays: 9 },
  { name: 'Rubber Plant', baseDays: 10 },
  { name: 'Aloe Vera', baseDays: 21, check: 'succulent' },
  { name: 'Echeveria / Succulent', baseDays: 14, check: 'succulent' },
  { name: 'Cactus', baseDays: 28, check: 'succulent' },
  { name: 'Jade Plant', baseDays: 14, check: 'succulent' },
  { name: 'Christmas Cactus', baseDays: 12 },
  { name: 'Boston Fern', baseDays: 3, check: 'moisture-loving' },
  { name: 'Calathea', baseDays: 5, check: 'moisture-loving' },
  { name: 'Prayer Plant', baseDays: 5, check: 'moisture-loving' },
  { name: 'Orchid (Phalaenopsis)', baseDays: 7, check: 'orchid' },
  { name: 'African Violet', baseDays: 5, check: 'moisture-loving' },
  { name: 'Anthurium', baseDays: 7 },
  { name: 'Dracaena', baseDays: 14 },
  { name: 'Chinese Evergreen', baseDays: 10 },
  { name: 'Bird of Paradise', baseDays: 9 },
  { name: 'Basil (herb)', baseDays: 2, check: 'moisture-loving' },
  // ——— Extras (safe to remove, kept because people asked for them) ———
  { name: 'Pilea Peperomioides', baseDays: 7 },
  { name: 'String of Pearls', baseDays: 14, check: 'succulent' },
  { name: 'Hoya', baseDays: 14 },
  { name: 'Ponytail Palm', baseDays: 21, check: 'succulent' },
  { name: 'English Ivy', baseDays: 5 },
  { name: 'Dieffenbachia', baseDays: 7 },
];

/** Alphabetical copy used by the picker so the list is easy to scan. */
export function sortedPlants(): Plant[] {
  return [...PLANTS].sort((a, b) => a.name.localeCompare(b.name));
}
