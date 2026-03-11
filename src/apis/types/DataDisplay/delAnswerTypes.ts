import type { ApiResponse } from "../common";

export type DelAnswerResponse = ApiResponse<null>;

export interface DelAnswerRequest {
  answerId: string;
}
