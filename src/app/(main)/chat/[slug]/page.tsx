import ChatField from "@/features/chat/components/ChatField";
import InputMessage from "@/features/chat/components/InputMessage";

const ChatPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full ">
      <ChatField sessionId="DAILY-20251207" />

      <InputMessage />
      {children}

      <div className="w-full bg-white sticky bottom-0">
        <p className="text-center text-xs py-2 text-neutral-400">
          <span className="font-medium text-sky-300">S.E.R.A</span> (Smart
          Employee Relations Assistant)
        </p>
      </div>
    </section>
  );
};

export default ChatPage;
