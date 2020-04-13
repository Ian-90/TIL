import React from 'react';
import { useBeforeLeave } from './useBeforeLeave'

function App() {
  const begForLife = () => console.log("Please don't Leave")
  useBeforeLeave(begForLife)
  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
