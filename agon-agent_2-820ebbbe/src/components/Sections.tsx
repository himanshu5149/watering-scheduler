import {
  ArrowDown,
  BellOff,
  CheckCircle2,
  Droplet,
  Droplets,
  Hand,
  Leaf,
  Printer,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

export function SiteHeader() {
  return (
    <header className="print:hidden sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4 sm:px-6">
        <a
          href="#top"
          className="flex items-center gap-2 font-display text-[15px] font-bold tracking-tight text-ink"
        >
          <Droplet className="h-5 w-5 text-leaf" aria-hidden="true" />
          Watering Schedule Generator
        </a>
        <p className="hidden text-xs font-medium text-ink-soft sm:block">
          Free · no login · nothing tracked
        </p>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export function Hero() {
  return (
    <section id="top" className="print:hidden relative overflow-hidden">
      <img
        src="/images/sprig.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 top-2 hidden w-56 rotate-12 opacity-50 sm:block"
      />
      <div className="relative mx-auto max-w-3xl px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">
          A calculator, not a care coach
        </p>
        <h1 className="mt-3 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-ink sm:text-5xl">
          A watering schedule you can print and tape to the pot.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
          Pick a plant, a pot size and your light. Get a baseline number of days, the
          date of the next check, and a clean printable card. Then use your finger —
          the tool will tell you that on every card, on purpose, because no number can
          feel your soil.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a
            href="#tool"
            className="flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-leaf px-6 text-base font-semibold text-white transition hover:bg-leaf-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf"
          >
            <Droplets className="h-5 w-5" aria-hidden="true" />
            Build my schedule
          </a>
          <a
            href="#math"
            className="flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-line bg-card px-6 text-base font-semibold text-ink transition hover:border-ink/40 hover:bg-paper-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf"
          >
            See the math first
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <ul className="mt-8 flex flex-wrap gap-2 text-xs font-medium text-ink-soft">
          {['30 common houseplants', 'No account, no cookies', 'Works offline once saved', 'Prints on one page'].map(
            (item) => (
              <li
                key={item}
                className="flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-leaf" aria-hidden="true" />
                {item}
              </li>
            ),
          )}
        </ul>
        <figure className="mt-10">
          <img
            src="/images/hero-plants.jpg"
            alt="A row of potted houseplants on a bright windowsill"
            className="h-56 w-full rounded-3xl border border-line object-cover sm:h-72"
            loading="eager"
          />
          <figcaption className="mt-2 text-xs text-ink-soft">
            Same plants, same window, wildly different drying times. That is why the
            card ends with a finger, not a date.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Pain points — researched from real plant-care communities           */
/* ------------------------------------------------------------------ */

const PAIN_POINTS = [
  {
    icon: BellOff,
    title: 'Reminder schedules get taken as gospel',
    body: 'The most common complaint about plant apps is overwatering: a notification says “water today”, the soil is still wet, the person waters anyway, roots rot. A calendar cannot see your soil — so this tool puts the check before the can, in writing, on every card.',
    source: {
      label: 'Read the r/houseplants thread',
      href: 'https://www.reddit.com/r/houseplants/comments/13gh00p/ive_been_reading_that_planta_is_not_so_good_about/',
    },
  },
  {
    icon: Hand,
    title: 'No app can feel your soil',
    body: 'How fast a pot dries depends on humidity, central heating, drafts, soil mix, pot material and how root-bound the plant is. Reminder apps do not know any of that. One 2–3 cm finger check beats any schedule — the interval only tells you when to start checking.',
    source: {
      label: 'Why people ditch the apps',
      href: 'https://www.plantsolve.com/blog/ditching-the-app-how-to-create-plant-care-schedule-that-works/',
    },
  },
  {
    icon: Printer,
    title: 'Plants live in rooms, not in apps',
    body: 'A printed card sits where the plant sits, gets a pencil tick when you water, and cannot nag you into watering a plant that does not need it. No notifications, no battery, no subscription, no data — it is the one thing an app structurally cannot do well.',
    source: {
      label: 'A plant-app reality check',
      href: 'https://www.janeperrone.com/blog/2023/9/20/plant-apps',
    },
  },
];

export function PainPoints() {
  return (
    <section id="why" className="print:hidden scroll-mt-20 border-t border-line/70 bg-paper-deep/50">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">Why this is a calculator, not a coach</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
          Plant apps get trusted too much. This one refuses to be.
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">
          The three problems below come straight from plant-care communities and guides.
          Every design decision here answers one of them.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {PAIN_POINTS.map(({ icon: Icon, title, body, source }) => (
            <article
              key={title}
              className="flex flex-col rounded-3xl border border-line bg-card p-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-leaf-soft text-leaf-deep">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-[15px] font-bold leading-snug text-ink">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{body}</p>
              <a
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-leaf hover:text-leaf-deep"
              >
                {source.label} →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The finger test                                                     */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    title: 'Push in',
    body: 'For most foliage plants, push a finger 2–3 cm into the soil — about to the first knuckle. For deep or large pots, use a wooden skewer and see how far down it comes out dry.',
  },
  {
    title: 'Read it',
    body: 'Soil sticks to your finger and feels cool? Still wet — walk away. Comes out clean and dry? Time to water. Your card lists the variation for your plant: succulents and cacti should dry out fully, moisture-lovers get watered at the first hint of dryness, and orchids in bark are judged by their roots instead.',
  },
  {
    title: 'Decide',
    body: 'Dry enough for your plant: water thoroughly until it drains from the bottom. Still moist: wait and check again in a day or two. The card tells you when to check — never to pour on autopilot.',
  },
];

export function FingerTest() {
  return (
    <section id="finger-test" className="print:hidden scroll-mt-20">
      <div className="mx-auto grid max-w-3xl items-center gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 sm:py-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">The part that actually works</p>
          <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
            The 10-second soil check
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-soft">
            Overwatering, not neglect, kills most houseplants. This check matters more
            than any number this tool gives you — which is why the card shows a check
            method matched to your plant, in large type.
          </p>
          <ol className="mt-6 space-y-4">
            {STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-leaf text-xs font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-ink">{step.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <figure>
          <img
            src="/images/soil-check.jpg"
            alt="A finger pressing into the soil of a potted plant to check moisture"
            className="h-72 w-full rounded-3xl border border-line object-cover sm:h-96"
            loading="lazy"
          />
          <figcaption className="mt-2 text-xs text-ink-soft">
            If the schedule and the soil disagree, believe the soil.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Print feature                                                       */
/* ------------------------------------------------------------------ */

export function PrintSection() {
  return (
    <section id="print" className="print:hidden scroll-mt-20 border-t border-line/70 bg-paper-deep/50">
      <div className="mx-auto grid max-w-3xl items-center gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 sm:py-16">
        <figure className="order-2 sm:order-1">
          <img
            src="/images/print-card.jpg"
            alt="A printed watering schedule card taped to the side of a terracotta pot"
            className="h-72 w-full rounded-3xl border border-line object-cover sm:h-96"
            loading="lazy"
          />
        </figure>
        <div className="order-1 sm:order-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">The card is the product</p>
          <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
            Print it. Tape it to the pot. Tick it with a pencil.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-soft">
            “Print / Save as PDF” gives you a black-on-white card: the plant name, the
            interval in very large type, the next check date, and the check-the-soil
            rule. It is laid out to fit comfortably on A5 or A6, so a small card lives
            right next to the plant. No background colour — ink costs money and most
            printers ignore it anyway.
          </p>
          <a
            href="#tool"
            className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-2xl bg-leaf px-6 text-sm font-semibold text-white transition hover:bg-leaf-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf"
          >
            <Printer className="h-4 w-4" aria-hidden="true" />
            Jump to the calculator
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The math                                                            */
/* ------------------------------------------------------------------ */

const FACTOR_GROUPS: { title: string; note: string; rows: [string, string][] }[] = [
  {
    title: 'Pot size',
    note: 'How much water the soil can hold',
    rows: [
      ['Small (≤12 cm)', '× 0.8'],
      ['Medium (13–20 cm)', '× 1.0'],
      ['Large (>20 cm)', '× 1.3'],
    ],
  },
  {
    title: 'Light',
    note: 'How fast the plant uses water',
    rows: [
      ['Low light', '× 1.4'],
      ['Bright indirect', '× 1.0'],
      ['Direct sunlight', '× 0.8'],
    ],
  },
  {
    title: 'Season',
    note: 'Whether the plant is growing',
    rows: [
      ['Growing (spring/summer)', '× 1.0'],
      ['Dormant (autumn/winter)', '× 1.3'],
    ],
  },
];

export function MathSection() {
  return (
    <section id="math" className="print:hidden scroll-mt-20">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">No black box</p>
        <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
          The entire formula, in five lines
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">
          This is a deliberate, simple baseline — the same kind of numbers plant shops
          put on care tags, adjusted for your pot, light and season. Nothing is hidden:
        </p>
        <pre className="mt-6 overflow-x-auto whitespace-pre rounded-2xl border border-line bg-card p-5 text-[13px] leading-relaxed text-ink">
          <code>{`interval = baseDays            // from the plant table
interval ×= potFactor          // Small 0.8 · Medium 1.0 · Large 1.3
interval ×= lightFactor        // Low 1.4 · Bright indirect 1.0 · Direct 0.8
interval ×= seasonFactor       // Growing 1.0 · Dormant 1.3
interval = max(1, round(interval))`}</code>
        </pre>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {FACTOR_GROUPS.map((group) => (
            <div key={group.title} className="rounded-2xl border border-line bg-card p-5">
              <h3 className="text-sm font-bold text-ink">{group.title}</h3>
              <p className="mt-0.5 text-xs text-ink-soft">{group.note}</p>
              <dl className="mt-3 space-y-1.5">
                {group.rows.map(([label, factor]) => (
                  <div key={label} className="flex items-baseline justify-between gap-2 text-sm">
                    <dt className="text-ink-soft">{label}</dt>
                    <dd className="whitespace-nowrap font-semibold tabular-nums text-ink">{factor}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <p className="mt-5 flex items-start gap-2 text-sm leading-relaxed text-ink-soft">
          <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
          Want different numbers? The factors and the plant table each live in one
          small file (src/lib/schedule.ts and src/lib/plants.ts) — change a value and
          the whole tool retunes.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Limitations + FAQ                                                   */
/* ------------------------------------------------------------------ */

const LIMITATION_BULLETS = [
  'It does not sense real soil moisture — it cannot know if you watered yesterday, or if the pot sits over a radiator.',
  'It does not send reminders. That is on purpose: the printed card replaces them.',
  'It ignores humidity, temperature, soil type, pot material, drafts, fertiliser, and the size and health of the plant.',
  'The base intervals are rough community values, not measurements from your home.',
  'It is not for outdoor beds, hydroponics, seedlings, or freshly repotted plants.',
];

const FAQ_ITEMS = [
  {
    q: 'Why doesn’t this send notifications?',
    a: 'Because notifications are exactly how people end up overwatering — the reminder arrives, the soil is still wet, and the app has no way to know. A card taped to the pot plus a finger check does the same job with none of the false confidence.',
  },
  {
    q: 'Why is my number different from the care tag?',
    a: 'Care tags describe a plant in a medium pot, in bright indirect light, in the growing season — which is the baseDays value. The tool then adjusts for your actual pot, light and season. Both numbers are estimates; your soil is the referee.',
  },
  {
    q: 'Can I just water on the date it gives me?',
    a: 'Please don’t. The date is when to check, not when to pour. If the soil is damp at 2–3 cm on that day, skip, and check again the next day. Plants rarely die from a late watering; they very often die from an early one.',
  },
];

export function Limitations() {
  return (
    <section id="limitations" className="print:hidden scroll-mt-20 border-t border-line/70 bg-paper-deep/50">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">Known limitations</p>
        <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
          What this tool does not know
        </h2>
        <p className="mt-4 max-w-2xl rounded-2xl border-2 border-clay bg-clay-soft px-5 py-4 text-[15px] leading-relaxed text-ink">
          This tool does not sense real soil moisture, does not send reminders, and does
          not account for humidity, temperature, soil type, pot material, drafts, or the
          size and health of the plant. Its output is a starting point only — a baseline
          interval to check against, not an instruction to water on autopilot. If the
          schedule and the soil disagree, believe the soil.
        </p>
        <ul className="mt-6 space-y-2.5">
          {LIMITATION_BULLETS.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-10 divide-y divide-line rounded-3xl border border-line bg-card">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="group px-5 py-4">
              <summary className="cursor-pointer list-none text-[15px] font-bold text-ink marker:hidden">
                <span className="flex items-center justify-between gap-3">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="text-leaf transition group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export function SiteFooter() {
  return (
    <footer className="print:hidden border-t border-line/70">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="flex items-center gap-2 font-display text-[15px] font-bold text-ink">
          <Droplet className="h-4 w-4 text-leaf" aria-hidden="true" />
          Plant Watering Schedule Generator
        </p>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
          A free calculator, not a care app. No accounts, no cookies, no analytics —
          every number is computed in your browser and nothing leaves your device. Save
          the page and it keeps working offline.
        </p>
        <p className="mt-4 text-xs text-ink-soft/80">
          Built as a static page: plain HTML, CSS and client-side JavaScript. Print
          output is black-on-white and sized for A5/A6 cards.
        </p>
      </div>
    </footer>
  );
}
