import { useDispatch, useSelector } from "react-redux";
import { deleteTodoAsync, updateTodoAsync } from "../store/todosSlice";
import type { AppDispatch, RootState } from "../store/store";
import { useCallback } from "react";
import type { Todo } from "../types/Todo";
import { useParams } from "react-router-dom";
import { TODO_URL } from "../DataBase/TODO_URL";

const TaskDetails = () => {
  const { id } = useParams();
  const taskURL = `${TODO_URL}/${id}`;

  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const loading = useSelector((state: RootState) => state.todos.loading);

  const todo = todos.map((todo) => todo.id === id);

  console.log("typeof id", typeof id);
  console.log("id", id);
  console.log("taskURL", taskURL);

  console.log("todos", todos);
  console.log("typeof todos", typeof todos);
  console.log("todo", todo);

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
      {/* <button
        disabled={loading || todo.completed}
        onClick={() => requestCopmleteTask(todo)}
      >
        Завершить
      </button>
      <button disabled={loading} onClick={() => requestDeleteTask(todo.id)}>
        Удалить
      </button> */}
    </>
  );
};

export default TaskDetails;
