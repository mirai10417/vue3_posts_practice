<template>
  <div>
    <select class="form-select" v-model="selectedHour">
      <option value="00">00</option>
      <option value="01">01</option>
      <option value="02">02</option>
      <option value="03">03</option>
      <option value="04">04</option>
      <option value="05">05</option>
      <option value="06">06</option>
      <option value="07">07</option>
      <option value="08">08</option>
      <option value="09">09</option>
      <option value="10">10</option>
      <option value="11">11</option>
      <option value="12">12</option>
      <option value="13">13</option>
      <option value="14">14</option>
      <option value="15">15</option>
      <option value="16">16</option>
      <option value="17">17</option>
      <option value="18">18</option>
      <option value="19">19</option>
      <option value="20">20</option>
      <option value="21">21</option>
      <option value="22">22</option>
      <option value="23">23</option>
    </select>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});
const emit = defineEmits();

const selectedHour = computed({
  get: () => {
    return props.modelValue;
  },
  set: (value) => {
    console.log("set:", value); // 값을 설정할 때마다 로그 출력
    emit("update:modelValue", value);
  },
});
</script>

<style lang="scss" scoped></style>
