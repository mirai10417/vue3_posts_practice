import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "@/router/router";
import dateFormat from "./plugins/dateFormat";
import globalDirectives from "./plugins/global-directives";
import dayjs from "./plugins/dayjs";

const app = createApp(App);
app.use(dateFormat, { type: "A" });
app.use(globalDirectives);
app.use(router);
app.use(dayjs);
app.use(createPinia());
app.mount("#app");
import "bootstrap/dist/js/bootstrap.js";
