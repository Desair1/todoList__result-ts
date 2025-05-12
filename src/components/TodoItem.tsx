
import type { Todo } from "../types/Todo";

import useRequestCompleteTask from "../hooks/use-request-complete-task";
import useRequestDeleteTask from "../hooks/use-request-delete-task";
import useFetchTodos from "../hooks/use-fetch-todos";

interface TodoItemProps {
  refreshListFlag: boolean;
  isCreating: boolean;
  refreshList(): void;
}

const TodoItem = ({
  refreshListFlag,
  isCreating,
  refreshList,
}: TodoItemProps) => {

  const { todos } = useFetchTodos(refreshListFlag)

  const { requestCopmleteTask } = useRequestCompleteTask(refreshList);

  const { requestDeleteTask } = useRequestDeleteTask(refreshList);

  return (
    <ul>
      {todos.map((todo: Todo) => (
        <li key={todo.id}>
          <span className={todo.completed ? "completed" : ""}>
            {todo.title}
          </span>
          <button
            disabled={isCreating || todo.completed}
            onClick={() => requestCopmleteTask(todo.id)}
          >
            Завершить
          </button>
          <button
            disabled={isCreating}
            onClick={() => requestDeleteTask(todo.id)}
          >
            Удалить
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoItem;
