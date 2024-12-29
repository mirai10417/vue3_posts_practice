<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />

    <PostFilter
      v-model:title="params.title_like"
      v-model:limit="params._limit"
    />

    <hr class="my-4" />
    <AppGrid :items="posts">
      <template v-slot="{ item }">
        <PostItem
          :title="item.title"
          :content="item.content"
          :create-at="item.createAt"
          @click="goPage(item.id)"
          @modal="openModal(item)"
        ></PostItem>
      </template>
    </AppGrid>

    <AppPagination
      :current-page="params._page"
      :page-count="pageCount"
      @page="(page) => (params._page = page)"
    />

    <Teleport to="#modal">
      <PostModal
        v-model="show"
        :title="modalTitle"
        :content="modalContent"
        :createAt="modalCreateAt"
      />
    </Teleport>

    <template v-if="beforeDetailId">
      <hr class="my-5" />
      <AppCard>
        <PostDetailView
          v-if="beforeDetailId"
          :id="beforeDetailId"
        ></PostDetailView>
      </AppCard>
    </template>
  </div>
</template>

<script setup>
import PostItem from "@/components/posts/PostItem.vue";
import AppCard from "@/components/AppCard.vue";
import PostDetailView from "@/views/posts/PostDetailView.vue";
import { getPosts } from "@/api/posts";
import { ref, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import { computed } from "@vue/reactivity";
import AppPagination from "@/components/AppPagingation.vue";
import AppGrid from "@/components/AppGrid.vue";
import PostFilter from "@/components/posts/PostFilter.vue";
import PostModal from "@/components/posts/PostModal.vue";

const router = useRouter();
const route = useRoute();
const posts = ref([]);

const params = ref({
  _sort: "createAt",
  _order: "desc",
  _limit: 9,
  _page: 1,
  title_like: "",
});

const totalCount = ref(0);
const pageCount = computed(() =>
  Math.ceil(totalCount.value / params.value._limit)
);

const fetchPosts = async () => {
  try {
    const { data, headers } = await getPosts(params.value);
    posts.value = data;
    totalCount.value = headers["x-total-count"];
  } catch (error) {
    console.error(error);
  }
};

watchEffect(fetchPosts);
fetchPosts();

const beforeDetailId = route.query.id == undefined ? "0" : route.query.id;

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
