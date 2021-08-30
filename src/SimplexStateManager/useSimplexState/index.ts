import { useCallback, useEffect, useState } from "react";
import { Context } from "..";
import { IContextType } from "../types";

export function useSimplexState<ValueType>(context: Context, type: IContextType) {
  const [state, refreshState] = useState<ValueType>(context.getState(type));
  const setState = useCallback((value: ValueType) => context.setState(type, value), [context, type]);

  useEffect(() => {
    const listenerId = context.addListener(type, refreshState);
    return () => context.destroyListener(type, listenerId);
  }, [context, type]);

  return [state, setState] as [ValueType, (value: ValueType) => void];
}
