import { request } from "@/apis/axios";
import type { SetQuestionnaireDetailRequest, SetQuestionnaireDetailResponse } from "@/apis/types/DetailInfo/setQuestionnaireDetailTypes";

export const setQuestionnaireDetailAPI = (data: SetQuestionnaireDetailRequest): Promise<SetQuestionnaireDetailResponse> => {
  return request("/admin/update/questions", { data, method: "PUT" });
};
