import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.cake,
    earningToken: tokens.cake,
    contractAddress: {
      3: '0x000000000000000000000000000000000000000t',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 1,
    stakingToken: tokens.eth,
    earningToken: tokens.cake,
    contractAddress: {
      3: '0x000000000000000000000000000000000000000u',
    },
    poolCategory: PoolCategory.ETHEREUM,
    harvest: true,
    tokenPerBlock: '0.5',
    sortOrder: 999,
    isFinished: true,
  },
  {
    sousId: 2,
    stakingToken: tokens.cake,
    earningToken: tokens.eth,
    contractAddress: {
      3: '0x000000000000000000000000000000000000000v',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.0041',
    sortOrder: 999,
    isFinished: true,
  },
]

export default pools
