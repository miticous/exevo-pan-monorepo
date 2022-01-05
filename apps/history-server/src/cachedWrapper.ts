import {
  applySort as baseSort,
  filterCharacters as baseFilter,
} from 'auction-queries'
import { contracts } from 'shared-utils'
import { TrackETA } from 'logging'
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

  const OPERATIONS = sortingModes.length * descendingOrders.length
  const task = new TrackETA(OPERATIONS, 'Preloading Cache')

  sortingModes.forEach((sortingMode) => {
    descendingOrders.forEach((descendingOrder) => {
      task.incTask()

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
  task.finish()
}
