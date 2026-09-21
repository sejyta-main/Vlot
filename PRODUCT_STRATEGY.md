# Vlot product and learning strategy

## Product promise

Vlot should answer one question every day: **what is the smallest lesson that will make this learner more capable in a real Dutch conversation?**

It is not a vocabulary game and it should not claim that XP equals language level. The teacher loop is:

1. Diagnose the learner by skill and communicative task.
2. Select due retrieval plus one achievable new step.
3. Model useful Belgian Dutch in context.
4. Require recall, listening, and spoken production.
5. Give a specific recast or scaffold, not merely right/wrong feedback.
6. Re-test later and show progress as things the learner can do.

## Competitive benchmark

| Product strength | What it demonstrates | Vlot's response |
|---|---|---|
| Duolingo: low-friction lessons, habit loop, broad exercise variety | Starting must feel effortless and progress must stay visible | A short daily plan, streak, XP, and a one-tap start remain, but skill mastery is reported separately |
| Babbel/Busuu: structured courses and CEFR framing | Learners need a coherent route, not an endless exercise feed | A1–A2 path and communicative “can do” milestones |
| Memrise: native-useful phrases and contextual video/audio | Language must sound like people the learner will meet | Belgian Dutch notes, `nl-BE` voice preference, and a future native-speaker media layer |
| Pimsleur: graduated recall and oral response | Speaking improves when recall is timed and answers are produced aloud | Per-skill spaced retrieval and speaking stages from shadowing to unscripted recall |
| Speak/AI conversation products: plentiful low-anxiety speaking turns | A learner needs far more speaking turns than a conventional lesson provides | Re-playable speaking missions with open spoken answers and corrective model responses |
| LingQ-style input systems: learner-chosen comprehensible content | Volume and interest matter after the foundations | Planned B1 content feed with transcript, saved phrases, and difficulty control |

This comparison is about mechanisms, not a claim that one app is universally “best.” Store ratings fluctuate by country and date and are a poor proxy for durable learning.

## Evidence translated into design

### Spacing and retrieval

A meta-analysis of 48 second-language experiments found a medium-to-large benefit for spaced over massed practice, with longer spacing helping delayed retention. Vlot therefore keeps an independent review clock for each sentence and skill and prioritizes due recall rather than replaying comfortable material.

Source: Kim & Webb, *Language Learning* (2022), [The Effects of Spaced Practice on Second Language Learning](https://onlinelibrary.wiley.com/doi/10.1111/lang.12479).

### Communicative, action-oriented progression

The CEFR is not merely a six-label ladder. It separates reception, production, interaction, mediation, strategies, fluency, and phonological control, and recommends an action-oriented approach. Vlot reports practical “can do” outcomes and adds scenario missions so isolated sentences transfer to goal-oriented interaction.

Source: Council of Europe (2020), [CEFR Companion Volume](https://rm.coe.int/common-european-framework-of-reference-for-languages-learning-teaching/16809ea0d4).

### Scaffolded listening

Listening practice must preserve a reason to listen before exposing the transcript. Vlot's ladder moves from natural audio to slower audio, meaningful chunks, and only then text. This keeps the first attempt focused on gist while still giving a beginner a route out of failure.

The CEFR's oral-comprehension scales distinguish conversation, instructions, announcements, and recorded media; future content should measure each instead of collapsing them into one listening score.

### Output, interaction, and corrective feedback

Recognition alone does not prepare a learner to take a turn. Vlot makes the learner produce Dutch through writing, spoken recall, and scenario responses. Mission feedback accepts a range of meaningful answers, then supplies a concise model recast to imitate. The next technical phase should replace browser transcription heuristics with phoneme- and fluency-aware feedback validated for non-native Dutch.

### Motivation without false mastery

Streaks and XP support habit formation but can reward tapping rather than competence. Vlot keeps them as motivational signals while its level meter uses repeated performance over time across four skills. A CEFR label is presented as curriculum progress, not certification.

## What changed in release 5

- Goal and time-budget onboarding.
- Six-item route-selection scan with an explicit non-certification disclaimer.
- Personalized daily lesson explanation: due retrieval, weak-skill focus, and real-world transfer.
- A1 and A2 curriculum map with durable mastery and “can do” statements; B1 is visible but honestly marked as upcoming.
- Adaptive session length and extra priority for the weakest skill.
- Three-rung listening scaffold: slow audio, chunks, transcript.
- Four multi-turn speaking missions for shopping, healthcare, small talk, and work.
- Weekly practice time, session history, and per-skill attempt/success telemetry stored locally.
- Better accessibility focus states and reduced-motion support.
- State migration so existing learner progress is retained.

## Roadmap: what is required before calling Vlot a complete digital teacher

### Next: validated A1–A2 curriculum

- Expand from 156 isolated sentences to sequenced lessons containing dialogue, grammar noticing, controlled practice, free production, and cumulative review.
- Have Belgian Dutch teachers review register, regional variation, translations, distractors, and CEFR alignment.
- Replace synthetic-only audio with consented native Belgian recordings at natural and learner-adjusted speeds.
- Add reading, extended listening, and interaction assessments at the end of each unit.

### Then: B1–B2 and a genuine conversation tutor

- Branching AI roleplay constrained by the learner's level, goal, and studied language.
- Feedback separated into task success, comprehensibility, grammar, vocabulary, fluency, and pronunciation.
- Conversation memory based on recurring errors and mastered constructions, not unrestricted personal data.
- Topic packs for Belgium: gemeente, school, healthcare, work, housing, and social life.

### Measurement and validation

- Establish a baseline and repeat a short parallel assessment every four weeks.
- Track delayed retention, spontaneous speaking time, hint dependence, listening at natural speed, and task completion—not only daily active use.
- Run a pre-registered 8–12 week study against the current release or an active-control practice plan.
- Calibrate internal milestones against an external Dutch assessment before making efficacy claims.

### Engineering

- Move course content and logic out of the single HTML file into versioned modules.
- Add IndexedDB, optional encrypted sync, account portability, and deletion controls.
- Add automated unit, accessibility, offline, and mobile-browser tests.
- Proxy AI requests through a controlled backend; never ask ordinary users to expose provider keys in client code.
- Add privacy documentation, explicit consent for audio processing, retention controls, and a child-safety review before broader distribution.

## Success criteria

Vlot is succeeding when a learner can understand more natural Belgian Dutch, needs fewer hints after a delay, speaks for longer without a script, completes real-life missions, and can demonstrate the same ability outside the app. Engagement is useful only when it produces those outcomes.
