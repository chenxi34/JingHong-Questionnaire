import { request } from "@/apis/axios";
import type { GetQuestionnaireDetailRequest, GetQuestionnaireDetailResponse } from "@/apis/types/DetailInfo/getQuestionnaireDetailTypes";

export const getQuestionnaireDetailAPI = (params: GetQuestionnaireDetailRequest): Promise<GetQuestionnaireDetailResponse> => {
  return request("/admin/single/question", { params, method: "GET" });
};
