import ChatMessageScroll from "@/app/features/chat/ui/ChatMessageScroll";
import { ChatMessage as ChatMessageT } from "@/app/features/chat/types";
import ChatMessage from "@/app/features/chat/ui/ChatMessage";

type ChatMessageProps = {
  messages: ChatMessageT[];
  userId: string;
};

const ChatMessages = (props: ChatMessageProps) => {
  return (
    <ChatMessageScroll>
      <ul className={"w-full md:w-7/12 mx-auto px-4 md:px-0 py-5"}>
        {props.messages.map((message) => (
          <li key={`${message.type}${message.timestamp}${message.author}`}>
            <ChatMessage message={message} userId={props.userId} />
          </li>
        ))}
      </ul>
    </ChatMessageScroll>
  );
};

export default ChatMessages;
