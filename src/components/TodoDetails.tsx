import React, { useCallback, useEffect } from "react";

import type { Todo } from "../types/Todo";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodoAsync,
  fetchTodos,
  updateTodoAsync,
} from "../store/todosSlice";
import type { AppDispatch, RootState } from "../store/store";

import { useParams } from "react-router-dom";
import { TODO_URL } from "../DataBase/TODO_URL";

const TodoDetails = () => {
  const getTodoUrl = (id: string) => `${TODO_URL}/${id}`;
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.todos.loading);
  const [todo, setTodo] = React.useState<Todo | undefined>(undefined);

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

  useEffect(() => {
    const fetchTodo = async () => {
      if (id) {
        const response = await fetch(getTodoUrl(id));
        const data = await response.json();
        setTodo(data);
      } else {
        setTodo(undefined);
      }
    };
    fetchTodo();
  }, [id]);

  if (!todo) {
    return <div>Задача не найдена</div>;
  }

  return (
    <>
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
    </>
  );
};

export default TodoDetails;
