import axios from "axios";
import { isRef, ref, unref, watchEffect } from "vue";

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const defaultConfig = {
  method: "get",
};

const defaultOptions = {
  immediate: true,
};

export const useAxios = (url, config = {}, options = {}) => {
  const response = ref(null);
  const data = ref([]);
  const error = ref(null);
  const loading = ref(false);

  const { onSuccess, onError, immediate } = {
    ...defaultOptions,
    ...options,
  };

  // ★ 외부에서 오는 파라미터를 미리 { } 해놔야 구조분해 할 때 에러가 안난다. 파라미터 {}를 하지 않고 const { } = config 를 선언하면 에러남
  const { params } = config;
  const execute = (body) => {
    data.value = null;
    error.value = null;
    loading.value = true;
    axios(unref(url), {
      ...defaultConfig,
      ...config,
      params: unref(params),
      data: typeof body === "object" ? body : {},
    })
      .then((res) => {
        response.value = res;
        data.value = res.data;

        if (onSuccess) {
          onSuccess(res);
        }
      })
      .catch((err) => {
        error.value = err;
        if (onError) {
          onError(err);
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };

  if (isRef(params) || isRef(url)) {
    watchEffect(execute);
  } else {
    if (immediate) {
      execute();
    }
  }

  // 반응형으로 연결이 되어있어 여기 안에서는 async await 선언해줄 필요가 없음

  return {
    response,
    data,
    error,
    loading,
    execute,
  };
};
