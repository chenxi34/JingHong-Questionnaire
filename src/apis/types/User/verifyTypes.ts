import type { ApiResponse } from "../common";

export interface VerifyRequest {
  /** 问卷编号 */
  id: number;
  /** 统一密码 */
  password: string;
  /** 学号 */
  stuId: string;
}

export type VerifyResponse = ApiResponse<VerifyData | null>;

export interface VerifyData {
  /** 当日剩余提交次数 */
  dailyLimit: number;
  /** 总剩余提交次数 */
  sumLimit: number;
  token: string;
}
