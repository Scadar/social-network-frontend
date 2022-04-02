
export interface PaginationResponse<T>{
  page: number;
  pageSize: number;
  total: number;
  data: T[]
}

export interface ITimestamp {
  createdAt: Date;
  updatedAt: Date;
}
