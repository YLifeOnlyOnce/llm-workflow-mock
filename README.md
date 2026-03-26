# LLM App Skeleton

一个适合继续扩展的大模型上层应用 TypeScript 骨架，包含：

- `apps/api`：后端 API，负责会话、Prompt、模型网关
- `apps/web`：基于 `Vite + Vue 3 + TypeScript` 的前端示例页面

## 目录

```txt
apps/
├─ api/
│  └─ src/
│     ├─ config/
│     ├─ common/
│     └─ modules/
│        ├─ chat/
│        ├─ model/
│        ├─ prompt/
│        ├─ session/
│        └─ usage/
└─ web/
   └─ src/
      └─ services/
```

## 快速开始

1. 复制后端环境变量

```bash
cp apps/api/.env.example apps/api/.env
```

2. 如需自定义前端接口地址，可再复制前端环境变量

```bash
cp apps/web/.env.example apps/web/.env
```

3. 安装依赖

```bash
npm install
```

4. 启动后端

```bash
npm run dev:api
```

5. 启动前端

```bash
npm run dev:web
```

## 默认行为

- 默认模型提供方是 `mock`
- `/api/chat` 会回显用户输入，便于先把应用链路跑通
- 要接入真实模型时，只需要修改 `apps/api/src/modules/model/providers/openai-compatible.provider.ts`
- 后端默认从 `apps/api/.env` 读取模型配置
- 前端默认请求 `http://localhost:3000`
