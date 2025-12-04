import chatServices from "@/services/Chat/chat.services";
import {
  IGetChatMessageRequestType,
  ISendMessageChatRequestType,
} from "@/types/chat.types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSendMessage = () => {
  return useMutation({
    mutationFn: (payload: ISendMessageChatRequestType) => {
      return chatServices.sendMessage(payload);
    },
  });
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
