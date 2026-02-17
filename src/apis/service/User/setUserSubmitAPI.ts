import { request } from "@/apis/axios";
import type { SetUserSubmitRequest, SetUserSubmitResponse } from "@/apis/types/User/setUserSubmitType";

export const setUserSubmitAPI = (data: SetUserSubmitRequest): Promise<SetUserSubmitResponse> => {
  return request("/user/submit", { data, method: "POST" });
};
