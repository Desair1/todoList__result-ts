import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addTodoAsync, fetchTodos } from "../store/todosSlice";
import type { AppDispatch, RootState } from "../store/store";

import TodoItem from "./TodoItem";
import SearchInput from "./SearchInput";
import type { Todo } from "../types/Todo";

const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const loading = useSelector((state: RootState) => state.todos.loading);
  const error = useSelector((state: RootState) => state.todos.error);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const responseAddTask = (title: string) => {
    dispatch(addTodoAsync(title));
  };

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
        <button disabled={loading} onClick={() => responseAddTask(inputValue)}>
          Добавить задачу
        </button>
      </form>
      <ul>
        {todos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} /> // Передаем todo в TodoItem
        ))}
      </ul>
    </>
  );
};

export default TodoList;
