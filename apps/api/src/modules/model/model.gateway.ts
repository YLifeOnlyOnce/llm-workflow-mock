import type { ChatMessage } from "../../common/types/chat.js";
import { env } from "../../config/env.js";
import type { ModelCompletion, ModelProvider } from "./model.types.js";
import { MockProvider } from "./providers/mock.provider.js";
import { OpenAICompatibleProvider } from "./providers/openai-compatible.provider.js";

class ModelGateway {
  private readonly provider: ModelProvider;

  constructor() {
    this.provider =
      env.llmProvider === "openai-compatible"
        ? new OpenAICompatibleProvider()
        : new MockProvider();
  }

  async chat(messages: ChatMessage[]): Promise<ModelCompletion> {
    return this.provider.chat(messages);
  }
}

export const modelGateway = new ModelGateway();

