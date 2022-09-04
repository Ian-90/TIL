import React from "react";

interface TodoListProps {
  items: {
    id: string
    text: string
  }[]

  onDeleteTodo: (todoId: string) => void
}

const TodoList: React.FC<TodoListProps> = ({ items, onDeleteTodo }) => {

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <span>{item.text}</span>
          <button onClick={onDeleteTodo.bind(null, item.id)}>DELETE</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
