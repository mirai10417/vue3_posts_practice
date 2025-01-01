<template>
  <h2>AboutView</h2>
  <p>{{ $route.path }}</p>
  <p>{{ $route.name }}</p>
  <button class="btn btn-primary" @click="$router.push('/')">Home 이동</button>
  <h2>Store</h2>
  <p>counter: {{ counter }}</p>
  <p>doubleCount: {{ doubleCount }}</p>
  <p>doubleCountPlusOne: {{ doubleCountPlusOne }}</p>
  <button @click="increment()">Click!!</button>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useCounterStore } from "@/store/counter";
import { storeToRefs } from "pinia";

const store = useCounterStore();
const { counter, doubleCount, doubleCountPlusOne } = storeToRefs(store);
const { increment } = store;
</script>

<style lang="scss" scoped></style>
