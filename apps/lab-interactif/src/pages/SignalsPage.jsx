const signals = [
  { label: 'Interaction density', value: '74%', note: 'navigation testee sur 3 patterns' },
  { label: 'Prototype confidence', value: 'B+', note: 'gates a11y et perf a renforcer' },
  { label: 'Narrative coherence', value: '82%', note: 'DA premium respectee sur les vues clefs' }
];

export function SignalsPage() {
  return (
    <section className="lab-panel">
      <p className="lab-kicker">Signals</p>
      <h1>Tableau de signaux</h1>
      <p>Vue rapide sur l'etat des experiments interactifs en cours.</p>
      <div className="signal-grid">
        {signals.map((signal) => (
          <article key={signal.label}>
            <h2>{signal.label}</h2>
            <strong>{signal.value}</strong>
            <p>{signal.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
