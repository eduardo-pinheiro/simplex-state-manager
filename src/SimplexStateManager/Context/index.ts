import { OneAboveAll } from "../OneAboveAll";

type IRerenderFunction = React.Dispatch<React.SetStateAction<string | undefined>>;

export default class {
  private storeKey = Math.random().toString();
  private rerenderCallbacks: Record<string, Record<string, IRerenderFunction>> = { };

  constructor() {
    this.createStore();
  }

  newUseSimplexState<ValueType>(key: string, setUpdaterRef: IRerenderFunction) {
    const updaterRefKey: string = Math.random.toString();

    if (!this.rerenderCallbacks[key]) {
      this.rerenderCallbacks[key] = { [updaterRefKey]: setUpdaterRef }
    } else {
      this.rerenderCallbacks[key][updaterRefKey] = setUpdaterRef;
    }

    const dispatch = (value: ValueType) => this.setState<ValueType>(key, value);
    const getState = () => this.getState<ValueType>(key);
    const useSimplexState = () => [getState(), dispatch] as [ValueType, (value: ValueType) => void];
    const destroyListener = () => {
      if (this.rerenderCallbacks?.[key]?.[updaterRefKey]) {
        delete this.rerenderCallbacks[key][updaterRefKey];
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
    if (typeof this.rerenderCallbacks[key] === 'object') {
      Object.values(this.rerenderCallbacks[key]).forEach((rerenderCallback) => {
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
