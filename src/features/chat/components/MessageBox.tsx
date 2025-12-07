import { IMessageBoxPropsType } from "../types";

import Markdown from "react-markdown";

const MessageBox = ({ type, message }: IMessageBoxPropsType) => {
  const messagePosition = type !== "ai" ? "self-end" : "self-start";

  return (
    <div
      className={`${messagePosition} rounded-md bg-neutral-100 w-2/3 py-4 pl-2 pr-5`}
    >
      {type !== "ai" ? (
        <p className="text-sm">{message}</p>
      ) : (
        <Markdown>{message}</Markdown>
      )}
    </div>
  );
};

export default MessageBox;
