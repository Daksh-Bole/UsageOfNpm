import { span, trace } from 'awaitfall'

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const loadProfile = () => span('loadProfile', async () => {
  await pause(110)
  return { id: 42, name: 'Ada Lovelace', city: 'London' }
})

const loadOrders = () => span('loadOrders', async () => {
  await pause(180)
  return ['Order #1042', 'Order #1038', 'Order #1021']
})

const loadRecommendations = () => span('loadRecommendations', async () => {
  await pause(145)
  return ['Notebook', 'Mechanical pencil', 'Desk lamp']
})

await trace('dashboard: sequential', async () => {
  const profile = await loadProfile()
  const orders = await loadOrders()
  const recommendations = await loadRecommendations()
  console.log(`\nLoaded dashboard for ${profile.name}: ${orders.length} orders, ${recommendations.length} recommendations.`)
})

console.log('\nNow run `npm run demo:parallel` to compare independent work with Promise.all.')
