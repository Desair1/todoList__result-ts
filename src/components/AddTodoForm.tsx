import { useCallback, useState } from "react";
import React from "react";

interface AddTodoFormProps {
  loading: boolean;
  responseAddTask: (title: string) => void;
}

const AddTodoForm = ({ loading, responseAddTask }: AddTodoFormProps) => {
  console.log("TodoForm rerender");

  const [inputValue, setInputValue] = useState("");

  const memoizedSetInputValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    },
    []
  );

  return (
    <form action="submit" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Введите задачу"
        onChange={(event) => memoizedSetInputValue(event)}
      />
      <button disabled={loading} onClick={() => responseAddTask(inputValue)}>
        Добавить задачу
      </button>
    </form>
  );
};

export default React.memo(AddTodoForm);
