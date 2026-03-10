import * as React from 'react';

type NodeTab = 'inputs' | 'outputs' | 'risques';

const NODE_W = 100;
const NODE_H = 40;

type SystemNode = {
  id: string;
  label: string;
  svgLabel?: string;
  x: number;
  y: number;
  ifaces: string[];
  inputs: string[];
  outputs: string[];
  risques: string[];
};

const SYSTEM_NODES: SystemNode[] = [
  {
    id: 'alim',
    label: 'Alimentation',
    x: 8,
    y: 18,
    ifaces: ['Power'],
    inputs: ['Source batterie/secteur', 'Contraintes rendement', 'Budget thermique'],
    outputs: ['Rails stables', 'Marge dynamique', 'Plan decouplage'],
    risques: ['Ringing', 'Chute transitoire', 'EMI conduite']
  },
  {
    id: 'capteurs',
    label: 'Capteurs',
    x: 145,
    y: 18,
    ifaces: ['Analog', 'I2C', 'SPI'],
    inputs: ['Signal analogique', 'Fenetre acquisition', 'Calibration'],
    outputs: ['Data propre', 'Filtres initiaux', 'Events valides'],
    risques: ['Bruit analogique', 'Derive thermique', 'Aliasing']
  },
  {
    id: 'bus',
    label: 'Bus I2C/SPI/UART',
    svgLabel: 'I2C/SPI/UART',
    x: 282,
    y: 18,
    ifaces: ['I2C', 'SPI', 'UART'],
    inputs: ['Topologie bus', 'Frequence cible', 'Charge lineaire'],
    outputs: ['Synchronisation stable', 'Trames tracees', 'Budget latence'],
    risques: ['Contention', 'Reflexions', 'Timeout protocole']
  },
  {
    id: 'radio',
    label: 'Radio RF',
    x: 282,
    y: 98,
    ifaces: ['RF'],
    inputs: ['Bandes frequences', 'Duty cycle', 'Coexistence locale'],
    outputs: ['Lien stable', 'RSSI/PER traces', 'Budget antenne'],
    risques: ['Desense', 'Interferences', 'Portee degradee']
  },
  {
    id: 'dfm',
    label: 'Mecanique / DFM',
    x: 145,
    y: 98,
    ifaces: [],
    inputs: ['Contraintes encombre', 'Assemblage', 'Volume serie'],
    outputs: ['Placement valide', 'Regles fab', 'Check industrialisation'],
    risques: ['Empilement impossible', 'Rework cher', 'Dissipation insuffisante']
  }
];

// Paths stop 8 px before target edge to leave room for arrowhead
type Conn = { from: string; to: string; d: string };
const CONNECTIONS: Conn[] = [
  { from: 'alim',     to: 'capteurs', d: 'M 108 38 H 137' },
  { from: 'capteurs', to: 'bus',      d: 'M 245 38 H 274' },
  { from: 'bus',      to: 'radio',    d: 'M 332 58 V 90'  },
  { from: 'capteurs', to: 'dfm',      d: 'M 195 58 V 90'  },
  { from: 'dfm',      to: 'radio',    d: 'M 245 118 H 274' }
];

const ALL_INTERFACES = ['Power', 'Analog', 'I2C', 'SPI', 'UART', 'RF'] as const;

const TABS: { id: NodeTab; label: string }[] = [
  { id: 'inputs',  label: 'Inputs'  },
  { id: 'outputs', label: 'Outputs' },
  { id: 'risques', label: 'Risques' }
];

