import Chat from "@/app/widgets/chat/ui/Chat";
import Layout from "@/app/shared/ui/Layout";
import ChatHeader from "@/app/widgets/chat/ui/ChatHeader";

export default function Home() {
  return (
    <Layout headerChildren={<ChatHeader />}>
      <Chat />
    </Layout>
  );
}
