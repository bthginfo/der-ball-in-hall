# Der Ball in Hall

Öffentliche Landingpage für den **Ball in Hall 2027** (statisches HTML/CSS/JS).

## Lokal ansehen

1. [index.html](index.html) im Browser öffnen, oder
2. Im Projektordner einen lokalen Server starten und z. B. `http://localhost:8000` aufrufen.

## Logo Round Table 18

Die Datei **`logo-rt18-innsbruck.png`** liegt im gleichen Ordner wie `index.html`. Bei einem weißen Bildhintergrund kann später eine PNG-Version mit Transparenz eingetauscht werden.

## Countdown

In [script.js](script.js) die Konstante `BALL_COUNTDOWN_TARGET_ISO` setzen (ISO-Datum/Uhrzeit), sobald der Balltermin fix ist — z. B. `'2027-01-17T19:00:00+01:00'`. Bei `null` erscheint der Hinweistext statt des Countdowns.

## Dateien

- [index.html](index.html) — Struktur und Inhalte
- [style.css](style.css) — Layout (dunkles Theme, Goldakzente)
- [script.js](script.js) — Menü, Countdown, Hero-Canvas
