import React from 'react'
import styled from 'styled-components'
import { CardMainContentProps } from 'config/constants/types'
import { Button } from 'pancakeswap-uikit'
import CustomeStar from '../HomeBg/CustomStar'

const ContentWrapper = styled.div`
  margin-top: -255px;
  padding: 30px 32px;
  width: 100%;
  height: 100%;
  z-index: 3;
`

const TextLine = styled.div<{maxWidth, marginBottom, fontFamily, fontWeight, fontSize, lineHeight, color}>`
  display: flex;
  align-items: center;
  /* margin-left: 53px;
  margin-right: 62px; */
  margin-bottom: ${(props) => props.marginBottom || '0'};
  max-width: ${(props) => props.maxWidth || 'inherit'};
  font-family: ${(props) => props.fontFamily || 'inherit'};
  font-weight: ${(props) => props.fontWeight || 'inherit'};
  font-size: ${(props) => props.fontSize || 'inherit'};
  line-height: ${(props) => props.lineHeight || 'inherit'};
  color: ${(props) => props.color || 'inherit'};
`

const CustomButton = styled(Button)`
  background: linear-gradient(260.3deg, #058FCA -29.78%, #2E4BB5 118.84%);

  font-family: 'SF Pro Display';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.02em;
  color: #FFFFFF;
`

const CardMainContent: React.FC<CardMainContentProps> = ({textFirst, textSecond, textBtn}) => {
  return (
    <ContentWrapper>
      <TextLine
        maxWidth={textFirst.maxWidth}
        marginBottom={textFirst.marginBottom}
        fontFamily={textFirst.fontFamily}
        fontWeight={textFirst.fontWeight}
        fontSize={textFirst.fontSize}
        lineHeight={textFirst.lineHeight}
        color={textFirst.color}
      >
        {textFirst.text}
      </TextLine>
      <TextLine
        maxWidth={textSecond.maxWidth}
        marginBottom={textSecond.marginBottom}
        fontFamily={textSecond.fontFamily}
        fontWeight={textSecond.fontWeight}
        fontSize={textSecond.fontSize}
        lineHeight={textSecond.lineHeight}
        color={textSecond.color}
      >
        {textSecond.text}
      </TextLine>
      <CustomButton onClick={() => console.log('click')}>
        {textBtn}
      </CustomButton>
    </ContentWrapper>
  )
}

export default CardMainContent
