import React from 'react'
import styled from 'styled-components'
import { Svg } from 'pancakeswap-uikit'
import { ShapeProps } from 'config/constants/types'
import parse from 'html-react-parser';

const Shape = styled.div<{ width, height, absTop, absLeft, background, boxShadow}>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width || 'inherit'};
  height: ${(props) => props.height || 'inherit'};
  top: ${(props) => props.absTop || '0'};
  left: ${(props) => props.absLeft || '0'};
  background: ${(props) => props.background || 'inherit'};
  border-radius: 50%;
  box-shadow: ${(props) => props.boxShadow || 'none'};
  z-index: -2;

  &::before {
    content: '';
    position: absolute;
    width: ${(props) => props.width || 'inherit'};
    height: ${(props) => props.height || 'inherit'};
    border-radius: 50%;
    border: 1px solid #3659A23D;
    z-index: -1;
  }
`

const ShapeBorder = styled.div<{width, height, absTop, absLeft, background}>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width || 'inherit'};
  height: ${(props) => props.height || 'inherit'};
  top: ${(props) => props.absTop || '0'};
  left: ${(props) => props.absLeft || '0'};
  background: ${(props) => props.background || 'inherit'};
  border-radius: 50%;
  z-index: -1;
`


const ShapeBg: React.FC<ShapeProps> = ({width, height, SVGBody, shapeWrapper, complexSVGBody}) => {
  return (
    <Shape
      width={shapeWrapper.width}   
      height={shapeWrapper.height}
      absTop={shapeWrapper.absTop}
      absLeft={shapeWrapper.absLeft}
      background={shapeWrapper.background}
      boxShadow={shapeWrapper.boxShadow}
    >
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill='none' xmlns='http://www.w3.org/2000/svg'>
        {
          complexSVGBody ? (
            parse(complexSVGBody)
          ) : (
            SVGBody.map((path) => <path d={path.pathD} fill={path.pathFill}/>)
          )
        }
      </Svg>
    </Shape>
  )
}

export default ShapeBg
