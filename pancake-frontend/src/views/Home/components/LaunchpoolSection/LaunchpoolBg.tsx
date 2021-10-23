import React from 'react'
import styled from 'styled-components'
import {coinsBtc} from 'config/constants/views/home'
import Images from 'config/constants/views/images'

const LaunchpoolImageBg = styled.div<{width, height, absTop, absLeft, background}>`
  position: absolute;
  width: ${(props) => props.width || 'inherit'};
  height: ${(props) => props.height || 'inherit'};
  top: ${(props) => props.absTop || '0'};
  left: ${(props) => props.absLeft || '0'};

  background: ${(props) => `url(${props.background})` || 'none'};
  background-size: cover; 
  z-index: 2;
`

const LaunchpoolLightBgWrapper = styled.div`
  position: absolute;
  width: 571px;
  height: 195px;
  left: 604px;
  top: 0px;
  overflow: hidden;

  opacity: 0.64;
  border-radius: 0px;
  z-index: -2;
`

const LaunchpoolLightBg = styled.div`
  position: absolute;
  width: 259px;
  height: 260px;
  margin: 81px 156px 0 156px;

  background: rgba(20, 120, 195, 0.64);
  mix-blend-mode: normal;
  filter: blur(100px);
`

const StarsBg = styled.div`
  width: 1192px;
  height: 195px;
  border-radius: 32px;
  background: url(${Images.StarsBg});
  z-index: -2;
  opacity: 0.2;
`

const LaunchpoolBg: React.FC = () => {

  return (
    <>
      <StarsBg />
      {coinsBtc.map((coin) => 
        <LaunchpoolImageBg
          width={coin.width}
          height={coin.height}
          absTop={coin.absTop}
          absLeft={coin.absLeft}
          background={coin.background}
        />)
      }
      <LaunchpoolLightBgWrapper>
        <LaunchpoolLightBg />
      </LaunchpoolLightBgWrapper>
    </>
  )
}

export default LaunchpoolBg
