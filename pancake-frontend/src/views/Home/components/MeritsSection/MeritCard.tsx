import React from 'react'
import styled from 'styled-components'
import { MeritCardProps } from 'config/constants/types'

const MeritCardWrapper = styled.div`
  position: relative;
  width: 377px;
  height: 328px;
  background: rgba(21, 35, 64, 0.8);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(60, 143, 160, 0.24);
  border-radius: 24px;
`

const Light = styled.div`
  position: absolute;
  width: 263px;
  height: 154px;
  left: 57px;
  top: -65px;

  background: rgba(20, 120, 195, 0.32);
  mix-blend-mode: normal;
  filter: blur(128px);
`

const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Image = styled.div<{image}>`
  width: 358px;
  height: 202px;
  margin: 7px 9px;

  background: ${({image}) => `url(${image})` || 'none'};
  mix-blend-mode: screen;
`

const Text = styled.p<{maxWidth, marginBottom, fontFamily, fontWeight, fontSize, lineHeight, color}>`
  text-align: center;
  max-width: ${({maxWidth}) => maxWidth || 'inherit'};
  margin-bottom: ${({marginBottom}) => marginBottom || '0'};
  font-family: ${({fontFamily}) => fontFamily || 'inherit'};
  font-weight: ${({fontWeight}) => fontWeight || 'inherit'};
  font-size: ${({fontSize}) => fontSize || 'inherit'};
  line-height: ${({lineHeight}) => lineHeight || 'inherit'};
  color: ${({color}) => color || 'inherit'};
`

const MeritCard: React.FC<MeritCardProps> = ({ image, title, text }) => {
  return (
    <MeritCardWrapper>
      <Light/>
      <CardContentWrapper>
        <Image image={image}/>
        <Text
          maxWidth={title.maxWidth}
          marginBottom={title.marginBottom}
          fontFamily={title.fontFamily}
          fontWeight={title.fontWeight}
          fontSize={title.fontSize}
          lineHeight={title.lineHeight}
          color={title.color}
        >
          {title.text}
        </Text>
        <Text
          maxWidth={text.maxWidth}
          marginBottom={text.marginBottom}
          fontFamily={text.fontFamily}
          fontWeight={text.fontWeight}
          fontSize={text.fontSize}
          lineHeight={text.lineHeight}
          color={text.color}
        >
          {text.text}
        </Text>
      </CardContentWrapper>
    </MeritCardWrapper>
  )
}

export default MeritCard
