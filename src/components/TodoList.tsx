import { useState } from "react";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <h1>Todo-лист</h1>
      <form action="submit" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Введите задачу"
          onChange={() => setInputValue}
        />
        {/* <button onClick={() => addTask(inputValue)}>Добавить задачу</button> */}
      </form>

      <TodoItem />
    </>
  );
};

export default TodoList;
