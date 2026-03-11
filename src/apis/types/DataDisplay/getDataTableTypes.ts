import type { ApiResponse } from "../common";

export interface GetDataTableRequest {
  /** 问卷编号 */
  id: number;
}

export type GetDataTableResponse = ApiResponse<string | null>;
