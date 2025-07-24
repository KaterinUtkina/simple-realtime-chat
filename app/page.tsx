import Chat from "@/app/widgets/chat/ui/Chat";
import ChatHeader from "@/app/widgets/chat/ui/ChatHeader";
import AppLayout from "@/app/shared/ui/layout/AppLayout";

export default function Home() {
  return (
    <AppLayout headerChildren={<ChatHeader />}>
      <Chat />
    </AppLayout>
  );
}
