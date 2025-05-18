import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList";
import TaskDetails from "./components/TaskDetails";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/todos/:id" element={<TaskDetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
