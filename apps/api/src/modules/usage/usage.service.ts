class UsageService {
  track(payload: {
    sessionId: string;
    provider: string;
    inputMessages: number;
  }): void {
    console.log("[usage]", payload);
  }
}

export const usageService = new UsageService();

