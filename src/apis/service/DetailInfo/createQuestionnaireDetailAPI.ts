import { request } from "@/apis/axios";
import type { CreateQuestionnaireDetailRequest, CreateQuestionnaireDetailResponse } from "@/apis/types/DetailInfo/setNewQuestionnaireDetailTypes";

export const createQuestionnaireDetailAPI = (data: CreateQuestionnaireDetailRequest): Promise<CreateQuestionnaireDetailResponse> => {
  return request("/admin/create", { data, method: "POST" });
};
