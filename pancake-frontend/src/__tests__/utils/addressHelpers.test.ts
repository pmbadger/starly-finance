import { getAddress } from 'utils/addressHelpers'

describe('getAddress', () => {
  const address = {
    3: '0x67C6c150914e6363F746796744636B7485B0A775',
  }

  it(`get address for testnet (chainId 3)`, () => {
    process.env.REACT_APP_CHAIN_ID = '3'
    const expected = address[3]
    expect(getAddress(address)).toEqual(expected)
  })
  it(`get address for any other network (chainId 31337)`, () => {
    process.env.REACT_APP_CHAIN_ID = '31337'
    const expected = address[3]
    expect(getAddress(address)).toEqual(expected)
  })
})
