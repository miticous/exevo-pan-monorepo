import {
  deserializeFilterOptions,
  DEFAULT_FILTER_OPTIONS,
} from 'auction-queries'

export const filterOldAuctions = (
  auctionArray: CharacterObject[],
  currentTimestamp: number,
): CharacterObject[] => {
  const mutatedArray = [...auctionArray]

  auctionArray.some((characterObject) => {
    if (currentTimestamp > characterObject.auctionEnd) {
      mutatedArray.shift()
      return false
    }
    return true
  })

  return mutatedArray
}

export const reduceRareItemData = (itemData: RareItemData): RareItemData => {
  const newItemData: RareItemData = {}

  const itemNames = Object.keys(itemData)
  itemNames.forEach((item) => {
    const auctionsArray = itemData[item]
    if (auctionsArray.length > 0) {
      newItemData[item] = auctionsArray
    }
  })

  return newItemData
}

export const deserializeRequestBody = async (
  request: Request,
): Promise<FilterBodyPayload> => {
  const { paginationOptions, sortOptions, filterOptions } = await request.json()

  return {
    paginationOptions,
    sortOptions,
    filterOptions: deserializeFilterOptions(
      filterOptions ?? DEFAULT_FILTER_OPTIONS,
    ),
  }
}
