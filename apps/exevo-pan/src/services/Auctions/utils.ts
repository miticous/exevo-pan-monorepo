import { endpoints } from 'Constants'

export const buildHeaders = (endpoint: string): Headers => {
  const headers = new Headers()
  if (endpoint === endpoints.HISTORY_AUCTIONS) {
    headers.set('Content-Type', 'application/json')
  }
  return headers
}
