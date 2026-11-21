import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { sortedPlants, type Plant } from '../lib/plants';

interface PlantPickerProps {
  selected: Plant | null;
  onSelect: (plant: Plant | null) => void;
}

/**
 * Search box + scrollable chip list. Chips are real <button>s with
 * aria-pressed, so they are keyboard-navigable and announced correctly.
 */
export function PlantPicker({ selected, onSelect }: PlantPickerProps) {
  const [query, setQuery] = useState('');
  const plants = useMemo(sortedPlants, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return plants;
    return plants.filter((p) => p.name.toLowerCase().includes(q));
  }, [plants, query]);

  const isCustom = selected?.custom === true;
  const [customOpen, setCustomOpen] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customDays, setCustomDays] = useState('');

  /**
   * Push the custom plant up as soon as both fields make sense (name + a
   * base interval of 1–365 days); deselect while they don't.
   */
  const applyCustom = (name: string, days: string) => {
    const trimmed = name.trim();
    const n = Number(days);
    if (trimmed && days.trim() !== '' && Number.isFinite(n) && n >= 1 && n <= 365) {
      onSelect({ name: trimmed, baseDays: Math.round(n), custom: true });
    } else {
      onSelect(null);
    }
  };

  const clearCustom = () => {
    setCustomOpen(false);
    setCustomName('');
    setCustomDays('');
  };

  const toggleCustom = () => {
    if (customOpen) {
      clearCustom();
      if (isCustom) onSelect(null);
    } else {
      setCustomOpen(true);
      // Custom entry replaces a list selection, and vice versa.
      if (selected) onSelect(null);
    }
  };

  return (
    <div>
      <label
        htmlFor="plant-search"
        className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft"
      >
        1 · Your plant
      </label>
      <input
        id="plant-search"
        type="search"
        autoComplete="off"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Type to search — e.g. monstera"
        className="mt-2 min-h-[48px] w-full rounded-xl border border-line bg-card px-4 text-base text-ink outline-none transition placeholder:text-ink-soft/70 focus:border-leaf focus:ring-2 focus:ring-leaf/30"
      />

      {filtered.length === 0 ? (
        <p className="mt-3 rounded-xl border border-line bg-paper-deep/60 px-4 py-3 text-sm text-ink-soft">
          Nothing matches “{query}”. Try a shorter word, or pick the plant with the
          most similar leaves — the interval will be close.
        </p>
      ) : (
        <div
          role="group"
          aria-label="Plant list — tap one to select it"
          className="mt-2 grid max-h-60 grid-cols-2 gap-2 overflow-y-auto rounded-2xl border border-line bg-paper-deep/50 p-2"
        >
          {filtered.map((plant) => {
            const isSelected = !selected?.custom && selected?.name === plant.name;
            return (
              <button
                key={plant.name}
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  clearCustom();
                  onSelect(isSelected ? null : plant);
                }}
                className={`flex min-h-[44px] items-center justify-between gap-1.5 rounded-xl border px-3 py-2 text-left text-[13px] font-semibold leading-tight transition ${
                  isSelected
                    ? 'border-leaf bg-leaf text-white'
                    : 'border-line bg-card text-ink hover:border-leaf/60 hover:bg-leaf-soft/60'
                } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf`}
              >
                <span>{plant.name}</span>
                <span
                  className={`shrink-0 text-[11px] font-medium tabular-nums ${
                    isSelected ? 'text-white/80' : 'text-ink-soft'
                  }`}
                >
                  {plant.baseDays}d
                </span>
              </button>
            );
          })}
        </div>
      )}

      <button
        type="button"
        onClick={toggleCustom}
        aria-pressed={customOpen}
        className={`mt-2 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-dashed px-3 py-2 text-[13px] font-semibold transition ${
          customOpen
            ? 'border-leaf bg-leaf-soft text-leaf-deep'
            : 'border-line bg-card text-ink-soft hover:border-leaf/60 hover:text-ink'
        } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf`}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        {customOpen ? 'Hide the custom plant form' : 'My plant isn’t listed — enter it myself'}
      </button>

      {customOpen && (
        <div className="mt-2 rounded-2xl border border-line bg-paper-deep/50 p-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <label
                htmlFor="custom-plant-name"
                className="block text-xs font-medium text-ink-soft"
              >
                Plant name
              </label>
              <input
                id="custom-plant-name"
                type="text"
                autoComplete="off"
                value={customName}
                onChange={(event) => {
                  setCustomName(event.target.value);
                  applyCustom(event.target.value, customDays);
                }}
                placeholder="e.g. Ficus burgundy"
                className="mt-1 min-h-[48px] w-full rounded-xl border border-line bg-card px-3 text-base text-ink outline-none transition placeholder:text-ink-soft/70 focus:border-leaf focus:ring-2 focus:ring-leaf/30"
              />
            </div>
            <div className="sm:w-[150px]">
              <label
                htmlFor="custom-plant-days"
                className="block text-xs font-medium text-ink-soft"
              >
                Base interval (days)
              </label>
              <input
                id="custom-plant-days"
                type="number"
                inputMode="numeric"
                min={1}
                max={365}
                value={customDays}
                onChange={(event) => {
                  setCustomDays(event.target.value);
                  applyCustom(customName, event.target.value);
                }}
                placeholder="e.g. 10"
                className="mt-1 min-h-[48px] w-full rounded-xl border border-line bg-card px-3 text-base tabular-nums text-ink outline-none transition placeholder:text-ink-soft/70 focus:border-leaf focus:ring-2 focus:ring-leaf/30"
              />
            </div>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-ink-soft">
            “Base” means the same as the list: a medium pot, bright indirect light,
            growing season. The pot, light and season adjustments still apply on top.
          </p>
        </div>
      )}

      <p className="mt-2 text-xs leading-relaxed text-ink-soft" aria-live="polite">
        {selected
          ? `${selected.name}${selected.custom ? ' (custom)' : ''} — base interval ${selected.baseDays} days (before pot, light and season adjustments).`
          : customOpen
            ? 'Enter a name and a base interval in days, or pick from the list above.'
            : 'Tap a plant to select it. The small number is its base interval in days.'}
      </p>
    </div>
  );
}
