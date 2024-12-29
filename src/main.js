import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/router";
import objPlugins from "./plugins/obj";
import funcPlugins from "./plugins/func";
import person from "./plugins/person";
import dateFormat from "./plugins/dateFormat";

const app = createApp(App);
app.use(funcPlugins);
app.use(dateFormat, { type: "A" });
app.use(objPlugins, { name: "abcd" });
app.use(person, { name: "홍길동" });
app.use();
app.use(router);
app.mount("#app");
import "bootstrap/dist/js/bootstrap.js";

console.log(import.meta.env.VITE_APP_API_URL);
