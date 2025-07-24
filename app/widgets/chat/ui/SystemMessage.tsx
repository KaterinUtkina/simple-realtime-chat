import { memo } from "react";
import { ChatMessage as ChatMessageT } from "@/app/entities/chat/types";

type Props = {
  message: ChatMessageT;
};

const SystemMessage = ({ message }: Props) => {
  return (
    <div className="text-center text-gray-500 dark:text-gray-200 text-sm my-4">
      {message.content as string}
    </div>
  );
};

export default memo(SystemMessage);
