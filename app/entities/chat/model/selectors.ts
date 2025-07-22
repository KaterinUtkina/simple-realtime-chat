import { ChatSliceState } from "@/app/entities/chat/types";

export const selectMessages = (state: ChatSliceState) => state.chat.messages;
export const userId = (state: ChatSliceState) => state.chat.userId;
export const isTouchDevice = (state: ChatSliceState) =>
  state.chat.isTouchDevice;
export const usersCount = (state: ChatSliceState) => state.chat.usersCount;
