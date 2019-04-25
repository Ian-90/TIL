import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoList from './components/TodoItemList';

class App extends Component {
  render() {
    return (
      <TodoListTemplate form={<Form />}>
        <TodoList />
      </TodoListTemplate>
    );
  }
}

export default App;