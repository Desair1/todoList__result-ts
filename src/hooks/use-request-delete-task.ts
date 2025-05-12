import { TODO_URL } from "../DataBase/TODO_URL";

const useRequestDeleteTask = (refreshList: Function) => {
    const requestDeleteTask = (id: string) => {
    try {
      fetch(`${TODO_URL}/${id}`, {
        method: "DELETE",
      })
        .then((rawResponse) => rawResponse.json())
        .then((response) => {
          console.log("Проверка", response);
          refreshList();
        });
    } catch (error: unknown) {
      if (error === "string") {
        console.log("fetch error");
      }
    }
  };

  return {
    requestDeleteTask
  }
}
 
export default useRequestDeleteTask;