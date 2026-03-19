# Veille OSS: alternatives pour soumission de leads (2026-03-19)

## Contexte

Basculement du formulaire de contact du site vers une API serveur Frappe CRM, avec fallback legacy.

## Travaux de veille web (références)

- **Frappe Framework / CRM API**
  - API REST resource : `POST /api/resource/:doctype` selon docs Framework (`Frappe Lead` est un Doctype dédié en CRM).
  - Authentification token basée sur `Authorization: token api_key:api_secret`.
  - Sources: [Frappe REST API](https://docs.frappe.io/framework/user/en/api/rest), [Token Auth v15](https://docs.frappe.io/framework/v15/user/en/guides/integration/rest_api/token_based_authentication), [CRM Lead](https://docs.frappe.io/crm/lead).

- **n8n** (orchestration webhooks)
  - Intéressant comme pont d'intégration si logique métier/IA/relance doit s'intercaler.
  - Docs webhook + self-hosted.
  - Sources: [n8n Webhook node docs](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/), [n8n Docs home](https://docs.n8n.io/).

- **Formbricks**
  - Plateforme de formulaires/feedback open-source avec mode self-host.
  - Peut couvrir le besoin formulaire + analyses côté produit plus riche qu'un simple endpoint.
  - Sources: [Formbricks repo](https://github.com/formbricks/formbricks), [Open Source page](https://formbricks.com/docs/overview/open-source).

- **OhMyForm**
  - Alternative formulaires type TypeForm/TellForm, orientée simplicité.
  - Sources: [OhMyForm repo](https://github.com/ohmyform/ohmyform).

- **Supabase (REST API + BaaS)**
  - Très bon quand on veut centraliser auth/stockage/realtime dans une API PostgREST self-hostée.
  - Sources: [Supabase API docs](https://supabase.com/docs/guides/api), [Architecture](https://supabase.com/docs/architecture).

## Comparatif rapide (positionnement par usage)

- Besoin immédiat: **Frappe direct** reste la moins risquée (aligné stack actuelle).
- Besoin d'orchestration complexe: **n8n** intéressant en complément, si on veut découpler des canaux.
- Besoin formulaire produit + analytics complet: **Formbricks** ou **OhMyForm** à évaluer selon charge d'exploitation.
- Besoin de backend complet et API SQL-centric: **Supabase** (overhead plus élevé) pour une couche générique.

## Actions proposées

1. Garder Frappe CRM comme source de vérité lead.
2. Utiliser n8n uniquement si déclenchements externes (Slack, ticketing, scoring IA) deviennent nécessaires.
3. Reporter une version de bench trimestrielle de coût opérationnel (CPU, RAM, maintenance, équipe).
