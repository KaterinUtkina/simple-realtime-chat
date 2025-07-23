import { ChatMessage, MessageContent } from "@/app/entities/chat/types";
import { ChatMessageTypes } from "@/app/widgets/chat/enum";
import { getAudioDataUrl } from "@/app/shared/utils/common";
import { websocketService } from "@/app/shared/services/WebsoketService";
import { addMessage } from "@/app/entities/chat/model/slice";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/shared/store/types";

type AppThunk<ReturnType = Promise<void>> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

export const sendMessageThunk =
  (content: MessageContent): AppThunk =>
  async (dispatch, getState) => {
    const userId = getState().chat.userId;
    if (!userId) return;

    try {
      let requestParams = {};
      let currentMessage: ChatMessage = {} as ChatMessage;
      if (typeof content === "string") {
        requestParams = {
          author: userId,
          content,
          type: ChatMessageTypes.USER,
        };
        currentMessage = {
          author: userId,
          content,
          timestamp: Date.now(),
          type: ChatMessageTypes.USER,
        };
      } else if (content instanceof HTMLAudioElement) {
        const audioUrl = await getAudioDataUrl(content);
        requestParams = {
          author: userId,
          content: audioUrl,
          type: ChatMessageTypes.USER_AUDIO,
        };
        currentMessage = {
          author: userId,
          content: audioUrl,
          timestamp: Date.now(),
          type: ChatMessageTypes.USER_AUDIO,
        };
      }

      dispatch(addMessage(currentMessage));
      websocketService.sendMessage("user_chat", requestParams);
    } catch (err) {
      console.error("Ошибка отправки сообщения:", err);
    }
  };
