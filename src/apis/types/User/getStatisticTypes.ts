import type { ApiResponse } from "../common";

export interface GetStatisticRequest {
  /** 问卷编号 */
  id: number;
}

export type GetStatisticResponse = ApiResponse<GetStatisticData | null>;

export interface GetStatisticData {
  statistics: Statistic[];
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
  rank: number;
  /** 选项序号 */
  serialNum: number;
}
