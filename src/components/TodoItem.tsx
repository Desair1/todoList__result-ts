import type { Todo } from "../types/Todo";

import { useEffect, useState } from "react";
import styles from "../index.css";

const TODO_URL = "https://jsonplaceholder.typicode.com/todos";

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
      } catch (error: any) {
        setError(error);
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
        </li>
      ))}
    </ul>
  );
};

export default TodoItem;
