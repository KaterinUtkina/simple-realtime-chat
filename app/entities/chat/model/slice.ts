import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessage, ChatState } from "@/app/entities/chat/types";

const initialState: ChatState = {
  messages: [],
  userId: "",
  isTouchDevice: false,
  usersCount: 0,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<ChatMessage>) {
      state.messages.push(action.payload);
    },
    addUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    setIsTouchDevice(state, action: PayloadAction<boolean>) {
      state.isTouchDevice = action.payload;
    },
    updateUsersCount(state, action: PayloadAction<number>) {
      state.usersCount = action.payload;
    },
  },
});

export const { addMessage, addUserId, setIsTouchDevice, updateUsersCount } =
  chatSlice.actions;
export default chatSlice.reducer;
