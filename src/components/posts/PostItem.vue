<template>
  <AppCard>
    <!-- <h5 class="card-title">{{ title }}</h5>
    <p class="card-text">
      {{ content }}
    </p>
    <p class="text-muted">{{ createAt }}</p> -->

    <template #header>
      <h5 class="card-title">{{ title }}</h5>
    </template>

    <p class="card-text">{{ content }}</p>
    <p class="text-muted">{{ createDate }}</p>

    <template #footer>
      <div class="d-flex flex-row-reverse">
        <button class="btn p-0" @click.stop="$emit('modal')">
          <i class="bi bi-aspect-ratio-fill"></i>
        </button>
      </div>
    </template>
  </AppCard>
</template>

<script setup>
import { computed, inject } from "vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  createAt: {
    type: [String, Date, Number],
  },
});
const dayjs = inject("dayjs");
const createDate = computed(() =>
  dayjs(props.createAt).format("YYYY.MM.DD HH:mm:ss")
);
</script>

<style lang="scss" scoped></style>
