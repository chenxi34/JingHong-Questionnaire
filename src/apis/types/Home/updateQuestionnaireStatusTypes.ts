import type { ApiResponse } from "../common";

export interface UpdateQuestionnaireStatusRequest {
  /** 问卷编号 */
  id: number;
  /** 问卷状态，1草稿2发布 */
  status: 1 | 2 | number;
}

export type UpdateQuestionnaireStatusResponse = ApiResponse<null | string>;
