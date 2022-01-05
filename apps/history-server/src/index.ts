import express from 'express'
import cors from 'cors'
import { contracts } from 'shared-utils'
import { paginateData } from 'auction-queries'
import { loadAuctions } from './Data/historyAuctions'
import { preloadCache, applySort, filterCharacters } from './cachedWrapper'

const PORT = 4000

const main = async () => {
  const auctions = await loadAuctions()
  preloadCache(auctions)

  const app = express()
  app.use(cors())
  app.use(express.json())

  app.post('/', async (request, response) => {
    const { paginationOptions, sortOptions, filterOptions } =
      contracts.filters.utils.deserializeBody(request.body)

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

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
  })
}

main()
