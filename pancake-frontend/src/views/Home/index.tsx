import React from 'react'
import styled from 'styled-components'
import PageSection from 'components/PageSection'
import { useWeb3React } from '@web3-react/core'
import useTheme from 'hooks/useTheme'
import Container from 'components/Layout/Container'
import Page from 'components/Layout/Page'
import Card from 'components/Card'
import Hero from './components/Hero'
import { swapSectionData, earnSectionData, cakeSectionData } from './components/SalesSection/data'
import MetricsSection from './components/MetricsSection'
import SalesSection from './components/SalesSection'
import WinSection from './components/WinSection'
import FarmsPoolsRow from './components/FarmsPoolsRow'
import Footer from './components/Footer'
import CakeDataRow from './components/CakeDataRow'
import { WedgeTopLeft, InnerWedgeWrapper, OuterWedgeWrapper, WedgeTopRight } from './components/WedgeSvgs'
import UserBanner from './components/UserBanner'
import HomeBg from './components/HomeBg'
import HomeSwiper from './components/Swiper'
import MainCards from './components/MainCards'
import LaunchpoolSection from './components/LaunchpoolSection'

const ClientsWrapper = styled.div`
  height: 195px;
`
const ClientsCardsWrapper = styled.div`
  margin-top: 21px;
  display: flex;
  gap: 32px;
`

const ClientCard = styled.div`
  width: 377px;
  height: 328px;
  background: rgba(21, 35, 64, 0.8);
  backdrop-filter: blur(4px);
  border-radius: 24px;
`

const ClientsHeader = styled.h2`
  font-size: 32px;
  color: #FFFFFF;
`

const MarginTop = styled.div`
  width: 100%;
  height: 434px;
`

const Home: React.FC = () => {
  const { theme } = useTheme()
  const { account } = useWeb3React()

  const HomeSectionContainerStyles = { margin: '0', width: '100%', maxWidth: '968px' }

  return (
    <>
      <Page>
        <HomeBg />
        <MarginTop />
        <HomeSwiper />
        <MainCards/>
        <LaunchpoolSection />
        <ClientsWrapper>
          <ClientsHeader>
            Why Choose us?
          </ClientsHeader>
          <ClientsCardsWrapper>
            <ClientCard />
            <ClientCard />
            <ClientCard />
          </ClientsCardsWrapper>
        </ClientsWrapper>
      </Page>
    </>
  )
}

export default Home
