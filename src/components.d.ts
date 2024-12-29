//components.d.ts
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    RouterLink: typeof import("vue-router")["RouterLink"];
    RouterView: typeof import("vue-router")["RouterLink"];
  }
}

export {};

// AppGrid, AppPagination, AppAlert, AppCard, AppModal은 자동으로 타입 등록이 되어 별도로 추가 해주지 않아도 .vue에서 빨간색 글씨로 나오지 않음
// 만약 빨갛다면
// ex) AppAlert: typeof import('./src/components/app/AppAlert.vue')['default'] 처럼 추가 해주면 된다.
