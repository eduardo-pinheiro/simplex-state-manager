import { OneAboveAll } from "../OneAboveAll";

type IDispatchListener = (ref: string | undefined) => void;

export default class {
  private storeKey = Math.random().toString();
  private dispatchListeners: Record<string, Record<string, IDispatchListener>> = { };

  constructor() {
    this.createStore();
  }

  newUseSimplextState<ValueType>(key: string, dispatchListener: IDispatchListener) {
    const dispatchKey: string = Math.random.toString();

    if (!this.dispatchListeners[key]) {
      this.dispatchListeners[key] = { [dispatchKey]: dispatchListener };
    } else {
      this.dispatchListeners[key][dispatchKey] = dispatchListener;
    }

    const dispatch = (value: ValueType) => this.setState<ValueType>(key, value);
    const getState = () => this.getState<ValueType>(key);
    const useSimplexState = () => [getState(), dispatch] as [ValueType, (value: ValueType) => void];
    const destroyListener = () => {
      if (this.dispatchListeners?.[key]?.[dispatchKey]) {
        delete this.dispatchListeners[key][dispatchKey];
      }
    };

    return { useSimplexState, destroyListener };
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

  private dispatchRerenderCallbacks(key: string) {
    if (typeof this.dispatchListeners[key] === 'object') {
      Object.values(this.dispatchListeners[key]).forEach((rerenderCallback) => {
        const newRef = Math.random().toString();
        rerenderCallback(newRef);
      })
    }
  }

  private setState<ValueType>(key: string, value: ValueType) {
    const store = this.getStore();
    store[key] = value;
    this.dispatchRerenderCallbacks(key);
  }
}
