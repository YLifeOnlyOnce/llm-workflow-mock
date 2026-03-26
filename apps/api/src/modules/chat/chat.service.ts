import { promptService } from "../prompt/prompt.service.js";
import { sessionService } from "../session/session.service.js";
import { modelGateway } from "../model/model.gateway.js";
import { usageService } from "../usage/usage.service.js";
import type { ChatResult } from "../../common/types/chat.js";

class ChatService {
  async chat(sessionId: string, userMessage: string): Promise<ChatResult> {
    const history = await sessionService.getRecentMessages(sessionId);

    const messages = promptService.buildMessages({
      history,
      userMessage
    });
    console.log("Built messages for model:", messages);

    const completion = await modelGateway.chat(messages);

    await sessionService.saveMessage(sessionId, "user", userMessage);
    await sessionService.saveMessage(sessionId, "assistant", completion.content);

    usageService.track({
      sessionId,
      provider: completion.provider,
      inputMessages: messages.length
    });
    
    return {
      answer: completion.content,
      provider: completion.provider,
      sessionId
    };
  }
}

export const chatService = new ChatService();

