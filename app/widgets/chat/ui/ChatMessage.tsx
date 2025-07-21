import { memo } from "react";
import { ChatMessage as ChatMessageT } from "@/app/entities/chat/types";
import { ChatMessageTypes } from "@/app/widgets/chat/enum";
import SystemMessage from "@/app/widgets/chat/ui/SystemMessage";
import UserMessage from "@/app/widgets/chat/ui/UserMessage";

type Props = {
  message: ChatMessageT;
};

const ChatMessage = memo(function ChatMessage({ message }: Props) {
  switch (message.type) {
    case ChatMessageTypes.SYSTEM:
      return <SystemMessage message={message} />;

    case ChatMessageTypes.USER || ChatMessageTypes.USER_AUDIO:
    default: {
      return <UserMessage message={message} />;
    }
  }
});

export default ChatMessage;
