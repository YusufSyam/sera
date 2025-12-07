import { axiosClient as axios } from "@/lib/axios/axiosClient";
import { supabaseClient } from "@/lib/supabase/client";
import {
  IGetChatMessageRequestType,
  ISendMessageChatRequestType,
} from "@/types/chat.types";

class ChatServices {
  async sendMessage(params: ISendMessageChatRequestType) {
    try {
      const response = await supabaseClient.functions.invoke(
        "chatBot",
        {
          body: {
            chatInput: `${params.chatInput}`,
            sessionId: params.sessionId,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getChatResponse(params: IGetChatMessageRequestType) {
    try {
      const response = await supabaseClient
        .from("n8n_chat_histories")
        .select("id, message")
        .eq(`session_id`, params.sessionId)
        .order(`id`, { ascending: false });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getAllHistoryChats(params: IGetChatMessageRequestType) {
    try {
      const { data, status, error } = await supabaseClient
        .from("n8n_chat_histories")
        .select("id, message, session_id")
        .eq(`session_id`, params.sessionId);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

const chatServices = new ChatServices();

export default chatServices;
