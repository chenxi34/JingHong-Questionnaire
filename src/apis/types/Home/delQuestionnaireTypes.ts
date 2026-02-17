import type { ApiResponse } from "../common";

export interface DelQuestionnaireRequest {
  /** 问卷编号 */
  id: number;
}

export type DelQuestionnaireResponse = ApiResponse<null>;
