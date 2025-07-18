import { memo } from "react";
import { ChatMessage as ChatMessageT } from "@/app/features/chat/types";
import { ChatMessageTypes } from "@/app/features/chat/enum";
import SystemMessage from "@/app/features/chat/ui/SystemMessage";
import UserMessage from "@/app/features/chat/ui/UserMessage";

type Props = {
  message: ChatMessageT;
  userId: string;
};

const ChatMessage = memo(function ChatMessage({ message, userId }: Props) {
  switch (message.type) {
    case ChatMessageTypes.SYSTEM:
      return <SystemMessage message={message} />;

    case ChatMessageTypes.USER || ChatMessageTypes.USER_AUDIO:
    default: {
      return <UserMessage message={message} userId={userId} />;
    }
  }
});

export default ChatMessage;
