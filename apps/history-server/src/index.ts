import express from 'express'
import cors from 'cors'
import localtunnel from 'localtunnel'
import { deserializeBody } from 'shared-utils/dist/contracts/Filters/utils'
import { paginateData } from 'auction-queries'
import { broadcast, coloredText } from 'logging'
import { loadAuctions } from './Data/historyAuctions'
import { preloadCache, applySort, filterCharacters } from './cachedWrapper'

const { PORT, STAGING } = process.env

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

  app.listen(PORT, async () => {
    broadcast(
      `${coloredText(
        'History Server',
        'highlight',
      )} is running at http://localhost:${PORT}`,
      'success',
    )

    if (STAGING) {
      const tunnel = await localtunnel({
        port: 4000,
        subdomain: 'staging-history-exevopan',
      })

      broadcast(
        `${coloredText('Localhost', 'highlight')} is being tunneled to ${
          tunnel.url
        }`,
        'success',
      )
    }
  })
}

main()
