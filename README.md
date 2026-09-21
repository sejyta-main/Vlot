# Vlot

Vlot is a mobile-first Belgian Dutch teacher. It combines a guided CEFR path with adaptive retrieval, listening scaffolds, pronunciation practice, and real-world speaking missions.

## What the current release does

- Builds a personal daily lesson around the learner's goal, time budget, due reviews, and weakest skill.
- Tracks listening, dictation, writing, and speaking independently.
- Uses spaced retrieval rather than treating exposure as mastery.
- Shows A1–A2 progress as practical CEFR-style “can do” outcomes.
- Includes a short placement scan, a three-step listening ladder, shadowing, pronunciation drills, and scenario-based speaking missions.
- Works as an installable offline PWA. Learning data stays in the browser unless the optional Gemini coach is used.

## Run locally

Serve the directory over HTTP so browser speech and service-worker features can work:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080` in Chrome or Edge. For the strongest experience on Android, enable Dutch (Belgium) in Gboard and allow microphone access.

## Validate

```bash
npm test
```

The project intentionally has no runtime dependency or build step. GitHub Pages can publish the repository root directly.

## Product direction

The evidence review, competitor comparison, learning model, privacy constraints, and staged roadmap are documented in [PRODUCT_STRATEGY.md](PRODUCT_STRATEGY.md).
