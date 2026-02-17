import { request } from "@/apis/axios";
import type { UpdateQuestionnaireStatusRequest, UpdateQuestionnaireStatusResponse } from "@/apis/types/Home/updateQuestionnaireStatusTypes";

export const updateQuestionnaireStatusAPI = (data: UpdateQuestionnaireStatusRequest): Promise<UpdateQuestionnaireStatusResponse> => {
  return request("/admin/update/status", { data, method: "PUT" });
};
