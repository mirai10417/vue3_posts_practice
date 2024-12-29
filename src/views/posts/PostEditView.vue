<template>
  <AppLoading v-if="loading" />

  <AppError v-else-if="error" :message="error.message" />

  <div v-else>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <AppError v-if="editError" :message="error.message" />
    <PostForm
      v-model:title="form.title"
      v-model:content="form.content"
      @submit.prevent="editPost"
    >
      <template #actions>
        <button
          type="button"
          class="btn btn-outline-danger me-2"
          @click="goDetailPage"
        >
          취소
        </button>
        <button class="btn btn-primary" :disabled="editLoading">
          <template v-if="editLoading">
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else> 수정 </template>
        </button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { getPostById, updatePost } from "@/api/posts";
import PostForm from "@/components/posts/PostForm.vue";
import { useAlert } from "@/composables/alert";
import { useAxios } from "@/hooks/useAxios";

const router = useRouter();
const props = defineProps({
  id: String,
});

const id = props.id;

const { data: form, error, loading } = useAxios(`/posts/${props.id}`);

const {
  error: editError,
  loading: editLoading,
  execute,
} = useAxios(
  `/posts/${id}`,
  {
    method: "patch",
  },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess("수정이 완료되었습니다!");
      router.push({ name: "PostDetail", params: { id } });
    },
    onError: () => {
      vAlert(err.message);
    },
  }
);

const editPost = () => {
  execute({
    ...form.value,
  });
};

const { vAlert, vSuccess } = useAlert();

// const editError = ref(null);
// const editLoading = ref(false);

// const editPost = async () => {
//   try {
//     editLoading.value = true;
//     await updatePost(props.id, { ...form.value });
//     // setTimeout(() => {
//     //   router.push({ name: "PostDetail", params: { id } });
//     // }, 2000);

//     router.push({ name: "PostDetail", params: { id } });
//     vSuccess("수정이 완료되었습니다.");
//   } catch (err) {
//     error.value = err;
//   } finally {
//     editLoading.value = false;
//   }
// };

const goDetailPage = () => {
  router.push({
    name: "PostDetail",
    params: { id: props.id },
  });
};

const goList = () => {
  router.push({
    name: "PostList",
  });
};
</script>

<style lang="scss" scoped></style>
