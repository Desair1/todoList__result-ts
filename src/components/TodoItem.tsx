import { useEffect, useState, type Dispatch } from "react";

import type { Todo } from "../types/Todo";

import { TODO_URL } from "../DataBase/TODO_URL";
// import styles from "../index.css";

interface TodoItemProps {
  refreshListFlag: boolean;
  isCreating: boolean;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoItem = ({
  refreshListFlag,
  isCreating,
  setIsCreating,
}: TodoItemProps) => {
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
  }, [refreshListFlag]);

  const requestCopmleteTask = async () => {
    setIsCreating(true);
    try {
      fetch(`${TODO_URL}`, {
        method: "PUT",
        headers: { "Content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          completed: true,
        }),
      })
        .then((rawResponse) => rawResponse.json())
        .then((response) => {
          console.log("Проверка", response);
        });
      setIsCreating(false);
    } catch (error: unknown) {
      if (error === null) {
        console.log("Fetch error");
      }
    }
  };

  return (
    <ul>
      {todos.map((todo: Todo) => (
        <li key={todo.id}>
          <span className={todo.completed ? "completed" : ""}>
            {todo.title}
          </span>
          <button disabled={isCreating}>Завершить</button>
          <button disabled={isCreating}>Удалить</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoItem;
