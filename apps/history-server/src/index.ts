import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { deserializeBody } from 'shared-utils/dist/contracts/Filters/utils'
import { paginateData } from 'auction-queries'
import { broadcast, coloredText } from 'logging'
import { loadAuctions } from './Data/historyAuctions'
import { preloadCache, applySort, filterCharacters } from './cachedWrapper'

dotenv.config()

const main = async () => {
  const auctions = await loadAuctions()
  preloadCache(auctions)

  const app = express()
  app.use(cors())
  app.use(express.json())

  app.post('/', async (request, response) => {
    const { paginationOptions, sortOptions, filterOptions } = deserializeBody(
      request.body,
    )

    const sortedAuctions = applySort(auctions, sortOptions)

    const filteredAuctions = filterCharacters({
      sortOptions,
      serializedFilterOptions: request.body.filterOptions,
      auctions: sortedAuctions,
      filters: filterOptions,
    })

    const paginatedData = paginateData(filteredAuctions, paginationOptions)

    const responseBody = {
      ...paginatedData,
      ...sortOptions,
    }

    response.json(responseBody)
  })

  app.listen(process.env.PORT, () => {
    broadcast(
      `${coloredText('History Server', 'highlight')} is running at ${
        process.env.BASE_URL
      }`,
      'success',
    )
  })
}

main()
