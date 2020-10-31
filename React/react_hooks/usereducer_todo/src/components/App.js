import React from 'react'
import Add from './Add'
import { useGetState } from '../context';
import List from './List'
import ToDo from './ToDo'

function App() {
  const { toDos, completed } = useGetState()
  return (
    <>
      <h1>Add ToDos</h1>
      <Add />
      <List name="To Dos">
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} id={toDo.id} text={toDo.text} />
        ))}
      </List>
      <List name={completed.length !== 0 ? "Completed" : ""}>
        {completed.map((toDo) => (
          <ToDo key={toDo.id} id={toDo.id} text={toDo.text} isCompleted />
        ))}
      </List>
    </>
  );
}

export default App;
