import InputMessage from "@/features/chat/components/InputMessage";

export default function MainPage() {
  return (
    <section className="w-full px-5">
      <h1 className="text-3xl md:text-5xl font-medium text-center mt-52">
        Build your Employee <br /> Data Instantly
      </h1>

      <div className="my-12"></div>

      <InputMessage isNewChat={true} />
    </section>
  );
}
