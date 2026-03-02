const prototypes = [
  {
    title: 'Flow mission brief',
    status: 'In review',
    desc: 'Wizard de cadrage mission avec sorties DA + tracking event map.'
  },
  {
    title: 'Interactive scene card',
    status: 'Draft',
    desc: 'Carte projet animable pour narration systeme et preuves live.'
  },
  {
    title: 'Lab telemetry shell',
    status: 'Scaffolded',
    desc: 'Base React Router prete pour brancher des donnees de suivi internes.'
  }
];

export function PrototypesPage() {
  return (
    <section className="lab-panel">
      <p className="lab-kicker">Prototypes</p>
      <h1>Backlog interactif</h1>
      <ul className="prototype-list">
        {prototypes.map((item) => (
          <li key={item.title}>
            <div>
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
            </div>
            <span>{item.status}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
