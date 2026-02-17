import { request } from "@/apis/axios";
import type { GetDataTableRequest, GetDataTableResponse } from "@/apis/types/DataDisplay/getDataTableTypes";

export const getDataTableAPI = (params: GetDataTableRequest): Promise<GetDataTableResponse> => {
  return request("/admin/download", { params, method: "GET" });
};
