import * as React from 'react';
import { CtaDualRail } from '@/components/ui/cta-dual-rail';
import styles from './LabNotes.module.css';

type ScopeMode = 'charge' | 'ripple' | 'ringing';
type ScopeState = 'idle' | 'hover' | 'active';
type LogStatus = 'ok' | 'warn';

const MODE_LABEL: Record<ScopeMode, string> = {
  charge: 'charge step',
  ripple: 'ripple',
  ringing: 'ringing'
};

const SCOPE_TEXT: Record<ScopeMode, string> = {
  charge: 'Step de charge: verifier la chute transitoire et le temps de recuperation rail.',
  ripple: 'Ripple: verifier bruit de fond alim et impact ADC/codec.',
  ringing: 'Ringing: verifier amortissement et stabilite de la boucle de puissance.'
};

const LOG_ITEMS = [
  { id: 'esd', label: 'ESD', status: 'ok' as const, detail: 'Pre-check IEC, pas de reset systeme.' },
  { id: 'emi', label: 'EMI pre-scan', status: 'warn' as const, detail: 'Pic harmonique 3 a corriger via filtrage.' },
  { id: 'therm', label: 'Thermique', status: 'ok' as const, detail: 'Marge > 12C sur scenario charge nominale.' }
];

const SCOPE_TARGETS: ScopeMode[] = ['charge', 'ripple', 'ringing'];
const BODE_TARGETS = [120, 480, 1200, 3200, 6400, 12000] as const;

function buildScopePath(mode: ScopeMode, state: ScopeState) {
  const scale = state === 'active' ? 1.1 : state === 'hover' ? 1.06 : 1;
  const base = 40;
  if (mode === 'ripple') {
    const amp = 6 * scale;
    return `M0 ${base} C20 ${base - amp} 40 ${base + amp} 60 ${base} C80 ${base - amp} 100 ${base + amp} 120 ${base} C140 ${base - amp} 160 ${base + amp} 180 ${base} C200 ${base - amp} 220 ${base + amp} 240 ${base}`;
  }
  if (mode === 'ringing') {
    const top = Math.max(16, Math.round(22 - (scale - 1) * 22));
    const bottom = Math.min(92, Math.round(88 + (scale - 1) * 22));
    return `M0 60 L44 60 L52 ${top} L58 ${bottom} L64 30 L70 74 L78 44 L88 60 L240 60`;
  }
  const stepHigh = Math.max(22, Math.round(30 - (scale - 1) * 20));
  return `M0 62 L48 62 L48 ${stepHigh} L86 ${stepHigh} L86 47 L124 47 L124 56 L240 56`;
}

