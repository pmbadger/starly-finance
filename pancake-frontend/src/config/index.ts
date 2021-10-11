import BigNumber from 'bignumber.js/bignumber'
import { BIG_TEN } from 'utils/bigNumber'
import { ChainId } from 'pancakeswap-sdk'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const ROPSTEN_BLOCK_TIME = 30

export const BASE_BLOCK_EXPLORER_URLS = {
  [ChainId.TESTNET]: 'https://ropsten.etherscan.io',
}

// STLY_PER_BLOCK details
// 21 STLY is minted per block
// Farms / Launchpools: 85.7% per block
// Referral Program: 4.3% per block
// the Secure Asset Fund for Users: 3% per block
// Team: 7% per block
export const CAKE_PER_BLOCK = new BigNumber(21)
export const BLOCKS_PER_YEAR = new BigNumber((60 / ROPSTEN_BLOCK_TIME) * 60 * 24 * 365)
export const CAKE_PER_YEAR = CAKE_PER_BLOCK.times(BLOCKS_PER_YEAR)
export const BASE_URL = 'http://3.144.73.77:80'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_URL}/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_URL}/pool`
export const BASE_BLOCK_EXPLORER_URL = BASE_BLOCK_EXPLORER_URLS[ChainId.TESTNET]
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 50
export const LOTTERY_TICKET_PRICE = 1
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_LIMIT = 200000
export const DEFAULT_GAS_PRICE = 2
export const AUCTION_BIDDERS_TO_FETCH = 500
export const RECLAIM_AUCTIONS_TO_FETCH = 500
export const AUCTION_WHITELISTED_BIDDERS_TO_FETCH = 500
