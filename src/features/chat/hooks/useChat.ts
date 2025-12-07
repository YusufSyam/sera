import { GET_ALL_CHAT_HISTORY_SESSION } from "@/constant/query_key";
import chatServices from "@/services/Chat/chat.services";
import {
  IGetChatMessageRequestType,
  ISendMessageChatRequestType,
} from "@/types/chat.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  const [isLoadingSendMessage, setIsLoadingSendMessage] =
    useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: (payload: ISendMessageChatRequestType) => {
      return chatServices.sendMessage(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_CHAT_HISTORY_SESSION],
      });
      setIsLoadingSendMessage(true);
      setTimeout(() => {
        setIsLoadingSendMessage(false);
      }, 1500);
    },
  });

  return { ...mutation, isLoadingSendMessage };
};

export const useGetHistoryChats = () => {
  return useQuery({
    queryKey: ["history-chats"],
    queryFn: async () => {
      const response = await chatServices.getAllHistoryChats();

      return response;
    },
  });
};

export const useGetDetailHistoryChats = (
  params: IGetChatMessageRequestType
) => {
  return useQuery({
    queryKey: [GET_ALL_CHAT_HISTORY_SESSION],
    queryFn: async () => {
      const response = await chatServices.getChatDetailBySessionId({
        sessionId: params.sessionId,
      });

      return response;
    },
    enabled: !!params.sessionId,
  });
};
