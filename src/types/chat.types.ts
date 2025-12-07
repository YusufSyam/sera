export interface ISendMessageChatRequestType {
  chatInput: string;
  sessionId: string;
}

export interface IGetChatMessageRequestType {
  sessionId: string;
}

export interface IChatbotResponseType {
  history: IHistoryChatbotResponseType[];
  webhook: IWebhookChatResponseType[];
}

export interface IWebhookChatResponseType {
  output: string;
}

export interface IHistoryChatbotResponseType {
  id: number;
  session_id: string;
  message: {
    type: string;
    content: string;
    additional_kwargs: any;
    response_metadata: any;
  };
}
