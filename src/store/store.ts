import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export type TodosState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
