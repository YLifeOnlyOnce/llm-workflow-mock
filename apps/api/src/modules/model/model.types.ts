import type { ChatMessage } from "../../common/types/chat.js";

export interface ModelCompletion {
  content: string;
  provider: string;
}

export interface ModelProvider {
  chat(messages: ChatMessage[]): Promise<ModelCompletion>;
}

