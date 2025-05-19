import { useMemo } from "react";
import type { Todo } from "../types/Todo";

const useFilteredTodos = (
  todos: Todo[],
  isSortedAlphabetically: boolean,
  searchValue: string
) => {
  const filteredTodos = useMemo(() => {
    let sortedTodos = todos;

    if (isSortedAlphabetically) {
      sortedTodos = [...todos].sort((a, b) => a.title.localeCompare(b.title));
    }

    return sortedTodos.filter((todo) =>
      todo.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [todos, searchValue, isSortedAlphabetically]);

  return filteredTodos;
};

export default useFilteredTodos;
