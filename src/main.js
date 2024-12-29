import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/router";
import dateFormat from "./plugins/dateFormat";
import focus from "@/directives/focus";
import globalDirectives from "./plugins/global-directives";
// import globalComponents from "@/plugins/global-components";
import dayjs from "./plugins/dayjs";

const app = createApp(App);
// app.use(globalComponents);
app.use(dateFormat, { type: "A" });
// app.directive("focus", focus);
app.use(globalDirectives);
app.use(router);
app.use(dayjs);
app.mount("#app");
import "bootstrap/dist/js/bootstrap.js";

// console.log(import.meta.env.VITE_APP_API_URL);
