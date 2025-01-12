<template>
  <div v-show="isModalOpen" class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <h5>{{ modalTitle }}</h5>
        <button class="modal-close-btn" @click="toggleModal">&times;</button>
      </div>
      <div class="modal-body">
        <!-- slot을 사용하여 동적으로 모달의 body 부분을 변경 -->
        <slot></slot>
      </div>
      <div class="modal-footer"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  isModalOpen: Boolean,
  toggleModal: Function,
  saveSeats: Function,
  modalTitle: {
    type: [String],
  },
});
</script>

<style scoped>
.modal-close-btn {
  background-color: transparent;
  border: none;
  font-size: 2rem; /* 버튼 크기 */
  color: #333; /* 기본 텍스트 색상 */
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  transition: all 0.3s ease;
  margin-right: 10px;
}
/* 스타일은 부모 컴포넌트의 스타일과 함께 사용하거나, 여기에서 관리 */
/* 모달 오버레이 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 모달 오버레이의 z-index */
}

/* 모달 스타일 */
.modal {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  position: relative;
  z-index: 1000; /* z-index 추가 */
  display: block;
  height: 680px;
  max-height: 680px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2em;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
