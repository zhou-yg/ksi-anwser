import buildLinkList from '../lib/q2';


const d1 = [
  { id: 2, first: true },
  { id: 7, last: true },
  { id: 8, last: true },
  { id: 1 },
];

const d2 = [
  { id: 1 },
  { id: 2, before: 1 },
  { id: 7, after: 1 },
  { id: 8, after: 1 },
];

const d3 = [
  { id: 1 },
  { id: 2, before: 1 },
  { id: 11, after:  12 },
  { id: 7, after: 1 },
  { id: 8, after: 1 },
];


const dm = [
  { id: 1 },
  { id: 2, before: 1 },
  { id: 3, after: 1 },
  { id: 5, first: true },
  { id: 6, last: true },
  { id: 7, after: 8 },
  { id: 8 },
  { id: 9 },
];

test('测试 first last', () => {
  const result = buildLinkList(d1);

  expect(result).toEqual([2, 1, 7, 8]);
});

test('测试 before after', () => {
  const result = buildLinkList(d2);

  expect(result).toEqual([2, 1, 8, 7]);
});

test('测试 无效节点', () => {
  const result = buildLinkList(d3);

  expect(result).toEqual([2, 1, 8, 7]);
});

test('测试 example', () => {
  const result = buildLinkList(dm);

  expect(result).toEqual([5, 2, 1, 3, 8, 7, 9, 6]);
});