export function IdentityLab() {
  const [activeNodeId, setActiveNodeId] = React.useState('alim');
  const [activeTab, setActiveTab] = React.useState<NodeTab>('inputs');
  const node = SYSTEM_NODES.find((n) => n.id === activeNodeId) ?? SYSTEM_NODES[0];

  const tabValues: Record<NodeTab, string[]> = {
    inputs:  node.inputs,
    outputs: node.outputs,
    risques: node.risques
  };

  function handleSelect(id: string) {
    setActiveNodeId(id);
    setActiveTab('inputs');
  }

  return (
    <section id="identite" aria-labelledby="identity-title" className="section-anchor mt-5">
      <div className="circuit-board rounded-2xl p-5 md:p-6">
        <div className="circuit-title-row">
          <span className="circuit-node circuit-node--magenta" aria-hidden="true" />
          <h2 id="identity-title" className="m-0 text-3xl md:text-4xl">
            Offre en system map
          </h2>
          <span className="circuit-pinline" aria-hidden="true" />
        </div>

        <p className="mb-0 mt-3 max-w-3xl studio-muted">
          Niveaux systeme + interfaces: cliquez un noeud pour lire les inputs, outputs et risques reels de delivery.
        </p>

        <div className="system-map-layout mt-4">
          {/* ── SVG canvas ─────────────────────────────────── */}
          <div className="system-map-canvas">
            <div className="system-map-scroll">
              <svg
                viewBox="0 0 390 148"
                className="system-map-svg"
                role="img"
                aria-label="Carte systeme electronique"
              >
                <defs>
                  {/* Arrow marker — fill driven by CSS `color` on the path */}
                  <marker
                    id="sm-arrow"
                    markerWidth="8"
                    markerHeight="8"
                    refX="7"
                    refY="4"
                    orient="auto"
                    markerUnits="userSpaceOnUse"
                  >
                    <path d="M 0 1 L 7 4 L 0 7 Z" fill="currentColor" />
                  </marker>

                  {/* Glow filter for active node */}
                  <filter id="sm-node-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {CONNECTIONS.map((conn) => {
                  const hot = conn.from === activeNodeId || conn.to === activeNodeId;
                  return (
                    <path
                      key={`${conn.from}-${conn.to}`}
                      d={conn.d}
                      className={`system-map-link ${hot ? 'is-hot' : ''}`}
                      markerEnd="url(#sm-arrow)"
                    />
                  );
                })}

                {SYSTEM_NODES.map((item) => {
                  const active = item.id === activeNodeId;
                  const cx = item.x + NODE_W / 2;
                  const cy = item.y + NODE_H / 2;
                  return (
                    <g
                      key={item.id}
                      className="system-map-node-group"
                      role="button"
                      tabIndex={0}
                      aria-label={`Noeud ${item.label}`}
                      aria-pressed={active}
                      filter={active ? 'url(#sm-node-glow)' : undefined}
                      onClick={() => handleSelect(item.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelect(item.id);
                        }
                      }}
                    >
                      <rect
                        x={item.x}
                        y={item.y}
                        width={NODE_W}
                        height={NODE_H}
                        rx={7}
                        className={`system-map-node ${active ? 'is-active' : ''}`}
                      />
                      <text
                        x={cx}
                        y={cy + 4}
                        textAnchor="middle"
                        className={`system-map-label ${active ? 'is-active' : ''}`}
                      >
                        {item.svgLabel ?? item.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Interface badges — highlighted for active node */}
            <div className="system-map-interfaces">
              {ALL_INTERFACES.map((iface) => (
                <span
                  key={iface}
                  className={`system-map-interface ${node.ifaces.includes(iface) ? 'is-active' : ''}`}
                >
                  {iface}
                </span>
              ))}
            </div>
          </div>

          {/* ── Detail panel ───────────────────────────────── */}
          <article className="system-map-panel">
            <p className="system-map-panel-kicker">Noeud actif</p>
            <h3 key={activeNodeId} className="system-map-panel-title">
              {node.label}
            </h3>

            <div className="system-map-tabs" role="tablist" aria-label="Details noeud">
              {TABS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === id}
                  className={`system-map-tab ${activeTab === id ? 'is-active' : ''}`}
                  onClick={() => setActiveTab(id)}
                >
                  {label}
                </button>
              ))}
            </div>

            <ul key={`${activeNodeId}-${activeTab}`} className="system-map-details">
              {tabValues[activeTab].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
