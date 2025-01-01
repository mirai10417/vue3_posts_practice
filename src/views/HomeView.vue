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
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, inject, reactive, toRef, toRefs } from "vue";

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
</script>

<style lang="scss" scoped></style>
