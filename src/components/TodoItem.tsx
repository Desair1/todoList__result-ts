import React from "react";

import type TodoProp from "../types/TodoProp";

import { Link } from "react-router-dom";

const TodoItem = ({ todo }: TodoProp) => {
  return (
    <li>
      <Link to={`/task/${todo.id}`} key={todo.id}>
        <span className={todo.completed ? "completed" : ""}>{todo.title}</span>
      </Link>
    </li>
  );
};

export default React.memo(TodoItem);
