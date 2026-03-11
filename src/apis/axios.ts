import axios, { type AxiosRequestConfig } from "axios";
import { deepCamelToSnake } from "@/utilities/deepCamelToSnake";
import { deepSnakeToCamel } from "@/utilities/deepSnakeToCamel";
import { ElNotification } from "element-plus";

const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000,
  withCredentials: true
});

// -------- 请求拦截器：自动 camelCase → snake_case --------
axiosInstance.interceptors.request.use(
  (config) => {
    // 跳过 FormData（文件上传）
    if (config.data && !(config.data instanceof FormData)) {
      config.data = deepCamelToSnake(config.data);
    }
    if (config.params) {
      config.params = deepCamelToSnake(config.params);
    }
    return config;
  }
);

// -------- 响应拦截器：自动 snake_case → camelCase + 统一错误处理 --------
axiosInstance.interceptors.response.use(
  (response) => {
    response.data = deepSnakeToCamel(response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      const msg = data?.msg || `请求错误 (${status})`;
      ElNotification.error(msg);
    } else if (error.request) {
      ElNotification.error("网络错误：未收到服务器响应");
    } else {
      ElNotification.error("请求失败：" + error.message);
    }
    return Promise.reject(error);
  }
);

const request = <ResponseType = unknown>(
  url: string,
  options?: AxiosRequestConfig<unknown>
): Promise<ResponseType> => {
  return axiosInstance({ url, ...options }).then(res => res.data as ResponseType);
};

export { axiosInstance, request };
