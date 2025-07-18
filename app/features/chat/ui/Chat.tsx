"use client";
import { useChat } from "@/app/features/chat/hooks/useChat";
import ChatMessages from "@/app/features/chat/ui/ChatMessages";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import "overlayscrollbars/styles/overlayscrollbars.css";
import UsersIcon from "@/app/shared/ui/icon/UsersIcon.svg";

const ChatAnswerArea = dynamic(
  () => import("@/app/features/chat/ui/ChatAnswerArea"),
  {
    ssr: false,
  },
);

const Chat = () => {
  const { sendAnswerHandler, isTouchDevice, messages, userId, usersCount } =
    useChat();

  return (
    <div className={"h-full overflow-hidden"}>
      <div className={"h-full relative"}>
        <header className="bg-white shadow absolute w-full z-10">
          <div className="px-4 py-6 sm:px-4 lg:px-6 flex justify-between">
            <h1 className="text-2xl tracking-tight text-gray-900">Chat</h1>
            <p className="flex gap-2 items-center text-violet-400">
              <span className={"w-6 h-6 flex items-center justify-center"}>
                <UsersIcon className="w-full h-full fill-violet-400" />
              </span>
              {usersCount}
            </p>
          </div>
        </header>
        <main className={"bg-gray-100 pt-20 h-full"}>
          <div className="flex flex-col h-full">
            <section className={"h-max mb-auto overflow-y-auto"}>
              <ChatMessages messages={messages} userId={userId} />
            </section>
            <section className={"w-full px-4 md:px-0 md:w-7/12 mx-auto z-10"}>
              <Suspense fallback={<></>}>
                <ChatAnswerArea
                  sendAnswerHandler={sendAnswerHandler}
                  isTouchDevice={isTouchDevice}
                />
              </Suspense>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chat;
