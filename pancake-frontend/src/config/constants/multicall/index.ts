import { ChainId } from 'pancakeswap-sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.TESTNET]: '0x53C43764255c17BD724F74c4eF150724AC50a3ed',
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
