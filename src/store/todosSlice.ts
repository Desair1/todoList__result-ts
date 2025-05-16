import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Todo } from "../types/Todo";
import { TODO_URL } from "../DataBase/TODO_URL";

interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  searchValue: string;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
  searchValue: "",
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  console.log("fetchTodos: Запрос к API...");
  const response = await fetch(TODO_URL);
  console.log("fetchTodos: Ответ API:", response);
  if (!response.ok) {
    console.error(
      "fetchTodos: Ошибка при запросе к API:",
      response.status,
      response.statusText
    );
    throw new Error("Failed to fetch todos");
  }
  const data = await response.json();
  console.log("fetchTodos: Данные API:", data);
  return data as Todo[];
});

export const addTodoAsync = createAsyncThunk(
  "todos/addTodo",
  async (title: string) => {
    const response = await fetch(TODO_URL, {
      method: "POST",
      headers: { "Content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        title,
        completed: false,
      }),
    });
    const data = await response.json();
    return data as Todo;
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todo/deleteTodo",
  async (id: string) => {
    await fetch(`${TODO_URL}/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

export const updateTodoAsync = createAsyncThunk(
  "todo/updateTodo",
  async (todo: Todo) => {
    const response = await fetch(`${TODO_URL}/${todo.id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    const data = await response.json();
    return data as Todo;
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch todos";
      })
      .addCase(addTodoAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        state.loading = false;
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add todo";
      })
      .addCase(deleteTodoAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteTodoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete todo";
      })
      .addCase(updateTodoAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        );
        state.loading = false;
      })
      .addCase(updateTodoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update todo";
      });
  },
});

export const {
  setTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  setLoading,
  setError,
  setSearchValue,
} = todosSlice.actions;

export default todosSlice.reducer;
