import React from 'react';
import { useScroll } from './useScroll'

function App() {
  const { y } = useScroll()
  return (
    <div className="App" style={{height: '1000vh'}}>
      <h1 style={{ position: 'fixed', color: y > 100 ? 'red' : 'blue' }}>Hello</h1>
    </div>
  );
}

export default App;
