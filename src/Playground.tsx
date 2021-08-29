import React, { ChangeEventHandler, useCallback, useMemo } from 'react';
import { Context } from './SimplexStateManager';

const context = new Context();
const TITLE = 'TITLE';

function Playground() {
  return (
    <div>
      <SetValue />
      <LogValue />
    </div>
  );
}

function LogValue() {
  const onLogValue = useCallback(() => {
    const value = context.getState(TITLE);
    console.log(value);
  }, []);

  return <div onClick={onLogValue}>Logar valor</div>;
}

function SetValue() {
  const setState = useCallback((text: string) => {
    context.setState(TITLE, text);
  }, []);

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    const text = event?.target?.value;
    setState(text);
  }, []);

  return <input onChange={onChange} />;
}

export default Playground;
