import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  /**
   * These 2 farms (PID 0, 1) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'STLY',
    lpAddresses: {
      3: '0x67C6c150914e6363F746796744636B7485B0A775',
    },
    token: tokens.cake,
    quoteToken: tokens.weth,
  },
  {
    pid: 1,
    lpSymbol: 'STLY – ETH',
    lpAddresses: {
      3: '0x110B11C4C08fE1E282B7Cd17ebDFc1Ce18d630Cf',
    },
    token: tokens.cake,
    quoteToken: tokens.weth,
  },
]

export default farms
