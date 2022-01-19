import { ChainId, Token, Pair, TokenAmount, WETH, Price } from '../src'

describe('Pair', () => {
  const STLY = new Token(ChainId.TESTNET, '0x6B01cA53f11275518C98b16329C6C8Aa0D361Aa3', 18, 'STLY', 'STLY')
  const BUSD = new Token(ChainId.TESTNET, '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee', 18, 'BUSD', 'BUSD')

  describe('#getAddress', () => {
    it('returns the correct address', () => {
      expect(Pair.getAddress(STLY, BUSD)).toEqual('0x55a9306DcDE520F2f1642a00C353cF5FA52B74fE')
    })
  })

  describe('#token0', () => {
    it('always is the token that sorts before', () => {
      expect(new Pair(new TokenAmount(BUSD, '100'), new TokenAmount(STLY, '100')).token0).toEqual(STLY)
      expect(new Pair(new TokenAmount(STLY, '100'), new TokenAmount(BUSD, '100')).token0).toEqual(STLY)
    })
  })
  describe('#token1', () => {
    it('always is the token that sorts after', () => {
      expect(new Pair(new TokenAmount(BUSD, '100'), new TokenAmount(STLY, '100')).token1).toEqual(BUSD)
      expect(new Pair(new TokenAmount(STLY, '100'), new TokenAmount(BUSD, '100')).token1).toEqual(BUSD)
    })
  })
  describe('#reserve0', () => {
    it('always comes from the token that sorts before', () => {
      expect(new Pair(new TokenAmount(BUSD, '100'), new TokenAmount(STLY, '101')).reserve0).toEqual(
        new TokenAmount(STLY, '101')
      )
      expect(new Pair(new TokenAmount(STLY, '101'), new TokenAmount(BUSD, '100')).reserve0).toEqual(
        new TokenAmount(STLY, '101')
      )
    })
  })
  describe('#reserve1', () => {
    it('always comes from the token that sorts after', () => {
      expect(new Pair(new TokenAmount(BUSD, '100'), new TokenAmount(STLY, '101')).reserve1).toEqual(
        new TokenAmount(BUSD, '100')
      )
      expect(new Pair(new TokenAmount(STLY, '101'), new TokenAmount(BUSD, '100')).reserve1).toEqual(
        new TokenAmount(BUSD, '100')
      )
    })
  })

  describe('#token0Price', () => {
    it('returns price of token0 in terms of token1', () => {
      expect(new Pair(new TokenAmount(BUSD, '101'), new TokenAmount(STLY, '100')).token0Price).toEqual(
        new Price(STLY, BUSD, '100', '101')
      )
      expect(new Pair(new TokenAmount(STLY, '100'), new TokenAmount(BUSD, '101')).token0Price).toEqual(
        new Price(STLY, BUSD, '100', '101')
      )
    })
  })

  describe('#token1Price', () => {
    it('returns price of token1 in terms of token0', () => {
      expect(new Pair(new TokenAmount(BUSD, '101'), new TokenAmount(STLY, '100')).token1Price).toEqual(
        new Price(BUSD, STLY, '101', '100')
      )
      expect(new Pair(new TokenAmount(STLY, '100'), new TokenAmount(BUSD, '101')).token1Price).toEqual(
        new Price(BUSD, STLY, '101', '100')
      )
    })
  })

  describe('#priceOf', () => {
    const pair = new Pair(new TokenAmount(BUSD, '101'), new TokenAmount(STLY, '100'))
    it('returns price of token in terms of other token', () => {
      expect(pair.priceOf(STLY)).toEqual(pair.token0Price)
      expect(pair.priceOf(BUSD)).toEqual(pair.token1Price)
    })

    it('throws if invalid token', () => {
      expect(() => pair.priceOf(WETH[ChainId.TESTNET])).toThrow('TOKEN')
    })
  })

  describe('#reserveOf', () => {
    it('returns reserves of the given token', () => {
      expect(new Pair(new TokenAmount(BUSD, '100'), new TokenAmount(STLY, '101')).reserveOf(BUSD)).toEqual(
        new TokenAmount(BUSD, '100')
      )
      expect(new Pair(new TokenAmount(STLY, '101'), new TokenAmount(BUSD, '100')).reserveOf(BUSD)).toEqual(
        new TokenAmount(BUSD, '100')
      )
    })

    it('throws if not in the pair', () => {
      expect(() =>
        new Pair(new TokenAmount(STLY, '101'), new TokenAmount(BUSD, '100')).reserveOf(WETH[ChainId.TESTNET])
      ).toThrow('TOKEN')
    })
  })

  describe('#chainId', () => {
    it('returns the token0 chainId', () => {
      expect(new Pair(new TokenAmount(BUSD, '100'), new TokenAmount(STLY, '100')).chainId).toEqual(ChainId.TESTNET)
      expect(new Pair(new TokenAmount(STLY, '100'), new TokenAmount(BUSD, '100')).chainId).toEqual(ChainId.TESTNET)
    })
  })
  describe('#involvesToken', () => {
    expect(new Pair(new TokenAmount(BUSD, '100'), new TokenAmount(STLY, '100')).involvesToken(BUSD)).toEqual(true)
    expect(new Pair(new TokenAmount(BUSD, '100'), new TokenAmount(STLY, '100')).involvesToken(STLY)).toEqual(true)
    expect(
      new Pair(new TokenAmount(BUSD, '100'), new TokenAmount(STLY, '100')).involvesToken(WETH[ChainId.TESTNET])
    ).toEqual(false)
  })
})
