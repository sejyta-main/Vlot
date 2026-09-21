# Acoustic pronunciation endpoint

Browser speech-to-text tells Vlot which words were recognised; it does not reliably reveal which phoneme was acoustically wrong. Vlot therefore labels its local feedback as “possible sound signals.”

For genuine acoustic feedback, Settings accepts a pronunciation endpoint. During a speaking exercise Vlot records four seconds and sends multipart form data:

| Field | Meaning |
|---|---|
| `audio` | Browser WebM/Opus recording |
| `target` | Expected Dutch sentence |
| `locale` | `nl-BE` |
| `itemId` | Stable curriculum item ID |

Expected JSON:

```json
{
  "overall": 81,
  "provider": "validated-service-name",
  "feedback": "Keep the vowel in ‘uur’ longer.",
  "phonemes": [
    {"phoneme":"yː", "word":"uur", "score":62}
  ]
}
```

## Release gate

Do not enable or market phoneme scores merely because a vendor returns numbers. The selected engine must:

- support Dutch acoustically, not map Dutch text onto an English model;
- document its phoneme inventory and score semantics;
- be evaluated with adult non-native Dutch speakers, including Spanish L1 speakers;
- show useful agreement with qualified human raters;
- provide consent, retention and deletion controls for voice recordings;
- separate intelligibility from accent similarity.

Until those conditions are met, the local transcript-based coaching is the honest default.
