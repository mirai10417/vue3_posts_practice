<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p class="text-muted">{{ post.createAt }}</p>
    <hr class="my-4" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음글</button>
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
        <button class="btn btn-outline-danger" @click="goDeletePost">
          삭제
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { getPostById, deletePost } from "@/api/posts";
import { reactive, ref } from "vue";

const props = defineProps({
  id: String,
});

const router = useRouter();
const id = props.id;

const goDeletePost = async () => {
  if (confirm("삭제 하시겠습니까?") === false) {
    return;
  }

  try {
    await deletePost(id);
    router.push({ name: "PostList" });
  } catch (error) {
    console.error(error);
  }
};

const post = ref({});
if (id != 0) {
  const fetchPost = async () => {
    try {
      const { data } = await getPostById(id);
      setPost(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchPost();
}

const setPost = ({ title, content, createAt }) => {
  post.value.title = title;
  post.value.content = content;
  post.value.createAt = createAt;
};

const goListPage = () => {
  router.push({ name: "PostList", query: { id: props.id } });
};

const goEditPage = () => {
  router.push({ name: "PostEdit", params: { id: props.id } });
};
</script>

<style lang="scss" scoped></style>
