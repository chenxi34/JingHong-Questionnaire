import type { ApiResponse } from "../common";

export interface GetStaticsDataRequest {
  id?: number;
  pageNum: number;
  pageSize: number;
}

export type GetStaticsDataResponse = ApiResponse<GetStaticsDataData>;

export interface GetStaticsDataData {
  statistics: Statistic[];
  surveyType: number;
  /** 总数 */
  total: number;
  /** 总页数 */
  totalSumPage: number;
}

export interface Statistic {
  options: StatisticOption[];
  /** 题目标题 */
  question: string;
  /** 题目类型，1单选2多选 */
  questionType: number;
  /** 题目序号 */
  serialNum: number;
}

export interface StatisticOption {
  /** 选项内容 */
  content: string;
  /** 选人数 */
  count: number;
  /** 选项序号 */
  serialNum: number;
}
