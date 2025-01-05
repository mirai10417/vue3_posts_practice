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
  <!-- <button class="btn btn-primary" @click="person.say">click person</button> -->
  <p>{{ position }}</p>
  {{ x }}, {{ y }}
  <h2>API로부터 받은 데이터:</h2>
  <pre>{{ data }}</pre>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, inject, reactive, toRef, toRefs, onMounted } from "vue";
import axios from "axios"; // Default export로 import

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

const items = ref(["사과", "딸기", "포도", "바나나"]);

const person = inject("person");

const options = {
  type: "A",
};
const formatDate = inject("formatDate", options);
const currentDate = new Date();
const formattedDate = ref(formatDate(currentDate));

const data = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get("/api/test");
    data.value = response.data;
    console.log(data.value);
  } catch (error) {
    console.error("데이터 가져오기 실패:", error);
  }
});
</script>

<style lang="scss" scoped></style>
