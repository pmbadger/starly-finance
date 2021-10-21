import React from 'react'
import styled from 'styled-components'
import { Svg } from 'pancakeswap-uikit'
import { CircleProps } from 'config/constants/types'
import parse from 'html-react-parser';

// const CircleWrapper = styled.div<{diameter, absTop, absLeft, linearGradient}>`
//   position: absolute;
//   width: ${(props) => props.diameter || 'inherit'};
//   height: ${(props) => props.diameter || 'inherit'};
//   top: ${(props) => props.absTop || '0'};
//   left: ${(props) => props.absLeft || '0'};
//   border-radius: 50%;
//   z-index: -2;

//   &::before {
//     content: '';
//     position: absolute;
//     width: ${(props) => props.diameter || 'inherit'};
//     height: ${(props) => props.diameter || 'inherit'};
//     border-radius: 50%;
//     border: 1px solid #3659A23D;
//     z-index: -1;
//   }
// `

const CircleWrapper = styled.div<{diameter, absTop, absLeft}>`
  position: absolute;
  width: ${(props) => props.diameter || 'inherit'};
  height: ${(props) => props.diameter || 'inherit'};
  top: ${(props) => props.absTop || '0'};
  left: ${(props) => props.absLeft || '0'};
  z-index: -3;
`

const CircleBg: React.FC<CircleProps> = ({diameter, absTop, absLeft, SVGBody}) => {
  return (
    <CircleWrapper
      diameter={diameter}
      absTop={absTop}
      absLeft={absLeft}
    >
      <svg width={diameter} height={diameter} viewBox={`0 0 ${diameter} ${diameter}`} fill='none' xmlns="http://www.w3.org/2000/svg">
        {parse(SVGBody)}
      </svg>
    </CircleWrapper>
  )
}

export default CircleBg
