declare interface BaseAPIResponse<TKey extends string, T> {
  status: number
  data: {
    status: boolean
    message: string
  } & { [K in TKey]: T }
}
