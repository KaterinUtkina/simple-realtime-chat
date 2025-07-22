import { ChatMessageTypes } from "@/app/widgets/chat/enum";

export type ChatMessage = {
  content: string;
  author: string;
  timestamp: number;
  type: ChatMessageTypes;
};

export type MessageContent = string | HTMLAudioElement;

export type WebsocketMessageResponse = {
  content: string;
  type: string;
  author?: string;
  timestamp: number;
};

export interface ChatState {
  messages: ChatMessage[];
  userId: string;
  isTouchDevice: boolean;
  usersCount: number;
}

export interface ChatSliceState {
  chat: ChatState;
}
