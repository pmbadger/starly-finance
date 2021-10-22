import React from 'react'
import styled from 'styled-components'
import { CardMainBgProps } from 'config/constants/types'
import CustomeStar from '../HomeBg/CustomStar'

const LightBg = styled.div<{width, height, absTop, absLeft, background, filter}>`
  position: absolute;
  width: ${(props) => props.width || 'inherit'};
  height: ${(props) => props.height || 'inherit'};
  top: ${(props) => props.absTop || '0'};
  left: ${(props) => props.absLeft || '0'};

  background: ${(props) => props.background || 'none'};
  mix-blend-mode: normal;
  filter: ${(props) => props.filter || 'none'};
`

const CardMainImageBg = styled.div<{width, height, absTop, absLeft, background}>`
  position: absolute;
  width: ${(props) => props.width || 'inherit'};
  height: ${(props) => props.height || 'inherit'};
  top: ${(props) => props.absTop || '0'};
  left: ${(props) => props.absLeft || '0'};

  background: ${(props) => `url(${props.background})` || 'none'};
`

const LightBgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 32px;
`

const CardMainBg: React.FC<CardMainBgProps> = ({imageBg, lightBg, stars}) => {
  return (
    <>
      <CardMainImageBg 
        width={imageBg.width}
        height={imageBg.height}
        absTop={imageBg.absTop}
        absLeft={imageBg.absLeft}
        background={imageBg.background}
      />
      <LightBgWrapper>
        <LightBg 
          width={lightBg.width}
          height={lightBg.height}
          absTop={lightBg.absTop}
          absLeft={lightBg.absLeft}
          background={lightBg.background}
          filter={lightBg.filter}
        />
      </LightBgWrapper>
      {
        stars ? (stars.map((star) => 
          <CustomeStar
            width={star.width}
            height={star.height}
            absTop={star.absTop}
            absLeft={star.absLeft}
            background={star.background}
            filter={star.filter}
            zIndex={star.zIndex}
          />)
        ) : null
      }
    </>
  )
}

export default CardMainBg
