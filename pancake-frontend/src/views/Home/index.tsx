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
import MeritsSection from './components/MeritsSection'

const MarginTop = styled.div`
  width: 100%;
  height: 434px;
`

const Home: React.FC = () => {

  return (
    <Page>
      <HomeBg />
      <MarginTop />
      <HomeSwiper />
      <MainCards/>
      <LaunchpoolSection />
      <MeritsSection />
    </Page>
  )
}

export default Home
