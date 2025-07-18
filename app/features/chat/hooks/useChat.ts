import { useCallback, useEffect, useState } from "react";
import {
  ChatMessage,
  MessageContent,
  WebsocketMessageResponse,
} from "@/app/features/chat/types";
import { websocketService } from "@/app/shared/services/WebsoketService";
import { ChatMessageTypes } from "@/app/features/chat/enum";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const WEBSOCKET_URL = "ws://localhost:10000";
  const [usersCount, setUsersCount] = useState(0);

  const checkTouchDevice = useCallback(() => {
    setIsTouchDevice(navigator.maxTouchPoints > 0);
  }, []);

  const getAudioDataUrl = (audio: HTMLAudioElement): Promise<string> => {
    return new Promise((resolve, reject) => {
      fetch(audio.src)
        .then((res) => res.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
        .catch(reject);
    });
  };

  const handleMessage = (messageData: unknown) => {
    const parsedMessage = JSON.parse(
      messageData as string,
    ) as WebsocketMessageResponse;
    switch (parsedMessage.type) {
      case "client_id": {
        setUserId(parsedMessage.content);
        break;
      }
      case "clients_count": {
        setUsersCount(+parsedMessage.content);
        break;
      }
      case "user_connect": {
        const currentMessage = {
          author: "",
          content: "Пользователь подключился",
          timestamp: parsedMessage.timestamp,
          type: ChatMessageTypes.SYSTEM,
        };

        setMessages((prev) => [...prev, currentMessage]);
        break;
      }
      case "user_disconnect": {
        const currentMessage = {
          author: "",
          content: "Пользователь отключился",
          timestamp: parsedMessage.timestamp,
          type: ChatMessageTypes.SYSTEM,
        };

        setMessages((prev) => [...prev, currentMessage]);
        break;
      }
      case "user_audio": {
        const currentMessage = {
          author: parsedMessage.author ?? "",
          content: parsedMessage.content,
          timestamp: parsedMessage.timestamp ?? 0,
          type: ChatMessageTypes.USER_AUDIO,
        };

        setMessages((prev) => [...prev, currentMessage]);

        break;
      }
      default: {
        const currentMessage = {
          author: parsedMessage.author ?? "",
          content: parsedMessage.content,
          timestamp: parsedMessage.timestamp ?? 0,
          type: ChatMessageTypes.USER,
        };

        setMessages((prev) => [...prev, currentMessage]);
      }
    }
  };

  const initChatService = useCallback(() => {
    websocketService.openConnection("user_chat", WEBSOCKET_URL, handleMessage);
  }, []);

  useEffect(() => {
    checkTouchDevice();
    initChatService();
  }, [checkTouchDevice, initChatService]);

  const sendAnswerHandler = async (content: MessageContent) => {
    if (!userId) return;

    let params = {};
    if (typeof content === "string") {
      params = {
        author: userId,
        content,
        type: ChatMessageTypes.USER,
      };
    } else if (content instanceof HTMLAudioElement) {
      try {
        const audioUrl = await getAudioDataUrl(content);
        params = {
          author: userId,
          content: audioUrl,
          type: ChatMessageTypes.USER_AUDIO,
        };
      } catch (err) {
        console.log("Ошибка получения url записи", err);
      }
    }
    websocketService.sendMessage("user_chat", params);
  };

  return {
    sendAnswerHandler,
    isTouchDevice,
    messages,
    userId,
    usersCount,
  };
}
