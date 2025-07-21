import { memo, useMemo } from "react";
import { ChatMessage as ChatMessageT } from "@/app/entities/chat/types";
import UserIcon from "@/app/shared/ui/icon/UserIcon.svg";
import { ChatMessageTypes } from "@/app/widgets/chat/enum";
import { useSelector } from "react-redux";
import { userId } from "@/app/entities/chat/model/selectors";

type Props = {
  message: ChatMessageT;
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

const UserMessage = memo(function UserMessage({ message }: Props) {
  const currentUser = useSelector(userId);

  const bgColor = useMemo(
    () => getColorByUserId(message.author),
    [message.author],
  );

  return (
    <>
      {message.author === currentUser ? (
        <div className="flex justify-end relative mb-5 gap-3">
          <div
            className={
              "p-3 rounded-2xl bg-white max-w-full md:max-w-lg w-fit shadow-md"
            }
          >
            {message.type === ChatMessageTypes.USER ? (
              <p className="break-words">{message.content as string}</p>
            ) : (
              <audio src={message.content} controls />
            )}
          </div>
        </div>
      ) : (
        <div className="flex gap-2 md:gap-4 mb-5 items-start">
          <div
            className={`flex items-center justify-center shrink-0 ${bgColor} w-6 h-6 md:w-10 md:h-10 rounded-full overflow-hidden`}
          >
            <UserIcon className="w-full h-full pt-1 fill-white" />
          </div>
          <div
            className={`${message.type === ChatMessageTypes.USER ? "p-3" : "px-1 py-3"} rounded-2xl bg-white max-w-[calc(100%-32px)] md:max-w-lg w-fit shadow-md`}
          >
            {message.type === ChatMessageTypes.USER ? (
              <p className="break-words">{message.content as string}</p>
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
