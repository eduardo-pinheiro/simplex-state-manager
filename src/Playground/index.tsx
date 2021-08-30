import React, { ChangeEventHandler, useCallback } from "react";
import { SimplexStateProvider, useSimplexState } from "../SimplexStateManager";

const TITLE = 'TITLE';

const Playground: React.FC = () => {
  return (
    <div>
      <Wrapper />
      <Wrapper />
    </div>
  )
}

const Wrapper: React.FC = () => {
  return (
    <SimplexStateProvider>
      <Label />
      <Input />
    </SimplexStateProvider>
  );
}

const Input: React.FC = () => {
  const setTitle = useSimplexState<string>(TITLE)[1];

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    const text = event?.target?.value;
    setTitle(text);
  }, [setTitle])

  return (
    <input onChange={onChange} />
  );
}

const Label: React.FC = () => {
  const title = useSimplexState<string>(TITLE)[0];

  return (
    <h6>{title}</h6>
  );
}

export default Playground;
