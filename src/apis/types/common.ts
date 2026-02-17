/**
 * 统一的 API 响应类型
 * 所有接口响应都遵循 { code, data, msg } 结构
 */
export interface ApiResponse<T = unknown> {
  code: number;
  data: T;
  msg: string;
}
