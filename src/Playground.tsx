import { ChangeEventHandler, useCallback, useState } from 'react';
import { Context } from './SimplexStateManager';

const context = new Context();

function Playground() {
  const [title, setTitle] = useState<string>();

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    const text = event?.target?.value;
    setTitle(text);
  }, []);

  return <input onChange={onChange} value={title} />;
}

export default Playground;
