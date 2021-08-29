import { OneAboveAll } from "../OneAboveAll";

export default class {
  private storeKey = Math.random().toString();

  constructor() {
    this.createStore();
  }

  newState<ValueType>(key: string) {
    const dispatch = (value: ValueType) => this.setState<ValueType>(key, value);
    const getState = () => this.getState<ValueType>(key);
    const useState = () => [getState(), dispatch] as [ValueType, (value: ValueType) => void];
    return { dispatch, getState, useState };
  }

  private createStore() {
    OneAboveAll.setState(this.storeKey, { });
  }

  private getStore() {
    return OneAboveAll.getState(this.storeKey) as Record<string, unknown>;
  }

  private getState<ValueType>(key: string) {
    const store = this.getStore();
    return store[key] as ValueType;
  }

  private setState<ValueType>(key: string, value: ValueType) {
    const store = this.getStore();
    const newValue = value;
    store[key] = newValue;
  }
}
