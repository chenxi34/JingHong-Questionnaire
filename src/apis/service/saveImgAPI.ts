import { request } from "@/apis/axios";
import type { SaveImgResponse } from "@/apis/types/saveImgTypes";

export const saveImgAPI = (data: FormData | null): Promise<SaveImgResponse> => {
  return request("/user/upload/img", {
    data,
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" }
  });
};
