import { axiosClient as axios } from "@/lib/axios/axiosClient";
import { supabaseClient } from "@/lib/supabase/client";
import { IApiAxiosResponseType } from "@/types/base_api.types";
import {
  IChatbotResponseType,
  IGetChatMessageRequestType,
  ISendMessageChatRequestType,
} from "@/types/chat.types";

class ChatServices {
  async sendMessage(
    params: ISendMessageChatRequestType
  ): Promise<IApiAxiosResponseType<IChatbotResponseType>> {
    try {
      const response: { output: string } = await axios.post(
        "https://rvihjnuexvumovkcprdb.supabase.co/functions/v1/chatBot",
        {
          ...params,
        },

        {
          headers: {
            "Content-Type": "application/json",
            "Authorization":
              `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2aWhqbnVleHZ1bW92a2NwcmRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1OTAzODMsImV4cCI6MjA4MDE2NjM4M30.uQXuirjcSqYbPcfO5AqhoL2xy4YUXknwro_Rw7rGNqE`,
          },
        }
      );

      const data: IApiAxiosResponseType<IChatbotResponseType> = response.data;

      return data;
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
