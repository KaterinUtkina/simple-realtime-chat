import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessage } from "@/app/entities/chat/types";
import { ChatState } from "@/app/entities/chat/model/selectors";

const initialState: ChatState = {
  messages: [],
  userId: "",
  isTouchDevice: false,
  userCount: 0,
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
    updateUserCount(state, action: PayloadAction<number>) {
      state.userCount = action.payload;
    },
  },
});

export const { addMessage, addUserId, setIsTouchDevice, updateUserCount } =
  chatSlice.actions;
export default chatSlice.reducer;
