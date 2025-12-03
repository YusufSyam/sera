import { axiosClient as axios } from "@/lib/axios/axiosClient";
import { ISendMessageChatRequestType } from "@/types/chat.types";

class ChatServices {
  async sendMessage(params: ISendMessageChatRequestType) {
    try {
      const response = await axios.post("/", { ...params });

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }
}

const chatServices = new ChatServices();

export default chatServices;
