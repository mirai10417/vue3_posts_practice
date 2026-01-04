<script setup>
import { useRouter } from "vue-router";
import { ref, inject, reactive, toRef, toRefs, onMounted } from "vue";
import axios from "axios"; // Default export로 import
import { useMenuStore } from "@/store/menuStore";

const errorMessage = "오류입니다.";

const position = reactive({
  x: 100,
  y: 1,
});

// const x = toRef(position, "x");
// const y = toRef(position, "y");
const { x, y } = toRefs(position);

console.log("x: ", typeof x);
console.log("y: ", typeof y);

const router = useRouter();
const goAboutPage = () => {
  router.push("/about");
};

const items = ref(["사과", "딸기", "포도", "바나나", "배", "우유"]);

const person = inject("person");

const options = {
  type: "A",
};
const formatDate = inject("formatDate", options);
const currentDate = new Date();
const formattedDate = ref(formatDate(currentDate));

const menuNm = ref();
const menuUrl = ref();
const menuStore = useMenuStore();
const data = ref(null);
const insertMenu = async () => {
  try {
    const response = await axios.post("/api/insertMenu", {
      menuNm: menuNm.value,
      menuUrl: menuUrl.value,
    });
    data.value = response.data;
    console.log("등록 성공:", data.value);

    await menuStore.fetchMenuList();
  } catch (error) {
    console.error("메뉴 등록 실패:", error);
  }
};
</script>
<template>
  <div>
    <h2>Home View</h2>
    <h2>JWT 로그인 및 새로고침시 토큰 재발급까지 완료</h2>
    <AppGrid :items="items" v-slot="{ item }" col-class="col-3">
      <AppCard>{{ item }}</AppCard>
    </AppGrid>
    <AppError :message="errorMessage" />
  </div>
</template>
<style lang="scss" scoped></style>
