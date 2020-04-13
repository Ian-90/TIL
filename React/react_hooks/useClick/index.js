import React from 'react';
import { useClick } from './useClick'

function App() {
  const sayHello = () => console.log('say hello')
  const title = useClick(sayHello)
  return (
    <div className="App">
      <h1 ref={title}>Hi</h1>
    </div>
  );
}

export default App;
