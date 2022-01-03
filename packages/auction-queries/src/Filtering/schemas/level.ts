import { DEFAULT_FILTER_OPTIONS } from '../../utils'

const filterSkip: FilterSkip = ({ minLevel, maxLevel }): boolean =>
  minLevel === DEFAULT_FILTER_OPTIONS.minLevel &&
  maxLevel === DEFAULT_FILTER_OPTIONS.maxLevel

const filterTest: FilterTest =
  ({ minLevel, maxLevel }) =>
  ({ level }): boolean =>
    level >= minLevel && level <= maxLevel

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
