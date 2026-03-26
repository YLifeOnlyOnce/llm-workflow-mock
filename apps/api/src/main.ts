import "dotenv/config";
import { createServer } from "node:http";
import { app } from "./app.js";
import { env } from "./config/env.js";

const server = createServer((request, response) => {
  void app(request, response);
});

server.listen(env.port, () => {
  console.log(`API server is running at http://localhost:${env.port}`);
});
