"use client";
import ChatMessages from "@/app/widgets/chat/ui/ChatMessages";
import dynamic from "next/dynamic";
import { memo, Suspense } from "react";
import "overlayscrollbars/styles/overlayscrollbars.css";
import { useChat } from "@/app/widgets/chat/hooks/useChat";

const ChatAnswerArea = dynamic(
  () => import("@/app/widgets/chat/ui/ChatAnswerArea"),
  {
    ssr: false,
  },
);

const Chat = () => {
  useChat();

  return (
    <div className="flex flex-col h-full">
      <section className={"h-max mb-auto overflow-y-auto"}>
        <ChatMessages />
      </section>
      <section className={"w-full px-4 md:px-0 md:w-7/12 mx-auto z-10"}>
        <Suspense fallback={<></>}>
          <ChatAnswerArea />
        </Suspense>
      </section>
    </div>
  );
};

export default memo(Chat);
