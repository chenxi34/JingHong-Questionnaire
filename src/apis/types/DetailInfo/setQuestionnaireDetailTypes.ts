import type { ApiResponse } from "../common";
import type {
  QuestionnaireBaseConfig,
  QuestionnaireQuesConfig
} from "../questionnaire";

export interface SetQuestionnaireDetailRequest {
  baseConfig: QuestionnaireBaseConfig;
  /** 问卷编号 */
  id?: number;
  quesConfig: QuestionnaireQuesConfig;
  /** 问卷类型，0调研问卷，1投票问卷 */
  surveyType: number;
}

export type SetQuestionnaireDetailResponse = ApiResponse<string | null>;
