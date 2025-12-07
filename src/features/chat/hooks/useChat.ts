import {
  GET_ALL_CHAT_HISTORY,
  GET_ALL_CHAT_HISTORY_SESSION,
} from "@/constant/query_key";
import chatServices from "@/services/Chat/chat.services";
import {
  IGetChatMessageRequestType,
  ISendMessageChatRequestType,
} from "@/types/chat.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IInputMessagePropsType } from "../types";
import { useRouter } from "next/navigation";

export const useSendMessage = ({ isNewChat }: IInputMessagePropsType) => {
  const queryClient = useQueryClient();
  const navigate = useRouter();

  const [isLoadingSendMessage, setIsLoadingSendMessage] =
    useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: (payload: ISendMessageChatRequestType) => {
      return chatServices.sendMessage(payload);
    },
    onSuccess: (response) => {
      const sessionIdFromResponse = response.history[0].session_id;

      if (isNewChat) {
        queryClient.invalidateQueries({
          queryKey: [GET_ALL_CHAT_HISTORY],
        });

        navigate.push(`/chat/${sessionIdFromResponse}`);
      }
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
