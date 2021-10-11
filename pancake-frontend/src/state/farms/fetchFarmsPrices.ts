import BigNumber from 'bignumber.js'
import { BIG_ONE, BIG_ZERO } from 'utils/bigNumber'
import { filterFarmsByQuoteToken } from 'utils/farmsPriceHelpers'
import { Farm } from 'state/types'
import { fetchEthPriceUsd } from '../../utils/fetchEthPriceUsd'

const getFarmFromTokenSymbol = (farms: Farm[], tokenSymbol: string, preferredQuoteTokens?: string[]): Farm => {
  const farmsWithTokenSymbol = farms.filter((farm) => farm.token.symbol === tokenSymbol)
  const filteredFarm = filterFarmsByQuoteToken(farmsWithTokenSymbol, preferredQuoteTokens)
  return filteredFarm
}

const getFarmBaseTokenPrice = (farm: Farm, quoteTokenFarm: Farm, ethPriceBusd: BigNumber): BigNumber => {
  const hasTokenPriceVsQuote = Boolean(farm.tokenPriceVsQuote)

  if (farm.quoteToken.symbol === 'BUSD') {
    return hasTokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : BIG_ZERO
  }

  if (farm.quoteToken.symbol === 'wETH') {
    return hasTokenPriceVsQuote ? ethPriceBusd.times(farm.tokenPriceVsQuote) : BIG_ZERO
  }

  // We can only calculate profits without a quoteTokenFarm for BUSD/ETH farms
  if (!quoteTokenFarm) {
    return BIG_ZERO
  }

  // Possible alternative farm quoteTokens:
  // UST (i.e. MIR-UST), pBTC (i.e. PNT-pBTC), BTCB (i.e. bBADGER-BTCB), ETH (i.e. SUSHI-ETH)
  // If the farm's quote token isn't BUSD or wETH, we then use the quote token, of the original farm's quote token
  // i.e. for farm PNT - pBTC we use the pBTC farm's quote token - ETH, (pBTC - ETH)
  // from the ETH - pBTC price, we can calculate the PNT - BUSD price
  if (quoteTokenFarm.quoteToken.symbol === 'wETH') {
    const quoteTokenInBusd = ethPriceBusd.times(quoteTokenFarm.tokenPriceVsQuote)
    return hasTokenPriceVsQuote && quoteTokenInBusd
      ? new BigNumber(farm.tokenPriceVsQuote).times(quoteTokenInBusd)
      : BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'BUSD') {
    const quoteTokenInBusd = quoteTokenFarm.tokenPriceVsQuote
    return hasTokenPriceVsQuote && quoteTokenInBusd
      ? new BigNumber(farm.tokenPriceVsQuote).times(quoteTokenInBusd)
      : BIG_ZERO
  }

  // Catch in case token does not have immediate or once-removed BUSD/wETH quoteToken
  return BIG_ZERO
}

const getFarmQuoteTokenPrice = (farm: Farm, quoteTokenFarm: Farm, ethPriceBusd: BigNumber): BigNumber => {
  if (farm.quoteToken.symbol === 'BUSD') {
    return BIG_ONE
  }

  if (farm.quoteToken.symbol === 'wETH') {
    return ethPriceBusd
  }

  if (!quoteTokenFarm) {
    return BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'wETH') {
    return quoteTokenFarm.tokenPriceVsQuote ? ethPriceBusd.times(quoteTokenFarm.tokenPriceVsQuote) : BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'BUSD') {
    return quoteTokenFarm.tokenPriceVsQuote ? new BigNumber(quoteTokenFarm.tokenPriceVsQuote) : BIG_ZERO
  }

  return BIG_ZERO
}

const fetchFarmsPrices = async (farms) => {
  // const ethBusdFarm = farms.find((farm: Farm) => farm.pid === 252)
  // const ethPriceBusd = ethBusdFarm.tokenPriceVsQuote ? BIG_ONE.div(ethBusdFarm.tokenPriceVsQuote) : BIG_ZERO
  let ethPriceUsd
  try {
    const fetchedEthPriceUsd = await fetchEthPriceUsd()
    ethPriceUsd = new BigNumber(fetchedEthPriceUsd)
  } catch (e) {
    ethPriceUsd = BIG_ZERO
  }

  const farmsWithPrices = farms.map((farm) => {
    const quoteTokenFarm = getFarmFromTokenSymbol(farms, farm.quoteToken.symbol)
    const baseTokenPrice = getFarmBaseTokenPrice(farm, quoteTokenFarm, ethPriceUsd)
    const quoteTokenPrice = getFarmQuoteTokenPrice(farm, quoteTokenFarm, ethPriceUsd)
    const token = { ...farm.token, busdPrice: baseTokenPrice.toJSON() }
    const quoteToken = { ...farm.quoteToken, busdPrice: quoteTokenPrice.toJSON() }
    return { ...farm, token, quoteToken }
  })

  return farmsWithPrices
}

export default fetchFarmsPrices
