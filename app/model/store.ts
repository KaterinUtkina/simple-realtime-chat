import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "@/app/entities/chat/model/slice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});
