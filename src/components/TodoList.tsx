import { useCallback, useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addTodoAsync, fetchTodos, setSearchValue } from "../store/todosSlice";
import type { AppDispatch, RootState } from "../store/store";

import TodoItem from "./TodoItem";
import SearchInput from "./SearchInput";
import type { Todo } from "../types/Todo";
import React from "react";
import AddTodoForm from "./AddTodoForm";

const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const loading = useSelector((state: RootState) => state.todos.loading);
  const error = useSelector((state: RootState) => state.todos.error);
  const searchValue = useSelector(
    (state: RootState) => state.todos.searchValue
  );

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleFilterTodos = (title: string) => {
    dispatch(setSearchValue(title));
  };

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [todos, searchValue]);

  const responseAddTask = useCallback(
    (title: string) => {
      dispatch(addTodoAsync(title));
    },
    [dispatch]
  );

  return (
    <>
      <h1>Todo-лист</h1>
      <SearchInput
        searchValue={searchValue}
        setSearchValue={handleFilterTodos}
      />
      <AddTodoForm responseAddTask={responseAddTask} loading={loading} />
      <ul>
        {filteredTodos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
};

export default React.memo(TodoList);
