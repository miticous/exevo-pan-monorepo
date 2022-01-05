const isDev = process.env.NODE_ENV === 'development'

const LOCAL_AUCTIONS_ENDPOINT = 'http://localhost:8787'
const LOCAL_HISTORY_ENDPOINT = 'http://localhost:4000'

export const endpoints = {
  CURRENT_AUCTIONS: isDev
    ? LOCAL_AUCTIONS_ENDPOINT
    : 'https://auctions.exevopan.workers.dev',
  HISTORY_AUCTIONS: isDev
    ? LOCAL_HISTORY_ENDPOINT
    : 'https://history.service-exevopan.com',
  STATIC_DATA: 'https://static-exevopan.surge.sh',
  WAR_DATA: 'https://exevo-pan-war-data.netlify.app',
  TIBIADATA: 'https://api.tibiadata.com/v2/characters',
  MAIL_CHECKOUT: '/api/mail-checkout',
  FCM_SEND: 'https://fcm.googleapis.com/fcm/send',
}
