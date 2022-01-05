/* eslint-disable no-restricted-syntax */
import fs from 'fs'
import readline from 'readline'
import { buildCharacterData } from 'shared-utils/dist/buildCharacterData'
import miniServerData from './ServerData.json'

const serverArray = Object.values(
  miniServerData as Record<string, ServerObject>,
)

const readJsonl = async <T>(path: string): Promise<T[]> => {
  const fileStream = fs.createReadStream(path, { encoding: 'utf8' })
  const rl = readline.createInterface({ input: fileStream })

  const array: T[] = []
  for await (const line of rl) {
    const object = JSON.parse(line)
    array.push(object)
  }

  return array
}

export const loadAuctions = async (): Promise<CharacterObject[]> => {
  const auctions: PartialCharacterObject[] = await readJsonl(
    `${__dirname}/HistoryAuctions.jsonl`,
  )

  return buildCharacterData(auctions, serverArray).reverse()
}
