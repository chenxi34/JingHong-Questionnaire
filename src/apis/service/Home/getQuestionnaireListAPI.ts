import { request } from "@/apis/axios";
import type { GetQuestionnaireListRequest, GetQuestionnaireListResponse } from "@/apis/types/Home/getQuestionnaireListTypes";

export const getQuestionnaireListAPI = (params: GetQuestionnaireListRequest): Promise<GetQuestionnaireListResponse> => {
  return request("/admin/list/questions", { params, method: "GET" });
};
