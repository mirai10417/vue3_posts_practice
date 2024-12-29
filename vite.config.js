import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite"; // Vite용으로 명시적으로 import

export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ["src/components/app", "src/components/posts"], // 특정 경로에 폴더만 글로벌 컴포넌트로 선언
      dts: true, // 자동 생성된 타입 정의 파일 사용 // false시 unplugin-vue-components 사용하지 않음
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  watch: {
    usePolling: true, // 파일 시스템 이벤트 감지 문제 해결
  },
  server: {
    hmr: {
      protocol: "ws", // WebSocket 기반으로 HMR 연결
      overlay: true, // 에러 시 화면에 알림
    },
  },
});
