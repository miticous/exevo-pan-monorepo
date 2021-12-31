export declare type RareItemObject = number[]

export declare type RareItemData = Record<string, RareItemObject>

export declare type RareItemBlock = {
  name: string
  lastPageIndex: number
  ids: number[]
}

export declare type RareItemBlockCollection = Record<string, RareItemBlock>
