interface IEventStackMember {
  type: 'event';
  value: string;
  extra?: any;
}

interface IFunctionStackMember {
  type: 'callback';
  value: Function;
}

class EventTriggerContext {
  stack: Array<IFunctionStackMember | IEventStackMember> = [];
  eventObj: MyEvent;
  constructor(eventObj: MyEvent) {
    this.eventObj = eventObj;
  }
  getEventDomain() {
    return Object.assign(this.eventObj, {
      getContext: () => {
        return this;
      }
    });
  }
  addStack(value: string | Function, extra?: any) {
    if (typeof value === 'function') {
      this.stack.push({
        type: 'callback',
        value,
      });
    }
    if (typeof value === 'string') {
      this.stack.push({
        type: 'event',
        value,
        extra,
      });
    }
  }
}

class MyEvent {
  eventMap: Map<string, Function[]> = new Map();
  constructor(){}
  on(name: string, fn: Function) {
    let listeners = this.eventMap.get(name);
    if (!listeners) {
      listeners = [];
      this.eventMap.set(name, listeners);
    }

    listeners.push(fn);
  }
  off(name: string, fn?: Function) {
    if (fn) {
      const listeners = this.eventMap.get(name);
      if (listeners) {
        const i = listeners.indexOf(fn);
        if (i >= 0) {
          listeners.splice(i, 1);
        }
      }
    } else {
      this.eventMap.set(name, []);
    }
  }
  getContext(): null | EventTriggerContext {
    return null;
  }
  trigger(name: string, args?: any) {
    const listeners = this.eventMap.get(name);
    if (listeners) {
      let context = this.getContext();
      if (!context) {
        context = new EventTriggerContext(this);
      }
      context.addStack(name, args);

      listeners.forEach(fn => {
        context.addStack(fn, fn.name);
        fn.call(context.getEventDomain(), args);
      });
    }
  }
}

export default MyEvent;