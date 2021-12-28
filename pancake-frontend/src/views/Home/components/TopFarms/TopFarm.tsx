import React from 'react'
import styled from 'styled-components'
import { Flex, Skeleton, Text } from 'pancakeswap-uikit'
import Balance from 'components/Balance'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import { Token } from '../../../../config/constants/types'
import { TokenPairImage } from '../../../../components/TokenImage'
import RobotIcon from '../RobotIconSvg'

interface TopFarmPoolProps {
  title: string
  percentage: number
  index: number
  liquidity: BigNumber
  token: Token
  quoteToken: Token
}

const RobotIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
  position: absolute;
  width: 34px;
  height: 34px;
  left: 176px;
  top: 72px;
  background: linear-gradient(260.3deg, #058fca -29.78%, #2e4bb5 118.84%);
  border-radius: 8px;
`

const StyledWrapper = styled(Flex)`
  width: 230px;
  height: 120px;
  left: 0;
  top: 0;
  font-family: 'Futura PT';
  line-height: 21px;
  font-weight: 600;
  font-size: 16px;
  background: rgba(23, 29, 48, 0.8);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  border: 1px solid;
  border-image-source: linear-gradient(98.45deg, #1f2d43 16.49%, #181c2a 91.76%);
`

const TokenPairImageWrapper = styled.div`
  height: 100%;
  left: 45px;
  position: absolute;
  top: 22px;
  width: 100%;
`

const StyledApuPercent = styled.div`
  position: absolute;
  width: 94px;
  height: 21px;
  left: 20px;
  top: 79px;
`

const StyledLiquidity = styled.div`
  position: absolute;
  width: 100px;
  height: 11px;
  left: 93px;
  top: 45px;
  line-height: 11px;
`

const StyledSkeleton = styled(Skeleton)<{ top; left }>`
  position: relative;
  top: ${(props) => props.top || 'inherit'};
  left: ${(props) => props.left || 'inherit'};
`

export const TopFarm: React.FC<TopFarmPoolProps> = ({ title, liquidity, percentage, index, token, quoteToken }) => {
  const { t } = useTranslation()

  return (
    <StyledWrapper>
      {token && quoteToken ? (
        <TokenPairImageWrapper>
          <TokenPairImage variant="inverted" primaryToken={token} secondaryToken={quoteToken} width={34} height={34} />
        </TokenPairImageWrapper>
      ) : (
        <StyledSkeleton width={48} height={34} mb="8px" top="22px" left="20px" />
      )}

      {title ? (
        <Text
          fontFamily="Futura PT"
          fontWeight="600"
          mb="8px"
          fontSize="16px"
          color="white"
          lineHeight="21px"
          style={{ position: 'absolute', width: '94px', height: '21px', left: '93px', top: '22px' }}
        >
          {title}
        </Text>
      ) : (
        <StyledSkeleton width={100} height={21} mb="8px" top="22px" left="45px" />
      )}

      <StyledApuPercent>
        {percentage ? (
          <Balance
            fontFamily="Futura PT"
            lineHeight="21px"
            fontWeight="600"
            fontSize="16px"
            color="white"
            prefix="APY "
            unit="%"
            value={percentage}
          />
        ) : (
          <StyledSkeleton width={100} height={21} top="20" left="79" />
        )}
      </StyledApuPercent>

      <StyledLiquidity>
        <Text fontSize="11px" fontFamily="HelveticaNeueCyr" color="#82C8F4">
          {t('Liquidity')} ${Number(liquidity).toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </Text>
      </StyledLiquidity>

      <RobotIconWrapper>
        <RobotIcon />
      </RobotIconWrapper>
    </StyledWrapper>
  )
}
