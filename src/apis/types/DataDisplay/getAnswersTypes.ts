import type { ApiResponse } from "../common";

export type GetAnswersResponse = ApiResponse<GetAnswersData>;

export interface GetAnswersData {
  answersData: AnswersData;
  surveyType: number;
  totalPageNum: number;
}

export interface AnswersData {
  question_answers: QuestionAnswer[];
  answer_ids: string[];
  time: string[];
}

export interface QuestionAnswer {
  answers?: string[];
  /** 1单选2多选3填空4简答5图片 */
  questionType: number;
  title?: string;
}

export interface GetAnswersRequest {
  /** 问卷编号 */
  id: number;
  pageNum: number;
  pageSize: number;
  /** 查询内容 */
  text?: string;
  /** 是否只显示最新的填写记录 */
  unique: boolean;
}
