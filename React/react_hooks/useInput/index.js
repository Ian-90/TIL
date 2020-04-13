import React from 'react';
import { useInput } from './useInput'

function App() {
  const maxLen = (value) => value.length <= 10
  const name = useInput("Mr. ", maxLen)
  return (
    <div className="App">
      <input placeholder="Name" value={name.value} onChange={name.onChange} />
    </div>
  );
}

export default App;
