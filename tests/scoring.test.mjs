// Tests for the scoring formula in src/lib/framework/scoring.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';

const { calculateTotalScore, calculateProjectScores, getScoreFromMapping } =
  await import('../src/lib/framework/scoring.ts');
const { SCORE_WEIGHTS } = await import('../src/lib/framework/types.ts');
const { getAllCriteria } = await import('../src/lib/framework/scoring.ts');
const { projects } = await import('../src/lib/data/projects/index.ts');

const close = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} != ${b}`);

// Raw values that land in the best mapping of every criterion.
function perfectRawValues() {
  const raw = {};
  for (const c of getAllCriteria()) {
    const top = (m) => (Array.isArray(m.score) ? m.score[1] : m.score);
    const best = [...c.mappings].sort((a, b) => top(b) - top(a))[0];
    raw[c.id] = best.min;
  }
  return raw;
}

test('weights are 0.4 / 0.4 / 0.2 and sum to 1', () => {
  assert.deepEqual({ ...SCORE_WEIGHTS }, { chain: 0.4, control: 0.4, fairness: 0.2 });
  close(SCORE_WEIGHTS.chain + SCORE_WEIGHTS.control + SCORE_WEIGHTS.fairness, 1);
});

test('total score applies the weights', () => {
  close(calculateTotalScore(10, 0, 0), 4);
  close(calculateTotalScore(0, 10, 0), 4);
  close(calculateTotalScore(0, 0, 10), 2);
  close(calculateTotalScore(8, 6, 5), 0.4 * 8 + 0.4 * 6 + 0.2 * 5);
});

test('mapping interpolates within a range and clamps at the top', () => {
  const m = [
    { min: 0, max: 10, score: [0, 10] },
    { min: 10, max: 20, score: 10 },
  ];
  close(getScoreFromMapping(5, m), 5);
  close(getScoreFromMapping(15, m), 10);
  close(getScoreFromMapping(25, m), 10);
});

test('kill switch: B5 = 0 caps the total at 1.0', () => {
  const raw = perfectRawValues();
  const free = calculateProjectScores(raw);
  assert.equal(free.killSwitchActive, false);
  assert.ok(free.totalScore > 1, `expected > 1, got ${free.totalScore}`);

  const capped = calculateProjectScores({ ...raw, B5: 0 });
  assert.equal(capped.killSwitchActive, true);
  assert.equal(capped.totalScore, 1);
  assert.ok(capped.uncappedScore > 1, 'uncapped score stays visible');
});

test('kill switch stays off for B5 >= 1', () => {
  const raw = perfectRawValues();
  const r = calculateProjectScores({ ...raw, B5: 1 });
  assert.equal(r.killSwitchActive, false);
  assert.ok(r.totalScore > 1);
});

test('project total equals the weighted category scores (rounded)', () => {
  for (const p of projects) {
    const s = p.scores;
    if (s.killSwitchActive) {
      assert.ok(s.totalScore <= 1, `${p.id}: capped total must be <= 1`);
      continue;
    }
    const expected = calculateTotalScore(s.chainScore, s.controlScore, s.fairnessScore);
    assert.ok(Math.abs(s.totalScore - expected) <= 0.1 + 1e-9, `${p.id}: ${s.totalScore} vs ${expected}`);
  }
});

test('Bitcoin is the benchmark: highest total score of all projects', () => {
  const btc = projects.find((p) => p.id === 'bitcoin');
  assert.ok(btc, 'bitcoin project exists');
  assert.equal(btc.scores.killSwitchActive, false);
  for (const p of projects) {
    if (p.id === 'bitcoin') continue;
    assert.ok(btc.scores.totalScore >= p.scores.totalScore,
      `${p.id} (${p.scores.totalScore}) beats bitcoin (${btc.scores.totalScore})`);
  }
});
