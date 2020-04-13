import React from 'react';
import { useTabs } from './useTabs'

const content = [
  {
    tab: "Section 1",
    content: "I'm the content of the Section 1"
  },
  {
    tab: "Section 2",
    content: "I'm the content of the Section 2"
  }
]

function App() {
  const { currentItem, changeItem } = useTabs(0, content)
  return (
    <div className="App">
      {content.map((section, idx) => (
        <button onClick={() => changeItem(idx)}>{section.tab}</button>
      ))}
      <div>
        {currentItem.content}
      </div>
    </div>
  );
}

export default App;
