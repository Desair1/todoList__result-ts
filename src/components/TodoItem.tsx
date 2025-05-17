import type { Todo } from "../types/Todo";
import React from "react";

import { Link } from "react-router-dom";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <>
      <li key={todo.id}>
        <Link to={`todos/${todo.id}`}>
          <span className={todo.completed ? "completed" : ""}>
            {todo.title}
          </span>
        </Link>
      </li>
    </>
  );
};

export default React.memo(TodoItem);
