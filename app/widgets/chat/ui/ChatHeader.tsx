import { memo } from "react";
import UsersIcon from "@/app/shared/ui/icon/UsersIcon.svg";
import { useChat } from "@/app/widgets/chat/hooks/useChat";

const ChatHeader = memo(function ChatHeader() {
  const { usersCount } = useChat();

  return (
    <header className="bg-white shadow absolute w-full z-10">
      <div className="px-4 py-6 sm:px-4 lg:px-6 flex justify-between">
        <h1 className="text-2xl tracking-tight text-gray-900">Chat</h1>
        <p className="flex gap-2 items-center text-violet-400">
          <span className={"w-6 h-6 flex items-center justify-center"}>
            <UsersIcon className="w-full h-full fill-violet-400" />
          </span>
          {usersCount === 0 ? "" : usersCount}
        </p>
      </div>
    </header>
  );
});

export default ChatHeader;
