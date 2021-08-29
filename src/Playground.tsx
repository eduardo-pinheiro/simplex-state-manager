import { ChangeEventHandler, useCallback, useState } from 'react';
import { Context } from './SimplexStateManager';
import { useSimplex } from './SimplexStateManager/useSimplex';

const context = new Context();

function Playground() {
  const useSimplexState = useSimplex<string>(context, 'TITLE');
  const [title, setTitle] = useSimplexState();
  
  console.log('title', title);
  
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    const text = event?.target?.value;
    setTitle(text);
  }, []);

  return <input onChange={onChange} value={title} />;
}

export default Playground;
