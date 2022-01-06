const vocationIdToKey = {
  0: 'rooker',
  1: 'knight',
  2: 'paladin',
  3: 'sorcerer',
  4: 'druid',
} as const

type VocationCountKey = typeof vocationIdToKey[keyof typeof vocationIdToKey]

const PRECISION = 2
const fixedPercentage = (value: number): number =>
  +(value * 100).toFixed(PRECISION)

export const calculateVocationDistribution = (
  history: PartialCharacterObject[],
): DistributionData => {
  const vocationCount: Record<VocationCountKey, number> = {
    rooker: 0,
    knight: 0,
    paladin: 0,
    sorcerer: 0,
    druid: 0,
  }

  history.forEach(({ vocationId }) => {
    const vocation = vocationIdToKey[vocationId as keyof typeof vocationIdToKey]
    vocationCount[vocation] += 1
  })

  const totalCount = history.length

  return {
    rooker: fixedPercentage(vocationCount.rooker / totalCount),
    knight: fixedPercentage(vocationCount.knight / totalCount),
    paladin: fixedPercentage(vocationCount.paladin / totalCount),
    sorcerer: fixedPercentage(vocationCount.sorcerer / totalCount),
    druid: fixedPercentage(vocationCount.druid / totalCount),
  }
}