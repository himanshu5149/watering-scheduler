import { CalendarClock, Droplets, Hand, Printer, RotateCcw } from 'lucide-react';
import { checkKind } from '../lib/plants';
import {
  CHECK_GUIDANCE,
  formatNextDate,
  LIGHT_LABELS,
  POT_SHORT,
  SEASON_SHORT,
  type ScheduleInput,
  type ScheduleResult,
} from '../lib/schedule';

interface ResultCardProps {
  result: ScheduleResult;
  input: ScheduleInput;
  onRestart: () => void;
  /** Recalculates the schedule from today (after the user checked and watered). */
  onWateredToday: () => void;
}

/**
 * The product. Visual hierarchy is deliberate:
 *   1. the check cadence (huge)  2. the next check date — or "a check is due"
 *   3. the plant-appropriate moisture check  4. "still moist → wait"
 *   5. the disclaimer + drainage warning  6. what the number was based on
 * The whole article prints as a black-on-white card — see index.css.
 */
export function ResultCard({ result, input, onRestart, onWateredToday }: ResultCardProps) {
  const { interval, nextCheck, assumedToday, checkDue, elapsedDays, math } = result;
  const { plant, potSize, light, season, lastWatered } = input;
  const guidance = CHECK_GUIDANCE[checkKind(plant)];
  const dayWord = interval === 1 ? 'day' : 'days';
  const elapsedWord = elapsedDays === 1 ? 'day' : 'days';
  const drinksFast = interval < 2;

  return (
    <article
      aria-label="Your suggested soil-check schedule"
      className="print-card rounded-3xl border border-line bg-card p-6 shadow-[0_28px_70px_-38px_rgba(28,42,33,0.5)] sm:p-8"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-leaf print:hidden">
        Your baseline schedule — when to check, not when to pour
      </p>

      {/* the plant name is required on the printed card, so it lives here */}
      <h2 className="mt-3 text-xl font-bold text-ink sm:text-2xl">{plant.name}</h2>

      {/* 1 — hero line, number visually dominant: a CHECK cadence, not a watering order */}
      <p className="print-hero mt-1 font-display text-[26px] leading-tight text-ink sm:text-3xl">
        Check the soil every{' '}
        <span className="print-number inline-block text-[68px] font-bold leading-[0.9] tracking-tight text-leaf sm:text-[80px]">
          {interval}
        </span>{' '}
        {dayWord}.
      </p>

      {/* 2 — the suggested check date, or "due now" once the date has passed */}
      {checkDue ? (
        <>
          <p className="mt-4 text-lg font-semibold text-ink">
            A soil check is due now — it’s been {elapsedDays} {elapsedWord} since the
            last watering.
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            The suggested check date ({formatNextDate(nextCheck)}) has arrived or
            passed. Check the growing medium now — and if it is still moist, wait.
            Don’t water on autopilot.
          </p>
          {/* Recalculate after a missed watering: keeps every other input. */}
          <button
            type="button"
            onClick={onWateredToday}
            className="mt-3 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-line bg-card px-4 text-sm font-semibold text-ink transition hover:border-leaf/60 hover:bg-leaf-soft/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf print:hidden"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Checked and watered today? Restart the schedule from today
          </button>
        </>
      ) : (
        <>
          <p className="mt-4 text-lg font-semibold text-ink">
            Next check: <span className="tabular-nums">{formatNextDate(nextCheck)}</span>
          </p>
          {assumedToday && (
            <p className="mt-1 text-sm font-medium text-ink-soft">
              Assumption, clearly labelled: no last-watered date was given, so this
              counts from today. Add the real date to shift the schedule.
            </p>
          )}
        </>
      )}

      {/* sanity clamp for fast-drinking plants */}
      {drinksFast && (
        <p className="mt-4 flex items-start gap-2 rounded-xl border border-leaf/40 bg-leaf-soft px-4 py-3 text-sm font-medium leading-snug text-ink print:hidden">
          <Droplets className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
          This plant drinks fast — check the soil daily rather than following a fixed
          number.
        </p>
      )}

      {/* 3 — plant-appropriate moisture check (replaces one-size-fits-all rule) */}
      <div className="mt-5 rounded-2xl border border-line bg-paper-deep/50 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
          {guidance.title}
        </p>
        <p className="mt-1.5 text-sm leading-snug text-ink">{guidance.body}</p>
        <p className="mt-1.5 text-xs text-ink-soft">
          A starting point, not a species guarantee — your plant, pot and home may
          differ.
        </p>
      </div>

      {/* 4 — what to do when the growing medium is still moist */}
      <p className="mt-3 flex items-start gap-2 text-sm font-medium leading-snug text-ink">
        <CalendarClock
          className="mt-0.5 h-4 w-4 shrink-0 text-leaf print:hidden"
          aria-hidden="true"
        />
        <span>
          Still moist on check day? Don’t water — wait and check again in a day or two
          (succulents and cacti can wait longer). The date is when to check, not when to
          pour.
        </span>
      </p>

      {/* 5 — the disclaimer, styled as a callout on purpose, never fine print */}
      <div
        role="note"
        aria-label="Before you water"
        className="mt-5 rounded-2xl border-2 border-clay bg-clay-soft px-5 py-4"
      >
        <p className="flex items-start gap-2.5 text-[15px] font-semibold leading-snug text-ink">
          <Hand className="mt-0.5 h-5 w-5 shrink-0 text-clay print:hidden" aria-hidden="true" />
          <span>
            This is a baseline estimate, not an instruction. Conditions and plant needs
            vary — light, heat, humidity, soil mix and pot all change how fast water is
            used. Check the growing medium every time and water only when it is
            appropriate for that plant. Whatever you water: let excess drain out of the
            bottom and never leave the pot standing in water — constantly soggy roots
            are the most common killer.
          </span>
        </p>
      </div>

      {/* 6 — transparency: exactly what the number was computed from */}
      <div className="mt-5 border-t border-line pt-4">
        <p className="text-xs leading-relaxed text-ink-soft">
          <span className="font-semibold text-ink">Based on:</span> {plant.name} ·{' '}
          {POT_SHORT[potSize]} · {LIGHT_LABELS[light]} · {SEASON_SHORT[season]} ·{' '}
          {lastWatered
            ? `last watered ${formatNextDate(lastWatered)}`
            : 'last watered unknown — today assumed'}
          .
        </p>
        <details className="mt-2 print:hidden">
          <summary className="cursor-pointer text-xs font-semibold text-leaf hover:text-leaf-deep">
            See the math
          </summary>
          <p className="mt-1.5 text-xs leading-relaxed tabular-nums text-ink-soft">
            {math.baseDays} base days × {math.potFactor} (pot) × {math.lightFactor}{' '}
            (light) × {math.seasonFactor} (season) = {math.raw.toFixed(1)} → rounded to{' '}
            {interval} {dayWord}. Minimum is 1 day. Every factor is listed openly in
            the “The math” section below.
          </p>
        </details>
      </div>

      {/* actions */}
      <div className="mt-6 flex flex-col gap-3 print:hidden sm:flex-row">
        <button
          type="button"
          onClick={() => window.print()}
          className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl bg-leaf px-5 text-base font-semibold text-white transition hover:bg-leaf-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf"
        >
          <Printer className="h-5 w-5" aria-hidden="true" />
          Print / Save as PDF
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-line bg-card px-5 text-base font-semibold text-ink transition hover:border-ink/40 hover:bg-paper-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Start over
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-ink-soft print:hidden">
        Screenshot it, or print it and tape it to the pot.
      </p>

      {/* print-only footer, required on the printed card */}
      <p className="print-footer">
        Generated by Plant Watering Schedule Generator — a free calculator, not a care
        app.
      </p>
    </article>
  );
}
