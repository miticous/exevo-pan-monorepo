export declare type PaginationOptions = {
  pageIndex: number
  pageSize: number
}

export declare type SortOptions = {
  sortingMode: number
  descendingOrder: boolean
}

export declare type FilterBodyPayload = {
  paginationOptions: PaginationOptions
  sortOptions: SortOptions
  filterOptions: FilterOptions
}
