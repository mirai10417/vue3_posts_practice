import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  watch: {
    usePolling: true, // 파일 시스템 이벤트 감지 문제를 해결
  },
  server: {
    hmr: {
      protocol: "ws", // WebSocket 기반으로 HMR 연결
      // host: 'localhost', // 필요하면 명시적으로 설정
      // port: 3000 // 포트를 변경하려면 추가
    },
  },
});
