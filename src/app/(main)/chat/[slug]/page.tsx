import InputMessage from "@/features/chat/components/InputMessage";
import MessageBox from "@/features/chat/components/MessageBox";

const ChatPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full px-5">
      <div className="my-12 md:mx-10 flex flex-col gap-10">
        <MessageBox type="human" message="Hello World" />
        <MessageBox
          type="ai"
          message="Halo saya ai yang akan menjawab semua pertannyan dan kebutuhan anda"
        />
      </div>

      <InputMessage />
      {children}
    </section>
  );
};

export default ChatPage;
