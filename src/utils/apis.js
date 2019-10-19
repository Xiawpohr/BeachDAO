import BigNumber from 'bignumber.js'

export async function getGasPrice(category = 'fast') {
  const response = await fetch('https://ethgasstation.info/json/ethgasAPI.json')
  const data = await response.json()
  const gasPrice = new BigNumber(data[category]).div(10).times(1e9) // convert unit to wei
  return gasPrice
}