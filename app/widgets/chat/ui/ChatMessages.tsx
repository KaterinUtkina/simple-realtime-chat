"use client";
import ChatMessageScroll from "@/app/widgets/chat/ui/ChatMessageScroll";
import ChatMessage from "@/app/widgets/chat/ui/ChatMessage";
import { useSelector } from "react-redux";
import { selectMessages } from "@/app/entities/chat/model/selectors";

const ChatMessages = () => {
  const messages = useSelector(selectMessages);
  return (
    <ChatMessageScroll>
      <ul className={"w-full md:w-7/12 mx-auto px-4 md:px-0 py-5"}>
        {messages.map((message) => (
          <li key={`${message.type}${message.timestamp}${message.author}`}>
            <ChatMessage message={message} />
          </li>
        ))}
      </ul>
    </ChatMessageScroll>
  );
};

export default ChatMessages;
