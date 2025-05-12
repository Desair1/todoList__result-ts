import { useState } from "react";
import useResponseAddTask from "../hooks/use-request-add-task";

import TodoItem from "./TodoItem";
import SearchInput from "./SearchInput";

const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [refreshListFlag, setRefreshListFlag] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const refreshList = (): void => setRefreshListFlag(!refreshListFlag);
  const { responseAddTask, isCreating } = useResponseAddTask(refreshList);

  return (
    <>
      <h1>Todo-лист</h1>
      <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
      <form action="submit" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Введите задачу"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          disabled={isCreating}
          onClick={() => responseAddTask(inputValue)}
        >
          Добавить задачу
        </button>
      </form>

      <TodoItem
        refreshListFlag={refreshListFlag}
        isCreating={isCreating}
        refreshList={refreshList}
      />
    </>
  );
};

export default TodoList;
