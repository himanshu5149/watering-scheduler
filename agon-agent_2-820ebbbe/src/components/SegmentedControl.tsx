import type { ReactNode } from 'react';

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  hint?: string;
  icon?: ReactNode;
}

interface SegmentedControlProps<T extends string> {
  /** The visible legend — also the accessible name of the radio group. */
  legend: string;
  /** Unique radio group name. */
  name: string;
  options: SegmentedOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  /** Small note rendered under the control (e.g. "optional — skip if unsure"). */
  footnote?: string;
}

/**
 * A row of real radio inputs styled as a segmented control.
 * Real <input type="radio"> elements keep keyboard navigation, focus rings
 * and screen-reader semantics for free; the visible button is just paint.
 */
export function SegmentedControl<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
  footnote,
}: SegmentedControlProps<T>) {
  return (
    <fieldset className="m-0 border-0 p-0">
      <legend className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
        {legend}
      </legend>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
      >
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <label key={option.value} className="cursor-pointer">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="peer sr-only"
              />
              <span
                className={`flex min-h-[56px] flex-col items-center justify-center gap-0.5 rounded-xl border px-2 py-2 text-center text-sm font-semibold leading-tight transition ${
                  checked
                    ? 'border-leaf bg-leaf text-white'
                    : 'border-line bg-card text-ink hover:border-leaf/60 hover:bg-leaf-soft/50'
                } peer-focus-visible:ring-2 peer-focus-visible:ring-leaf peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-paper`}
              >
                {option.icon && (
                  <span aria-hidden="true" className={checked ? 'text-white' : 'text-leaf'}>
                    {option.icon}
                  </span>
                )}
                {option.label}
                {option.hint && (
                  <span
                    className={`text-[11px] font-normal leading-tight ${
                      checked ? 'text-white/75' : 'text-ink-soft'
                    }`}
                  >
                    {option.hint}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>
      {footnote && <p className="mt-2 text-xs text-ink-soft">{footnote}</p>}
    </fieldset>
  );
}
