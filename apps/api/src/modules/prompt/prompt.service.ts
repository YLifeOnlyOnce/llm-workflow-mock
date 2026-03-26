import type { ChatMessage } from "../../common/types/chat.js";

class PromptService {
  buildMessages(params: {
    history: ChatMessage[];
    userMessage: string;
  }): ChatMessage[] {
    return [
      {
        role: "system",
        content:
          "你是一个专业、简洁的中文 AI 助手。回答要准确，不要编造未提供的业务事实。"
      },
      ...params.history,
      {
        role: "user",
        content: params.userMessage
      }
    ];
  }
}

export const promptService = new PromptService();

