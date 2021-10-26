import React from 'react'
import styled from 'styled-components'
import { shapes, circles, follinStars, lights, stars } from 'config/constants/views/home'
import Images from 'config/constants/views/images'
import TokenIcon from './TokenIcon'
import CircleBg from './CircleBg'
import CustomeStar from './CustomStar'

const SpaceBg = styled.div`
  position: fixed;
  height: 827px;
  left: 227px;
  top: 0px;
  z-index: -3;

  mix-blend-mode: screen;
`

const FollingStarBg = styled.div<{ width; height; absTop; absLeft; background }>`
  position: fixed;
  width: ${(props) => props.width || 'inherit'};
  height: ${(props) => props.height || 'inherit'};
  top: ${(props) => props.absTop || '0'};
  left: ${(props) => props.absLeft || '0'};

  background: ${(props) => `url(${props.background})` || 'none'};
  mix-blend-mode: lighten;
`

const HomeBg = () => {
  return (
    <>
      <SpaceBg />
      {shapes.map((shape) => (
        <TokenIcon
          key={shape.id}
          id={shape.id}
          width={shape.width}
          height={shape.height}
          shapeWrapper={shape.shapeWrapper}
          SVGBody={shape.SVGBody}
          complexSVGBody={shape.complexSVGBody}
        />
      ))}
      {circles.map((circle) => (
        <CircleBg
          key={circle.id}
          id={circle.id}
          diameter={circle.diameter}
          absTop={circle.absTop}
          absLeft={circle.absLeft}
          SVGBody={circle.SVGBody}
        />
      ))}
      {follinStars.map((star) => (
        <FollingStarBg
          key={star.id}
          id={star.id}
          width={star.width}
          height={star.height}
          absTop={star.absTop}
          absLeft={star.absLeft}
          background={star.background}
        />
      ))}
      {stars.map((star) => (
        <CustomeStar
          key={star.id}
          width={star.width}
          height={star.height}
          absTop={star.absTop}
          absLeft={star.absLeft}
          background={star.background}
        />
      ))}
    </>
  )
}

export default HomeBg
