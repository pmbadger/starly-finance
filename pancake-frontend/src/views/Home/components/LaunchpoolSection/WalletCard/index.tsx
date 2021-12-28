import React from 'react'
import styled from 'styled-components'
import Images from 'config/constants/views/images'
import WalletContent from './WalletContent'

interface Props {
  position?: string
  disable?: boolean
  margin?: string
}

const WalletCardWrapper = styled.div<{ position; margin }>`
  position: ${({ position }) => position || 'absolute'};
  margin: ${({ margin }) => margin || '0 24px'};
  width: 276px;
  height: 202px;
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
  height: 202px;
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

const WalletLightWrapper = styled.div`
  position: absolute;
  width: 276px;
  height: 202px;
  overflow: hidden;
  border-radius: 24px;
  z-index: -1;
`

const WalletCard: React.FC<Props> = ({ position, disable, margin }) => {
  return (
    <WalletCardWrapper position={position} margin={margin}>
      <MaxWrapper>
        {!disable && (
          <>
            <MaxImage />
            <MaxText>Max. 500</MaxText>
          </>
        )}
        <WalletLightWrapper>
          <WalletLight />
        </WalletLightWrapper>
      </MaxWrapper>
      <WalletContent disable={disable} />
    </WalletCardWrapper>
  )
}

export default WalletCard
