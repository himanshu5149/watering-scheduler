import { CloudSun, Droplets, Sun, SunDim } from 'lucide-react';
import { PlantPicker } from './PlantPicker';
import { SegmentedControl } from './SegmentedControl';
import type { Plant } from '../lib/plants';
import type { LightLevel, PotSize, Season } from '../lib/schedule';

interface CalculatorProps {
  plant: Plant | null;
  potSize: PotSize | null;
  potCm: string;
  light: LightLevel | null;
  season: Season;
  onPlantChange: (plant: Plant | null) => void;
  onPotSizeChange: (size: PotSize) => void;
  onPotCmChange: (cm: string) => void;
  onLightChange: (light: LightLevel) => void;
  onSeasonChange: (season: Season) => void;
  lastWatered: string;
  onLastWateredChange: (value: string) => void;
  onSubmit: () => void;
}

export function Calculator({
  plant,
  potSize,
  potCm,
  light,
  season,
  onPlantChange,
  onPotSizeChange,
  onPotCmChange,
  onLightChange,
  onSeasonChange,
  lastWatered,
  onLastWateredChange,
  onSubmit,
}: CalculatorProps) {
  const missing: string[] = [];
  if (!plant) missing.push('a plant');
  if (!potSize) missing.push('pot size');
  if (!light) missing.push('light');
  const ready = missing.length === 0;

  // Today as a local yyyy-mm-dd string, so the date picker can't pick a
  // future "last watered" date.
  const now = new Date();
  const todayIso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate(),
  ).padStart(2, '0')}`;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      noValidate
      className="rounded-3xl border border-line bg-card p-5 shadow-[0_24px_60px_-40px_rgba(28,42,33,0.4)] sm:p-7"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-leaf">
        Three picks · two optional extras
      </p>
      <h2 className="mt-2 font-display text-2xl leading-snug text-ink">
        Build your soil-check schedule
      </h2>

      <div className="mt-6 space-y-7">
        <PlantPicker selected={plant} onSelect={onPlantChange} />

        <div>
          <SegmentedControl<PotSize>
            legend="2 · Pot size"
            name="pot-size"
            value={potSize}
            onChange={onPotSizeChange}
            options={[
              { value: 'small', label: 'Small', hint: '≤ 12 cm' },
              { value: 'medium', label: 'Medium', hint: '13–20 cm' },
              { value: 'large', label: 'Large', hint: '> 20 cm' },
            ]}
          />
          <div className="mt-3">
            <label
              htmlFor="pot-cm"
              className="text-xs font-medium text-ink-soft"
            >
              Or type the diameter in cm — we pick the size for you
            </label>
            <input
              id="pot-cm"
              type="number"
              inputMode="numeric"
              min={4}
              max={80}
              value={potCm}
              onChange={(event) => onPotCmChange(event.target.value)}
              placeholder="e.g. 17"
              className="mt-1 min-h-[48px] w-full max-w-[180px] rounded-xl border border-line bg-card px-3 text-base tabular-nums text-ink outline-none transition placeholder:text-ink-soft/70 focus:border-leaf focus:ring-2 focus:ring-leaf/30"
            />
          </div>
        </div>

        <SegmentedControl<LightLevel>
          legend="3 · Light it gets"
          name="light"
          value={light}
          onChange={onLightChange}
          options={[
            { value: 'low', label: 'Low light', hint: 'shaded, few windows', icon: <SunDim className="h-4 w-4" /> },
            { value: 'bright-indirect', label: 'Bright indirect', hint: 'near a window, no sun on leaves', icon: <CloudSun className="h-4 w-4" /> },
            { value: 'direct', label: 'Direct sun', hint: 'sun hits the leaves', icon: <Sun className="h-4 w-4" /> },
          ]}
        />

        <SegmentedControl<Season>
          legend="4 · Season (optional)"
          name="season"
          value={season}
          onChange={onSeasonChange}
          footnote="Optional — skip if unsure. Leaving it on the default is fine."
          options={[
            { value: 'growing', label: 'Growing', hint: 'spring / summer' },
            { value: 'dormant', label: 'Dormant', hint: 'autumn / winter' },
          ]}
        />

        <div>
          <label
            htmlFor="last-watered"
            className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft"
          >
            5 · Last watered (optional)
          </label>
          <input
            id="last-watered"
            type="date"
            max={todayIso}
            value={lastWatered}
            onChange={(event) => onLastWateredChange(event.target.value)}
            className="mt-2 min-h-[48px] w-full max-w-[220px] rounded-xl border border-line bg-card px-3 text-base text-ink outline-none transition focus:border-leaf focus:ring-2 focus:ring-leaf/30"
          />
          <p className="mt-2 text-xs leading-relaxed text-ink-soft">
            Know the real date — including one you watered past? Add it and the
            schedule recalculates from that day. Leave it blank and the card plainly
            says it assumes today.
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={!ready}
        className="mt-8 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-leaf px-5 text-base font-semibold text-white transition hover:bg-leaf-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Droplets className="h-5 w-5" aria-hidden="true" />
        Generate my watering schedule
      </button>
      <p className="mt-3 min-h-[18px] text-center text-xs text-ink-soft" aria-live="polite">
        {ready
          ? 'Nothing is uploaded — the number is computed in this tab.'
          : `Still needed: ${missing.join(' · ')}.`}
      </p>
    </form>
  );
}
