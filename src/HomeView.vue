<template>
  <div>
    <h2>Home View</h2>
    <p>{{ $route.path }}</p>
    <p>{{ $route.name }}</p>
    <button class="btn btn-primary" @click="goAboutPage">About으로 이동</button>
  </div>
  <hr class="my-4" />
  <AppGrid :items="items" v-slot="{ item }" col-class="col-3">
    <AppCard>{{ item }}</AppCard>
  </AppGrid>
  <hr class="my-4" />
  <h2>{{ formattedDate }}</h2>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, inject } from "vue";

const router = useRouter();
const goAboutPage = () => {
  router.push("/about");
};

const items = ref(["사과", "딸기", "포도", "바나나"]);

const options = {
  type: "A",
};
const formatDate = inject("formatDate", options);
const currentDate = new Date();

const formattedDate = ref(formatDate(currentDate));
console.log("currentDate: ", currentDate);
console.log("formattedDate: ", formattedDate.value);
</script>

<style lang="scss" scoped></style>
