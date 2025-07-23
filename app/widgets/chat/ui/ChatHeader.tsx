"use client";
import UsersIcon from "@/app/shared/ui/icon/UsersIcon.svg";
import { useSelector } from "react-redux";
import { usersCount } from "@/app/entities/chat/model/selectors";
import ThemeSwitcher from "@/app/shared/ui/ThemeSwitcher";

const ChatHeader = () => {
  const count = useSelector(usersCount);
  return (
    <div className="px-4 py-6 sm:px-4 lg:px-6 flex justify-between">
      <h1 className="text-2xl tracking-tight text-gray-900 dark:text-gray-200">
        Чат
      </h1>
      <p className="flex gap-2 items-center text-violet-400">
        <ThemeSwitcher />
        <span className={"w-6 h-6 flex items-center justify-center ml-4"}>
          <UsersIcon className="w-full h-full fill-violet-400" />
        </span>
        {count === 0 ? "" : count}
      </p>
    </div>
  );
};

export default ChatHeader;
