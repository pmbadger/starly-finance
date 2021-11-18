import React from 'react'
import { TokenPairImage, ImageProps, TokenImage } from 'pancakeswap-uikit'
import tokens from 'config/constants/tokens'
import { getAddress } from 'utils/addressHelpers'
import styled from 'styled-components'

const CakeVaultTokenPairImage: React.FC<Omit<ImageProps, 'src'>> = (props) => {
  const primaryTokenSrc = `/images/tokens/${getAddress(tokens.cake.address)}.svg`

  return (
    <TokenPairImage
      secondaryImageSize={32}
      primarySrc={primaryTokenSrc}
      secondarySrc="/images/tokens/autorenew.svg"
      {...props}
    />
  )
}

export default CakeVaultTokenPairImage

const StyledPrimaryImage = styled(TokenImage)`
  position: absolute;
  width: ${({ width }) => `${width}px`};
  display: inline-block;
  top: 21px;
  left: 25px;
`

const IconSecond = styled(TokenImage)`
  position: absolute;
  width: ${({ width }) => `${width}px`};
  margin-top: 30px;
  margin-left: 34px;
  z-index: 3;
`

export const CustomCakeVaultTokenPairImage: React.FC<Omit<ImageProps, 'src'>> = (props) => {
  const primaryTokenSrc = `/images/tokens/${getAddress(tokens.cake.address)}.svg`

  return (
    <>
      <StyledPrimaryImage src={primaryTokenSrc} width={56} height={56} />
      <IconSecond src="/images/tokens/autorenew.svg" width={30} height={30} />
    </>
  )
}
