import { RootState } from "@/app/shared/store/types";

export const selectMessages = (state: RootState) => state.chat.messages;
export const userId = (state: RootState) => state.chat.userId;
export const isTouchDevice = (state: RootState) => state.chat.isTouchDevice;
export const usersCount = (state: RootState) => state.chat.usersCount;
