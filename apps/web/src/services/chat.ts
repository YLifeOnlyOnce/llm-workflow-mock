export interface ChatRequestBody {
  sessionId: string;
  message: string;
}

interface ChatSuccessResponse {
  success: true;
  data: {
    answer: string;
    provider: string;
    sessionId: string;
  };
}

interface ChatErrorResponse {
  success: false;
  message: string;
}

type ChatResponse = ChatSuccessResponse | ChatErrorResponse;

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

export async function sendChatMessage(body: ChatRequestBody): Promise<{
  answer: string;
  provider: string;
}> {
  const response = await fetch(`${apiBaseUrl}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const result = (await response.json()) as ChatResponse;

  if (!response.ok || !result.success) {
    throw new Error(result.success ? "请求失败" : result.message);
  }

  return {
    answer: result.data.answer,
    provider: result.data.provider
  };
}

