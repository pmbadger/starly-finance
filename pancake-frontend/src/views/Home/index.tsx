import React from 'react'
import styled from 'styled-components'
import Page from 'components/Layout/Page'
import HomeBg from './components/HomeBg'
import HomeSwiper from './components/Swiper'
import MainCards from './components/MainCards'
import LaunchpoolSection from './components/LaunchpoolSection'
import MeritsSection from './components/MeritsSection'
import HomeHeader from './components/HomeHeader'
import HomeTopFarms from './components/TopFarms'

const MarginTop = styled.div`
  width: 100%;
  height: 70px;
`

const Container = styled.div`
  width: 80%;
  max-width: 1194px;
  margin: 0 auto 90px;
`

const Home: React.FC = () => {
  return (
    <Page>
      <Container>
        <HomeBg />
        <HomeHeader />
        <HomeTopFarms />
        <MarginTop />
        <HomeSwiper />
        <MainCards />
        <LaunchpoolSection />
        <MeritsSection />
      </Container>
    </Page>
  )
}

export default Home
