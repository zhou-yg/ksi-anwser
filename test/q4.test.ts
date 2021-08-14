import dominoes from '../lib/q4';

const d1 = [
  [2, 1],
  [2, 3],
  [1, 3]
];

const d2 = [
  [1, 2],
  [4, 1],
  [2, 3]
];

const dm = [[1, 2], [5, 3], [3, 1], [1, 2], [2, 4], [1, 6], [2, 3], [3, 4], [5, 6]];


test('测试 初始化', () => {

  const r = dominoes(d1);

  expect(r).toEqual([
    [2, 1],
    [1, 3],
    [3, 2]
  ])
});

test('测试 invalid', () => {

  const r = dominoes(d2);

  expect(r).toEqual([
  ])
});

test('测试 example', () => {

  const r = dominoes(dm);

  expect(r).toEqual([
    [1, 2],
    [2, 1],
    [1, 3],
    [3, 2],
    [2, 4],
    [4, 3],
    [3, 5],
    [5, 6],
    [6, 1]
  ])
});