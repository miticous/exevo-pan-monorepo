import { contracts } from 'shared-utils'
import { AuctionsContextValues } from './types'

const { DEFAULT_PAGINATION_OPTIONS } = contracts.filters.defaults

export const DEFAULT_STATE: AuctionsContextValues = {
  loading: false,
  nickname: '',
  page: [],
  pageData: {
    pageIndex: 0,
    totalItems: 0,
    startOffset: 0,
    endOffset: 0,
    hasNext: false,
    hasPrev: false,
  },
  handlePaginatorFetch: async () => {},
  handleNicknameFetch: async () => {},
}

export const PAGE_SIZE = DEFAULT_PAGINATION_OPTIONS.pageSize
