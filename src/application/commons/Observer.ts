import Config, { LISTENER_CONFIG } from "../config.ts";

type _ObserverItem = {
  event: string;
  callback: Function;
};

class Observer {
  observers: _ObserverItem[];
  events: string[] = [];

  constructor(events: string[]) {
    this.observers = [];
    this.events = events;
  }

  $on(events: string | string[], callback: Function) {
    if (typeof events == "string") {
      events = [events];
    }

    events.forEach((event: string) => {
      this.isValidEvent(event);

      if (Config.listener & LISTENER_CONFIG.REGISTERING) {
        console.info(`[DEBUG] Registering callback for event '${event}'`, {
          callback,
        });
      }
      this.observers.push({
        event,
        callback,
      });
    });

    return this;
  }

  unset(observer: _ObserverItem) {
    this.observers = this.observers.filter((item: _ObserverItem) => {
      if (Config.listener & LISTENER_CONFIG.UNREGISTERING) {
        console.info(
          `[DEBUG] Unregistering callback for event '${item.event}'`,
          { callback: item.callback }
        );
      }
      if (item !== observer) {
        return item;
      }
    });
    return this;
  }

  $emit(event: string, ...args: any) {
    let promises: Promise<any>[] = [];

    this.observers
      .filter((observer) => observer.event === event)
      .forEach((observer) => {
        if (Config.listener & LISTENER_CONFIG.EMITTING) {
          console.info(`[DEBUG] Triggering callback for event '${event}'`, {
            callback: observer.callback,
            args,
          });
        }
        promises.push(Promise.resolve(observer.callback(...args)));
      });

    return Promise.all(promises);
  }

  isValidEvent(event: string) {
    if (this.events) {
      if (!this.events.includes(event)) {
        throw new Error(`Event '${event}' is not a valid event`);
      }
    }
  }
}

export default Observer;
