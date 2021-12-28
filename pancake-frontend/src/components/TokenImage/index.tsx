import React from 'react'
import {
  TokenPairImage as UIKitTokenPairImage,
  TokenPairImageProps as UIKitTokenPairImageProps,
  TokenImage as UIKitTokenImage,
  ImageProps,
} from 'pancakeswap-uikit'
import tokens from 'config/constants/tokens'
import { Token } from 'config/constants/types'
import { getAddress } from 'utils/addressHelpers'
import styled from 'styled-components'

interface TokenPairImageProps extends Omit<UIKitTokenPairImageProps, 'primarySrc' | 'secondarySrc'> {
  primaryToken: Token
  secondaryToken: Token
}

const getImageUrlFromToken = (token: Token) => {
  const address = getAddress(token.symbol === 'ETH' ? tokens.weth.address : token.address)
  return `/images/tokens/${address}.svg`
}

export const TokenPairImage: React.FC<TokenPairImageProps> = ({ primaryToken, secondaryToken, ...props }) => {
  return (
    <UIKitTokenPairImage
      primarySrc={getImageUrlFromToken(primaryToken)}
      secondarySrc={getImageUrlFromToken(secondaryToken)}
      {...props}
    />
  )
}

interface TokenImageProps extends ImageProps {
  token: Token
}

export const TokenImage: React.FC<TokenImageProps> = ({ token, ...props }) => {
  return <UIKitTokenImage src={getImageUrlFromToken(token)} {...props} />
}

const StyledPrimaryImage = styled(UIKitTokenImage)`
  position: absolute;
  width: ${({ width }) => `${width}px`};
  display: inline-block;
  top: 21px;
  left: 25px;
`

const IconSecond = styled(UIKitTokenImage)`
  position: absolute;
  width: ${({ width }) => `${width}px`};
  margin-top: 30px;
  margin-left: 34px;
  z-index: 3;
`

export const CustomTokenPairImage: React.FC<TokenPairImageProps> = ({ primaryToken, secondaryToken, ...props }) => {
  const primaryTokenSrc = getImageUrlFromToken(primaryToken)
  const secondaryTokenSrc = getImageUrlFromToken(secondaryToken)

  return (
    <>
      <StyledPrimaryImage src={primaryTokenSrc} width={56} height={56} />
      <IconSecond src={secondaryTokenSrc} width={30} height={30} />
    </>
  )
}
