import { withSiteBase } from '../lib/paths';

export function LabHomePage() {
  const labPublicPath = `${withSiteBase('/lab/')}`;

  return (
    <section className="lab-panel">
      <p className="lab-kicker">Module C</p>
      <h1>Lab interactif React Router</h1>
      <p>
        Cet espace accueille les experiences interactives qui demandent un routage client,
        une logique d'etat plus riche et des iterations UI rapides.
      </p>
      <div className="lab-grid">
        <article>
          <h2>Pourquoi ce module</h2>
          <p>
            Conserver une base statique lisible pour la conversion, et isoler les zones
            experimentales sans alourdir le site principal.
          </p>
        </article>
        <article>
          <h2>Contrat d'integration</h2>
          <p>
            Chemin public: <code>{labPublicPath}</code>. Deploiement via build Vite, independent du template statique.
          </p>
        </article>
      </div>
    </section>
  );
}
