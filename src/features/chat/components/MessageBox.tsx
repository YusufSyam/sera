import { IMessageBoxPropsType } from "../types";

const MessageBox = ({ type, message }: IMessageBoxPropsType) => {
  const messagePosition = type !== "ai" ? "self-end" : "self-start";

  return (
    <div
      className={`${messagePosition} rounded-md bg-neutral-200 w-fit py-4 pl-2 pr-5`}
    >
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default MessageBox;
