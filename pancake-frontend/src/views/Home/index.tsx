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

const StyledHeroSection = styled(PageSection)`
  padding-top: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 48px;
  }
`

const UserBannerWrapper = styled(Container)`
  z-index: 1;
  position: absolute;
  width: 100%;
  top: 0px;
  left: 50%;
  transform: translate(-50%, 0);
  padding-left: 0px;
  padding-right: 0px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const CardsWrapper = styled.div`
  margin-bottom: 67px;
  display: flex;
  gap: 12px;
`

const CardMain = styled(Card)`
  width: 390px;
  height: 256px;
  background: rgba(23, 29, 48, 0.8);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.12);
  border-radius: 32px;
`

const LaunchpoolsWrapper = styled.div`
  margin-bottom: 119px;
  height: 195px;
  background: rgba(21, 35, 64, 0.8);
  backdrop-filter: blur(4px);
  border-radius: 24px;
`

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
        <LaunchpoolsWrapper />
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
      {/* <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background={theme.colors.background}
        index={2}
        hasCurvedDivider={false}
      >
        <OuterWedgeWrapper>
          <InnerWedgeWrapper top fill={theme.isDark ? '#201335' : '#D8CBED'}>
            <WedgeTopLeft />
          </InnerWedgeWrapper>
        </OuterWedgeWrapper>
        <SalesSection {...swapSectionData} />
      </PageSection> */}
      {/* <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background={theme.colors.gradients.cardHeader}
        index={2}
        hasCurvedDivider={false}
      >
        <OuterWedgeWrapper>
          <InnerWedgeWrapper width="150%" top fill={theme.colors.background}>
            <WedgeTopRight />
          </InnerWedgeWrapper>
        </OuterWedgeWrapper>
        <SalesSection {...earnSectionData} />
      </PageSection>
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background={theme.colors.background}
        index={2}
        hasCurvedDivider={false}
      >
        <SalesSection {...cakeSectionData} />
        <CakeDataRow />
      </PageSection>
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background="linear-gradient(180deg, #7645D9 0%, #5121B1 100%)"
        index={2}
        hasCurvedDivider={false}
      >
        <Footer />
      </PageSection> */}
    </>
  )
}

export default Home
