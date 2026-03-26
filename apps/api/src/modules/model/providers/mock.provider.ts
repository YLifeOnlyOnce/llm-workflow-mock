import type { ChatMessage } from "../../../common/types/chat.js";
import type { ModelCompletion, ModelProvider } from "../model.types.js";

export class MockProvider implements ModelProvider {
  async chat(messages: ChatMessage[]): Promise<ModelCompletion> {
    const lastUserMessage =
      [...messages].reverse().find((message) => message.role === "user")?.content ?? "";

    return {
      provider: "mock",
      content: `这是 mock 模型的示例回复：我已收到你的问题——${lastUserMessage}`
    };
  }
}

