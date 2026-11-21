/**
 * The whole calculation lives here on purpose.
 *
 * If you want to retune the tool, edit the three factor tables below.
 * A factor > 1 stretches the interval (less frequent watering),
 * a factor < 1 shortens it (more frequent watering).
 */
import type { CheckKind, Plant } from './plants';

export type PotSize = 'small' | 'medium' | 'large';
export type LightLevel = 'low' | 'bright-indirect' | 'direct';
export type Season = 'growing' | 'dormant';

// ——— Tweakable factors ———————————————————————————————————————
// Small pots hold little water and dry out fast → shorter interval.
// Large pots hold a lot and dry slowly → longer interval.
export const POT_FACTORS: Record<PotSize, number> = {
  small: 0.8,
  medium: 1.0,
  large: 1.3,
};

// Low light means slow growth and slow water use → stretch the interval.
// Direct sun dries the pot quickly → shorten it.
export const LIGHT_FACTORS: Record<LightLevel, number> = {
  low: 1.4,
  'bright-indirect': 1.0,
  direct: 0.8,
};

// Dormant plants drink far less in autumn/winter.
export const SEASON_FACTORS: Record<Season, number> = {
  growing: 1.0,
  dormant: 1.3,
};
// ———————————————————————————————————————————————————————————

export const POT_LABELS: Record<PotSize, string> = {
  small: 'Small pot (≤12 cm)',
  medium: 'Medium pot (13–20 cm)',
  large: 'Large pot (>20 cm)',
};

export const POT_SHORT: Record<PotSize, string> = {
  small: 'Small pot',
  medium: 'Medium pot',
  large: 'Large pot',
};

export const LIGHT_LABELS: Record<LightLevel, string> = {
  low: 'Low light',
  'bright-indirect': 'Bright indirect light',
  direct: 'Direct sunlight',
};

export const SEASON_LABELS: Record<Season, string> = {
  growing: 'Growing season (spring/summer)',
  dormant: 'Dormant season (autumn/winter)',
};

export const SEASON_SHORT: Record<Season, string> = {
  growing: 'Growing season',
  dormant: 'Dormant season',
};

/**
 * Plant-appropriate moisture-check guidance, shown on every result card and
 * the printed one. Deliberately coarse buckets — no per-species guarantees;
 * the card says so.
 */
export const CHECK_GUIDANCE: Record<CheckKind, { title: string; body: string }> = {
  standard: {
    title: 'How to check — most plants',
    body:
      'Push a finger 2–3 cm into the soil. Comes out clean and dry → time to water. Soil sticks or feels cool → wait and check again later.',
  },
  succulent: {
    title: 'How to check — succulents & cacti',
    body:
      'Let the pot dry out all the way through between waterings, which often takes longer than the number above. Go by pot weight or a dry wooden skewer rather than the surface; when unsure, wait a few more days.',
  },
  'moisture-loving': {
    title: 'How to check — moisture-loving plants',
    body:
      'These prefer evenly moist (never soggy) soil. Water when the top 2–3 cm just starts to dry — don’t let them go bone dry, and never leave them standing in water.',
  },
  orchid: {
    title: 'How to check — orchids in bark',
    body:
      'Judge by the roots, not the surface: silvery-grey, wrinkled roots → water; plump green roots → wait. Fast-draining bark makes the finger test read wrong here.',
  },
};

export interface ScheduleInput {
  plant: Plant;
  potSize: PotSize;
  light: LightLevel;
  season: Season;
  /** The actual last-watered date, or null when the user doesn't know. */
  lastWatered: Date | null;
}

export interface ScheduleMath {
  baseDays: number;
  potFactor: number;
  lightFactor: number;
  seasonFactor: number;
  /** Value before rounding — shown in the "See the math" disclosure. */
  raw: number;
}

export interface ScheduleResult {
  /** Suggested check cadence in whole days (minimum 1). */
  interval: number;
  /** Local-time date of the suggested soil check (lastWatered + interval). */
  nextCheck: Date;
  /** True when lastWatered was unknown and today was assumed (labelled in the UI). */
  assumedToday: boolean;
  /** True when the suggested check date has already arrived or passed. */
  checkDue: boolean;
  /** Whole days since the last watering (only meaningful when checkDue). */
  elapsedDays: number;
  math: ScheduleMath;
}

/** Map a pot diameter in cm to one of the three size buckets. */
export function potSizeFromCm(cm: number): PotSize {
  if (cm <= 12) return 'small';
  if (cm <= 20) return 'medium';
  return 'large';
}

/** Add whole days to a date without mutating it (local time). */
export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

/** Local-midnight copy of a date, so day comparisons never drift on hours. */
function startOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

/** Format as e.g. "Fri, 27 Nov 2026" in the user's local time. */
export function formatNextDate(date: Date): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? '';
  return `${get('weekday')}, ${get('day')} ${get('month')} ${get('year')}`;
}

/**
 * The calculator.
 *
 * interval = baseDays
 * interval ×= potFactor      // Small 0.8 · Medium 1.0 · Large 1.3
 * interval ×= lightFactor    // Low 1.4 · Bright indirect 1.0 · Direct 0.8
 * interval ×= seasonFactor   // Growing 1.0 · Dormant 1.3
 * interval = Math.max(1, Math.round(interval))
 *
 * The interval and date are a suggested SOIL-CHECK cadence, not a watering
 * order. It counts from the user's actual last-watered date when given; when
 * that is unknown, today is used only as an explicitly labelled assumption.
 * If the check date has already passed, the card says a check is DUE — never
 * that the plant should be watered automatically.
 */
export function calculateSchedule(input: ScheduleInput): ScheduleResult {
  let interval = input.plant.baseDays; // start from the plant's base interval
  interval *= POT_FACTORS[input.potSize]; // adjust for how much soil holds water
  interval *= LIGHT_FACTORS[input.light]; // adjust for how fast the plant uses water
  interval *= SEASON_FACTORS[input.season]; // adjust for the time of year
  interval = Math.max(1, Math.round(interval)); // never below 1 day, whole days only

  const today = startOfDay(new Date());
  const lastWatered = input.lastWatered ? startOfDay(input.lastWatered) : null;
  const nextCheck = addDays(lastWatered ?? today, interval);
  const assumedToday = lastWatered === null;
  const checkDue = !assumedToday && nextCheck.getTime() <= today.getTime();
  const elapsedDays = lastWatered
    ? Math.round((today.getTime() - lastWatered.getTime()) / 86_400_000)
    : 0;

  return {
    interval,
    nextCheck,
    assumedToday,
    checkDue,
    elapsedDays,
    math: {
      baseDays: input.plant.baseDays,
      potFactor: POT_FACTORS[input.potSize],
      lightFactor: LIGHT_FACTORS[input.light],
      seasonFactor: SEASON_FACTORS[input.season],
      raw: interval,
    },
  };
}
