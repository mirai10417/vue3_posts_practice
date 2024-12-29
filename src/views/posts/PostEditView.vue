<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
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
        <button class="btn btn-primary">수정</button>
      </template>
    </PostForm>
    <!-- <AppAlert
      :show="showAlert"
      :message="alertMessage"
      :typeStyle="alertType"
    ></AppAlert> -->
    <AppAlert :items="alerts" />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { getPostById, updatePost } from "@/api/posts";
import PostForm from "@/components/posts/PostForm.vue";
import AppAlert from "@/components/AppAlert.vue";

const router = useRouter();
const props = defineProps({
  id: String,
});

const id = props.id;

const editPost = async () => {
  try {
    await updatePost(props.id, { ...form.value });
    setTimeout(() => {
      // showAlert.value = false;
      router.push({ name: "PostDetail", params: { id } });
    }, 2000);
    vAlert("수정이 완료되었습니다.", "success");
  } catch (error) {
    console.error(error);
    vAlert(error.message);
  }
};

const form = ref({
  title: null,
  content: null,
});

const fetchPost = async () => {
  try {
    const { data } = await getPostById(props.id);
    setForm(data);
  } catch (error) {
    console.error(error);
    vAlert(error.message);
  }
};

const setForm = ({ title, content }) => {
  form.value.title = title;
  form.value.content = content;
};

fetchPost();

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

// const alertMessage = ref("");
// const showAlert = ref(false);
// const alertType = ref("error");

const alerts = ref([]);
const vAlert = (message, type = "error") => {
  alerts.value.push({ message, type });
  // showAlert.value = true;
  // alertMessage.value = message;
  // alertType.value = type;
  setTimeout(() => {
    // showAlert.vlaue = false;
    alerts.value.shift();
  }, 2000);
};
</script>

<style lang="scss" scoped></style>
