import { request } from "@/apis/axios";
import type { VerifyRequest, VerifyResponse } from "@/apis/types/User/verifyTypes";

export const verifyAPI = (data: VerifyRequest): Promise<VerifyResponse> => {
  return request("/user/oauth", { data, method: "POST" });
};
