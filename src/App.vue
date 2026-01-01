<script setup>
import TheHeader from "@/layouts/TheHeader.vue";
import TheView from "@/layouts/TheView.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <TheHeader v-if="!route.meta.hideHeader" />
  <TheView></TheView>
  <AppAlert />
</template>

<style></style>
