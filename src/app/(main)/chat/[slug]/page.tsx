import ChatField from "@/features/chat/components/ChatField";
import InputMessage from "@/features/chat/components/InputMessage";

const ChatPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <section className="w-full ">
      <ChatField sessionId={slug} />

      <InputMessage isNewChat={false} />

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
