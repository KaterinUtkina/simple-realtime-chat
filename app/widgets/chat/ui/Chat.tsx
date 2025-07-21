"use client";
import ChatMessages from "@/app/widgets/chat/ui/ChatMessages";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import "overlayscrollbars/styles/overlayscrollbars.css";
import ChatHeader from "@/app/widgets/chat/ui/ChatHeader";

const ChatAnswerArea = dynamic(
  () => import("@/app/widgets/chat/ui/ChatAnswerArea"),
  {
    ssr: false,
  },
);

const Chat = () => {
  return (
    <div className={"h-full overflow-hidden"}>
      <div className={"h-full relative"}>
        <ChatHeader />
        <main className={"bg-gray-100 pt-20 h-full"}>
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
        </main>
      </div>
    </div>
  );
};

export default Chat;
