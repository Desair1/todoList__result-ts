import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList";
import TaskDetails from "./components/TaskDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/todos/:id" element={<TaskDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
