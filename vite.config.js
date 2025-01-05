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
    proxy: {
      "/api": {
        target: "http://localhost:8080", // Spring Boot 서버의 URL
        changeOrigin: true, // Cross-Origin 문제 해결
        rewrite: (path) => path.replace(/^\/api/, ""), // '/api' 제거
      },
    },

    //     '/api': Vue에서 /api로 시작하는 요청을 프록시 처리.
    //     target: 'http://localhost:8080': Spring Boot 백엔드 서버의 URL (로컬 환경에서는 http://localhost:8080).
    //     changeOrigin: true: 백엔드와 다른 도메인을 사용하는 경우, 원본 호스트 헤더를 변경하여 Cross-Origin 문제를 방지.
    //     rewrite: (path) => path.replace(/^\/api/, ''): 프록시 요청 시 '/api' 경로를 제거하고 백엔드의 실제 경로로 매핑.
  },
});
