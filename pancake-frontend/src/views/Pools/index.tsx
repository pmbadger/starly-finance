import React, { useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Flex, Text } from 'pancakeswap-uikit'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import { useTranslation } from 'contexts/Localization'
import usePersistState from 'hooks/usePersistState'
import { useFetchPublicPoolsData, usePools, useFetchCakeVault, useCakeVault } from 'state/pools/hooks'
import { usePollFarmsData } from 'state/farms/hooks'
import { latinise } from 'utils/latinise'
import Page from 'components/Layout/Page'
import { Pool } from 'state/types'
import Loading from 'components/Loading'
import { getAprData, getCakeVaultEarnings } from './helpers'
import LaunchpoolsHeader from '../Launchpools/components/LaunchpoolsHeader'
import ViewsControlsPanel from '../Launchpools/components/LaunchpoolsControlsPanel'
import { BasePoolCard } from './components/BasePoolCard'

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 32px;
  padding: 15px 0;
  justify-content: center;
`

const ContentContainer = styled.div`
  width: 100%;
  background: #111522;
  border-top: 1px solid rgba(130, 200, 244, 0.1);
  height: 100vh;
`

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  background: rgba(23, 29, 48, 0.8);
  border-radius: 32px;
  border: 1px solid;
  border-image-source: linear-gradient(180deg, rgba(83, 205, 229, 0.24) 0%, rgba(54, 89, 162, 0.24) 100%);
  padding: 40px 27px;
  margin: auto;
  width: 80%;
  flex-wrap: wrap;
  margin-bottom: 54px;
  max-width: 1193px;
`

const RocketContainer = styled.div`
  position: absolute;
  z-index: -1;
  top: 120px;
  right: 33%;
  background: #ff7043;
  opacity: 0.2;
  filter: blur(512px);
  width: 381px;
  height: 359px;
`

const Rocket = styled.img`
  position: absolute;
  z-index: -1;
  top: 10px;
  right: 30%;
`

const Comet = styled.img<{ right; top }>`
  position: fixed;
  z-index: -1;
  right: ${({ right }) => right};
  top: ${({ top }) => top};
`

const Coin = styled.img<{ left; top; blur; width }>`
  position: fixed;
  z-index: -3;
  width: ${({ width }) => width || 'inner'};
  left: ${({ left }) => left};
  top: ${({ top }) => top};
  filter: blur(${({ blur }) => blur || '0px'});
`

const Pools: React.FC = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { pools: poolsWithoutAutoVault, userDataLoaded } = usePools(account)
  const [stakedOnly, setStakedOnly] = usePersistState(false, { localStorageKey: 'pancake_pool_staked' })
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('hot')
  const chosenPoolsLength = useRef(0)
  const {
    userData: { cakeAtLastUserAction, userShares },
    fees: { performanceFee },
    pricePerFullShare,
    totalCakeInVault,
  } = useCakeVault()
  const accountHasVaultShares = userShares && userShares.gt(0)
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100

  const pools = useMemo(() => {
    const cakePool = poolsWithoutAutoVault.find((pool) => pool.sousId === 0)
    const cakeAutoVault = { ...cakePool, isAutoVault: true }
    return [cakeAutoVault, ...poolsWithoutAutoVault]
  }, [poolsWithoutAutoVault])

  // TODO aren't arrays in dep array checked just by reference, i.e. it will rerender every time reference changes?
  const [finishedPools, openPools] = useMemo(() => partition(pools, (pool) => pool.isFinished), [pools])
  const stakedOnlyFinishedPools = useMemo(
    () =>
      finishedPools.filter((pool) => {
        if (pool.isAutoVault) {
          return accountHasVaultShares
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)
      }),
    [finishedPools, accountHasVaultShares],
  )
  const stakedOnlyOpenPools = useMemo(
    () =>
      openPools.filter((pool) => {
        if (pool.isAutoVault) {
          return accountHasVaultShares
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)
      }),
    [openPools, accountHasVaultShares],
  )

  usePollFarmsData()
  useFetchCakeVault()
  useFetchPublicPoolsData()

  const showFinishedPools = location.pathname.includes('archived')

  const sortPools = (poolsToSort: Pool[]) => {
    switch (sortOption) {
      case 'apr':
        // Ternary is needed to prevent pools without APR (like MIX) getting top spot
        return orderBy(
          poolsToSort,
          (pool: Pool) => (pool.apr ? getAprData(pool, performanceFeeAsDecimal).apr : 0),
          'desc',
        )
      case 'earned':
        return orderBy(
          poolsToSort,
          (pool: Pool) => {
            if (!pool.userData || !pool.earningTokenPrice) {
              return 0
            }
            return pool.isAutoVault
              ? getCakeVaultEarnings(
                  account,
                  cakeAtLastUserAction,
                  userShares,
                  pricePerFullShare,
                  pool.earningTokenPrice,
                ).autoUsdToDisplay
              : pool.userData.pendingReward.times(pool.earningTokenPrice).toNumber()
          },
          'desc',
        )
      case 'totalStaked':
        return orderBy(
          poolsToSort,
          (pool: Pool) => (pool.isAutoVault ? totalCakeInVault.toNumber() : pool.totalStaked.toNumber()),
          'desc',
        )
      default:
        return poolsToSort
    }
  }

  let chosenPools
  if (showFinishedPools) {
    chosenPools = stakedOnly ? stakedOnlyFinishedPools : finishedPools
  } else {
    chosenPools = stakedOnly ? stakedOnlyOpenPools : openPools
  }

  if (searchQuery) {
    const lowercaseQuery = latinise(searchQuery.toLowerCase())
    chosenPools = chosenPools.filter((pool) =>
      latinise(pool.earningToken.symbol.toLowerCase()).includes(lowercaseQuery),
    )
  }

  chosenPools = sortPools(chosenPools)
  chosenPoolsLength.current = chosenPools.length

  return (
    <Page>
      <RocketContainer />
      <Rocket alt="rocket" src="/images/rocket.png" />
      <Comet alt="comet" src="/images/comet.png" right="30px" top="158px" />
      <Comet alt="comet" src="/images/comet.png" right="55%" top="-50px" />
      <Coin alt="coin" src="/images/coin3.png" top="238px" left="53%" blur="2px" width />
      <Coin alt="coin" src="/images/coin4.png" top="-20px" left="40%" blur width />
      <Coin alt="coin" src="/images/coin.png" top="100px" left="65%" blur="1px" width="138px" />
      <LaunchpoolsHeader />
      <ContentContainer>
        <ControlContainer>
          <ViewsControlsPanel
            isArchived={showFinishedPools}
            stakedOnly={stakedOnly}
            setStakedOnly={setStakedOnly}
            setQuery={setSearchQuery}
            setSortOption={setSortOption}
          />
        </ControlContainer>

        {showFinishedPools && (
          <Text fontSize="20px" color="failure" pb="32px" textAlign="center">
            {t('These pools are no longer distributing rewards. Please unstake your tokens.')}
          </Text>
        )}

        {chosenPools.length > 0 && (
          <CardsContainer>
            {chosenPools.map((pool) => (
              <BasePoolCard pool={pool} stakedOnly={stakedOnly} account={account} />
            ))}
          </CardsContainer>
        )}
      </ContentContainer>
      {account && !userDataLoaded && stakedOnly && (
        <Flex justifyContent="center" mb="4px">
          <Loading />
        </Flex>
      )}
    </Page>
  )
}

export default Pools
