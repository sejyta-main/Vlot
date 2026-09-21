# Vlot

Vlot is a mobile-first Belgian Dutch teacher. It combines a complete A1–B2 CEFR path with adaptive retrieval, listening scaffolds, pronunciation practice, measured outcomes, real-world speaking missions and level-aware AI conversation.

## What the current release does

- Builds a personal daily lesson around the learner's goal, time budget, due reviews, and weakest skill.
- Tracks listening, dictation, writing, and speaking independently.
- Uses spaced retrieval rather than treating exposure as mastery.
- Contains 28 sequenced A1–B2 units and 316 sentence targets.
- Shows progress as practical CEFR-style “can do” outcomes rather than treating XP as level mastery.
- Includes a 12-task placement scan, three-step listening ladder, shadowing, transparent sound-level cues, pronunciation drills, scenario-based speaking missions and free AI conversation.
- Stores repeatable checkpoints and reports delayed retrieval, independent listening, speaking missions and communicative outcomes separately.
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

The evidence review and product model are documented in [PRODUCT_STRATEGY.md](PRODUCT_STRATEGY.md). Quality gates remain explicit: see [CURRICULUM_REVIEW.md](CURRICULUM_REVIEW.md), [AUDIO_PRODUCTION.md](AUDIO_PRODUCTION.md), [SPEECH_ASSESSMENT.md](SPEECH_ASSESSMENT.md), and [AI_ENDPOINT.md](AI_ENDPOINT.md).

The advanced curriculum is a review-ready editorial draft, not an externally certified course. Native recordings require human speakers and reviewer sign-off; until then Vlot selects the best available `nl-BE` device voice.
