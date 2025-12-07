"use client";

import { useGetHistoryChats } from "../hooks/useChat";
import MessageBox from "./MessageBox";

const ChatField = () => {
  const { data } = useGetHistoryChats({
    sessionId: "false",
  });

  data?.map((item) => console.log("data historiesss chatting = ", item));

  return (
    <div className="my-12 md:mx-10 flex flex-col gap-10">
      {data?.map((item, key) => {
        return (
          <MessageBox
            key={key}
            type={item.message.type}
            message={item.message.content}
          />
        );
      })}
    </div>
  );
};

export default ChatField;
