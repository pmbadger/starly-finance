import { getAddress } from 'utils/addressHelpers'

describe('getAddress', () => {
  const address = {
    97: '0x6B01cA53f11275518C98b16329C6C8Aa0D361Aa3',
  }

  it(`get address for testnet (chainId 97)`, () => {
    process.env.REACT_APP_CHAIN_ID = '97'
    const expected = address[97]
    expect(getAddress(address)).toEqual(expected)
  })
  it(`get address for any other network (chainId 31337)`, () => {
    process.env.REACT_APP_CHAIN_ID = '31337'
    const expected = address[97]
    expect(getAddress(address)).toEqual(expected)
  })
})
