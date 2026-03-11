import { request } from "@/apis/axios";
import type { DelAnswerResponse, DelAnswerRequest } from "@/apis/types/DataDisplay/delAnswerTypes";

export const delAnswerAPI = (params: DelAnswerRequest): Promise<DelAnswerResponse> => {
  return request("/admin/delete/answersheet", { params, method: "DELETE" });
};
