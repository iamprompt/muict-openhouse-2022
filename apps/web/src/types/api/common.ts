export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError

export interface ApiResponseBase<T> {
  success: boolean
  payload: T
}

export interface ApiResponseSuccess<T> extends ApiResponseBase<T> {
  success: true
  payload: T
}

export interface ApiResponseError extends ApiResponseBase<string> {
  success: false
}
