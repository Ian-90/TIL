import React from 'react';
import { usePreventLeave } from './usePreventLeave'

function App() {
  const { enablePrevent, disablePrevent } = usePreventLeave()
  return (
    <div className="App">
      <button onClick={enablePrevent}>Protect</button>
      <button onClick={disablePrevent}>Unprotect</button>
    </div>
  );
}

export default App;
