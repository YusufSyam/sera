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
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { getSessionIdPerDay } from "@/lib/utils";
import { IInputMessagePropsType } from "../types";

const InputMessage = ({ isNewChat }: IInputMessagePropsType) => {
  const { mutate, isLoadingSendMessage, isSuccess, isPending } = useSendMessage(
    { isNewChat }
  );
  const [isSendMessageLoading, setIsSendMessageLoading] =
    useState<boolean>(false);

  const mutationSendMessage = async (payload: ISendMessageChatRequestType) => {
    setIsSendMessageLoading(true);

    try {
      const todaysId = getSessionIdPerDay();

      mutate({
        chatInput: payload.chatInput,
        sessionId: todaysId,
      });
    } catch (error) {
      console.log("error");
    } finally {
      setIsSendMessageLoading(false);
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
    <div className="md:px-10  w-full left-0 sticky bottom-8 bg-white z-20">
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
                  className="border-0  bg-transparent px-3 py-2.5 text-base outline-none md:text-sm w-full "
                  placeholder="Silahkan berikan saya perintah"
                />

                <InputGroupAddon align={"block-end"} aria-label="Submit">
                  <InputGroupButton
                    type="submit"
                    size={"sm"}
                    disabled={isPending}
                    className="ml-auto bg-linear-to-bl from-[#01AFFF] to-[#006AFF] text-white"
                  >
                    {isPending ? (
                      <Spinner />
                    ) : (
                      <IconArrowUp className="text-4xl " />
                    )}
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
