import ChatField from "@/features/chat/components/ChatField";
import InputMessage from "@/features/chat/components/InputMessage";

const ChatPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full px-5">
      <ChatField />

      <InputMessage />
      {children}
    </section>
  );
};

export default ChatPage;
