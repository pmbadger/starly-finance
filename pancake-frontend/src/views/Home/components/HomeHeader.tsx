import React from 'react'
import { Text, IconButton } from 'pancakeswap-uikit'
import styled from 'styled-components'

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
  margin-bottom: 66px;
  margin-top: 16px;
  z-index: 2;
`

const Row = styled.div`
  z-index: 2;
  width: 100%;
  display: flex;
`

const TitlesContainer = styled.div`
  width: 80%;
  max-width: 1193px;
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

  ${Text} {
    font-family: 'Futura PT';
    font-size: 16px;
    line-height: 21px;
  }
`

const HomeHeader: React.FC = () => {
  return (
    <Row>
      <TitlesContainer>
        <Title>The First DEX on BSC network</Title>
        <Title>with a three-type referral system</Title>
        <SubTitle>
          Enjoy profitable yield farming and exchanges
          <br />
          with the lowest fees on DeFi space!
        </SubTitle>
      </TitlesContainer>
    </Row>
  )
}

export default HomeHeader
