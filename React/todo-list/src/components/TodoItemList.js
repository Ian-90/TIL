import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component {
  render() {
    const { todos, onToggle, onRemove } = this.props;
    return (
      <div>
        <TodoItem text='hello' />
        <TodoItem text='react' />
        <TodoItem text='nice to meet you' />
      </div>
    );
  }
}

export default TodoItemList;