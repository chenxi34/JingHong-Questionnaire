import type { ApiResponse } from "../common";
import type {
  QuestionnaireBaseConfig,
  QuestionnaireQuesConfig,
  QuestionnaireQuesSetting,
  QuestionnaireQuestion,
  QuestionnaireOption
} from "../questionnaire";

export interface GetQuestionnaireDetailRequest {
  id: number;
}

export type GetQuestionnaireDetailResponse = ApiResponse<GetQuestionnaireDetailData | null>;

export interface GetQuestionnaireDetailData {
  baseConfig: QuestionnaireBaseConfig;
  quesConfig: QuestionnaireQuesConfig;
  /** 1草稿、2发布、3已截止 */
  status: number;
  /** 问卷类型，0调研问卷，1投票问卷 */
  surveyType: number;
  /** 问卷编号 */
  uuid: string;
}

// Re-export shared types for backward compatibility
export type {
  QuestionnaireBaseConfig as BaseConfig,
  QuestionnaireQuesConfig as QuesConfig,
  QuestionnaireQuestion as QuestionList,
  QuestionnaireOption as Option,
  QuestionnaireQuesSetting as QuesSetting
};
