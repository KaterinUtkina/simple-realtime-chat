import { ChatMessage } from "@/app/entities/chat/types";

export interface ChatState {
  messages: ChatMessage[];
  userId: string;
  isTouchDevice: boolean;
  userCount: number;
}
interface SliceChatRootState {
  chat: ChatState;
}
export const selectMessages = (state: SliceChatRootState) =>
  state.chat.messages;
export const userId = (state: SliceChatRootState) => state.chat.userId;
export const isTouchDevice = (state: SliceChatRootState) =>
  state.chat.isTouchDevice;
export const userCount = (state: SliceChatRootState) => state.chat.userCount;
