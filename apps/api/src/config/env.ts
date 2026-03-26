type ProviderName = "mock" | "openai-compatible";

function readString(key: string, defaultValue = ""): string {
  return process.env[key]?.trim() || defaultValue;
}

function readNumber(key: string, defaultValue: number): number {
  const value = Number(process.env[key]);
  return Number.isFinite(value) ? value : defaultValue;
}

function readProvider(): ProviderName {
  const value = readString("LLM_PROVIDER", "mock");
  return value === "openai-compatible" ? value : "mock";
}

export const env = {
  port: readNumber("PORT", 3000),
  llmProvider: readProvider(),
  llmBaseUrl: readString("LLM_BASE_URL"),
  llmApiKey: readString("LLM_API_KEY"),
  llmModel: readString("LLM_MODEL", "mock-model")
};

