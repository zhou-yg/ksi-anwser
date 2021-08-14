import tableTree from '../lib/q3';

const d1 = [
  { id: 1, name: 'i1' },
];

const d2 = [
  { id: 2, name: 'i2', parentId: 1 },
  { id: 1, name: 'i1' },
];

const dm = [
  { id: 1, name: 'i1' },
  { id: 2, name: 'i2', parentId: 1 },
  { id: 4, name: 'i4', parentId: 3 },
  { id: 3, name: 'i3', parentId: 2 },
  { id: 8, name: 'i8', parentId: 7 }
]

test('测试 初始化', () => {

  const r = tableTree(d1);

  expect(r.children.length).toBe(0);
  expect(r.id).toBe(d1[0].id);
});


test('测试 初始化', () => {

  const r = tableTree(d2);

  expect(r.children.length).toBe(1);
  expect(r.id).toBe(d2[1].id);
});

test('测试 example', () => {

  const r = tableTree(dm);

  expect(r.id).toBe(dm[0].id);
  expect(r.children.length).toBe(1);
  expect(r.children[0].id).toBe(2);
  expect(r.children[0].children.length).toBe(1);
  expect(r.children[0].children[0].id).toBe(3);
  expect(r.children[0].children[0].children.length).toBe(1);
});

