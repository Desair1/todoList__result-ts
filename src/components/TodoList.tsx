import { useState } from "react";
import useResponseAddTask from "../hooks/use-request-add-task";
import { useDispatch, useSelector } from "react-redux";

import TodoItem from "./TodoItem";
import SearchInput from "./SearchInput";
import type { AppDispatch, TodosState } from "../store/store";

const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: TodosState) => state.todos.todos);
  const loading = useSelector((state: TodosState) => state.todos.loading);
  const error = useSelector((state: TodosState) => state.todos.error);
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
