import type { ApiResponse } from "../common";

export interface LoginRequest {
  password: string;
  username: string;
}

export type LoginResponse = ApiResponse<null | string>;
