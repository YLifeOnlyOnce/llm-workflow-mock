import type { IncomingMessage, ServerResponse } from "node:http";
import { handleChatRequest } from "./modules/chat/chat.controller.js";
import { setCorsHeaders, writeJson } from "./common/http.js";

export async function app(
  request: IncomingMessage,
  response: ServerResponse
): Promise<void> {
  setCorsHeaders(response);

  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }

  if (request.method === "GET" && request.url === "/health") {
    writeJson(response, 200, {
      success: true,
      data: {
        status: "ok"
      }
    });
    return;
  }

  if (request.method === "POST" && request.url === "/api/chat") {
    await handleChatRequest(request, response);
    return;
  }

  writeJson(response, 404, {
    success: false,
    message: "Not Found"
  });
}

