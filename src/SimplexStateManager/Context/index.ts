import { OneAboveAll } from "../OneAboveAll";

export default class {
  private storeKey = Math.random().toString();

  constructor() {
    this.createStore();
  }

  private createStore() {
    OneAboveAll.setState(this.storeKey, { });
  }

  private getStore() {
    return OneAboveAll.getState(this.storeKey) as Record<string, unknown>;
  }

  getState<ValueType>(key: string) {
    const store = this.getStore();
    return store[key] as ValueType;
  }

  setState<ValueType>(key: string, value: ValueType) {
    const store = this.getStore();
    const newValue = value;
    store[key] = newValue;
  }
}
