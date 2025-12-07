import { IMessageBoxPropsType } from "../types";

import Markdown from "react-markdown";

const MessageBox = ({ type, message }: IMessageBoxPropsType) => {
  const messagePosition =
    type !== "ai" ? "self-end bg-neutral-100" : " self-start w-fit";

  return (
    <div className={`${messagePosition} rounded-md  py-4 pl-2 pr-5`}>
      {type !== "ai" ? (
        <p className="text-sm">{message}</p>
      ) : (
        <div className="text-sm leading-7">
          <Markdown>{message.replace(/^\[[\s\S]*?]]\s*/g, "")}</Markdown>
        </div>
      )}
    </div>
  );
};

export default MessageBox;
