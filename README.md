# clicknpop-cfa-landing

Placeholder Niveau 3 pour **cfa.clicknpop.fr** (Click'n Pop).

App CFA / OF complète prévue L 25/05/2026 — ce repo remplit le sous-domaine
en attendant et capture la waitlist via Supabase
(`public.commercial_leads`, `source_lead='placeholder_cfa_landing'`,
`type_lead='cfa'`). Le nom du CFA est stocké dans `raison_sociale`
(la table n'a pas de colonne `nom_cfa` dédiée).

## Stack

Next.js 16 + React 19 + OpenNext Cloudflare Workers + Tailwind 4
+ Fraunces serif + IBM Plex Sans + IBM Plex Mono.

## Secrets requis

```bash
wrangler secret put SUPABASE_SERVICE_ROLE_KEY
```

## Commandes

```bash
npm install
npm run dev
npm run deploy
```
