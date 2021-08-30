import { OneAboveAll } from "../OneAboveAll";
import { IContextListenerId, IContextType } from "../types";

export class Context {
  private storeId = Math.random().toString();
  private listeners: Record<IContextType, Record<IContextListenerId, (value: any) => void>> = { };

  constructor() {
    this.createStore();
  }

  getState<ValueType>(type: IContextType) {
    const store = this.getStore();
    return store[type] as ValueType;
  }

  setState<ValueType>(type: IContextType, value: ValueType) {
    const store = this.getStore();
    store[type] = value;
    this.dispatchListeners(type);
  }

  addListener<ValueType>(type: IContextType, listener: (value: ValueType) => void) {
    const listenerId = Math.random();

    if (!this.listeners[type]) {
      this.listeners[type] = { [listenerId]: listener };
    } else {
      this.listeners[type][listenerId] = listener;
    }

    return listenerId;
  }

  destroyListener(type: IContextType, listenerId: IContextListenerId) {
    if (this.listeners?.[type]?.[listenerId]) {
      delete this.listeners?.[type]?.[listenerId];
    }
  }

  private createStore() {
    OneAboveAll.setState(this.storeId, { });
  }

  private getStore() {
    return OneAboveAll.getState(this.storeId) as Record<string, unknown>;
  }

  private dispatchListeners(type: IContextType) {
    if (typeof this.listeners[type] === 'object') {
      const state = this.getState(type);
      Object.values(this.listeners[type]).forEach((listener) => {
        listener(state);
      })
    }
  }
}
