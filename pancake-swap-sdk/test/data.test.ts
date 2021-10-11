import { ChainId, Fetcher } from '../src'

// TODO: replace the provider in these tests
describe.skip('data', () => {
  it('Token', async () => {
    const token = await Fetcher.fetchTokenData(ChainId.TESTNET, '0x101848D5C5bBca18E6b4431eEdF6B95E9ADF82FA') // WEENUS
    expect(token.decimals).toEqual(18)
  })
})
