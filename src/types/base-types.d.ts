declare interface BaseAPIResponse<TKey extends string, T> {
  status: number
  data: {
    status: boolean
    message: string
  } & Record<TKey, T>
}

declare interface BaseAPIParam {
  status?: string
  page?: string
  per_page?: string
}

declare interface BasePaginatedRequest {
  page?: string
  pageSize?: string
  pages?: string
  total?: string
}

declare interface BasePaginatedResponse<TKey extends string, T> {
  status: number
  data: {
    page: string
    pageSize: number
    pages: number
    status: boolean
    total: number
    message: string
  } & Record<TKey, T>
}
