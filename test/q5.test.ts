import MyEvent from '../lib/q5';

test('测试 调用栈', done => {

  const bus = new MyEvent();

  const eventArg = 'event-arg';

  function callback1(e: string) {
    expect(e).toBe(eventArg);

    this.trigger('init2', eventArg + eventArg);
  }

  function callback2(e: string) {
    const stack = this.getContext()?.stack || []

    expect(e).toBe(eventArg + eventArg);

    expect(stack[0]?.value).toBe('init');
    expect(stack[1]?.value).toBe(callback1);
    expect(stack[2]?.value).toBe('init2');
    expect(stack[3]?.value).toBe(callback2);

    done();
  }

  bus.on('init', callback1);

  bus.on('init2', callback2);

  bus.trigger('init', eventArg);
});


test('测试 trigger多次触发', () => {

  const bus = new MyEvent();

  let calledTimes = 0;

  bus.on('init', function (e: string) {
    calledTimes++;
  });

  bus.trigger('init');
  bus.trigger('init');

  expect(calledTimes).toBe(2);
});


test('测试 off', () => {

  const bus = new MyEvent();

  let calledTimes = 0;

  bus.on('init', function (e: string) {
    calledTimes++;
  });

  bus.trigger('init');
  bus.off('init')
  bus.trigger('init');

  expect(calledTimes).toBe(1);
});

test('测试 off指定callback', () => {

  const bus = new MyEvent();

  let calledTimes = 0;

  function callback1(e: string) {
    calledTimes++;
  }
  function callback2(e: string) {
    calledTimes++;
  }
  bus.on('init', callback1);
  bus.on('init', callback2);

  bus.trigger('init');
  bus.off('init', callback1);
  bus.trigger('init');

  expect(calledTimes).toBe(3);
});

