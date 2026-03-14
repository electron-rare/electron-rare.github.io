import { TRACK_EVENTS } from '@/lib/tracking';
import type { TrackEventName } from '@/lib/tracking';

export const HERO_TITLE_WORDS = ['Électronique embarquée du signal au produit'] as const;

export const ABOUT_FAMILIES = [
  'Embarqué et audio : architecture matérielle, alimentation, batterie, microcontrôleurs — du schéma au PCB testé. Conception selon les règles IPC-A-610 et CEM.',
  'Contrôle LED et scénographie : pilotage, diffusion, topologies multi-cartes pour la scène et l\u2019événement. Protocoles DMX, Art-Net, DANTE.',
  'Énergie et IoT : VE.Direct, télémétrie, capteurs, protocoles terrain, TinyML / IA embarquée — de la mesure à la décision.',
  'Industriel et automatisme : automates Siemens/Schneider, variateurs, armoires, câblage et mise en service. Conformité IEC 60204-1, IEC 61439, NFC 13-200.',
  'Consulting et formation : audit technique, accompagnement conception, gestion de projet électronique, workflows agentiques et IA appliquée à l\u2019embarqué. Formation en école, entreprise et centre de formation.'
] as const;

export type SprintStatus = 'trace' | 'bench' | 'run';

export type SprintCard = {
  title: string;
  window: string;
  status: SprintStatus;
  progress: number;
  objective: string;
  deliverables: string[];
};

export const SPRINT_CARDS: SprintCard[] = [
  {
    title: 'Diagnostic',
    window: '1 à 2 semaines',
    status: 'trace',
    progress: 28,
    objective: 'Analyser votre besoin, identifier les sous-systèmes critiques et livrer une carte de faisabilité.',
    deliverables: ['analyse de faisabilité', 'risques identifiés', 'plan d\u2019action']
  },
  {
    title: 'Prototype',
    window: '4 à 6 semaines',
    status: 'bench',
    progress: 55,
    objective: 'Concevoir et tester un prototype fonctionnel : schéma, PCB, firmware, mesures et validation.',
    deliverables: ['prototype testé', 'mesures documentées', 'go/no-go argumenté']
  },
  {
    title: 'Mission complète',
    window: '2 à 6 mois',
    status: 'run',
    progress: 100,
    objective: 'Développement complet jusqu\u2019au produit industrialisable : itérations, tests terrain, documentation et transfert.',
    deliverables: ['livrables par lot', 'dossier de production', 'transfert clé en main']
  }
];

export type CaseStudy = {
  tag: string;
  color: 'cyan' | 'vio' | 'amber';
  title: string;
  context: string;
  intervention: string;
  result: string;
  link?: {
    label: string;
    href: string;
    event: TrackEventName;
    destination: string;
    external?: boolean;
  };
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    tag: 'Industries créatives',
    color: 'cyan',
    title: 'Système audio embarqué sur batterie pour le spectacle',
    context: 'KXKM, compagnie de spectacle vivant — besoin d\u2019un système audio autonome, portable, résistant au terrain.',
    intervention: 'Architecture ESP32, gestion batterie LiFePO4, amplification classe D, firmware custom. Conception PCB complète et prototypage.',
    result: 'Système déployé en tournée : 8h d\u2019autonomie, mise à jour OTA, zéro panne sur 2 saisons.',
    link: {
      label: 'Voir le repo hardware',
      href: 'https://github.com/KomplexKapharnaum/KXKM_ESP32_Audio_Battery_hardware',
      event: TRACK_EVENTS.outboundGithubProjectAudioBattery,
      destination: 'github.com/KomplexKapharnaum/KXKM_ESP32_Audio_Battery_hardware',
      external: true
    }
  },
  {
    tag: 'Industrie',
    color: 'vio',
    title: 'Diagnostic et remise en service d\u2019une ligne automatisée',
    context: 'Site industriel — automate Siemens S7 en défaut, production arrêtée, équipe locale en difficulté.',
    intervention: 'Diagnostic terrain : lecture programme, analyse des E/S, identification du défaut variateur. Remise en service et documentation.',
    result: 'Ligne relancée en 3 jours. Procédure de diagnostic documentée pour l\u2019équipe maintenance.'
  },
  {
    tag: 'Formation',
    color: 'amber',
    title: 'Formation PCB et embarqué pour une école d\u2019art numérique',
    context: 'École supérieure — étudiants designers avec zéro bagage électronique, besoin de prototyper leurs projets.',
    intervention: 'Programme sur mesure 3 jours : bases électroniques, KiCad, soudure, ESP32. Chaque étudiant repart avec un PCB fonctionnel.',
    result: '12 étudiants formés, 8 prototypes fonctionnels. Format reconduit l\u2019année suivante.'
  }
];
