<template>
  <header>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/"> Welcome </RouterLink>
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
              >{{ session }} 님 안녕하세요.
            </span>
            <button class="btn btn-outline-light" type="button" @click="goPage">
              글쓰기
            </button>
          </form>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useMenuStore } from "@/store/menuStore";

const router = useRouter();
const goPage = () => {
  router.push("/posts/create");
};

let session = ref();
onMounted(async () => {
  const sessionIsNot = sessionStorage.getItem("session") == null ? true : false;

  if (sessionIsNot) {
    session.value = generateRandomKey();
    sessionStorage.setItem("session", session.value);
  } else {
    session.value = sessionStorage.getItem("session");
  }
});

function generateRandomKey() {
  return "key_" + Math.random().toString(36).substring(2, 10); // 난수 키 생성
}

const menuStore = useMenuStore();

onMounted(() => {
  menuStore.fetchMenuList();
});

console.log("TheHeader.vue");
console.log(menuStore);
</script>

<style lang="scss" scoped></style>
