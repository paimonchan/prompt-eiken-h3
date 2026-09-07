import test from 'node:test';
import assert from 'node:assert/strict';
import { filterEntries, promptSections } from '../src/catalog.js';

const entries = [
  { slug: 'a', title: 'Art to Life', mode: 'fl2va', type: 'i2va', collection: 'experiments', status: 'draft', date: '2026-09-07', tags: ['manhwa', 'loop'], content: '<Picture 1> A soft breeze.', notes: 'Static camera' },
  { slug: 'b', title: 'City', mode: 't2va', collection: 'library', status: 'working', date: '2026-09-06', tags: ['cinematic'], content: 'A skyline at night.' },
];

test('search combines words across metadata, prompt, and notes without case sensitivity', () => {
  assert.deepEqual(filterEntries(entries, { query: 'MANHWA breeze static' }).map(e => e.slug), ['a']);
  assert.equal(filterEntries(entries, { query: 'breeze skyline' }).length, 0);
});
test('mode aliases, collection, tags, and status combine', () => {
  assert.equal(filterEntries(entries, { mode: 'i2va', tag: 'loop', status: 'draft', collection: 'experiments' }).length, 1);
  assert.equal(filterEntries(entries, { mode: 'i2va', status: 'working' }).length, 0);
});
test('favorites filter resolves stored slugs and ignores removed prompts', () => {
  assert.deepEqual(filterEntries(entries, { collection: 'favorites', favorites: ['b', 'removed'] }).map(e => e.slug), ['b']);
});
test('sorting preserves the source collection', () => {
  assert.deepEqual(filterEntries(entries, { sort: 'oldest' }).map(e => e.slug), ['b', 'a']);
  assert.deepEqual(entries.map(e => e.slug), ['a', 'b']);
});
test('prompt sections preserve reference and dialogue markers and split inline values', () => {
  const sections = promptSections('Use <Picture 1>.\n\nintegrated_multimodal_description: Hello <d>[English] Hi</d>\n\noverall_soundscape:\nWind\n\nnon_diegetic_music: Piano');
  assert.equal(sections.length, 4);
  assert.equal(sections[0].content, 'Use <Picture 1>.');
  assert.equal(sections[1].content, 'Hello <d>[English] Hi</d>');
  assert.equal(sections[3].content, 'Piano');
});
