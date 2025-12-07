import chatServices from "@/services/Chat/chat.services";
import {
  IGetChatMessageRequestType,
  ISendMessageChatRequestType,
} from "@/types/chat.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useSendMessage = () => {
  const [isLoadingSendMessage, setIsLoadingSendMessage] =
    useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: (payload: ISendMessageChatRequestType) => {
      return chatServices.sendMessage(payload);
    },
    onSuccess: () => {
      setIsLoadingSendMessage(true);
      setTimeout(() => {
        setIsLoadingSendMessage(false);
      }, 1500);
    },
  });

  return { ...mutation, isLoadingSendMessage };
};

export const useGetHistoryChats = (params: IGetChatMessageRequestType) => {
  return useQuery({
    queryKey: ["history-chats", params.sessionId],
    queryFn: async () => {
      const response = await chatServices.getAllHistoryChats({
        sessionId: params.sessionId,
      });

      return response;
    },
    enabled: !!params.sessionId,
  });
};
