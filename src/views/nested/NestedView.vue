<template>
  <div>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <RouterLink
          class="nav-link"
          active-class="active"
          to="/nested/"
          exact-active-class="active"
          >홈</RouterLink
        >
      </li>
      <li class="nav-item">
        <RouterLink
          class="nav-link"
          active-class="active"
          :to="{ name: 'NestedOne', replace: true }"
          >탭1</RouterLink
        >
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" active-class="active" to="/nested/two"
          >탭2</RouterLink
        >
      </li>
    </ul>
    <hr class="my-4" />
    <RouterView></RouterView>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
