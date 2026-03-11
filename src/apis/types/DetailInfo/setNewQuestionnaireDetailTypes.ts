import type { ApiResponse } from "../common";
import type {
  QuestionnaireBaseConfig,
  QuestionnaireQuesConfig
} from "../questionnaire";

export interface CreateQuestionnaireDetailRequest {
  baseConfig: QuestionnaireBaseConfig;
  quesConfig: QuestionnaireQuesConfig;
  /** 问卷状态，1草稿、2发布、3已截止 */
  status: number;
  /** 问卷类型，0调研1投票 */
  surveyType: number;
}

export type CreateQuestionnaireDetailResponse = ApiResponse<any>;
