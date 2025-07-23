import { useCallback, useEffect } from "react";
import { WebsocketMessageResponse } from "@/app/entities/chat/types";
import { websocketService } from "@/app/shared/services/WebsoketService";
import { ChatMessageTypes } from "@/app/widgets/chat/enum";
import { useDispatch } from "react-redux";
import {
  addMessage,
  addUserId,
  setIsTouchDevice,
  updateUsersCount,
} from "@/app/entities/chat/model/slice";
import { useTheme } from "@/app/ThemeContext";

export function useChat() {
  const WEBSOCKET_URL = "wss://chat-ws-ai-server.onrender.com";
  const dispatch = useDispatch();
  const { theme } = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const checkTouchDevice = useCallback(() => {
    dispatch(setIsTouchDevice(navigator.maxTouchPoints > 0));
  }, [dispatch]);

  const handleMessage = useCallback(
    (messageData: unknown) => {
      const parsedMessage = JSON.parse(
        messageData as string,
      ) as WebsocketMessageResponse;
      switch (parsedMessage.type) {
        case "client_id": {
          dispatch(addUserId(parsedMessage.content));
          break;
        }
        case "clients_count": {
          dispatch(updateUsersCount(+parsedMessage.content));
          break;
        }
        case "user_connect": {
          const currentMessage = {
            author: "",
            content: "Пользователь подключился",
            timestamp: parsedMessage.timestamp,
            type: ChatMessageTypes.SYSTEM,
          };

          dispatch(addMessage(currentMessage));
          break;
        }
        case "user_disconnect": {
          const currentMessage = {
            author: "",
            content: "Пользователь отключился",
            timestamp: parsedMessage.timestamp,
            type: ChatMessageTypes.SYSTEM,
          };

          dispatch(addMessage(currentMessage));
          break;
        }
        case "user_audio": {
          const currentMessage = {
            author: parsedMessage.author ?? "",
            content: parsedMessage.content,
            timestamp: parsedMessage.timestamp ?? 0,
            type: ChatMessageTypes.USER_AUDIO,
          };

          dispatch(addMessage(currentMessage));
          break;
        }
        default: {
          const currentMessage = {
            author: parsedMessage.author ?? "",
            content: parsedMessage.content,
            timestamp: parsedMessage.timestamp ?? 0,
            type: ChatMessageTypes.USER,
          };
          dispatch(addMessage(currentMessage));
        }
      }
    },
    [dispatch],
  );

  const initChatService = useCallback(() => {
    websocketService.openConnection("user_chat", WEBSOCKET_URL, handleMessage);
  }, [handleMessage]);

  useEffect(() => {
    checkTouchDevice();
    initChatService();
  }, [checkTouchDevice, initChatService]);
}
