# Der Ball in Hall

Öffentliche Landingpage für den **Ball in Hall 2027** (statisches HTML/CSS/JS).

## Lokal ansehen

1. [index.html](index.html) im Browser öffnen, oder
2. Im Projektordner einen lokalen Server starten und z. B. `http://localhost:8000` aufrufen.

## Assets

- **Club-Logo RT18:** Lege die Datei **`Logo-RT18.jpeg`** im **gleichen Ordner** wie `index.html` ab (Repository-Root). Die Seite verweist darauf; ohne Datei zeigt der Browser ein leeres Bildfeld.
- Für eine saubere Freistellung ist langfristig ein **PNG mit Transparenz** empfohlen. Bis dahin nutzt die Seite eine einheitliche dunkle Logo-Fläche und `mix-blend-mode: lighten` für das JPEG (Wirkung hängt vom Motiv ab).

## Countdown

Sobald **Datum und Uhrzeit** feststehen, in [script.js](script.js) die Konstante `BALL_COUNTDOWN_TARGET_ISO` setzen, z. B. `'2027-01-17T19:00:00+01:00'`. Solange der Wert `null` ist, erscheint der Hinweistext statt des Countdowns.

## Dateien

- [index.html](index.html) — Struktur und Inhalte
- [style.css](style.css) — Layout, Farben (#8B0000, Weiß, Dunkelgrau)
- [script.js](script.js) — Menü, Countdown, Hero-Canvas
