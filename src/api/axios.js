import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // refresh token을 cookie로 쓸 경우 대비
});

/** ======================
 * Request Interceptor
 ======================= */
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/** ======================
 * Response Interceptor
 ======================= */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore();
    const originalRequest = error.config;

    // ❌ refresh 요청 자체가 401이면 무한루프 방지
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        // 🔥 refresh 시도
        await authStore.refreshAccessTokenIfNeeded();

        // 🔥 새 토큰으로 Authorization 다시 세팅
        originalRequest.headers.Authorization = `Bearer ${authStore.accessToken}`;

        // 🔥 원래 요청 재시도
        return api(originalRequest);
      } catch (e) {
        // refresh 실패 → 완전 로그아웃
        authStore.clearAuth();
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
