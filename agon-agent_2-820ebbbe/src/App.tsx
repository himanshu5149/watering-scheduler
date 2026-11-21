import { useEffect, useState } from 'react';
import { Calculator } from './components/Calculator';
import { ResultCard } from './components/ResultCard';
import {
  FingerTest,
  Hero,
  Limitations,
  MathSection,
  PainPoints,
  PrintSection,
  SiteFooter,
  SiteHeader,
} from './components/Sections';
import type { Plant } from './lib/plants';
import {
  calculateSchedule,
  potSizeFromCm,
  type LightLevel,
  type PotSize,
  type ScheduleInput,
  type ScheduleResult,
  type Season,
} from './lib/schedule';

interface Computed {
  result: ScheduleResult;
  input: ScheduleInput;
}

export default function App() {
  const [plant, setPlant] = useState<Plant | null>(null);
  const [potSize, setPotSize] = useState<PotSize | null>(null);
  const [potCm, setPotCm] = useState('');
  const [light, setLight] = useState<LightLevel | null>(null);
  const [season, setSeason] = useState<Season>('growing');
  /** Raw yyyy-mm-dd from the optional last-watered input ('' = unknown). */
  const [lastWatered, setLastWatered] = useState('');
  const [computed, setComputed] = useState<Computed | null>(null);

  // When a fresh result appears, bring it into view.
  useEffect(() => {
    if (computed) {
      document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [computed]);

  const handlePotCmChange = (raw: string) => {
    setPotCm(raw);
    const cm = Number(raw);
    if (raw.trim() !== '' && Number.isFinite(cm) && cm >= 4) {
      setPotSize(potSizeFromCm(cm));
    }
  };

  const handlePotSizeChange = (size: PotSize) => {
    setPotSize(size);
    setPotCm(''); // the radio is now the source of truth
  };

  const handleSubmit = () => {
    if (!plant || !potSize || !light) return;
    const parsed = lastWatered ? new Date(`${lastWatered}T00:00:00`) : null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // A future "last watered" date is meaningless — clamp it to today.
    const lastWateredDate =
      parsed && !Number.isNaN(parsed.getTime()) && parsed <= today ? parsed : null;
    const input: ScheduleInput = {
      plant,
      potSize,
      light,
      season,
      lastWatered: lastWateredDate,
    };
    setComputed({ result: calculateSchedule(input), input });
  };

  /** Recalculate after a missed watering: the user checked and watered today. */
  const handleWateredToday = () => {
    if (!plant || !potSize || !light) return;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const input: ScheduleInput = {
      plant,
      potSize,
      light,
      season,
      lastWatered: today,
    };
    setComputed({ result: calculateSchedule(input), input });
  };

  const handleRestart = () => {
    setComputed(null);
    setPlant(null);
    setPotSize(null);
    setPotCm('');
    setLight(null);
    setSeason('growing');
    setLastWatered('');
    requestAnimationFrame(() => {
      document.getElementById('plant-search')?.focus();
      document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <Hero />

        {/* The tool: form and result swap in place. The section is removed from
            print output while the form is showing, so printing only ever
            produces the schedule card. */}
        <section
          id="tool"
          className={`scroll-mt-20 px-4 pb-16 sm:px-6 ${computed ? '' : 'print:hidden'}`}
        >
          {/* Persistent live region: the result is announced to screen readers
              the moment it appears. */}
          <div aria-live="polite" aria-atomic="true">
            {computed && (
              <div className="mx-auto w-full max-w-[480px]">
                <ResultCard
                  result={computed.result}
                  input={computed.input}
                  onRestart={handleRestart}
                  onWateredToday={handleWateredToday}
                />
              </div>
            )}
          </div>
          {!computed && (
            <div className="mx-auto w-full max-w-[480px]">
              <Calculator
                plant={plant}
                potSize={potSize}
                potCm={potCm}
                light={light}
                season={season}
                onPlantChange={setPlant}
                onPotSizeChange={handlePotSizeChange}
                onPotCmChange={handlePotCmChange}
                onLightChange={setLight}
                onSeasonChange={setSeason}
                lastWatered={lastWatered}
                onLastWateredChange={setLastWatered}
                onSubmit={handleSubmit}
              />
            </div>
          )}
        </section>

        <PainPoints />
        <FingerTest />
        <PrintSection />
        <MathSection />
        <Limitations />
      </main>
      <SiteFooter />
    </div>
  );
}
