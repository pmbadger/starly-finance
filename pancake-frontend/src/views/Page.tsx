import React from 'react'
import styled from 'styled-components'
import { Flex, Text } from 'pancakeswap-uikit'
import Footer from 'components/Menu/Footer'
import SubNav from 'components/Menu/SubNav'
import { AppBody } from '../components/App'
import { Wrapper } from './Swap/components/styleds'

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 16px;
  padding-bottom: 0;

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 24px;
    padding-bottom: 0;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 58px;
    min-height: 100vh;
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
`

const SubTitle = styled(Text)`
  font-style: normal;
  font-family: HelveticaNeueCyr;
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.02em;
  color: #82c8f4;
  width: 100%;
  margin-bottom: 50px;
  margin-top: 16px;
`

const Row = styled.div`
  z-index: 2;
  max-width: 1192px;
  width: 80%;
  overflow: hidden;
  position: relative;
`

const CardContent = styled.div`
  padding: 30px 78px 55px;
`

const Coin1 = styled.img`
  position: fixed;
  top: 300px;
  right: 1%;
`
const Coin2 = styled.img`
  position: fixed;
  filter: blur(4px);
`

const Coin3 = styled.img`
  position: fixed;
  top: 90px;
  filter: blur(4px);
  right: 32%;
`

const Coin4 = styled.img`
  position: fixed;
  top: 370px;
  left: 5%;
`

const Comet = styled.img`
  position: fixed;
  top: 550px;
  right: 0;
`

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <>
      <Coin1 alt="coin" src="/images/coin.png" />
      <Coin2 alt="coin" src="/images/coin1.png" />
      <Coin3 alt="coin" src="/images/coin3.png" />
      <Coin4 alt="coin" src="/images/coin4.png" />
      <Comet alt="comet" src="/images/comet.png" />

      <StyledPage {...props}>
        <Row>
          <Title>Make a Swap at No Cost</Title>
          <SubTitle>Up to 100% of the trading fee returned in STLY tokens</SubTitle>
        </Row>
        <AppBody>
          <Wrapper id="swap-page">
            <SubNav />
            <CardContent>{children}</CardContent>
          </Wrapper>
        </AppBody>
        <Flex flexGrow={1} />
        <Footer />
      </StyledPage>
    </>
  )
}

export default Page
