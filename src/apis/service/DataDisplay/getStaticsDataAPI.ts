import { request } from "@/apis/axios";
import type { GetStaticsDataRequest, GetStaticsDataResponse } from "@/apis/types/DataDisplay/getStaticsDataTypes";

export const getStaticsDataAPI = (params: GetStaticsDataRequest): Promise<GetStaticsDataResponse> => {
  return request("/admin/statics/answers", { params, method: "GET" });
};
