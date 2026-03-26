import type { ChatMessage, ChatRole } from "../../common/types/chat.js";

const sessionStore = new Map<string, ChatMessage[]>();

class SessionService {
  async getRecentMessages(sessionId: string): Promise<ChatMessage[]> {
    return sessionStore.get(sessionId) ?? [];
  }

  async saveMessage(
    sessionId: string,
    role: Exclude<ChatRole, "system">,
    content: string
  ): Promise<void> {
    const history = sessionStore.get(sessionId) ?? [];

    history.push({
      role,
      content
    });

    sessionStore.set(sessionId, history.slice(-20));
  }
}

export const sessionService = new SessionService();

