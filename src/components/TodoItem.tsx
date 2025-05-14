import type { Todo } from "../types/Todo";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { deleteTodoAsync, updateTodoAsync } from "../store/todosSlice";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.todos.loading);
  const error = useSelector((state: RootState) => state.todos.error);

  const requestCopmleteTask = (todo: Todo) => {
    dispatch(updateTodoAsync({ ...todo, completed: todo.completed }));
  };

  const requestDeleteTask = (id: string) => {
    dispatch(deleteTodoAsync(id));
  };

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

export default TodoItem;
