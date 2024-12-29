<template>
  <h2>AboutView</h2>
  <p>{{ $route.path }}</p>
  <p>{{ $route.name }}</p>
  <button class="btn btn-primary" @click="$router.push('/')">Home 이동</button>
</template>

<script setup></script>

<style lang="scss" scoped></style>
