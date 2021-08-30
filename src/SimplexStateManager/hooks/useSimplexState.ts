import { useCallback, useContext, useEffect, useState } from "react";
import { SimplexContext } from "../Provider/SimplexContext";
import { IStateType } from "../types";

export function useSimplexState<ValueType>(type: IStateType) {
  const { contextStore } = useContext(SimplexContext);
  const [state, refreshState] = useState<ValueType>(contextStore.getState(type));
  const setState = useCallback((value: ValueType) => contextStore.setState(type, value), [contextStore, type]);

  useEffect(() => {
    const listenerId = contextStore.addListener(type, refreshState);
    return () => contextStore.destroyListener(type, listenerId);
  }, [contextStore, type]);

  return [state, setState] as [ValueType, (value: ValueType) => void];
}
