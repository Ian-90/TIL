import React, { Component } from 'react'
import TodoItem from '../TodoItem'

interface todosObj {
  id: number;
  text: string;
  done: boolean;
}

interface ITodoListProps {
  todos: Array<todosObj>;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

class TodoList extends Component<ITodoListProps, {}> {
  shouldComponentUpdate = (nextProps:ITodoListProps, nextState: {}) => this.props.todos !== nextProps.todos

  render() {
    const { todos, onToggle, onRemove } = this.props
    const todoList = todos.map(
      todo => (
        <TodoItem
          key={todo.id}
          done={todo.done}
          onToggle={() => onToggle(todo.id)}
          onRemove={() => onRemove(todo.id)}
        >
          {todo.text}
        </TodoItem>
      )
    )
    return (
      <div>
        {todoList}
      </div>
    )
  }
}

export default TodoList
