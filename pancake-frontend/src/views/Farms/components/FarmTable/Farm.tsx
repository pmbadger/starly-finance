import React from 'react'
import styled from 'styled-components'
import { Text } from 'pancakeswap-uikit'
import { Token } from 'config/constants/types'
import { TokenPairImage } from 'components/TokenImage'

export interface FarmProps {
  label: string
  pid: number
  token: Token
  quoteToken: Token
}

const Container = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;
  margin-top: 10px;
`

const TokenWrapper = styled.div`
  width: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 40px;
  }
`

const Farm: React.FunctionComponent<FarmProps> = ({ token, quoteToken, label }) => {
  return (
    <Container>
      <TokenWrapper>
        <TokenPairImage variant="inverted" primaryToken={token} secondaryToken={quoteToken} width={34} height={34} />
      </TokenWrapper>
      <div>
        <Text bold marginLeft="8px">
          {label}
        </Text>
      </div>
    </Container>
  )
}

export default Farm
