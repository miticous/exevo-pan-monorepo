const isLocal =
  process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_FRONT_DEV

const isStaging = process.env.NEXT_PUBLIC_STAGING

const LOCAL_AUCTIONS_ENDPOINT = 'http://localhost:8787'
const LOCAL_HISTORY_ENDPOINT = 'http://localhost:4000'

const STAGING_AUCTIONS_ENDPOINT = 'https://dev-auctions.service-exevopan.com'
const STAGING_HISTORY_ENDPOINT = 'https://staging-history-exevopan.loca.lt'

const PRODUCTION_AUCTIONS_ENDPOINT = 'https://auctions.service-exevopan.com'
const PRODUCTION_HISTORY_ENDPOINT = 'https://history.service-exevopan.com'

export const endpoints = {
  CURRENT_AUCTIONS: isLocal
    ? LOCAL_AUCTIONS_ENDPOINT
    : isStaging
    ? STAGING_AUCTIONS_ENDPOINT
    : PRODUCTION_AUCTIONS_ENDPOINT,
  HISTORY_AUCTIONS: isLocal
    ? LOCAL_HISTORY_ENDPOINT
    : isStaging
    ? STAGING_HISTORY_ENDPOINT
    : PRODUCTION_HISTORY_ENDPOINT,
  STATIC_DATA: 'https://static-exevopan.surge.sh',
  WAR_DATA: 'https://exevo-pan-war-data.netlify.app',
  TIBIADATA: 'https://api.tibiadata.com/v2/characters',
  MAIL_CHECKOUT: '/api/mail-checkout',
  FCM_SEND: 'https://fcm.googleapis.com/fcm/send',
}
