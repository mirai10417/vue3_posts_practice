import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/api/axios";

export const useMenuStore = defineStore("menu", () => {
  const menuList = ref([]);

  const fetchMenuList = async () => {
    const res = await api.get("/api/getMenuList");
    menuList.value = res.data.data;
  };

  return {
    menuList,
    fetchMenuList,
  };
});
