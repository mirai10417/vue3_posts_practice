<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />

    <PostFilter
      v-model:title="params.title_like"
      v-model:limit="params._limit"
      @update:limit="changeLimit"
    />

    <hr class="my-4" />

    <AppLoading v-if="loading" />

    <AppError v-else-if="error" :message="error.message" />

    <template v-else-if="!isExits">
      <p class="text-center py-5 text-muted">조회 된 글이 없습니다.</p>
    </template>

    <template v-else>
      <AppGrid :items="posts" col-class="col-12 col-md-6 col-lg-4">
        <template v-slot="{ item }">
          <PostItem
            :title="item.title"
            :content="item.content"
            :create-at="item.createAt"
            @click="goPage(item.id)"
            @modal="openModal(item)"
            @preview="selectPreview(item.id)"
          ></PostItem>
        </template>
      </AppGrid>

      <AppPagination
        :current-page="params._page"
        :page-count="pageCount"
        @page="(page) => (params._page = page)"
      />
    </template>
    <Teleport to="#modal">
      <PostModal
        v-model="show"
        :title="modalTitle"
        :content="modalContent"
        :createAt="modalCreateAt"
      />
    </Teleport>

    <template v-if="previewId">
      <hr class="my-5" />
      <AppCard>
        <PostDetailView :id="previewId"></PostDetailView>
      </AppCard>
    </template>
  </div>
</template>

<script setup>
import PostItem from "@/components/posts/PostItem.vue";
import PostDetailView from "@/views/posts/PostDetailView.vue";
import { getPosts } from "@/api/posts";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { computed } from "@vue/reactivity";
import PostModal from "@/components/posts/PostModal.vue";
import { useAxios } from "@/hooks/useAxios";

const previewId = ref(null);
const selectPreview = (id) => {
  previewId.value = id;
};

const changeLimit = (value) => {
  params.value._limit = value;
  params.value._page = 1;
};

const router = useRouter();
const route = useRoute();

const params = ref({
  _sort: "createAt",
  _order: "desc",
  _limit: 6,
  _page: 1,
  title_like: "",
});

const {
  response,
  data: posts = ref([]), // posts를 빈 배열로 초기화,
  error,
  loading,
} = useAxios("/posts", { method: "get", params });

const isExits = computed(() => {
  return posts.value && posts.value.length > 0;
});

const totalCount = computed(() => response.value.headers["x-total-count"]);
const pageCount = computed(() =>
  Math.ceil(totalCount.value / params.value._limit)
);

const goPage = (id) => {
  router.push({
    name: "PostDetail",
    params: {
      id,
    },
  });
};

const show = ref(false);
const modalTitle = ref("");
const modalContent = ref("");
const modalCreateAt = ref("");
const openModal = ({ title, content, createAt }) => {
  show.value = true;
  modalTitle.value = title;
  modalContent.value = content;
  modalCreateAt.value = createAt;
};
const closeModal = () => {
  show.value = false;
};
</script>

<style lang="scss" scoped></style>
