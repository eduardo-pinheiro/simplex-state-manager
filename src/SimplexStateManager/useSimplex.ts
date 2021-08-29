import { useEffect, useMemo, useState } from "react";
import { Context } from ".";


export function useSimplex<ValueType>(context: Context, key: string) {
  const setUpdaterRef = useState<string>()[1];

  const { useSimplexState, destroyListener } = useMemo(() => {
    return context.newUseSimplextState<ValueType>(key, setUpdaterRef);
  }, []);

  useEffect(() => destroyListener, []);

  return useSimplexState;
}
