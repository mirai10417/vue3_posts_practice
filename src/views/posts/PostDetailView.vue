<template>
  <AppLoading v-if="loading" />

  <AppError v-else-if="error" :message="error.message" />
  <div v-else>
    <h2>{{ post.title }}</h2>
    <p>id: {{ props.id }}, isOdd: {{ isOdd }}</p>
    <p>{{ post.content }}</p>
    <p class="text-muted">
      {{ $dayjs(post.createAt).format("YYYY.MM.DD HH:mm:ss") }}
    </p>
    <hr class="my-4" />
    <AppError v-if="removeError" :message="removeError.message" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="$router.push('/posts/10')">
          이전글
        </button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="$router.push('/posts/11')">
          다음글
        </button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">
          수정
        </button>
      </div>
      <div class="col-auto">
        <button
          class="btn btn-outline-danger"
          @click="goDeletePost"
          :disabled="removeLoading"
        >
          <template v-if="removeLoading">
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else> 삭제 </template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRouter } from "vue-router";
import { deletePost } from "@/api/posts";
import { computed, reactive, ref, toRef, toRefs } from "vue";
import { useAxios } from "@/hooks/useAxios";
import { useAlert } from "@/composables/alert";
import { useNumber } from "@/composables/number";

const { vAlert, vSuccess } = useAlert();

const props = defineProps({
  id: [String, Number],
});

const url = computed(() => `/posts/${props.id}`);
const { error, loading, data: post } = useAxios(url);

const router = useRouter();
const id = props.id;

const { id: idRef } = toRefs(props);
// const idRef = toRef(props, "id");

const { isOdd } = useNumber(idRef);

console.log("PostDetailView id: ", id);

const goDeletePost = async () => {
  if (confirm("삭제 하시겠습니까?") === false) {
    return;
  }

  execute();
};

const {
  error: removeError,
  loading: removeLoading,
  execute,
} = useAxios(
  `/posts/${props.id}`,
  { method: "delete" },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess("삭제가 완료되었습니다");
      router.push({ name: "PostList" });
    },
    onError: (err) => {
      vAlert(err.message);
    },
  }
);

// composable 전 반복 함수
// const error = ref(null);
// const loading = ref(false);

// const post = ref({});
// if (id != 0) {
//   const fetchPost = async () => {
//     try {
//       loading.value = true;
//       const { data } = await getPostById(id);
//       setPost(data);
//     } catch (err) {
//       error.value = err;
//     } finally {
//       loading.value = false;
//     }
//   };

//   fetchPost();
// }

// const setPost = ({ title, content, createAt }) => {
//   post.value.title = title;
//   post.value.content = content;
//   post.value.createAt = createAt;
// };

const goListPage = () => {
  router.push({ name: "PostList", query: { id: props.id } });
};

const goEditPage = () => {
  router.push({ name: "PostEdit", params: { id: props.id } });
};

onBeforeRouteUpdate(() => {
  console.log("onBeforeRouteUpdate");
});

onBeforeRouteLeave(() => {
  console.log("onBeforeRouteLeave");
});
</script>
<script>
export default {
  beforeRouteEnter() {
    console.log("beforeRouteEnter");
  },
};
</script>
<style lang="scss" scoped></style>
