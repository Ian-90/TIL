import React, { Component } from 'react';
import PageTemplate from './PageTemplate'
import TodoInput from './TodoInput'
import TodoList from './TodoList'

interface ITodos {
  id: number;
  text: string;
  done: boolean;
}

interface IAppState {
  input: string;
  todos: Array<ITodos>;
}

class App extends Component<{}, IAppState> {
  state = {
    input: '',
    todos: [
      {
        id: 0,
        text: 'React Study',
        done: true
      },
      {
        id: 1,
        text: 'Component Styling Todo',
        done: false
      },
    ]
  }

  id = 1

  getId = () => ++this.id

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      input: e.target.value
    })
  }

  handleInsert = () => {
    const { todos, input } = this.state
    const newTodo = {
      id: this.getId(),
      text: input,
      done: false
    }
    
    this.setState({
      todos: [...todos, newTodo],
      input: ''
    })
  }

  handleToggle = (id: number) => {
    const { todos } = this.state
    const index = todos.findIndex(todo => todo.id === id)

    const toggled = {
      ...todos[index],
      done: !todos[index].done
    }

    this.setState({
      todos: [
        ...todos.slice(0, index),
        toggled,
        ...todos.slice(index + 1, todos.length)
      ]
    })
  }

  handleRemove = (id: number) => {
    const { todos } = this.state
    const index = todos.findIndex(todo => todo.id === id)

    this.setState({
      todos: [
        ...todos.slice(0, index),
        ...todos.slice(index + 1, todos.length)
      ]
    })
  }

  render() {
    const { handleChange, handleInsert, handleToggle, handleRemove } = this
    const { input, todos } = this.state
    return (
      <PageTemplate>
        <TodoInput value={input} onChange={handleChange} onInsert={handleInsert} />
        <TodoList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
      </PageTemplate>
    )
  }
}

export default App;
