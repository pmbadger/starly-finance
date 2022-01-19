import { ChainId, Token } from 'pancakeswap-sdk'

export const CAKE: { [chainId: number]: Token } = {
  [ChainId.TESTNET]: new Token(
    ChainId.TESTNET,
    '0x6B01cA53f11275518C98b16329C6C8Aa0D361Aa3',
    18,
    'STLY',
    'Starly Token',
  ),
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0xbB29617Df3ba3Cc197B54BD8075f7504fB9F41f4',
    18,
    'STLY',
    'Starly Token',
  ),
}

export const BUSD: { [chainId: number]: Token } = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    18,
    'BUSD',
    'Binance USD',
  ),
  [ChainId.TESTNET]: new Token(
    ChainId.TESTNET,
    '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee',
    18,
    'BUSD',
    'Binance USD',
  ),
}

export const WBNB = new Token(ChainId.TESTNET, '0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F', 18, 'WBNB', 'Wrapped BNB')
// TODO: correct to Mainnet
// export const WBNB = new Token(ChainId.MAINNET, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18, 'WBNB', 'Wrapped BNB')

export const DAI = new Token(ChainId.MAINNET, '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3', 18, 'DAI', 'Dai Stablecoin')
export const USDT = new Token(ChainId.MAINNET, '0x55d398326f99059fF775485246999027B3197955', 18, 'USDT', 'Tether USD')
export const BTCB = new Token(ChainId.MAINNET, '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c', 18, 'BTCB', 'Binance BTC')

export const UST = new Token(
  ChainId.MAINNET,
  '0x23396cF899Ca06c4472205fC903bDB4de249D6fC',
  18,
  'UST',
  'Wrapped UST Token',
)
export const ETH = new Token(
  ChainId.MAINNET,
  '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
  18,
  'ETH',
  'Binance-Peg Ethereum Token',
)
export const USDC = new Token(
  ChainId.MAINNET,
  '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  18,
  'USDC',
  'Binance-Peg USD Coin',
)

const tokens = {
  bnb: {
    symbol: 'BNB',
    projectLink: 'https://www.binance.com/',
  },
  cake: {
    symbol: 'STLY',
    address: {
      56: '0xbB29617Df3ba3Cc197B54BD8075f7504fB9F41f4',
      97: '0x6B01cA53f11275518C98b16329C6C8Aa0D361Aa3',
    },
    decimals: 18,
    projectLink: 'https://starly.finance/',
  },
  wbnb: {
    symbol: 'wBNB',
    address: {
      56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      97: '0x094616f0bdfb0b526bd735bf66eca0ad254ca81f',
    },
    decimals: 18,
    projectLink: 'https://starly.finance/',
  },
  busd: {
    symbol: 'BUSD',
    address: {
      56: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
      97: '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee',
    },
    decimals: 18,
    projectLink: 'https://www.paxos.com/busd/',
  },
}

export default tokens
