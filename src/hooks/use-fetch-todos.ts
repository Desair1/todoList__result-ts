import { useState, useEffect } from "react";
import { TODO_URL } from "../DataBase/TODO_URL";
import type { Todo } from "../types/Todo";

const useFetchTodos = (refreshListFlag: boolean) => {
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
                if (error === "string") {
                    setError(error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [refreshListFlag]);

    return {
        todos
    }
}

export default useFetchTodos;