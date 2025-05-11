import { useState } from "react";
import TodoItem from "./TodoItem";
import { TODO_URL } from "../DataBase/TODO_URL";
import SearchInput from "./SearchInput";

const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [refreshListFlag, setRefreshListFlag] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const refreshList = (): void => setRefreshListFlag(!refreshListFlag);

  const responseAddTask = (text: string) => {
    setIsCreating(true);
    try {
      fetch(TODO_URL, {
        method: "POST",
        headers: { "Content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          title: text,
          completed: false,
        }),
      })
        .then((rawResponse) => rawResponse.json())
        .then((response) => {
          console.log("Проверка", response);
        });
      setIsCreating(false);
      refreshList();
    } catch (error: unknown) {
      if (error === null) {
        console.log("Fetch error");
      }
    }
  };

  return (
    <>
      <h1>Todo-лист</h1>
      <SearchInput />
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
