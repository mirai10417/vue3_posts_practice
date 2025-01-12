<template>
  <nav aria-label="Page navigation" class="pagination-container">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a
          class="page-link"
          href="#"
          @click.prevent="changePage(beforePage - 1)"
        >
          이전
        </a>
      </li>
      <li
        v-for="page in pageNumbers"
        :key="page"
        class="page-item"
        :class="{ active: currentPage === page }"
      >
        <a class="page-link" href="#" @click.prevent="changePage(page)">
          {{ page }}
        </a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" href="#" @click.prevent="changePage(nextPage + 1)">
          다음
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed, ref } from "vue";
const props = defineProps({
  currentPage: {
    type: [Number, String], // 타입을 정확히 Number로 통일하거나, String과 Number 모두 처리하도록 설정
    required: true,
  },
  totalPages: {
    type: [Number, String], // 타입을 정확히 Number로 통일하거나, String과 Number 모두 처리하도록 설정
    required: true,
  },
});

const emit = defineEmits(["changePage"]);

const changePage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit("changePage", page);
  }
};

const nextPage = ref(0);
const beforePage = ref(0);

// 10개씩 페이지 번호 범위 계산
const pageNumbers = computed(() => {
  const startPage = Math.floor((props.currentPage - 1) / 10) * 10 + 1;
  const endPage = Math.min(startPage + 9, props.totalPages);

  let pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  nextPage.value = endPage;
  beforePage.value = startPage;
  return pages;
});

console.log(pageNumbers);
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  width: 100%; /* 부모 요소의 너비를 100%로 설정 */
}

.pagination {
  display: flex;
  gap: 10px;
}

.page-item .page-link {
  padding: 5px 10px;
  cursor: pointer;
}

.page-item.active .page-link {
  background-color: #007bff;
  color: white;
}

.page-item.disabled .page-link {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
