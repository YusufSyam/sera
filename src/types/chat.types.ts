export interface ISendMessageChatRequestType {
  chatInput: string;
  sessionId: string;
}

export interface IGetChatMessageRequestType {
  sessionId: string;
}

export interface IGetChatMessageResponseType {
  output: string;
}
