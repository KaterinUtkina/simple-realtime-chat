import { memo, useMemo } from "react";
import { ChatMessage as ChatMessageT } from "@/app/entities/chat/types";
import { ChatMessageTypes } from "@/app/widgets/chat/enum";
import { useSelector } from "react-redux";
import { userId } from "@/app/entities/chat/model/selectors";
import { formatTime } from "@/app/shared/utils/common";
import { UserOutlined } from "@ant-design/icons";
import { StyledAvatar } from "@/app/widgets/chat/styles";

type Props = {
  message: ChatMessageT;
};

const colors = [
  "#F87171",
  "#34D399",
  "#60A5FA",
  "#FBBF24",
  "#F472B6",
  "#818CF8",
  "#A78BFA",
  "#FB923C",
  "#2DD4BF",
  "#22D3EE",
];

const getColorByUserId = (userId: string) => {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const UserMessage = ({ message }: Props) => {
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
              "p-3 pr-12 rounded-2xl bg-white dark:bg-gray-800 max-w-full md:max-w-lg w-fit shadow-md"
            }
          >
            {message.type === ChatMessageTypes.USER ? (
              <p className="break-words !m-0">{message.content as string}</p>
            ) : (
              <audio src={message.content} controls />
            )}
            <span className="text-xs text-gray-400 absolute bottom-1 right-2">
              {formatTime(message.timestamp)}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 md:gap-4 mb-5 items-start">
          <StyledAvatar icon={<UserOutlined />} $bg={bgColor} />
          <div
            className={`${message.type === ChatMessageTypes.USER ? "p-3 pr-12" : "px-1 py-3 pr-12 pb-2"} rounded-2xl bg-white dark:bg-gray-800 max-w-[calc(100%-32px)] md:max-w-lg w-fit shadow-md relative`}
          >
            {message.type === ChatMessageTypes.USER ? (
              <p className="break-words !m-0">{message.content as string}</p>
            ) : (
              <audio src={message.content} controls />
            )}
            <span className="text-xs text-gray-400 absolute bottom-1 right-2">
              {formatTime(message.timestamp)}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(UserMessage);
