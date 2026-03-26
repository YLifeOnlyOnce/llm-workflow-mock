<script setup lang="ts">
import { nextTick, ref } from "vue";
import { sendChatMessage } from "./services/chat";

type MessageRole = "user" | "assistant";

interface MessageItem {
  role: MessageRole;
  content: string;
}

const sessionId = ref("demo-session");
const inputMessage = ref("");
const sending = ref(false);
const messages = ref<MessageItem[]>([]);
const messageListRef = ref<HTMLDivElement | null>(null);

async function scrollToBottom(): Promise<void> {
  await nextTick();

  if (messageListRef.value) {
    messageListRef.value.scrollTop = messageListRef.value.scrollHeight;
  }
}

async function handleSubmit(): Promise<void> {
  const currentSessionId = sessionId.value.trim();
  const currentMessage = inputMessage.value.trim();

  if (!currentSessionId || !currentMessage || sending.value) {
    return;
  }

  messages.value.push({
    role: "user",
    content: currentMessage
  });
  inputMessage.value = "";
  sending.value = true;
  await scrollToBottom();

  try {
    const result = await sendChatMessage({
      sessionId: currentSessionId,
      message: currentMessage
    });

    messages.value.push({
      role: "assistant",
      content: `${result.answer}（provider: ${result.provider}）`
    });
  } catch (error) {
    const text = error instanceof Error ? error.message : "请求失败";
    messages.value.push({
      role: "assistant",
      content: `发生错误：${text}`
    });
  } finally {
    sending.value = false;
    await scrollToBottom();
  }
}
</script>

<template>
  <main class="page">
    <section class="panel">
      <h1>LLM 应用骨架示例</h1>
      <p class="desc">前端已切到 Vite + Vue 3 + TypeScript，后端仍走统一模型网关。</p>

      <div ref="messageListRef" class="messages">
        <article
          v-for="(item, index) in messages"
          :key="`${item.role}-${index}`"
          class="message"
          :class="item.role === 'user' ? 'message-user' : 'message-assistant'"
        >
          <header>{{ item.role === "user" ? "你" : "AI" }}</header>
          <p>{{ item.content }}</p>
        </article>

        <div v-if="messages.length === 0" class="empty">
          先发一条消息，验证前后端链路是否跑通。
        </div>
      </div>

      <form class="form" @submit.prevent="handleSubmit">
        <input v-model="sessionId" placeholder="sessionId" />
        <textarea
          v-model="inputMessage"
          rows="4"
          placeholder="输入你的问题，例如：帮我总结一下 RAG 的原理"
        />
        <button type="submit" :disabled="sending">
          {{ sending ? "发送中..." : "发送" }}
        </button>
      </form>
    </section>
  </main>
</template>

