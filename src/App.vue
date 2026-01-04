<script setup>
import TheHeader from "@/layouts/TheHeader.vue";
import TheView from "@/layouts/TheView.vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/store/authStore";
import { onMounted } from "vue";

const route = useRoute();
const authStore = useAuthStore();

onMounted(async () => {
  try {
    // 새로고침 하는경우 refresh 토큰 체크
    await authStore.refreshAccessTokenIfNeeded();
  } catch (e) {
    // refresh 실패 = 비로그인 상태
    console.log("not logged in");
  }
});
</script>

<template>
  <TheHeader v-if="!route.meta.hideHeader" />
  <TheView></TheView>
  <AppAlert />
</template>

<style></style>
