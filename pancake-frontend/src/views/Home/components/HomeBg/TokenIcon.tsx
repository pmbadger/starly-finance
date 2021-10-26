import React from 'react'
import styled from 'styled-components'
import { Svg } from 'pancakeswap-uikit'
import { ShapeProps } from 'config/constants/types'
import parse from 'html-react-parser'

const TokenIconWrapper = styled.div<{ width; height; absTop; absLeft; background; boxShadow }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width || 'inherit'};
  height: ${({ height }) => height || 'inherit'};
  top: ${({ absTop }) => absTop || '0'};
  left: ${({ absLeft }) => absLeft || '0'};
  background: ${({ background }) => background || 'inherit'};
  border-radius: 50%;
  box-shadow: ${({ boxShadow }) => boxShadow || 'none'};
  z-index: -2;

  &::before {
    content: '';
    position: absolute;
    width: ${({ width }) => width || 'inherit'};
    height: ${({ height }) => height || 'inherit'};
    border-radius: 50%;
    border: 1px solid #3659a2;
    z-index: -1;
  }
`

const TokenIcon: React.FC<ShapeProps> = ({ width, height, SVGBody, shapeWrapper, complexSVGBody }) => {
  return (
    <TokenIconWrapper
      width={shapeWrapper.width}
      height={shapeWrapper.height}
      absTop={shapeWrapper.absTop}
      absLeft={shapeWrapper.absLeft}
      background={shapeWrapper.background}
      boxShadow={shapeWrapper.boxShadow}
    >
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {complexSVGBody ? parse(complexSVGBody) : SVGBody.map((path) => <path d={path.pathD} fill={path.pathFill} />)}
      </Svg>
    </TokenIconWrapper>
  )
}

export default TokenIcon
