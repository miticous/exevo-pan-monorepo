import {
  applySort as baseSort,
  filterCharacters as baseFilter,
} from 'auction-queries'
import { contracts } from 'shared-utils'
import Cache from './Data/cache'

const {
  DEFAULT_SORT_OPTIONS,
  DEFAULT_FILTER_OPTIONS,
  DEFAULT_SERIALIZED_FILTER_OPTIONS,
} = contracts.filters.defaults

export const applySort: typeof baseSort = (
  oldData,
  sortOptions = DEFAULT_SORT_OPTIONS,
) => {
  const cachedSort = Cache.getSortCache(sortOptions)
  if (cachedSort) {
    return cachedSort
  }

  const result = baseSort(oldData, sortOptions)
  Cache.setSortCache(sortOptions, result)
  return result
}

type FilterCharactersOptions = {
  auctions: CharacterObject[]
  filters: FilterOptions
}

export interface FilterCharacterProps extends FilterCharactersOptions {
  serializedFilterOptions?: SerializedFilterOptions | undefined
  sortOptions: SortOptions
}

export const filterCharacters = ({
  serializedFilterOptions = DEFAULT_SERIALIZED_FILTER_OPTIONS,
  sortOptions,
  ...options
}: FilterCharacterProps): CharacterObject[] => {
  const cachedResponse = Cache.getFilterCache(
    serializedFilterOptions,
    sortOptions,
  )

  if (cachedResponse) {
    return cachedResponse
  }

  const result = baseFilter(options)
  Cache.setFilterCache(serializedFilterOptions, sortOptions, result)

  return result
}

export const preloadCache = (auctions: CharacterObject[]): void => {
  const sortingModes = [0, 1, 2, 3]
  const descendingOrders = [false, true]

  let iterationCount = 0
  const iterations = sortingModes.length * descendingOrders.length

  sortingModes.forEach((sortingMode) => {
    descendingOrders.forEach((descendingOrder) => {
      iterationCount += 1
      console.log(
        `Preloading cache [${Math.round(
          (iterationCount / iterations) * 100,
        )}%]`,
      )

      const sortOptions: SortOptions = { sortingMode, descendingOrder }
      const sortedAuctions = applySort(auctions, sortOptions)
      filterCharacters({
        serializedFilterOptions: DEFAULT_SERIALIZED_FILTER_OPTIONS,
        sortOptions,
        auctions: sortedAuctions,
        filters: DEFAULT_FILTER_OPTIONS,
      })
    })
  })
}
