import type { ApiResponse } from "../common";

export type GetQuestionnaireListResponse = ApiResponse<GetQuestionnaireListData>;

export interface GetQuestionnaireListData {
  surveyList: SurveyList[];
  totalPageNum: number;
}

export interface SurveyList {
  /** 问卷编号 */
  id: number;
  /** 答卷份数 */
  num: number;
  /** 1草稿、2发布、3已截止 */
  status: number;
  /** 问卷类型，0调研1投票 */
  surveyType: number;
  /** 问卷标题 */
  title: string;
}

export interface GetQuestionnaireListRequest {
  pageNum: number;
  pageSize: number;
  title?: string;
}
