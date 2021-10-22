import React from 'react'
import styled from 'styled-components'
import { Svg } from 'pancakeswap-uikit'
import {ImageProps} from 'config/constants/types'

const Star = styled.div<{ width, height, absTop, absLeft, filter, zIndex}>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width || 'inherit'};
  height: ${(props) => props.height || 'inherit'};
  top: ${(props) => props.absTop || '0'};
  left: ${(props) => props.absLeft || '0'};
  filter: ${(props) => props.filter || 'none'};
  z-index: ${(props) => props.zIndex || '-1'};
`

const CustomStar: React.FC<ImageProps> = ({width, height, absTop, absLeft, background, filter, zIndex}) => {
  return (
    <Star width={width} height={height} absTop={absTop} absLeft={absLeft} filter={filter} zIndex={zIndex}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.2 10.5639L8.95463 17.8018L6.31697 11.9748L0.485107 9.33224L7.7279 8.09179L8.96835 0.848999L11.6158 6.67596L17.4379 9.31852L10.2 10.5639Z" fill={background}/>
      </Svg>
    </Star>
  )
}

export default CustomStar
