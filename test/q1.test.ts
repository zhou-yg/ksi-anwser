import tournament from '../lib/q1';

const d0 = `;
`;

const d1 = `
A;B;win;A
`;

const d2 = `
Allegoric Alaskans;Blithering Badgers;win
Devastating Donkeys;Courageous Californians;draw
Devastating Donkeys;Allegoric Alaskans;win
Courageous Californians;Blithering Badgers;loss
Blithering Badgers;Devastating Donkeys;loss
Allegoric Alaskans;Courageous Californians;win
`;

const d3 = `
Allegoric Alaskans;Blithering Badgers;
Devastating Donkeys;Courageous Californians;draw
Devastating Donkeys;Allegoric Alaskans;win
Courageous Californians;loss
Blithering Badgers;Devastating Donkeys;loss-loss
Allegoric Alaskans;Courageous Californians;win
`;


test('空数据', () => {
  const result = tournament(d0);

  expect(result.team).toStrictEqual({});
});

test('1条数据', () => {
  const result = tournament(d1);

  expect(result.team.A).toEqual({
    mp: 1,
    w: 1,
    d: 0,
    l: 0,
    name: 'A',
    p: 3,
  });
  expect(result.team.B.p).toBe(0);
});


test('正常大量数据', () => {
  const result = tournament(d2);

  expect(result.team['Devastating Donkeys'].p).toBe(7);
  expect(result.team['Allegoric Alaskans'].p).toBe(6);
  expect(result.team['Blithering Badgers'].p).toBe(3);
  expect(result.team['Courageous Californians'].p).toBe(1);
});
test('包含不合法数据', () => {
  const result = tournament(d3);

  expect(result.team['Devastating Donkeys'].p).toBe(4);
});
