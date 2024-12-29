<template>
  <div>
    <h2 @click="visibleForm = !visibleForm">게시글 등록</h2>
    <hr class="my-4" />
    <AppError v-if="error" :message="error.message" />
    <PostForm
      v-if="visibleForm"
      v-model:title="form.title"
      v-model:content="form.content"
      @submit.prevent="save"
    >
      <template #actions>
        <button
          type="button"
          class="btn btn-outline-danger me-2"
          @click="goList"
        >
          목록
        </button>
        <button class="btn btn-primary" :disabled="loading">
          <template v-if="loading">
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else> 저장 </template>
        </button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createPost } from "@/api/posts";
import PostForm from "@/components/posts/PostForm.vue";
import { useAlert } from "@/composables/alert";
import { useAxios } from "@/hooks/useAxios";

const { vAlert, vSuccess } = useAlert();

const router = useRouter();
// const loading = ref(false);
// const error = ref(null);
const form = ref({
  title: null,
  content: null,
});

const goList = () => {
  router.push({
    name: "PostList",
  });
};

const visibleForm = ref(true);

const { error, loading, execute } = useAxios(
  "/posts",
  {
    method: "post",
  },
  {
    immediate: false,
    onSuccess: () => {
      router.push({ name: "PostList" });
      vSuccess("등록이 완료되었습니다.");
    },
    onError: (err) => {
      vAlert(err.message);
    },
  }
);

const save = async () => {
  execute({ ...form.value, createAt: Date.now() });
};
// const save = async () => {
//   try {
//     loading.value = true;
//     await createPost({
//       ...form.value,
//       createAt: Date.now(),
//     });

//     router.push({ name: "PostList" });
//     vSuccess("등록이 완료되었습니다.");
//   } catch (err) {
//     error.value = error;
//   } finally {
//     loading.value = false;
//   }
// };
</script>

<style lang="scss" scoped></style>
