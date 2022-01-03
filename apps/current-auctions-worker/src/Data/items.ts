import itemsData from './ItemsData.json'
import { reduceRareItemData } from './utils'

export const items: RareItemData = reduceRareItemData(itemsData)
