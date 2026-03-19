# Spec d'integration lead — Site Public -> Frappe CRM

Date: 2026-03-19

## Objectif

Acheminer les soumissions du formulaire contact en production directement vers Frappe CRM Lead, tout en gardant un fallback sécurisé vers l'ancien CRM custom tant que la bascule n'est pas totalement close.

## Flux cible

1. Visiteur remplit `src/components/sections/Contact.astro`.
2. Clic sur `Envoi` envoie un `POST /api/submit-lead` (JSON).
3. `src/pages/api/submit-lead.ts`:
   - valide champs (`name`, `email`, `consent`).
   - mappe vers payload Frappe.
   - tente `POST ${FRAPPE_URL}/api/resource/CRM Lead`.
   - fallback vers `${CRM_FALLBACK_URL}/api/intake/lead` si Frappe indisponible.
4. Réponse UI:
   - succès: écran de succès local
   - échec: message d’erreur + trace de tracking

## Contrats techniques

- Environnement requis (runtime Docker):
  - `FRAPPE_URL`
  - `FRAPPE_API_KEY`
  - `FRAPPE_API_SECRET`
  - `CRM_FALLBACK_URL` (optionnel)
- Endpoint front: `CONTACT_FORM_ENDPOINT`
  - `import.meta.env.PUBLIC_API_URL` + `/api/submit-lead` (prod)
  - fallback `'/api/submit-lead'`

## Risques connus

- Si la vérification CORS doit couvrir un nouveau hostname, ajouter l’origine dans `ALLOWED_ORIGINS`.
- Les erreurs côté lead peuvent remonter sans détail JSON détaillé dans le client (redondance volontaire pour éviter fuite de secrets).

## Critères d’acceptation

- Un `POST /api/submit-lead` valide crée un lead dans Frappe.
- En cas de KO Frappe, fallback custom répond `2xx` si activé.
- Logs applicatifs montrent un parcours traceable sans fuite de secret.
