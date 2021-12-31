export type VocationOptions = 0 | 1 | 2 | 3 | 4
export type PvpOptions = 0 | 1 | 2 | 3 | 4
export type LocationOptions = 0 | 1 | 2
export type SkillOptions = 'axe' | 'club' | 'distance' | 'magic' | 'sword'

export interface FilterOptions {
  nicknameFilter: string
  vocation: Set<VocationOptions>
  pvp: Set<PvpOptions>
  battleye: Set<boolean>
  location: Set<LocationOptions>
  serverSet: Set<string>
  minLevel: number
  maxLevel: number
  minSkill: number
  maxSkill: number
  skillKey: Set<SkillOptions>
  imbuementsSet: Set<string>
  charmsSet: Set<string>
  itemSet: Set<string>
  rareNick: boolean
  questSet: Set<string>
  addon: number
  sex: boolean
  outfitSet: Set<string>
  storeOutfitSet: Set<string>
  mountSet: Set<string>
  storeMountSet: Set<string>
  achievementSet: Set<string>
  soulwarAvailable: boolean
}

type FilterOptionsPrimitives = Pick<
  FilterOptions,
  | 'nicknameFilter'
  | 'minLevel'
  | 'maxLevel'
  | 'minSkill'
  | 'maxSkill'
  | 'rareNick'
  | 'addon'
  | 'sex'
  | 'soulwarAvailable'
>

export interface SerializedFilterOptions extends FilterOptionsPrimitives {
  vocation: number[]
  pvp: number[]
  battleye: boolean[]
  location: number[]
  serverSet: string[]
  skillKey: string[]
  imbuementsSet: string[]
  charmsSet: string[]
  itemSet: string[]
  questSet: string[]
  outfitSet: string[]
  storeOutfitSet: string[]
  mountSet: string[]
  storeMountSet: string[]
  achievementSet: string[]
}
