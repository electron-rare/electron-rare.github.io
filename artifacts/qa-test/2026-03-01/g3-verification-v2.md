# G3 Verification Evidence (v2)

Vérifications exécutées:
- `python3 -m http.server 4173`
- `curl -I http://127.0.0.1:4173/` -> `HTTP/1.0 200 OK`
- `rg 'href="/' index.html` (attendu: aucune occurrence)
- Capture Playwright: `artifacts/qa-test/2026-03-01/site-home-v2.png`
