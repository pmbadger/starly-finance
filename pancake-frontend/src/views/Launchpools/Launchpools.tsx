import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { Flex } from 'pancakeswap-uikit'
import styled from 'styled-components'
import Page from 'components/Layout/Page'
import { useFarms, usePollFarmsData } from 'state/farms/hooks'
import { useUserFarmStakedOnly } from 'state/user/hooks'
import Loading from 'components/Loading'
import LaunchpoolsHeader from './components/LaunchpoolsHeader'
import ViewsControlsPanel from './components/LaunchpoolsControlsPanel'
import WalletCard from '../Home/components/LaunchpoolSection/WalletCard'

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
  justify-content: space-between;
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

const Launchpools: React.FC = () => {
  const { pathname } = useLocation()
  const { data: farmsLP, userDataLoaded } = useFarms()
  const [query, setQuery] = useState('')
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('all')

  const isArchived = pathname.includes('archived')
  const isActive = !isArchived

  usePollFarmsData(isArchived)

  const [stakedOnly, setStakedOnly] = useUserFarmStakedOnly(isActive)

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
            isArchived={isArchived}
            stakedOnly={stakedOnly}
            setStakedOnly={setStakedOnly}
            setQuery={setQuery}
            setSortOption={setSortOption}
          />
        </ControlContainer>
        <CardsContainer>
          <WalletCard position="relative" disable={false} margin="10px 0" />
          <WalletCard position="relative" disable margin="10px 0" />
          <WalletCard position="relative" disable margin="10px 0" />
          <WalletCard position="relative" disable margin="10px 0" />
        </CardsContainer>
      </ContentContainer>
      {account && !userDataLoaded && stakedOnly && (
        <Flex justifyContent="center">
          <Loading />
        </Flex>
      )}
    </Page>
  )
}

export default Launchpools
