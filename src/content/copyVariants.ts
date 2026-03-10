export type CopyVariant = 'public' | 'cto';

type MissionLabels = {
  productType: string;
  constraint: string;
  deadline: string;
};

type MissionPlanLabels = {
  recommended: string;
  copyBrief: string;
  copiedBrief: string;
  sendBrief: string;
  briefTitle: string;
  productLine: string;
  constraintLine: string;
  deadlineLine: string;
  planLine: string;
};

type MissionRecommendations = {
  emiQuick: string;
  emiStandard: string;
  autonomie: string;
  cout: string;
  rf: string;
  defaultPlan: string;
};

export type CopyContent = {
  hero: {
    title: string;
    body: string;
  };
  about: {
    title: string;
    paragraphs: string[];
  };
  mission: {
    title: string;
    subtitle: string;
    labels: MissionLabels;
    planLabels: MissionPlanLabels;
    recommendations: MissionRecommendations;
  };
  contact: {
    title: string;
    lead: string;
    helpText: string;
    formKicker: string;
    copyBrief: string;
    sendByMail: string;
    dmRailLabel: string;
    mailSubject: string;
  };
};

export const COPY_VARIANTS: Record<CopyVariant, CopyContent> = {
  public: {
    hero: {
      title: 'From idea to measured reality.',
      body:
        "Une idee, c'est une etincelle. Un produit, c'est une orchestration. Je transforme votre intention en systeme vivant: architecture claire, prototype instrumente, mesures qui tranchent, puis un plan propre pour avancer vers la production."
    },
    about: {
      title: 'From idea to measured reality.',
      paragraphs: [
        "Entre une idee et un produit, il y a un moment ou tout doit tenir: ca marche aujourd'hui, demain, et dans des conditions reelles. C'est la que beaucoup de projets bloquent, non pas par manque d'inspiration, mais parce qu'il manque une methode pour transformer une intuition en realite solide.",
        "Mon role, c'est de vous guider de l'idee a un premier modele qui dit la verite: ce qui marche, ce qui ne marche pas, et pourquoi. On construit, on teste, on corrige, et on stabilise.",
        "Je ne fais pas juste fabriquer un truc: je compose l'ensemble pour que tout fonctionne harmonieusement, et je vous laisse avec un resultat exploitable et un plan clair pour aller plus loin."
      ]
    },
    mission: {
      title: 'Mission configurator (30 secondes)',
      subtitle: 'Trois choix rapides pour cadrer un brief concret, comprenable et actionnable.',
      labels: {
        productType: 'Type produit',
        constraint: 'Contrainte #1',
        deadline: 'Deadline'
      },
      planLabels: {
        recommended: 'Plan recommande',
        copyBrief: 'Copier le brief',
        copiedBrief: 'Brief copie',
        sendBrief: 'Envoyer le brief',
        briefTitle: 'Brief mission produit',
        productLine: 'Produit',
        constraintLine: 'Contrainte prioritaire',
        deadlineLine: 'Deadline',
        planLine: 'Plan recommande'
      },
      recommendations: {
        emiQuick:
          'Sprint 01: clarifier les points sensibles et lancer des tests simples de perturbation. Sprint 02: corriger les causes majeures puis revalider.',
        emiStandard:
          'Construire une architecture stable, verifier les signaux critiques et valider la robustesse avec un plan de tests progressif.',
        autonomie:
          "Mesurer la consommation dans les usages reels, optimiser les postes lourds, puis valider l'autonomie cible avec marge.",
        cout: 'Identifier les composants les plus chers, proposer des alternatives, puis verifier que la qualite reste au niveau.',
        rf:
          'Verifier la fiabilite de la liaison, ajuster antenne/layout si besoin, puis confirmer les performances dans un environnement reel.',
        defaultPlan:
          "Cadrage en 2 sprints: objectif clair, prototype fonctionnel, tests concrets, puis decision de suite sur des preuves."
      }
    },
    contact: {
      title: 'Demarrer une mission',
      lead: 'Deux voies simples: DM LinkedIn direct ou form bref pre-rempli.',
      helpText:
        "Le configurator remplit deja la base du brief. Vous pouvez le copier, l'ajuster, puis l'envoyer pour demarrer vite.",
      formKicker: 'Voie 2 / Form bref',
      copyBrief: 'Copier le brief',
      sendByMail: 'Envoyer par mail',
      dmRailLabel: 'Voie 1 / DM LinkedIn',
      mailSubject: 'Brief mission produit'
    }
  },
  cto: {
    hero: {
      title: 'From idea to measured reality.',
      body:
        'Je transforme une intention produit en systeme maitrise: architecture, prototype instrumente, mesures, decisions. On remplace les suppositions par des preuves (tests, risques, arbitrages) et on securise la trajectoire. Objectif: un prototype credible et un handoff propre vers l industrialisation.'
    },
    about: {
      title: 'From idea to measured reality.',
      paragraphs: [
        "Un produit electronique ne se resume pas a une carte: c'est un systeme ou energie, signaux, timing, interfaces et validation doivent rester coherents. Les derives viennent rarement d'un composant unique, elles viennent des interactions: alimentations qui decrochent, integrite de signal fragile, EMI, thermique, RF, testabilite.",
        "Je conçois l'electronique comme une orchestration: architecture (interfaces, contraintes, risques, priorites), prototype (bring-up, instrumentation, plan de mesure), validation (Go/NoGo, logs, rapport, decisions tranchees), handoff (DFM/industrialisation, documentation, plan d'iteration).",
        "Mon role n'est pas de faire du design. C'est de mettre le systeme sous controle, pour accelerer les bonnes decisions et reduire le risque jusqu'au passage production."
      ]
    },
    mission: {
      title: 'Mission configurator (30 secondes)',
      subtitle: 'Cadrez un brief exploitable: contraintes, risques dominants et trajectoire de validation.',
      labels: {
        productType: 'Type produit',
        constraint: 'Contrainte dominante',
        deadline: 'Horizon delivery'
      },
      planLabels: {
        recommended: 'Plan recommande',
        copyBrief: 'Copier le brief',
        copiedBrief: 'Brief copie',
        sendBrief: 'Envoyer le brief',
        briefTitle: 'Brief mission electronique',
        productLine: 'Produit',
        constraintLine: 'Contrainte prioritaire',
        deadlineLine: 'Deadline',
        planLine: 'Plan recommande'
      },
      recommendations: {
        emiQuick:
          'Sprint 01: architecture alim + plan de mesure EMI prioritaire. Sprint 02: proto cible + pre-scan.',
        emiStandard:
          'Architecture CEM complete, routage critique, puis validation pre-scan et plan de mitigation.',
        autonomie:
          'Profil de charge + budget energie, puis arbitrage MCU/RF et validation consommation en usage reel.',
        cout: 'Optimisation BOM par blocs critiques, equivalences composants et validation risque appro.',
        rf: 'Cadre RF: topologie antenne, isolation bruit, essais liaison et robustesse en environnement reel.',
        defaultPlan:
          'Cadrage mission en 2 sprints: risques systeme, prototype fonctionnel, puis go/no-go industriel.'
      }
    },
    contact: {
      title: 'Demarrer une mission',
      lead: 'Deux voies: DM LinkedIn direct ou form bref pre-rempli.',
      helpText:
        'Le configurator renseigne automatiquement le brief. Vous pouvez copier ce texte ou l envoyer via mail.',
      formKicker: 'Voie 2 / Form bref',
      copyBrief: 'Copier le brief',
      sendByMail: 'Envoyer par mail',
      dmRailLabel: 'Voie 1 / DM LinkedIn',
      mailSubject: 'Brief mission electronique'
    }
  }
};
