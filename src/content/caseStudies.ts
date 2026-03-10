export type CaseStudy = {
  slug: 'studio-core' | 'design-produit' | 'rd-sonore';
  title: string;
  trace: string;
  context: string;
  intervention: string;
  result: string;
  impactLabel: string;
  impactValue: string;
  proofTitle: string;
  proofBody: string;
  proofAsset: string;
  ctaLabel: string;
  ctaHref: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'studio-core',
    title: "L'electron rare",
    trace: 'POWER -> MCU -> TEST',
    context: 'Besoin: plateforme R&D transverse, reutilisable sur plusieurs missions.',
    intervention: 'Architecture electronique + prototypage iteratif + plan de test cadre.',
    result: 'Base systeme stable, exploitable pour accelerer les prochaines executions.',
    impactLabel: 'Impact delivery',
    impactValue: 'Reduction du temps de cadrage technique de 2 semaines a 4 jours.',
    proofTitle: 'Preuve: benchmark I/O + EMI + plan de validation',
    proofBody:
      'Livrable anonymise avec hypotheses, mesures de reference, risques prioritaires et decisions Go/NoGo.',
    proofAsset: '/assets/da/mesure-rig.svg',
    ctaLabel: 'Envoyer un brief',
    ctaHref: '#contact'
  },
  {
    slug: 'design-produit',
    title: 'Bureau conception produit/systeme',
    trace: 'CAPTEURS -> BUS -> DFM',
    context: "Besoin: idee produit avec contrainte planning et enjeux CTO/business.",
    intervention: "Cadrage, maquette fonctionnelle, puis trajectoire d'industrialisation.",
    result: 'Decisions plus rapides cote produit, tech et execution projet.',
    impactLabel: 'Impact risque',
    impactValue: 'Risque planning abaisse par validation precoce des interfaces critiques.',
    proofTitle: 'Preuve: matrice contraintes x arbitrages',
    proofBody:
      'Document de decision qui relie exigences metier, contraintes electronics et priorites de sprint.',
    proofAsset: '/assets/da/mesure-rig.svg',
    ctaLabel: 'Envoyer un brief',
    ctaHref: '#contact'
  },
  {
    slug: 'rd-sonore',
    title: 'Electron Fou (noise)',
    trace: 'AUDIO -> RF -> VALIDATION',
    context: 'Besoin: experimentation artistique avec diffusion publique et exigence de robustesse.',
    intervention: 'Pipeline de production sonore + outillage de validation reproductible.',
    result: 'Preuves publiees et processus reutilisable pour de nouvelles productions.',
    impactLabel: 'Impact fiabilite',
    impactValue: 'Stabilite de performance maintenue sur usage terrain et sessions longues.',
    proofTitle: 'Preuve: protocole audio + logs validation',
    proofBody:
      'Capture de protocole de test avec criteres de stabilite, mesures de bruit et decisions de correction.',
    proofAsset: '/assets/da/mesure-rig.svg',
    ctaLabel: 'Envoyer un brief',
    ctaHref: '#contact'
  }
];

export function getCaseBySlug(slug: string) {
  return CASE_STUDIES.find((item) => item.slug === slug);
}
