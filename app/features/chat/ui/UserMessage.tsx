import { memo, useMemo } from "react";
import { ChatMessage as ChatMessageT } from "@/app/features/chat/types";
import UserIcon from "@/app/shared/ui/icon/UserIcon.svg";
import { ChatMessageTypes } from "@/app/features/chat/enum";

type Props = {
  message: ChatMessageT;
  userId: string;
};

const colors = [
  "bg-red-400",
  "bg-green-400",
  "bg-blue-400",
  "bg-yellow-400",
  "bg-pink-400",
  "bg-indigo-400",
  "bg-purple-400",
  "bg-orange-400",
  "bg-teal-400",
  "bg-cyan-400",
];

const getColorByUserId = (userId: string) => {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const UserMessage = memo(function UserMessage({ message, userId }: Props) {
  const bgColor = useMemo(
    () => getColorByUserId(message.author),
    [message.author],
  );

  return (
    <>
      {message.author === userId ? (
        <div className="flex justify-end relative mb-5 gap-3">
          <div className={"p-3 rounded-2xl bg-white max-w-lg shadow-md"}>
            {message.type === ChatMessageTypes.USER ? (
              <p className="break-words">{message.content as string}</p>
            ) : (
              <audio src={message.content} controls />
            )}
          </div>
        </div>
      ) : (
        <div className="flex gap-4 mb-5 items-start">
          <div
            className={`flex items-center justify-center shrink-0 ${bgColor} w-10 h-10 rounded-full overflow-hidden`}
          >
            <UserIcon className="w-full h-full pt-1 fill-white" />
          </div>
          <div className="p-3 rounded-2xl bg-white max-w-lg shadow-md">
            {message.type === ChatMessageTypes.USER ? (
              <>{message.content as string}</>
            ) : (
              <audio src={message.content} controls />
            )}
          </div>
        </div>
      )}
    </>
  );
});

export default UserMessage;
