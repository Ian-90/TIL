import React from 'react';
import PageTemplate from './PageTemplate'
import TodoInput from './TodoInput'

function App() {
  return (
    <div className="App">
      <PageTemplate>안녕하세요</PageTemplate>
      <TodoInput value={'a'} onChange={() => {}} onInsert={() => {}} />
    </div>
  );
}

export default App;
