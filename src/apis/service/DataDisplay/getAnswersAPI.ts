import { request } from "@/apis/axios";
import type { GetAnswersRequest, GetAnswersResponse } from "@/apis/types/DataDisplay/getAnswersTypes";

export const getAnswersAPI = (params: GetAnswersRequest): Promise<GetAnswersResponse> => {
  return request("/admin/list/answers", { params, method: "GET" });
};
