declare declare type PaginationOptions = {
  pageIndex: number
  pageSize: number
}

declare declare type SortOptions = {
  sortingMode: number
  descendingOrder: boolean
}

declare declare type FilterBodyPayload = {
  paginationOptions: PaginationOptions
  sortOptions: SortOptions
  filterOptions: FilterOptions
}
