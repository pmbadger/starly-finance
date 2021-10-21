import React from 'react'
import styled from 'styled-components'
import { Svg } from 'pancakeswap-uikit'
import {ImageProps} from 'config/constants/types'

const Star = styled.div<{ width, height, absTop, absLeft}>`
  position: absolute;
  width: ${(props) => props.width || 'inherit'};
  height: ${(props) => props.height || 'inherit'};
  top: ${(props) => props.absTop || '0'};
  left: ${(props) => props.absLeft || '0'};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -1;
`

const CustomStar: React.FC<ImageProps> = ({width, height, absTop, absLeft, background}) => {
  return (
    <Star width={width} height={height} absTop={absTop} absLeft={absLeft}>
      <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.2 10.5639L8.95463 17.8018L6.31697 11.9748L0.485107 9.33224L7.7279 8.09179L8.96835 0.848999L11.6158 6.67596L17.4379 9.31852L10.2 10.5639Z" fill={background}/>
      </Svg>
    </Star>
  )
}

export default CustomStar
