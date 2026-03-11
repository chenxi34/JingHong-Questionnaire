import type { ApiResponse } from "../common";

export interface SetUserSubmitRequest {
  /** 问卷编号 */
  id: number;
  /** 问题列表 */
  questionsList: QuestionAnswer[];
  /** 包含学号信息的token */
  token: string;
}

export interface QuestionAnswer {
  /** 回答 */
  answer: string;
  /** 问题编号 */
  questionId: number;
}

export type SetUserSubmitResponse = ApiResponse<SetUserSubmitData | null>;

export interface SetUserSubmitData {
  /** 提交时间 */
  time: string;
}
