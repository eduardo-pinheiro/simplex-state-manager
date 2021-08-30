import { ChangeEventHandler, useCallback } from 'react';
import { Context, useSimplexState } from './SimplexStateManager';

const context = new Context();

function Playground() {
  const [title, setTitle] = useSimplexState<string>(context, 'TITLE');

  console.log('title', title);

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    const text = event?.target?.value;
    setTitle(text);
  }, [setTitle]);

  return <input onChange={onChange} value={title} />;
}

export default Playground;
