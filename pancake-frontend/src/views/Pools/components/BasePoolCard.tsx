import React from 'react'
import styled from 'styled-components'
import { getFullDisplayBalance } from '../../../utils/formatBalance'
import CakeVaultCard from './CakeVaultCard'
import PoolCard from './PoolCard'
import { Pool } from '../../../state/types'
import Images from '../../../config/constants/views/images'

const CardWrapper = styled.div<{ position?; margin? }>`
  position: ${({ position }) => position || 'absolute'};
  margin: ${({ margin }) => margin || '0 24px'};
  width: 276px;
  height: auto;
  left: ${({ position }) => (position === 'relative' ? 'none' : '753px')};
  top: ${({ position }) => (position === 'relative' ? 'none' : '45px')};

  background: rgb(21, 35, 64);
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px);
  border-radius: 24px;
`

const MaxWrapper = styled.div`
  position: relative;
  width: 276px;
`

const MaxImage = styled.div`
  position: absolute;
  width: 300px;
  height: 215px;
  top: -106px;
  left: 62px;
  background: url(${Images.CoinBlue});
  transform: scale(0.2);
  z-index: 3;
`

const MaxText = styled.div`
  position: absolute;
  top: 30px;
  left: 209px;
  font-family: 'HelveticaNeueCyr';
  font-size: 8px;
  color: #ffffff;
  z-index: 3;
`

const WalletLightWrapper = styled.div`
  position: absolute;
  width: 276px;
  height: 202px;
  overflow: hidden;
  border-radius: 24px;
  z-index: -1;
`

const WalletLight = styled.div`
  position: absolute;
  width: 49px;
  height: 49px;
  left: 223.2px;
  top: -10px;

  background: #668ee0;
  mix-blend-mode: normal;
  filter: blur(64px);
`

const CardContentWrapper = styled.div`
  display: flex;
  top: 0;
  left: 0;
  flex-direction: column;
  padding: 21px 25px;
  width: 100%;
`

export const BasePoolCard: React.FC<{ pool: Pool; account: string; stakedOnly: boolean }> = ({
  pool,
  account,
  stakedOnly,
}) => {
  return (
    <CardWrapper position="relative" margin="10px 0" key={pool.isAutoVault ? 'auto-cake' : pool.sousId}>
      {pool?.stakingLimit && pool.stakingLimit.gt(0) && (
        <MaxWrapper>
          <>
            <MaxImage />
            <MaxText>Max. {`${getFullDisplayBalance(pool.stakingLimit, pool.stakingToken.decimals, 0)}`}</MaxText>
          </>
          <WalletLightWrapper>
            <WalletLight />
          </WalletLightWrapper>
        </MaxWrapper>
      )}
      <CardContentWrapper>
        {pool.isAutoVault ? (
          <CakeVaultCard key="auto-cake" pool={pool} showStakedOnly={stakedOnly} />
        ) : (
          <PoolCard key={pool.sousId} pool={pool} account={account} />
        )}
      </CardContentWrapper>
    </CardWrapper>
  )
}
