import { readFile } from 'node:fs/promises';
import { strict as assert } from 'node:assert';
import vm from 'node:vm';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
assert.equal(scripts.length, 1, 'expected one inline application script');
new vm.Script(scripts[0], { filename: 'index.inline.js' });

const ids = [...html.matchAll(/\sid=["']([^"']+)["']/g)].map(m => m[1]);
assert.equal(new Set(ids).size, ids.length, 'HTML contains duplicate IDs');

for (const id of ['scr-onboard', 'scr-home', 'scr-placement', 'scr-session', 'scr-path', 'scr-missions', 'scr-mission']) {
  assert.match(html, new RegExp(`id=["']${id}["']`), `missing screen ${id}`);
}
for (const feature of ['CURRICULUM', 'PLACEMENT', 'MISSIONS', 'renderDailyPlan', 'listenAssist', 'missionSubmit']) {
  assert.match(scripts[0], new RegExp(`\\b${feature}\\b`), `missing feature ${feature}`);
}
for (const level of ['A1', 'A2', 'B1']) assert.ok(html.includes(level), `missing level ${level}`);

const sw = await readFile(new URL('../sw.js', import.meta.url), 'utf8');
assert.ok(sw.includes('manifest.webmanifest'), 'offline asset list is incomplete');
assert.ok(sw.includes("vlot-v5"), 'service worker cache was not bumped for release 5');
console.log('Vlot checks passed: syntax, screens, curriculum, missions, and offline shell.');
