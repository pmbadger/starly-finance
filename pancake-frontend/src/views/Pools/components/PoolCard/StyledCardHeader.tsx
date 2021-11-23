import React from 'react'
import { Flex, Skeleton } from 'pancakeswap-uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Token } from 'config/constants/types'
import { CustomTokenPairImage } from 'components/TokenImage'
import { CustomCakeVaultTokenPairImage } from '../CakeVaultCard/CakeVaultTokenPairImage'
import Balance from '../../../../components/Balance'
import { Pool } from '../../../../state/types'
import { getAprData } from '../../helpers'

const TextLine = styled.div<{ maxWidth; marginBottom; fontFamily; fontWeight; fontSize; lineHeight; color }>`
  display: flex;
  align-items: center;
  margin-bottom: ${({ marginBottom }) => marginBottom || '0'};
  max-width: ${({ maxWidth }) => maxWidth || 'inherit'};
  font-family: ${({ fontFamily }) => fontFamily || 'inherit'};
  font-weight: ${({ fontWeight }) => fontWeight || 'inherit'};
  font-size: ${({ fontSize }) => fontSize || 'inherit'};
  line-height: ${({ lineHeight }) => lineHeight || 'inherit'};
  color: ${({ color }) => color || 'inherit'};
  z-index: 3;
  white-space: nowrap;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 81px;
`

const StyledCardHeader: React.FC<{
  earningToken: Token
  stakingToken: Token
  isAutoVault?: boolean
  isFinished?: boolean
  isStaking?: boolean
  pool: Pool
  performanceFee?: number
}> = ({
  earningToken,
  stakingToken,
  isFinished = false,
  isAutoVault = false,
  isStaking = false,
  pool,
  performanceFee = 0,
}) => {
  const { t } = useTranslation()
  const isCakePool = earningToken.symbol === 'STLY' && stakingToken.symbol === 'STLY'

  const getSubHeading = () => {
    if (isAutoVault) {
      return t('Stake STLY - Earn STLY')
    }
    if (isCakePool) {
      return t('Stake STLY')
    }
    return t('Stake %symbol%', { symbol: stakingToken.symbol })
  }

  const { apr: earningsPercentageToDisplay } = getAprData(pool, performanceFee)
  const { apr } = pool

  return (
    <>
      {isAutoVault ? (
        <CustomCakeVaultTokenPairImage width={56} height={56} />
      ) : (
        <CustomTokenPairImage primaryToken={earningToken} secondaryToken={stakingToken} width={56} height={56} />
      )}
      <TextWrapper>
        <TextLine
          maxWidth="84px"
          marginBottom="2px"
          fontFamily="Futura PT Bold"
          fontWeight="500"
          fontSize="16px"
          lineHeight="21px"
          color="#FFFFFF"
        >
          {isAutoVault ? `${t('Auto Compound')}` : `Earn ${earningToken.symbol}`}
        </TextLine>
        <TextLine
          maxWidth="84px"
          marginBottom="2px"
          fontFamily="HelveticaNeueCyr"
          fontWeight="normal"
          fontSize="11px"
          lineHeight="11px"
          color="#82C8F4"
        >
          {getSubHeading()}
        </TextLine>

        {isFinished || !apr ? (
          <Skeleton width="82px" height="24px" />
        ) : (
          <Flex alignItems="center">
            <TextLine
              maxWidth="112.8px"
              marginBottom="2px"
              fontFamily="Futura PT Bold"
              fontWeight="600"
              fontSize="16px"
              lineHeight="21px"
              color="#FFFFFF"
            >
              <Balance
                fontSize="16px"
                isDisabled={isFinished}
                value={earningsPercentageToDisplay}
                decimals={2}
                unit="%"
                prefix={isAutoVault ? `${t('APY ')}` : `${t('APR ')}`}
                bold
              />
            </TextLine>
          </Flex>
        )}
      </TextWrapper>
    </>
  )
}

export default StyledCardHeader
