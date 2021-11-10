import React from 'react'
import styled from 'styled-components'
import { Box } from 'pancakeswap-uikit'
import { useTranslation } from 'contexts/Localization'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import useGetTopFarmsByApr from 'views/Home/hooks/useGetTopFarmsByApr'
import BigNumber from 'bignumber.js'
import { TopFarm } from './TopFarm'
import { getApy } from '../../../../utils/compoundApyHelpers'
import { BIG_ZERO } from '../../../../utils/bigNumber'

const StyledHeading = styled.div`
  font-size: 24px;
  font-family: 'Futura PT';
  line-height: 120%;
  font-weight: 600;
  color: white;
  margin-bottom: 16px;
`

const CardsWrapper = styled.div`
  display: flex;
  gap: 11px;
`

const HomeTopFarms = () => {
  const { t } = useTranslation()
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const { topFarms } = useGetTopFarmsByApr(isIntersecting)
  const filteredTopFarms = topFarms.filter((farm) => farm?.pid !== 0)

  const liquidityInUsd = (lpTotalInQuoteToken, busdPrice) => {
    return lpTotalInQuoteToken && busdPrice ? new BigNumber(lpTotalInQuoteToken).times(busdPrice) : BIG_ZERO
  }

  return (
    <div ref={observerRef}>
      <StyledHeading>{t('Top Farms')}:</StyledHeading>
      <Box height={['240px', null, '80px']}>
        <CardsWrapper>
          {filteredTopFarms.map((topFarm, index) => (
            <TopFarm
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              title={topFarm?.lpSymbol}
              liquidity={liquidityInUsd(topFarm?.lpTotalInQuoteToken, topFarm?.quoteToken.busdPrice)}
              percentage={topFarm?.apr ? getApy(topFarm.apr, 1, 365, 0) : 0}
              index={index}
              token={topFarm?.token}
              quoteToken={topFarm?.quoteToken}
            />
          ))}
        </CardsWrapper>
      </Box>
    </div>
  )
}

export default HomeTopFarms
