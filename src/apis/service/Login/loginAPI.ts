import { request } from "@/apis/axios";
import type { LoginRequest, LoginResponse } from "@/apis/types/Login/loginTypes";

export const loginAPI = (data: LoginRequest): Promise<LoginResponse> => {
  return request("/admin/login", { data, method: "POST" });
};
