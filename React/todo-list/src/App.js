import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';

class App extends Component {
  constructor(props) {
    super(props);
    this.id = 3
    this.state = {
      input: '',
      todos: [
        { id: 0, text: 'react introduction', checked: false },
        { id: 1, text: 'react introduction', checked: true },
        { id: 0, text: 'react introduction', checked: false }
      ]
    }
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  handleCreate = () => {
    const { input, todos } = this.state;
    this.setState({
      input: '',
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false
      })
    })
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  render() {
    const { input } = this.state;
    const { handleChange, handleCreate, handleKeyPress } = this;
    return (
      <TodoListTemplate form={
        <Form
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
        />
      }>
        <TodoItemList />
      </TodoListTemplate>
    );
  }
}

export default App;