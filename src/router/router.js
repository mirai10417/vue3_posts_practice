import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import PostCreateView from "@/views/posts/PostCreateView.vue";
import PostDetailView from "@/views/posts/PostDetailView.vue";
import PostListView from "@/views/posts/PostListView.vue";
import PostEditView from "@/views/posts/PostEditView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import NestedView from "@/views/nested/NestedView.vue";
import NestedOneView from "@/views/nested/NestedOneView.vue";
import NestedTwoView from "@/views/nested/NestedTwoView.vue";
import NestedHomeView from "@/views/nested/NestedHomeView.vue";
import MyPage from "@/views/MyPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
  },
  {
    path: "/posts",
    name: "PostList",
    component: PostListView,
  },
  {
    path: "/posts/create",
    name: "PostCreate",
    component: PostCreateView,
  },
  {
    path: "/posts/:id",
    name: "PostDetail",
    component: PostDetailView,
    props: true,
  },
  {
    path: "/posts/:id/edit",
    name: "PostEdit",
    component: PostEditView,
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,
  },
  {
    path: "/nested",
    name: "Nested",
    component: NestedView,
    children: [
      {
        path: "",
        name: "NestedHome",
        component: NestedHomeView,
      },
      {
        path: "one",
        name: "NestedOne",
        component: NestedOneView,
      },
      {
        path: "two",
        name: "NestedTwo",
        component: NestedTwoView,
      },
    ],
  },
  {
    path: "/my",
    name: "MyPage",
    component: MyPage,
    // beforeEnter: (to, from) => {
    //   //배열 값으로 여러개 이동 가능
    //   // return { name: "Home" }; 기본 Default
    //   // query값이 있으면 query값을 지우고 페이지 이동 시켜줌
    //   if (Object.keys(to.query).length > 0) {
    //     return { path: to.path, query: {} };
    //   }
    // },
    beforeEnter: [removeQueryString],
  },
];

function removeQueryString(to) {
  if (Object.keys(to.query).length > 0) {
    return { path: to.path, query: {} };
  }
}

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

// router.beforeEach((to, from) => {
//   if (to.name === "MyPage") {
//     // return false;
//     return router.push({ name: "Home" });
//   }
// });

export default router;
