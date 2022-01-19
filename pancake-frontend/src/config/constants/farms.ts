import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  /**
   * These farms (PID 1, 2) should always be at the top of the file.
   */
  {
    pid: 1,
    lpSymbol: 'STLY – BNB',
    lpAddresses: {
      56: '',
      97: '0x0B599e3E8957F6Ec5d22d074d0503dD99Cc2d934',
    },
    token: tokens.cake,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'STLY – BUSD',
    lpAddresses: {
      56: '',
      97: '0x55a9306DcDE520F2f1642a00C353cF5FA52B74fE',
    },
    token: tokens.cake,
    quoteToken: tokens.busd,
  },
  {
    pid: 3,
    lpSymbol: 'BUSD – BNB',
    lpAddresses: {
      56: '',
      97: '0x94b87D1B0bDaFAfAfa01348c1896c7c7fC191ed3',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },
]

export default farms
