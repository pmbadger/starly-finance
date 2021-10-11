import { ChainId } from 'pancakeswap-sdk'

const NETWORK_URLS: { [chainId in ChainId]: string } = {
  [ChainId.TESTNET]: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
}

export default NETWORK_URLS
