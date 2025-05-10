import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { TODO_URL } from "../DataBase/TODO_URL";

const TodoList = () => {
  const [inputValue, setInputValue] = useState("");

  const addTask = (text: string) => {
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
    } catch (error: unknown) {
      if (error === null) {
        console.log("Fetch error");
      }
    }
  };

  return (
    <>
      <h1>Todo-лист</h1>
      <form action="submit" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Введите задачу"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={() => addTask(inputValue)}>Добавить задачу</button>
      </form>

      <TodoItem />
    </>
  );
};

export default TodoList;
