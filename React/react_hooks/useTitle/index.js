import React from 'react';
import { useTitle } from './useTitle'

function App() {
  const titleUpdate = useTitle("Loading...")
  setTimeout(() => titleUpdate("Home"), 5000)
  return (
    <div className="App">
      <div>Hi</div>
    </div>
  );
}

export default App;
