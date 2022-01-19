import React, { useMemo } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Text, IconButton, HelpIcon, Link, useTooltip } from 'pancakeswap-uikit'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { getAddress } from 'utils/addressHelpers'
import { getBlockExplorerLink } from 'utils'
import { BigNumber } from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'

import HarvestAction from './HarvestAction'
import StakedAction from './StakedAction'
import Apr, { AprProps } from '../Apr'
import Multiplier, { MultiplierProps } from '../Multiplier'
import Liquidity, { LiquidityProps } from '../Liquidity'
import { BASE_ADD_LIQUIDITY_URL } from '../../../../../config'
import { getFullDisplayBalance } from '../../../../../utils/formatBalance'

export interface ActionPanelProps {
  apr: AprProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
  userDataReady: boolean
  expanded: boolean
}

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 500px;
  }
`

const ReferenceElement = styled.div`
  display: inline-block;
`

const collapseAnimation = keyframes`
  from {
    max-height: 500px;
  }
  to {
    max-height: 0px;
  }
`

const Container = styled.div<{ expanded }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  background: transparent;
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  padding: 24px;
  width: 80%;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 16px 20px;
    padding-top: 0;
  }
`

const StyledLinkExternal = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`

const StyledArrowNext = styled.img`
  margin-right: 5%;
  margin-left: 5%;
`

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
  }
`

const ValueContainer = styled.div`
  display: block;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0px;
`

const StyledIconButton = styled(IconButton)`
  width: 106px;
  height: 45px;
  background: linear-gradient(260.3deg, #058fca -29.78%, #2e4bb5 118.84%);
  border-radius: 12px;

  img {
    position: absolute;
    margin-top: -15px;
    margin-left: 70px;
  }

  ${Text} {
    font-family: 'Futura PT';
    font-size: 16px;
    line-height: 21px;
  }
`

const StyledText = styled(Text)`
  font-family: 'Futura PT Bold';
  width: 50px;
  white-space: nowrap;
`

const LPContainer = styled.div`
  display: flex;
`

const Label = styled.div`
  font-family: 'Futura PT';
  color: #82c8f4;
  text-align: left;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 17px;
  margin: 4px 0px;
`

const ContentContainer = styled.div`
  min-height: 24px;
  display: flex;
  align-items: center;
  font-family: 'Futura PT';

  svg {
    path {
      fill: #82c8f4;
    }
  }
`

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({
  details,
  apr,
  multiplier,
  liquidity,
  userDataReady,
  expanded,
}) => {
  const farm = details

  const { account } = useWeb3React()
  const { t } = useTranslation()
  const isActive = farm.multiplier !== '0X'
  const { quoteToken, token, dual } = farm
  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: quoteToken.address,
    tokenAddress: token.address,
  })
  const lpAddress = getAddress(farm.lpAddresses)
  const ethereum = getBlockExplorerLink(lpAddress, 'address')
  const info = `https://pancakeswap.info/pool/${lpAddress}`
  const getLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  const { targetRef, tooltip, tooltipVisible } = useTooltip(t('#'), { placement: 'top-end', tooltipOffset: [20, 10] })

  const { tokenBalance: tokenBalanceAsString = 0 } = farm.userData || {}

  const fullBalance = useMemo(() => {
    const tokenBalance = new BigNumber(tokenBalanceAsString)
    return getFullDisplayBalance(tokenBalance)
  }, [tokenBalanceAsString])

  const displayBalance = (balance: string) => {
    if (balance === '0' || !account) {
      return '0'
    }
    const balanceBigNumber = new BigNumber(balance)
    if (balanceBigNumber.gt(0) && balanceBigNumber.lt(0.001)) {
      return '<0.001'
    }
    return balanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
  }

  return (
    <Container expanded={expanded}>
      {/* <InfoContainer>
        {isActive && (
          <StakeContainer>
            <StyledLinkExternal href={`/add/${liquidityUrlPathParts}`}>
              {t('Get %symbol%', { symbol: lpLabel })}
            </StyledLinkExternal>
          </StakeContainer>
        )}
        <StyledLinkExternal href={ethereum}>{t('View Contract')}</StyledLinkExternal>
        <StyledLinkExternal href={info}>{t('See Pair Info')}</StyledLinkExternal>
        <TagsContainer>
          {farm.isCommunity ? <CommunityTag /> : <CoreTag />}
          {dual ? <DualTag /> : null}
        </TagsContainer>
      </InfoContainer> */}
      <ValueContainer>
        <ValueWrapper>
          <Text>{t('APR')}</Text>
          <Apr {...apr} />
        </ValueWrapper>
        <ValueWrapper>
          <Text>{t('Multiplier')}</Text>
          <Multiplier {...multiplier} />
        </ValueWrapper>
        <ValueWrapper>
          <Text>{t('Liquidity')}</Text>
          <Liquidity {...liquidity} />
        </ValueWrapper>
      </ValueContainer>
      <ActionContainer>
        <LPContainer>
          <StyledLinkExternal href={getLiquidityUrl} target="_blank">
            <StyledIconButton id={`btn94-get-lp-${farm.pid}`} endIcon={<img alt="star" src="/images/star.svg" />}>
              <Text>{t('Get LP')}</Text>
            </StyledIconButton>
          </StyledLinkExternal>
          <div style={{ marginLeft: '24px' }}>
            <Label>{t('Available LP:')}</Label>
            <ContentContainer>
              <StyledText>
                {displayBalance(fullBalance)} {t('LP')}
              </StyledText>
              {/* <ReferenceElement ref={targetRef}> */}
              {/*  <HelpIcon color="textSubtle" style={{ marginLeft: '24px' }} /> */}
              {/* </ReferenceElement> */}
              {/* {tooltipVisible && tooltip} */}
            </ContentContainer>
          </div>
        </LPContainer>
        <StyledArrowNext src="/images/arrow-next.svg" alt="next" />
        <StakedAction {...farm} userDataReady={userDataReady} />
        <StyledArrowNext src="/images/arrow-next.svg" alt="next" />
        <HarvestAction {...farm} userDataReady={userDataReady} />
      </ActionContainer>
    </Container>
  )
}

export default ActionPanel
