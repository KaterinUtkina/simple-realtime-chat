import { memo } from "react";
import { ChatMessage as ChatMessageT } from "@/app/features/chat/types";

type Props = {
  message: ChatMessageT;
};

const SystemMessage = memo(function SystemMessage({ message }: Props) {
  return (
    <div className="text-center text-gray-500 text-sm my-4">
      {message.content as string}
    </div>
  );
});

export default SystemMessage;
