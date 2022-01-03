import { applySort, paginateData } from 'auction-queries'
import { auctions } from './Data/auctions'
import { filterOldAuctions, deserializeRequestBody } from './Data/utils'
import { filterCharacters } from './filterWrapper'
import { headers } from './headers'

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request: Request): Promise<Response> {
  const currentAuctions = filterOldAuctions(auctions, +new Date() / 1000)

  const { paginationOptions, sortOptions, filterOptions } =
    await deserializeRequestBody(request)

  const filteredAuctions = filterCharacters({
    auctions: currentAuctions,
    filters: filterOptions,
  })

  const sortedAuctions = applySort(filteredAuctions, sortOptions)

  const paginatedData = paginateData(sortedAuctions, paginationOptions)

  const responseBody = {
    ...paginatedData,
    ...sortOptions,
  }

  const response = new Response(JSON.stringify(responseBody), {
    headers,
  })

  return response
}
