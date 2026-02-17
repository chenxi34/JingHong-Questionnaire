import { request } from "@/apis/axios";
import type { GetStatisticRequest, GetStatisticResponse } from "@/apis/types/User/getStatisticTypes";

/** 获取投票选项数据 */
export const getStatisticAPI = (params: GetStatisticRequest): Promise<GetStatisticResponse> => {
  return request("/user/statistic", { params, method: "GET" });
};
