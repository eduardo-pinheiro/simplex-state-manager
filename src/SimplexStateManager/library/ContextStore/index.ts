import { SuperStore } from "../SuperStore";
import { IListenerId, IStateType, IListener } from "../../types";

export class ContextStore {
  private storeId = Math.random();
  private listeners: Record<IStateType, Record<IListenerId, IListener<any>>> = { };

  constructor() {
    this.createStore();
  }

  getState<ValueType>(type: IStateType) {
    const store = this.getStore();
    return store[type] as ValueType;
  }

  setState<ValueType>(type: IStateType, value: ValueType) {
    const store = this.getStore();
    store[type] = value;
    this.dispatchListeners(type);
  }

  addListener<ValueType>(type: IStateType, listener: IListener<ValueType>) {
    const listenerId = Math.random();

    if (!this.listeners[type]) {
      this.listeners[type] = { [listenerId]: listener };
    } else {
      this.listeners[type][listenerId] = listener;
    }

    return listenerId;
  }

  destroyListener(type: IStateType, listenerId: IListenerId) {
    if (this.listeners?.[type]?.[listenerId]) {
      delete this.listeners?.[type]?.[listenerId];
    }
  }

  private createStore() {
    SuperStore.setStore(this.storeId, { });
  }

  private getStore() {
    return SuperStore.getStore(this.storeId);
  }

  private dispatchListeners(type: IStateType) {
    if (typeof this.listeners[type] === 'object') {
      const state = this.getState(type);
      Object.values(this.listeners[type]).forEach((listener) => {
        listener(state);
      })
    }
  }
}
