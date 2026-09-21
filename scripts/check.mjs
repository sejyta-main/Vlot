import { readFile } from 'node:fs/promises';
import { strict as assert } from 'node:assert';
import vm from 'node:vm';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
assert.equal(scripts.length, 1, 'expected one inline application script');
new vm.Script(scripts[0], { filename: 'index.inline.js' });

const ids = [...html.matchAll(/\sid=["']([^"']+)["']/g)].map(m => m[1]);
assert.equal(new Set(ids).size, ids.length, 'HTML contains duplicate IDs');

for (const id of ['scr-onboard', 'scr-home', 'scr-placement', 'scr-session', 'scr-path', 'scr-missions', 'scr-mission', 'scr-airoom', 'scr-outcomes', 'scr-checkpoint']) {
  assert.match(html, new RegExp(`id=["']${id}["']`), `missing screen ${id}`);
}
for (const feature of ['CURRICULUM', 'PLACEMENT', 'MISSIONS', 'renderDailyPlan', 'listenAssist', 'missionSubmit', 'openAIConversation', 'renderOutcomes', 'soundSignalHTML']) {
  assert.match(scripts[0], new RegExp(`\\b${feature}\\b`), `missing feature ${feature}`);
}
for (const level of ['A1', 'A2', 'B1']) assert.ok(html.includes(level), `missing level ${level}`);

const sw = await readFile(new URL('../sw.js', import.meta.url), 'utf8');
assert.ok(sw.includes('manifest.webmanifest'), 'offline asset list is incomplete');
assert.ok(sw.includes("vlot-v6"), 'service worker cache was not bumped for release 6');

const advancedSource = await readFile(new URL('../course-advanced.js', import.meta.url), 'utf8');
const sandbox = {}; vm.createContext(sandbox);new vm.Script(advancedSource, { filename: 'course-advanced.js' }).runInContext(sandbox);
const advanced = sandbox.ADVANCED_UNITS;
assert.equal(advanced.length, 16, 'expected eight B1 and eight B2 units');
assert.equal(advanced.filter(u => u.level === 'B1').length, 8, 'B1 unit count');
assert.equal(advanced.filter(u => u.level === 'B2').length, 8, 'B2 unit count');
const itemIds = advanced.flatMap(u => u.items.map(i => i.id));
assert.equal(new Set(itemIds).size, itemIds.length, 'advanced item IDs must be unique');
for (const unit of advanced) {
  assert.equal(unit.items.length, 10, `${unit.id} must contain 10 practice targets`);
  for (const item of unit.items) assert.ok(item.nl && item.en, `${item.id} needs Dutch and English`);
}

const elements = new Map();
const makeElement = id => ({ id, className: '', innerHTML: '', textContent: '', value: '', disabled: false, checked: false,
  style: {}, files: [], classList: { add() {}, remove() {}, toggle() {} },
  addEventListener() {}, appendChild() {}, focus() {}, blur() {}, click() {}, setAttribute() {}
});
const runtime = {
  ADVANCED_UNITS: advanced,
  NATIVE_AUDIO: {},
  window: {},
  document: {
    getElementById(id) { if (!elements.has(id)) elements.set(id, makeElement(id)); return elements.get(id); },
    querySelectorAll() { return []; }, querySelector() { return null; }, createElement: makeElement
  },
  localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
  navigator: {}, location: { protocol: 'http:' },
  addEventListener() {}, scrollTo() {}, setTimeout() { return 1; }, clearTimeout() {},
  confirm() { return true; }, alert() {}, console, Date, Math, JSON, Blob, URL, FileReader: class {}
};
runtime.window = runtime;
vm.createContext(runtime);
new vm.Script(scripts[0], { filename: 'index.runtime.js' }).runInContext(runtime);
assert.equal(vm.runInContext('COURSE.units.length', runtime), 28, 'runtime course should have 28 units');
assert.equal(vm.runInContext('ORDER.length', runtime), 316, 'runtime course should have 316 targets');
for (const call of ['renderPath()', 'renderOutcomes()', 'openMissions()', 'openAIConversation()']) vm.runInContext(call, runtime);
console.log(`Vlot checks passed: syntax, screens, A1–B2 curriculum, ${itemIds.length} advanced targets, AI/outcomes hooks, and offline shell.`);
