import React from 'react'
import styled from 'styled-components'
import {LaunchpoolTextFirst, LaunchpoolTextSecond} from 'config/constants/views/home'
import LaunchpoolBg from './LaunchpoolBg'
import WalletCard from './WalletCard'

const Launchpool = styled.div`
  margin-bottom: 119px;
  height: 195px;
  background: rgba(21, 35, 64, 0.8);
  backdrop-filter: blur(4px);
  border-radius: 24px;
  border: 1px solid rgba(60, 143, 160, 0.24);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.12);
`

const TextLine = styled.div<{maxWidth, marginBottom, fontFamily, fontWeight, fontSize, lineHeight, color}>`
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

const LaunchpoolContent = styled.div`
  margin: -156px 0 0 115px;
` 

const LaunchpoolSection: React.FC = () => {

  return (
    <Launchpool>
      <LaunchpoolBg />
      <LaunchpoolContent>
        <TextLine
          maxWidth={LaunchpoolTextFirst.maxWidth}
          marginBottom={LaunchpoolTextFirst.marginBottom}
          fontFamily={LaunchpoolTextFirst.fontFamily}
          fontWeight={LaunchpoolTextFirst.fontWeight}
          fontSize={LaunchpoolTextFirst.fontSize}
          lineHeight={LaunchpoolTextFirst.lineHeight}
          color={LaunchpoolTextFirst.color}
        >
          {LaunchpoolTextFirst.text}
        </TextLine>
        <TextLine
          maxWidth={LaunchpoolTextSecond.maxWidth}
          marginBottom={LaunchpoolTextSecond.marginBottom}
          fontFamily={LaunchpoolTextSecond.fontFamily}
          fontWeight={LaunchpoolTextSecond.fontWeight}
          fontSize={LaunchpoolTextSecond.fontSize}
          lineHeight={LaunchpoolTextSecond.lineHeight}
          color={LaunchpoolTextSecond.color}
        >
          {LaunchpoolTextSecond.text}
        </TextLine>
        <WalletCard />
      </LaunchpoolContent>
    </Launchpool>
  )
}

export default LaunchpoolSection
