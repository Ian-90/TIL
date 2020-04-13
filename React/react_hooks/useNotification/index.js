import React from 'react';
import { useNotification } from './useNotification'

function App() {
  const triggerNotification = useNotification('Can I help you ?', { body: "hello world" })
  return (
    <div className="App">
      <button onClick={triggerNotification}>Hello</button>
    </div>
  );
}

export default App;
