import { configureStore } from "@reduxjs/toolkit";
import { booksApi } from "../Services/books";
import { chatApi } from "../Services/chatApi";

export const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(booksApi.middleware)
      .concat(chatApi.middleware),
});
