import { request } from "@/apis/axios";
import type { GetQuestionnaireRequest, GetQuestionnaireResponse } from "@/apis/types/User/getQuestionnaireTypes";

/** 填写者获取问卷 */
export const getQuestionnaireAPI = (params: GetQuestionnaireRequest): Promise<GetQuestionnaireResponse> => {
  return request("/user/get", { params, method: "GET" });
};
