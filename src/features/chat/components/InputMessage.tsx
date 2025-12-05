"use client";

import { IconArrowUp } from "@tabler/icons-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import TextareaAutoSize from "react-textarea-autosize";
import { useSendMessage } from "../hooks/useChat";
import { useForm } from "@tanstack/react-form";
import { ISendMessageChatRequestType } from "@/types/chat.types";

const InputMessage = () => {
  const { mutate } = useSendMessage();

  const mutationSendMessage = async (payload: ISendMessageChatRequestType) => {
    try {
      mutate({
        chatInput: payload.chatInput,
        sessionId: `bdce84ef2a9d4cc69fc5d7d57ca90888`,
      });
    } catch (error) {
      console.log("error");
    }
  };

  const form = useForm({
    defaultValues: {
      chatInput: "",
      sessionId: "",
    },
    onSubmit: async ({ value }) => {
      mutationSendMessage(value);
    },
  });

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <div className="md:px-10  w-full left-0 sticky ">
      <form onSubmit={(e) => handleSendMessage(e)}>
        <form.Field
          name="chatInput"
          children={(field) => {
            return (
              <InputGroup>
                <TextareaAutoSize
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="border-0 resize- bg-transparent px-3 py-2.5 text-base outline-none md:text-sm w-full min-h-16"
                  placeholder="Silahkan berikan saya perintah"
                />

                <InputGroupAddon align={"block-end"} aria-label="Submit">
                  <InputGroupButton
                    type="submit"
                    size={"sm"}
                    className="ml-auto bg-linear-to-bl from-[#01AFFF] to-[#006AFF]  text-white"
                  >
                    <IconArrowUp className="text-4xl " />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            );
          }}
        />
      </form>
    </div>
  );
};

export default InputMessage;
