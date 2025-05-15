import React from "react";
import { useCallback, useState } from "react";
import { useDebounce } from "../hooks/use-debounce";

interface AddTodoFormProps {
  loading: boolean;
  responseAddTask: (title: string) => void;
}

const AddTodoForm = ({ loading, responseAddTask }: AddTodoFormProps) => {
  const [inputValue, setInputValue] = useState("");

  const { debounce } = useDebounce();

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
        onChange={debounce((event) => memoizedSetInputValue(event), 350)}
      />
      <button disabled={loading} onClick={() => responseAddTask(inputValue)}>
        Добавить задачу
      </button>
    </form>
  );
};

export default React.memo(AddTodoForm);
