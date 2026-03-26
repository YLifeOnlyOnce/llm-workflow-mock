import { env } from "../../../config/env.js";
import type { ChatMessage } from "../../../common/types/chat.js";
import type { ModelCompletion, ModelProvider } from "../model.types.js";

interface OpenAICompatibleResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

export class OpenAICompatibleProvider implements ModelProvider {
  async chat(messages: ChatMessage[]): Promise<ModelCompletion> {
    if (!env.llmBaseUrl || !env.llmApiKey || !env.llmModel) {
      throw new Error("缺少真实模型配置，请检查 `.env` 中的模型参数");
    }

    const response = await fetch(`${env.llmBaseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.llmApiKey}`
      },
      body: JSON.stringify({
        model: env.llmModel,
        messages
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`模型调用失败：${response.status} ${errorText}`);
    }

    const data = (await response.json()) as OpenAICompatibleResponse;
    const content = data.choices?.[0]?.message?.content?.trim();

    if (!content) {
      throw new Error("模型返回内容为空");
    }

    return {
      provider: "openai-compatible",
      content
    };
  }
}

