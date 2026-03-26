import type { IncomingMessage, ServerResponse } from "node:http";
import { readJsonBody, writeJson } from "../../common/http.js";
import type { ChatRequestBody } from "../../common/types/chat.js";
import { chatService } from "./chat.service.js";

export async function handleChatRequest(
  request: IncomingMessage,
  response: ServerResponse
): Promise<void> {
  try {
    const body = await readJsonBody<ChatRequestBody>(request);

    if (!body.sessionId?.trim()) {
      writeJson(response, 400, {
        success: false,
        message: "sessionId 不能为空"
      });
      return;
    }

    if (!body.message?.trim()) {
      writeJson(response, 400, {
        success: false,
        message: "message 不能为空"
      });
      return;
    }

    const result = await chatService.chat(body.sessionId, body.message);
    console.log("Chat result:", result);

    writeJson(response, 200, {
      success: true,
      data: result
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "未知错误";

    writeJson(response, 500, {
      success: false,
      message
    });
  }
}

