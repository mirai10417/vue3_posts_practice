import { useAlertStore } from "@/store/alert";
import { storeToRefs } from "pinia";

export const useAlert = () => {
  const { alerts } = storeToRefs(useAlertStore());
  const { vAlert, vSuccess } = useAlertStore();
  return {
    alerts,
    vAlert,
    vSuccess,
  };
};
