import { useState } from "react";
import { TODO_URL } from "../DataBase/TODO_URL";

const useResponseAddTask = (refreshList: Function) => {
  const [isCreating, setIsCreating] = useState(false);

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

  return {
    responseAddTask,
    isCreating,
  };
};

export default useResponseAddTask;
