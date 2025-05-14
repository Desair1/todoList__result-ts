import type { Todo } from "../types/Todo";
import React, { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { deleteTodoAsync, updateTodoAsync } from "../store/todosSlice";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.todos.loading);

  const requestCopmleteTask = useCallback(
    (todo: Todo) => {
      dispatch(updateTodoAsync({ ...todo, completed: todo.completed }));
    },
    [dispatch]
  );

  const requestDeleteTask = useCallback(
    (id: string) => {
      dispatch(deleteTodoAsync(id));
    },
    [dispatch]
  );

  return (
    <>
      <li key={todo.id}>
        <span className={todo.completed ? "completed" : ""}>{todo.title}</span>
        <button
          disabled={loading || todo.completed}
          onClick={() => requestCopmleteTask(todo)}
        >
          Завершить
        </button>
        <button disabled={loading} onClick={() => requestDeleteTask(todo.id)}>
          Удалить
        </button>
      </li>
    </>
  );
};

export default React.memo(TodoItem);
