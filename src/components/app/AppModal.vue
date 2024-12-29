<template>
  <Transition>
    <div v-if="modelValue">
      <div class="modal-backdrop fade show"></div>
      <div
        class="modal fade show d-block"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <slot name="">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  {{ title }}
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  @click="$emit('update:modelValue', false)"
                ></button>
              </slot>
            </div>
            <div class="modal-body"><slot></slot></div>
            <div class="modal-footer">
              <slot name="actions"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
  title: String,
});

defineEmits(["close", "update:modelValue"]);
</script>

<style lang="scss" scoped>
</style>