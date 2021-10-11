import { ChainId, Token } from 'pancakeswap-sdk'

export const CAKE: { [chainId: number]: Token } = {
  [ChainId.TESTNET]: new Token(
    ChainId.TESTNET,
    '0x67C6c150914e6363F746796744636B7485B0A775',
    18,
    'STLY',
    'Starly Token',
  ),
}

export const WETH = new Token(ChainId.TESTNET, '0x0a180A76e4466bF68A7F86fB029BEd3cCcFaAac5', 18, 'WETH', 'Wrapped ETH')

const tokens = {
  eth: {
    symbol: 'ETH',
    projectLink: 'https://pancakeswap.finance/',
  },
  cake: {
    symbol: 'STLY',
    address: {
      3: '0x67C6c150914e6363F746796744636B7485B0A775',
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  },
  weth: {
    symbol: 'wETH',
    address: {
      3: '0x0a180A76e4466bF68A7F86fB029BEd3cCcFaAac5',
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  },
}

export default tokens
