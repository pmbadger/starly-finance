import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { RowType, Toggle, Text, Flex, IconButton } from 'pancakeswap-uikit'
import styled from 'styled-components'
import FlexLayout from 'components/Layout/Flex'
import Page from 'components/Layout/Page'
import { useFarms, usePollFarmsData, usePriceCakeBusd } from 'state/farms/hooks'
import { Farm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { getFarmApr } from 'utils/apr'
import { orderBy } from 'lodash'
import isArchivedPid from 'utils/farmHelpers'
import { latinise } from 'utils/latinise'
import { useUserFarmStakedOnly } from 'state/user/hooks'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import Loading from 'components/Loading'
import { ChainId } from 'pancakeswap-sdk'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import Table from './components/FarmTable/FarmTable'
import FarmTabButtons from './components/FarmTabButtons'
import { RowProps } from './components/FarmTable/Row'
import { DesktopColumnSchema, ViewMode } from './components/types'
import { getApy } from '../../utils/compoundApyHelpers'
import HarvestAllFarms from '../Home/components/UserBanner/HarvestCard'

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;

  flex-direction: column;
  margin-bottom: 32px;
  padding: 15px 0;
  justify-content: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 0;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 6.5vw;
  margin-top: 5px;
  margin-right: 7vw;
  margin-bottom: 20px;

  ${Text} {
    margin-left: 13px;
    font-family: 'Futura PT';
    color: #82c8f4;
    font-size: 14px;
    line-height: 18px;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  display: flex;
  width: 80%;
  justify-content: space-between;
  max-width: 1193px;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    > div {
      padding: 0;
    }
  }
`

const Title = styled(Text)`
  font-family: 'Futura PT Bold';
  color: white;
  font-weight: 600;
  font-size: 42px;
  line-height: 120%;
  text-align: start;
  width: 100%;
  z-index: 2;
`

const SubTitle = styled(Text)`
  font-style: normal;
  font-family: HelveticaNeueCyr;
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.02em;
  color: #82c8f4;
  margin-bottom: 25px;
  margin-top: 16px;
  z-index: 2;
`

const Row = styled.div`
  z-index: 2;
  width: 100%;
  display: flex;
  justify-content: center;
`

const TitlesContainer = styled.div`
  width: 80%;
  max-width: 1193px;
`

const TableContainer = styled.div`
  width: 100%;
  background: #111522;
  border-top: 1px solid rgba(130, 200, 244, 0.1);
  height: 100vh;
`

const StyledText = styled(Text)`
  font-family: 'Futura PT';
  font-size: 16px;
  line-height: 21px;
`

const StyledIconButton = styled(IconButton)`
  width: 173px;
  height: 45px;
  background: linear-gradient(260.3deg, #058fca -29.78%, #2e4bb5 118.84%);
  margin-bottom: 52px;
  border-radius: 12px;
  z-index: 2;

  img {
    position: absolute;
    margin-top: -15px;
    margin-left: 145px;
  }
`

const Coin1 = styled.img`
  position: fixed;
  top: 200px;
  left: -4%;
  z-index: 0;
`

const Coin2 = styled.img`
  position: fixed;
  filter: blur(4px);
  z-index: -1;
  top: -90px;
  right: 0;
`

const CoinStand = styled.img`
  position: fixed;
  z-index: -2;
  left: 50vw;
  top: 5px;
  width: 330px;
`

const Comet = styled.img`
  position: fixed;
  top: -25px;
  left: 55%;
  z-index: 0;
`

const CoinStandBackground = styled.div`
  position: absolute;
  z-index: -2;
  width: 428px;
  height: 236px;
  left: 48vw;
  top: 283px;

  background: #3969aa;
  filter: blur(256px);
`

const NUMBER_OF_FARMS_VISIBLE = 12

const getDisplayApr = (cakeRewardsApr?: number, lpRewardsApr?: number) => {
  if (cakeRewardsApr && lpRewardsApr) {
    return (cakeRewardsApr + lpRewardsApr).toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  if (cakeRewardsApr) {
    return cakeRewardsApr.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  return null
}

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const { data: farmsLP, userDataLoaded } = useFarms()
  const cakePrice = usePriceCakeBusd()
  const [query, setQuery] = useState('')
  // const [viewMode, setViewMode] = usePersistState(ViewMode.TABLE, { localStorageKey: 'pancake_farm_view' })
  const viewMode = ViewMode.TABLE
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('all')
  const chosenFarmsLength = useRef(0)

  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived

  usePollFarmsData(isArchived)

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const [stakedOnly, setStakedOnly] = useUserFarmStakedOnly(isActive)

  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X' && !isArchivedPid(farm.pid))
  const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X' && !isArchivedPid(farm.pid))
  const archivedFarms = farmsLP.filter((farm) => isArchivedPid(farm.pid))

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedArchivedFarms = archivedFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const farmsList = useCallback(
    (farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !farm.quoteToken.busdPrice) {
          return farm
        }
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)
        const { cakeRewardsApr, lpRewardsApr } = isActive
          ? getFarmApr(new BigNumber(farm.poolWeight), cakePrice, totalLiquidity, farm.lpAddresses[ChainId.TESTNET])
          : { cakeRewardsApr: 0, lpRewardsApr: 0 }

        return { ...farm, apr: cakeRewardsApr, lpRewardsApr, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase())
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm: FarmWithStakedValue) => {
          return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPR
    },
    [cakePrice, query, isActive],
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const loadMoreRef = useRef<HTMLDivElement>(null)

  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
  const [observerIsSet, setObserverIsSet] = useState(false)

  const chosenFarmsMemoized = useMemo(() => {
    let chosenFarms = []

    const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
      switch (sortOption) {
        case 'apr':
          return orderBy(farms, (farm: FarmWithStakedValue) => farm.apr + farm.lpRewardsApr, 'desc')
        case 'multiplier':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
            'desc',
          )
        case 'earned':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.userData ? Number(farm.userData.earnings) : 0),
            'desc',
          )
        case 'liquidity':
          return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
        default:
          return farms
      }
    }

    if (isActive) {
      chosenFarms = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms)
    }
    if (isInactive) {
      chosenFarms = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms)
    }
    if (isArchived) {
      chosenFarms = stakedOnly ? farmsList(stakedArchivedFarms) : farmsList(archivedFarms)
    }

    return sortFarms(chosenFarms).slice(0, numberOfFarmsVisible)
  }, [
    sortOption,
    activeFarms,
    farmsList,
    inactiveFarms,
    archivedFarms,
    isActive,
    isInactive,
    isArchived,
    stakedArchivedFarms,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    numberOfFarmsVisible,
  ])

  chosenFarmsLength.current = chosenFarmsMemoized.length

  useEffect(() => {
    const showMoreFarms = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfFarmsVisible((farmsCurrentlyVisible) => {
          if (farmsCurrentlyVisible <= chosenFarmsLength.current) {
            return farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE
          }
          return farmsCurrentlyVisible
        })
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMoreFarms, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [chosenFarmsMemoized, observerIsSet])

  const rowData = chosenFarmsMemoized.map((farm) => {
    const { token, quoteToken } = farm
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    const lpLabel = farm.lpSymbol

    const row: RowProps = {
      apr: {
        pid: farm.pid,
        value: getDisplayApr(farm.apr, farm.lpRewardsApr),
        multiplier: farm.multiplier,
        lpLabel,
        tokenAddress,
        quoteTokenAddress,
        cakePrice,
        originalValue: farm.apr,
      },
      apy: {
        value: getApy(farm.apr, 1, 365, 0),
      },
      farm: {
        label: lpLabel,
        pid: farm.pid,
        token: farm.token,
        quoteToken: farm.quoteToken,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(farm.userData.earnings)),
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: farm,
    }

    return row
  })

  const renderContent = (): JSX.Element => {
    if (viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'farm':
              return b.id - a.id
            case 'apr':
              if (a.original.apr.value && b.original.apr.value) {
                return Number(a.original.apr.value) - Number(b.original.apr.value)
              }
              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return <Table data={rowData} columns={columns} userDataReady={userDataReady} />
    }

    return (
      <FlexLayout>
        <Route exact path={`${path}`}>
          {chosenFarmsMemoized.map((farm) => (
            <FarmCard
              key={farm.pid}
              farm={farm}
              displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
              cakePrice={cakePrice}
              account={account}
              removed={false}
            />
          ))}
        </Route>
        <Route exact path={`${path}/history`}>
          {chosenFarmsMemoized.map((farm) => (
            <FarmCard
              key={farm.pid}
              farm={farm}
              displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
              cakePrice={cakePrice}
              account={account}
              removed
            />
          ))}
        </Route>
        <Route exact path={`${path}/archived`}>
          {chosenFarmsMemoized.map((farm) => (
            <FarmCard
              key={farm.pid}
              farm={farm}
              displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
              cakePrice={cakePrice}
              account={account}
              removed
            />
          ))}
        </Route>
      </FlexLayout>
    )
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  return (
    <>
      <Page>
        <CoinStandBackground />
        <Coin1 alt="coin" src="/images/coin4.png" />
        <Coin2 alt="coin" src="/images/coin3.png" />
        <Comet alt="comet" src="/images/comet.png" />
        <CoinStand alt="coin stand" src="/images/coin_stand_1.png" />
        <Row>
          <TitlesContainer>
            <Title>Farms</Title>
            <SubTitle>
              Starly Farms offer multiple farming opportunities to you. Get double <br />
              rewards by staking your LP tokens in return for additional STLY tokens <br />
              and earning high income from swap transactions.
            </SubTitle>
            <StyledIconButton id="btn90-add-new-project-farms" endIcon={<img alt="star" src="/images/star.svg" />}>
              <StyledText>{t('Add New Project')}</StyledText>
            </StyledIconButton>
          </TitlesContainer>
        </Row>
        <TableContainer>
          <ControlContainer>
            <ViewControls>
              <FarmTabButtons hasStakeInFinishedFarms={stakedInactiveFarms.length > 0} />
              <ToggleWrapper>
                <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="lg" />
                <Text>{t('Active Farms')}</Text>
              </ToggleWrapper>
              <SearchInput onChange={handleChangeQuery} placeholder="Search Farms" />
              <Select
                options={[
                  {
                    label: t('All'),
                    value: 'all',
                  },
                  {
                    label: t('Hot'),
                    value: 'hot',
                  },
                  {
                    label: t('APR'),
                    value: 'apr',
                  },
                  {
                    label: t('Multiplier'),
                    value: 'multiplier',
                  },
                  {
                    label: t('Earned'),
                    value: 'earned',
                  },
                  {
                    label: t('Liquidity'),
                    value: 'liquidity',
                  },
                ]}
                onChange={handleSortOptionChange}
              />
              <HarvestAllFarms />
            </ViewControls>
          </ControlContainer>
          {renderContent()}
          {account && !userDataLoaded && stakedOnly && (
            <Flex justifyContent="center">
              <Loading />
            </Flex>
          )}
          <div ref={loadMoreRef} />
        </TableContainer>
      </Page>
    </>
  )
}

export default Farms