export function LabNotes() {
  const [mode, setMode] = React.useState<ScopeMode>('charge');
  const [scopeState, setScopeState] = React.useState<ScopeState>('idle');
  const [scopeScore, setScopeScore] = React.useState(0);
  const [scopeMessage, setScopeMessage] = React.useState('Objectif: alignez la forme demandee puis validez.');

  const [freq, setFreq] = React.useState(3200);
  const [bodeScore, setBodeScore] = React.useState(0);
  const [bodeMessage, setBodeMessage] = React.useState('Objectif: caler la frequence sur la cible.');

  const [triageAnswers, setTriageAnswers] = React.useState<Record<string, LogStatus>>({
    esd: 'ok',
    emi: 'ok',
    therm: 'ok'
  });
  const [triageScore, setTriageScore] = React.useState(0);
  const [triageMessage, setTriageMessage] = React.useState('Objectif: attribuez le bon statut a chaque test.');

  const [virtualTime, setVirtualTime] = React.useState(0);

  const scopeTarget = SCOPE_TARGETS[Math.floor(virtualTime / 5000) % SCOPE_TARGETS.length];
  const bodeTarget = BODE_TARGETS[Math.floor(virtualTime / 4000) % BODE_TARGETS.length];
  const totalScore = scopeScore + bodeScore + triageScore;

  const bodeDb = React.useMemo(() => {
    const ratio = freq / 3200;
    const db = -10 * Math.log10(1 + ratio * ratio);
    return Math.max(-40, Math.min(3, db));
  }, [freq]);

  const cutoffRatio = (Math.log10(3200) - Math.log10(20)) / (Math.log10(100000) - Math.log10(20));
  const cutoffX = 12 + cutoffRatio * 216;
  const bodeCurve = 'M12 20 C52 20 80 22 112 28 C142 34 164 42 182 52 C198 60 212 66 228 72';
  const markerRatio = (Math.log10(freq) - Math.log10(20)) / (Math.log10(100000) - Math.log10(20));
  const markerX = 12 + markerRatio * 216;
  const markerY = Math.max(20, Math.min(72, 22 + ((Math.abs(bodeDb) / 40) * 54)));

  const validateScopeGame = React.useCallback(() => {
    if (mode === scopeTarget && scopeState === 'active') {
      setScopeScore((prev) => prev + 1);
      setScopeMessage('Succes: forme validee, point ajoute.');
      return;
    }
    setScopeMessage(`Pas valide. Cible: ${MODE_LABEL[scopeTarget]} + mode actif.`);
  }, [mode, scopeTarget, scopeState]);

  const validateBodeGame = React.useCallback(() => {
    const diff = Math.abs(freq - bodeTarget);
    if (diff <= Math.max(60, bodeTarget * 0.08)) {
      setBodeScore((prev) => prev + 1);
      setBodeMessage('Succes: frequence verrouillee dans la marge.');
      return;
    }
    setBodeMessage(`Trop loin de la cible (${bodeTarget} Hz). Ajustez le curseur.`);
  }, [freq, bodeTarget]);

  const setTriage = React.useCallback((id: string, status: LogStatus) => {
    setTriageAnswers((prev) => ({ ...prev, [id]: status }));
  }, []);

  const validateTriageGame = React.useCallback(() => {
    const correct = LOG_ITEMS.every((item) => triageAnswers[item.id] === item.status);
    if (correct) {
      setTriageScore((prev) => prev + 1);
      setTriageMessage('Succes: triage valide, rapport exploitable.');
      return;
    }
    setTriageMessage('Triage incomplet: verifiez les statuts ESD/EMI/Thermique.');
  }, [triageAnswers]);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setVirtualTime((prev) => prev + 1000);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  React.useEffect(() => {
    const renderGameToText = () =>
      JSON.stringify({
        mode: 'lab-mini-games',
        coordinate_system: 'scope/bode SVG origin=(0,0) top-left, x right, y down',
        score: { total: totalScore, scope: scopeScore, bode: bodeScore, triage: triageScore },
        scope: { target: scopeTarget, selected: mode, state: scopeState },
        bode: { target_hz: bodeTarget, selected_hz: freq, gain_db: Number(bodeDb.toFixed(2)) },
        triage: triageAnswers,
        virtual_time_ms: virtualTime
      });

    const advanceTime = (ms: number) => {
      setVirtualTime((prev) => prev + Math.max(0, ms));
    };

    (window as typeof window & { render_game_to_text?: () => string; advanceTime?: (ms: number) => void }).render_game_to_text = renderGameToText;
    (window as typeof window & { render_game_to_text?: () => string; advanceTime?: (ms: number) => void }).advanceTime = advanceTime;

    return () => {
      delete (window as typeof window & { render_game_to_text?: () => string }).render_game_to_text;
      delete (window as typeof window & { advanceTime?: (ms: number) => void }).advanceTime;
    };
  }, [totalScore, scopeScore, bodeScore, triageScore, scopeTarget, mode, scopeState, bodeTarget, freq, bodeDb, triageAnswers, virtualTime]);

  return (
    <section id="lab-notes" aria-labelledby="lab-notes-title" className="section-anchor mt-5">
      <div className={`circuit-board rounded-2xl p-5 md:p-6 ${styles.board}`}>
        <div className="circuit-title-row">
          <span className="circuit-node circuit-node--green" aria-hidden="true" />
          <h2 id="lab-notes-title" className="m-0 text-3xl md:text-4xl">
            Preuves / mini jeux
          </h2>
          <span className="circuit-pinline" aria-hidden="true" />
        </div>

        <p className="section-lead mb-0 mt-3">
          Trois mini jeux: scope, bode et triage validation. Score total: <strong>{totalScore}</strong>
        </p>

        <div className={`${styles.grid} mt-4`}>
          <article className={styles.module}>
            <p className={styles.kicker}>Mini jeu 01</p>
            <h3 className={styles.title}>Scope stabilizer</h3>
            <p className={styles.copy}>Cible: {MODE_LABEL[scopeTarget]} + mode actif.</p>
            <div className={styles.switches}>
              {(['charge', 'ripple', 'ringing'] as ScopeMode[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`${styles.switch} ${mode === item ? styles.switchActive : ''}`}
                  onClick={() => setMode(item)}
                >
                  {item}
                </button>
              ))}
              <button
                type="button"
                className={`${styles.switch} ${scopeState === 'active' ? styles.switchActive : ''}`}
                onClick={() => setScopeState((prev) => (prev === 'active' ? 'idle' : 'active'))}
              >
                {scopeState === 'active' ? 'mode actif' : 'activer lecture'}
              </button>
              <button type="button" className={styles.switch} onClick={validateScopeGame}>
                valider
              </button>
            </div>
            <svg
              viewBox="0 0 240 100"
              className={styles.scope}
              role="img"
              aria-label="Waveform scope"
              onPointerEnter={() => setScopeState((prev) => (prev === 'active' ? 'active' : 'hover'))}
              onPointerLeave={() => setScopeState((prev) => (prev === 'active' ? 'active' : 'idle'))}
            >
              <path d="M0 20 H240 M0 40 H240 M0 60 H240 M0 80 H240" className={styles.scopeGrid} />
              <path d={buildScopePath(mode, scopeState)} className={styles.scopeWave} />
            </svg>
            <p className={styles.copy}>{SCOPE_TEXT[mode]}</p>
            <p className={styles.impact}>{scopeMessage}</p>
          </article>

          <article className={styles.module}>
            <p className={styles.kicker}>Mini jeu 02</p>
            <h3 className={styles.title}>Bode lock</h3>
            <p className={styles.copy}>Cible: {bodeTarget} Hz</p>
            <label className={styles.sliderLabel} htmlFor="bode-slider">
              Frequence: {freq} Hz
            </label>
            <input
              id="bode-slider"
              type="range"
              min={20}
              max={100000}
              step={20}
              value={freq}
              onChange={(e) => setFreq(Number(e.target.value))}
              className={styles.slider}
            />
            <button type="button" className={styles.switch} onClick={validateBodeGame}>
              verrouiller
            </button>
            <svg viewBox="0 0 240 84" className={styles.bode} role="img" aria-label="Bode response">
              <path d="M12 20 H228 M12 40 H228 M12 60 H228 M12 78 H228" className={styles.scopeGrid} />
              <path d={bodeCurve} className={styles.bodeCurve} />
              <line x1={cutoffX} y1="16" x2={cutoffX} y2="78" className={styles.bodeCutoff} />
              <circle cx={markerX} cy={markerY} r="4.2" className={styles.bodeMarker} />
            </svg>
            <div className={styles.bodePanel}>
              <p className="m-0">Gain estime: {bodeDb.toFixed(1)} dB</p>
              <p className="m-0">Implication: {freq < 3200 * 0.8 ? 'zone passante utile' : freq <= 3200 * 1.2 ? 'debut attenuation' : 'hors marge'}</p>
              <p className="m-0">{bodeMessage}</p>
            </div>
          </article>

          <article className={styles.module}>
            <p className={styles.kicker}>Mini jeu 03</p>
            <h3 className={styles.title}>Validation triage</h3>
            <ol className={styles.log}>
              {LOG_ITEMS.map((item) => (
                <li
                  key={item.id}
                  className={`${styles.logItem} ${item.status === 'ok' ? styles.statusOk : styles.statusWarn}`}
                >
                  <p className={styles.logTitle}>{item.label}</p>
                  <p className={styles.logDetail}>{item.detail}</p>
                  <div className={styles.switches}>
                    <button
                      type="button"
                      className={`${styles.switch} ${triageAnswers[item.id] === 'ok' ? styles.switchActive : ''}`}
                      onClick={() => setTriage(item.id, 'ok')}
                    >
                      ok
                    </button>
                    <button
                      type="button"
                      className={`${styles.switch} ${triageAnswers[item.id] === 'warn' ? styles.switchActive : ''}`}
                      onClick={() => setTriage(item.id, 'warn')}
                    >
                      warn
                    </button>
                  </div>
                </li>
              ))}
            </ol>
            <button type="button" className={styles.switch} onClick={validateTriageGame}>
              evaluer triage
            </button>
            <p className={styles.impact}>{triageMessage}</p>
          </article>
        </div>

        <CtaDualRail className="mt-5" label="Passer des mini jeux au plan de mission" />
      </div>
    </section>
  );
}
