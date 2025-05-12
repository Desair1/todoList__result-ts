import { TODO_URL } from "../DataBase/TODO_URL";

const useRequestCompleteTask = (refreshList: Function) => {
  const requestCopmleteTask = (id: string) => {
    try {
      fetch(`${TODO_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          completed: true,
        }),
      })
        .then((rawResponse) => rawResponse.json())
        .then((response) => {
          console.log("Проверка", response);
          refreshList();
        });
    } catch (error: unknown) {
      if (error === "string") {
        console.log("Fetch error");
      }
    }
  };

  return {
    requestCopmleteTask,
  };
};

export default useRequestCompleteTask;
