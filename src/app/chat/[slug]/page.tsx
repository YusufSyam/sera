import InputMessage from "@/features/chat/components/InputMessage";

const ChatPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full px-5">
      <div className="my-12"></div>

      <InputMessage />
      {children}
    </section>
  );
};

export default ChatPage;
