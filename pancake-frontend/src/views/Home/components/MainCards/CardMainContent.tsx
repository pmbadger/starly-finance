import React from 'react'
import styled from 'styled-components'
import { CardMainContentProps } from 'config/constants/types'
import { Button } from 'pancakeswap-uikit'

const ContentWrapper = styled.div`
  padding: 30px 32px;
  width: 100%;
  height: 100%;
  z-index: 3;
`

const TextLine = styled.div<{ maxWidth; marginBottom; fontFamily; fontWeight; fontSize; lineHeight; color }>`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.marginBottom || '0'};
  max-width: ${(props) => props.maxWidth || 'inherit'};
  font-family: ${(props) => props.fontFamily || 'inherit'};
  font-weight: ${(props) => props.fontWeight || 'inherit'};
  font-size: ${(props) => props.fontSize || 'inherit'};
  line-height: ${(props) => props.lineHeight || 'inherit'};
  color: ${(props) => props.color || 'inherit'};
  z-index: 3;
`

const CustomButton = styled.a`
  background: linear-gradient(260.3deg, #058fca -29.78%, #2e4bb5 118.84%);

  font-family: 'SF Pro Display';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.02em;
  color: #ffffff;
  z-index: 4;
`

const CardMainContent: React.FC<CardMainContentProps> = ({ textFirst, textSecond, textBtn, textLink, btnId }) => {
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
      <Button id={btnId} as={CustomButton} href={textLink}>
        {textBtn}
      </Button>
    </ContentWrapper>
  )
}

export default CardMainContent
