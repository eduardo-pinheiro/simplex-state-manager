export type IStateType = string;
export type IListenerId = number;
export type IStore = Record<string, unknown>;
export type IStoreId = number;
export type IListener<ValueType> = (value: ValueType) => void;
