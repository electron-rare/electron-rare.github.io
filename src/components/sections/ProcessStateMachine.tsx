import * as React from 'react';

type StateKey = 's01' | 's02';

type ProcessState = {
  key: StateKey;
  label: string;
  title: string;
  inputs: string[];
  outputs: string[];
  goNoGo: string;
};

const STATES: ProcessState[] = [
  {
    key: 's01',
    label: 'Sprint 01',
    title: 'Architecture & risques',
    inputs: ['Brief produit', 'Contraintes business', 'Contexte technique existant'],
    outputs: ['Archi cible', 'Risk map priorisee', 'Plan de test initial'],
    goNoGo: 'GO si architecture validee et risques critiques couverts par plan de mesure.'
  },
  {
    key: 's02',
    label: 'Sprint 02',
    title: 'Prototype & tests',
    inputs: ['Archi validee', 'BOM cible', 'Jeu de tests de validation'],
    outputs: ['Proto fonctionnel', 'Resultats mesure/test', 'Decision production ou iteration'],
    goNoGo: 'GO si performances tenues et ecarts documentes avec actions de mitigation.'
  }
];

export function ProcessStateMachine() {
  const [active, setActive] = React.useState<StateKey>('s01');
  const current = STATES.find((state) => state.key === active) || STATES[0];

  return (
    <section id="process-etats" className="section-anchor mt-5" aria-labelledby="process-title">
      <div className="circuit-board rounded-2xl p-5 md:p-6">
        <div className="circuit-title-row">
          <span className="circuit-node circuit-node--magenta" aria-hidden="true" />
          <h2 id="process-title" className="m-0 text-3xl md:text-4xl">
            Process en state machine
          </h2>
          <span className="circuit-pinline" aria-hidden="true" />
        </div>

        <p className="section-lead mb-0 mt-3">
          Cliquez un etat pour voir les entrees/sorties et le critere go-no-go associe.
        </p>

        <div className="process-tabs mt-4" role="tablist" aria-label="Etats process">
          {STATES.map((state) => (
            <button
              key={state.key}
              type="button"
              className={`process-tab ${active === state.key ? 'is-active' : ''}`}
              onClick={() => setActive(state.key)}
              role="tab"
              aria-selected={active === state.key}
              aria-controls={`process-panel-${state.key}`}
              id={`process-tab-${state.key}`}
            >
              <span>{state.label}</span>
              <strong>{state.title}</strong>
            </button>
          ))}
        </div>

        <div
          className="process-panel mt-4"
          id={`process-panel-${current.key}`}
          role="tabpanel"
          aria-labelledby={`process-tab-${current.key}`}
        >
          <div className="process-col">
            <p className="process-kicker">Inputs</p>
            <ul>
              {current.inputs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="process-col">
            <p className="process-kicker">Outputs</p>
            <ul>
              {current.outputs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="process-col process-col--decision">
            <p className="process-kicker">Go / No-Go</p>
            <p>{current.goNoGo}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
