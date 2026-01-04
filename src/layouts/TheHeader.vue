<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useMenuStore } from "@/store/menuStore";
import { useAuthStore } from "@/store/authStore";

const router = useRouter();
const menuStore = useMenuStore();
const authStore = useAuthStore();
const username = computed(() => authStore.username);

// onMounted(() => {
//   menuStore.fetchMenuList();
// });

watch(
  () => authStore.initialized,
  (ready) => {
    if (ready && authStore.accessToken) {
      menuStore.fetchMenuList();
    }
  },
  { immediate: true }
);

const goPage = () => {
  router.push("/posts/create");
};
</script>
<template>
  <header>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/"> 로그인 화면 </RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto">
            <RouterLink
              v-for="menu in menuStore.menuList"
              :key="menu.menuSeq"
              :to="menu.menuUrl"
              class="nav-link"
            >
              {{ menu.menuNm }}
            </RouterLink>
          </ul>
          <form class="d-flex">
            <span style="color: white; padding: 5px"
              >{{ username }} 님 안녕하세요.
            </span>
            <!-- <button class="btn btn-outline-light" type="button" @click="goPage">
              글쓰기
            </button> -->
          </form>
        </div>
      </div>
    </nav>
  </header>
</template>
<style lang="scss" scoped></style>
