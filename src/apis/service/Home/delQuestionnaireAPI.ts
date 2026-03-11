import { request } from "@/apis/axios";
import type { DelQuestionnaireRequest, DelQuestionnaireResponse } from "@/apis/types/Home/delQuestionnaireTypes";

export const delQuestionnaireAPI = (params: DelQuestionnaireRequest): Promise<DelQuestionnaireResponse> => {
  return request("/admin/delete", { params, method: "DELETE" });
};
