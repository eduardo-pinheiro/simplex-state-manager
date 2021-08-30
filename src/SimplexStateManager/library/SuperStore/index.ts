import { IStore, IStoreId } from "../../types";

export class SuperStore {
  private static stores: Record<IStoreId, IStore> = { };

  static getStore(storeId: IStoreId) {
    return this.stores[storeId];
  }

  static setStore(storeId: IStoreId, newStore: IStore) {
    this.stores[storeId] = newStore;
  }
}
