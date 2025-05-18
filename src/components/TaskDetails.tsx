import { useDispatch, useSelector } from "react-redux";
import { deleteTodoAsync, updateTodoAsync } from "../store/todosSlice";
import type { AppDispatch, RootState } from "../store/store";
import { useCallback } from "react";
import type { Todo } from "../types/Todo";
import { useNavigate, useParams } from "react-router-dom";
import { TODO_URL } from "../DataBase/TODO_URL";

const TaskDetails = () => {
  const { id } = useParams();
  const taskURL = `${TODO_URL}/${id}`;

  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const loading = useSelector((state: RootState) => state.todos.loading);

  const todosCopy = [...todos];
  const todo = todosCopy.find((todo) => {
    console.log("Comparing todo.id:", todo.id, "with id:", id);
    return String(todo.id) === id;
  });

  const navigate = useNavigate();

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
      navigate(-1);
    },
    [dispatch]
  );
  return (
    <div>
      {todo ? (
        <div>
          <button className="task__btn-backward" onClick={() => navigate(-1)}>
            Назад
          </button>
          <div className={todo.completed ? "completed" : ""}>{todo.title}</div>
          <button
            disabled={loading || todo.completed}
            onClick={() => requestCopmleteTask(todo)}
          >
            Завершить
          </button>
          <button disabled={loading} onClick={() => requestDeleteTask(todo.id)}>
            Удалить
          </button>
        </div>
      ) : (
        <>
          <div>Задача не найдена!</div>
          <button onClick={() => navigate("/")}>На главную</button>
        </>
      )}
    </div>
  );
};

export default TaskDetails;
