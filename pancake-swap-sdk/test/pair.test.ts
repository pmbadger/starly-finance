import { ChainId, Token, Pair, TokenAmount, WETH, Price } from '../src'

describe('Pair', () => {
  const WEENUS = new Token(ChainId.TESTNET, '0x101848D5C5bBca18E6b4431eEdF6B95E9ADF82FA', 18, 'WEENUS', 'WEENUS')
  const XEENUS = new Token(ChainId.TESTNET, '0x7E0480Ca9fD50EB7A3855Cf53c347A1b4d6A2FF5', 18, 'XEENUS', 'XEENUS')

  describe('#getAddress', () => {
    it('returns the correct address', () => {
      expect(Pair.getAddress(WEENUS, XEENUS)).toEqual('0xb92E32cF04E519BDEC35CEdc4e54aC430cAd5A9e')
    })
  })

  describe('#token0', () => {
    it('always is the token that sorts before', () => {
      expect(new Pair(new TokenAmount(XEENUS, '100'), new TokenAmount(WEENUS, '100')).token0).toEqual(WEENUS)
      expect(new Pair(new TokenAmount(WEENUS, '100'), new TokenAmount(XEENUS, '100')).token0).toEqual(WEENUS)
    })
  })
  describe('#token1', () => {
    it('always is the token that sorts after', () => {
      expect(new Pair(new TokenAmount(XEENUS, '100'), new TokenAmount(WEENUS, '100')).token1).toEqual(XEENUS)
      expect(new Pair(new TokenAmount(WEENUS, '100'), new TokenAmount(XEENUS, '100')).token1).toEqual(XEENUS)
    })
  })
  describe('#reserve0', () => {
    it('always comes from the token that sorts before', () => {
      expect(new Pair(new TokenAmount(XEENUS, '100'), new TokenAmount(WEENUS, '101')).reserve0).toEqual(
        new TokenAmount(WEENUS, '101')
      )
      expect(new Pair(new TokenAmount(WEENUS, '101'), new TokenAmount(XEENUS, '100')).reserve0).toEqual(
        new TokenAmount(WEENUS, '101')
      )
    })
  })
  describe('#reserve1', () => {
    it('always comes from the token that sorts after', () => {
      expect(new Pair(new TokenAmount(XEENUS, '100'), new TokenAmount(WEENUS, '101')).reserve1).toEqual(
        new TokenAmount(XEENUS, '100')
      )
      expect(new Pair(new TokenAmount(WEENUS, '101'), new TokenAmount(XEENUS, '100')).reserve1).toEqual(
        new TokenAmount(XEENUS, '100')
      )
    })
  })

  describe('#token0Price', () => {
    it('returns price of token0 in terms of token1', () => {
      expect(new Pair(new TokenAmount(XEENUS, '101'), new TokenAmount(WEENUS, '100')).token0Price).toEqual(
        new Price(WEENUS, XEENUS, '100', '101')
      )
      expect(new Pair(new TokenAmount(WEENUS, '100'), new TokenAmount(XEENUS, '101')).token0Price).toEqual(
        new Price(WEENUS, XEENUS, '100', '101')
      )
    })
  })

  describe('#token1Price', () => {
    it('returns price of token1 in terms of token0', () => {
      expect(new Pair(new TokenAmount(XEENUS, '101'), new TokenAmount(WEENUS, '100')).token1Price).toEqual(
        new Price(XEENUS, WEENUS, '101', '100')
      )
      expect(new Pair(new TokenAmount(WEENUS, '100'), new TokenAmount(XEENUS, '101')).token1Price).toEqual(
        new Price(XEENUS, WEENUS, '101', '100')
      )
    })
  })

  describe('#priceOf', () => {
    const pair = new Pair(new TokenAmount(XEENUS, '101'), new TokenAmount(WEENUS, '100'))
    it('returns price of token in terms of other token', () => {
      expect(pair.priceOf(WEENUS)).toEqual(pair.token0Price)
      expect(pair.priceOf(XEENUS)).toEqual(pair.token1Price)
    })

    it('throws if invalid token', () => {
      expect(() => pair.priceOf(WETH[ChainId.TESTNET])).toThrow('TOKEN')
    })
  })

  describe('#reserveOf', () => {
    it('returns reserves of the given token', () => {
      expect(new Pair(new TokenAmount(XEENUS, '100'), new TokenAmount(WEENUS, '101')).reserveOf(XEENUS)).toEqual(
        new TokenAmount(XEENUS, '100')
      )
      expect(new Pair(new TokenAmount(WEENUS, '101'), new TokenAmount(XEENUS, '100')).reserveOf(XEENUS)).toEqual(
        new TokenAmount(XEENUS, '100')
      )
    })

    it('throws if not in the pair', () => {
      expect(() =>
        new Pair(new TokenAmount(WEENUS, '101'), new TokenAmount(XEENUS, '100')).reserveOf(WETH[ChainId.TESTNET])
      ).toThrow('TOKEN')
    })
  })

  describe('#chainId', () => {
    it('returns the token0 chainId', () => {
      expect(new Pair(new TokenAmount(XEENUS, '100'), new TokenAmount(WEENUS, '100')).chainId).toEqual(ChainId.TESTNET)
      expect(new Pair(new TokenAmount(WEENUS, '100'), new TokenAmount(XEENUS, '100')).chainId).toEqual(ChainId.TESTNET)
    })
  })
  describe('#involvesToken', () => {
    expect(new Pair(new TokenAmount(XEENUS, '100'), new TokenAmount(WEENUS, '100')).involvesToken(XEENUS)).toEqual(true)
    expect(new Pair(new TokenAmount(XEENUS, '100'), new TokenAmount(WEENUS, '100')).involvesToken(WEENUS)).toEqual(true)
    expect(
      new Pair(new TokenAmount(XEENUS, '100'), new TokenAmount(WEENUS, '100')).involvesToken(WETH[ChainId.TESTNET])
    ).toEqual(false)
  })
})
