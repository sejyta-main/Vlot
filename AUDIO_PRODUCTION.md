# Native Belgian Dutch audio production

Status: **recording pipeline implemented; native recordings pending**

Vlot automatically checks `audio/recordings.js` for a reviewed clip before using device text-to-speech. This lets the course improve sentence by sentence without breaking offline fallback.

## Recording specification

- Two adult Belgian Standard Dutch speakers, ideally from different regions.
- Natural conversational delivery, not exaggerated classroom articulation.
- One neutral full-speed take per target.
- Optional slower take made by re-speaking naturally, never digitally stretching below 0.8×.
- Mono WAV master, 48 kHz, 24-bit; delivery MP3 or Opus at high quality.
- Peak no higher than -1 dBTP; consistent perceived loudness across speakers.
- Quiet room, stable microphone distance, no aggressive noise removal.
- Written consent covering educational distribution and future edits.

## Naming and manifest

For item `u13-01`, place the approved delivery clip at `audio/u13-01.mp3` and add:

```js
var NATIVE_AUDIO={
  "u13-01": {
    src: "audio/u13-01.mp3",
    speaker: "speaker-code",
    region: "Antwerpen",
    reviewedBy: "reviewer-code",
    reviewedAt: "YYYY-MM-DD"
  }
};
```

## Recording QA

Each clip must pass:

- exact script match;
- natural stress, rhythm and final devoicing;
- no accidental Netherlands-only pronunciation or hyper-local dialect unless labeled;
- speaker, region, consent and reviewer metadata;
- playback on Android Chrome and iOS Safari;
- offline cache behavior.

Synthetic audio must remain labeled as a device voice. It should never be represented as a native human recording.
