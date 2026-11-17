import { span, trace } from 'awaitfall'

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const loadProfile = () => span('loadProfile', async () => {
  await pause(110)
  return { id: 42, name: 'Ada Lovelace' }
})

const loadOrders = () => span('loadOrders', async () => {
  await pause(180)
  return ['Order #1042', 'Order #1038', 'Order #1021']
})

const loadRecommendations = () => span('loadRecommendations', async () => {
  await pause(145)
  return ['Notebook', 'Mechanical pencil', 'Desk lamp']
})

await trace('dashboard: parallel', async () => {
  const [profile, orders, recommendations] = await Promise.all([
    loadProfile(),
    loadOrders(),
    loadRecommendations(),
  ])
  console.log(`\nLoaded dashboard for ${profile.name}: ${orders.length} orders, ${recommendations.length} recommendations.`)
})

console.log('\nThe independent spans overlap, so total waiting time is close to the slowest request.')
