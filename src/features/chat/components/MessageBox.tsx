import Image from "next/image";
import { IMessageBoxPropsType } from "../types";

import Markdown from "react-markdown";
import { ChatbotLogo } from "@/assets/images";

const MessageBox = ({ type, message }: IMessageBoxPropsType) => {
  const messagePosition =
    type !== "ai"
      ? "self-end bg-neutral-100 w-2/3 md:w-fit"
      : " self-start w-fit";

  return (
    <div className={`${messagePosition}  rounded-md  p-4  mr-5 md:mr-0 `}>
      {type !== "ai" ? (
        <p className="text-sm">{message}</p>
      ) : (
        <div className=" flex flex-row gap-5">
          <Image
            src={ChatbotLogo}
            width={200}
            height={200}
            alt=""
            className="size-8"
          />

          <div className="text-sm leading-7">
            <Markdown>{message.replace(/^\[[\s\S]*?]]\s*/g, "")}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBox;
