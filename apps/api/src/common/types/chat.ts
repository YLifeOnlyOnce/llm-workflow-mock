export type ChatRole = "system" | "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface ChatRequestBody {
  sessionId: string;
  message: string;
}

export interface ChatResult {
  answer: string;
  provider: string;
  sessionId: string;
}

