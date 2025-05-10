import { useEffect, useState, type Dispatch } from "react";

import type { Todo } from "../types/Todo";

import { TODO_URL } from "../DataBase/TODO_URL";
import styles from "../index.css";

interface TodoItemProps {
  refreshListFlag: boolean;
  isCreating: boolean;
  refreshList(): void;
}

const TodoItem = ({ refreshListFlag, isCreating, refreshList }: TodoItemProps) => {
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

  const requestCopmleteTask = (id: string) => {
    try {
      fetch(`${TODO_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          completed: true,
        }),
      })
        .then((rawResponse) => rawResponse.json())
        .then((response) => {
          console.log("Проверка", response);
          refreshList()
        });
    } catch (error: unknown) {
      if (error === 'string') {
        console.log("Fetch error");
      }
    }
  };

  const requestDeleteTask = (id: string) => {
    try {
      fetch(`${TODO_URL}/${id}`, {
        method: 'DELETE'
      }).then((rawResponse) => rawResponse.json())
        .then((response) => {
          console.log("Проверка", response);
          refreshList()
        });
    } catch (error: unknown) {
      if (error === 'string') {
        console.log('fetch error')
      }
    }
  }


  return (
    <ul>
      {todos.map((todo: Todo) => (
        <li key={todo.id}>
          <span className={todo.completed ? "completed" : ""}>
            {todo.title}
          </span>
          <button disabled={isCreating} onClick={() => requestCopmleteTask(todo.id)}>Завершить</button>
          <button disabled={isCreating} onClick={() => requestDeleteTask(todo.id)}>Удалить</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoItem;
