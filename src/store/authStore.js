import { defineStore } from "pinia";
import api from "@/api/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: null,
    user: null, // 나중에 확장용
    username: null,
    initialized: false,
    refreshing: false,
  }),

  actions: {
    setLoginSuccess(accessToken, username) {
      this.accessToken = accessToken;
      this.username = username;
    },

    async fetchMe() {
      try {
        const res = await api.get("/api/user/me");
        console.log("fetchMe= ", res);

        this.user = res.data;
        this.username = res.data.username;
      } catch (e) {
        // 토큰이 유효하지 않으면 로그인 해제
        this.clearAuth();
      } finally {
        this.initialized = true;
      }
    },

    async refreshAccessTokenIfNeeded() {
      // accessToken이 이미 있으면 굳이 refresh 안 함
      if (this.accessToken) return;
      if (this.refreshing) return;

      this.refreshing = true;

      try {
        const res = await api.post("/api/auth/refresh");
        const { accessToken, username } = res.data;

        this.setLoginSuccess(accessToken, username);
      } catch (e) {
        this.clearAuth();
        throw e;
      } finally {
        this.refreshing = false;
        this.initialized = true;
      }
    },

    clearAuth() {
      this.accessToken = null;
      this.user = null;
      this.username = null;
      this.initialized = true;
    },
  },
});
