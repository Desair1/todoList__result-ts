import { useEffect, useState } from "react";

import type { Todo } from "../types/Todo";

import { TODO_URL } from "../DataBase/TODO_URL";
import styles from "../index.css";

const TodoItem = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(TODO_URL);
        if (!response.ok) {
          throw new Error("Fetch error");
        }
        const todosData: Todo[] = await response.json();
        setTodos(todosData);
      } catch (error: unknown) {
        if (error === null) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ul>
      {todos.map((todo: Todo) => (
        <li key={todo.id}>
          <span className={todo.completed ? "completed" : ""}>
            {todo.title}
          </span>
          <button>Завершить</button>
          <button>Удалить</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoItem;
