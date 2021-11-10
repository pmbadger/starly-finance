/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
import styled from 'styled-components'
import { coinXXXL } from 'config/constants/views/home'
import { light } from 'pancakeswap-uikit'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

SwiperCore.use([Navigation])

const SwiperWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 272px;
  margin: 50px 0;
  height: 140px;
  background: linear-gradient(88.7deg, #ffdf6d 0%, #7320b4 100%);
  border-radius: 32px;
  overflow: visible;
`

const CoinBg = styled.div<{ width; height; absTop; absLeft; background; filter }>`
  position: absolute;
  width: ${(props) => props.width || 'inherit'};
  height: ${(props) => props.height || 'inherit'};
  top: ${(props) => props.absTop || '0'};
  left: ${(props) => props.absLeft || '0'};

  background: ${(props) => `url(${props.background})` || 'none'};
  background-size: cover;
  filter: ${(props) => props.filter || 'none'};
  z-index: 2;
`

const TextContentWraper = styled.div`
  display: flex;
  max-width: 790px;
`

const TextContentSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const TextLine = styled.div<{ fontFamily; fontWeight; fontSize; lineHeight; letterSpacing; color }>`
  display: flex;
  align-items: center;
  margin-left: 53px;
  margin-right: 62px;
  width: max-content;
  height: 38px;
  font-family: ${(props) => props.fontFamily || 'inherit'};
  font-weight: ${(props) => props.fontWeight || 'inherit'};
  font-size: ${(props) => props.fontSize || 'inherit'};
  line-height: ${(props) => props.lineHeight || 'inherit'};
  letter-spacing: ${(props) => props.letterSpacing || 'inherit'};
  color: ${(props) => props.color || 'inherit'};
`

const TextBorder = styled.div`
  width: 0px;
  height: 70px;

  mix-blend-mode: overlay;
  opacity: 0.5;
  border: 1px solid #ffffff;
`

const HomeSwiper: React.FC = () => {
  return (
    <Swiper navigation className="mySwiper">
      <SwiperSlide>
        <SwiperWrapper>
          <CoinBg
            width={coinXXXL.width}
            height={coinXXXL.height}
            absTop={coinXXXL.absTop}
            absLeft={coinXXXL.absLeft}
            background={coinXXXL.background}
            filter={coinXXXL.filter}
          />
          <TextContentWraper>
            <TextContentSection>
              <TextLine
                fontFamily="SF Pro Display"
                fontWeight="bold"
                fontSize="32px"
                lineHeight="38px"
                letterSpacing="0.02em"
                color="#FFFFFF"
              >
                Lucrative ETH Launchpools
              </TextLine>
              <TextLine
                fontFamily="HelveticaNeueCyr"
                fontWeight="normal"
                fontSize="22px"
                lineHeight="22px"
                letterSpacing="0.02em"
                color="#FFFFFF"
              >
                Wide horizons for STLY hodlers
              </TextLine>
            </TextContentSection>
            <TextBorder />
            <TextContentSection>
              <TextLine
                fontFamily="HelveticaNeueCyr"
                fontWeight="normal"
                fontSize="18px"
                lineHeight="18px"
                letterSpacing="0.02em"
                color="#FFFFFF"
              >
                Max stake per user:
              </TextLine>
              <TextLine
                fontFamily="SF Pro Display"
                fontWeight="bold"
                fontSize="18px"
                lineHeight="21px"
                letterSpacing="0.02em"
                color="#F08BB9"
              >
                {`500 STLY\u00a0\u00a0\u00a0\u00a0\u00a0|\u00a0\u00a0\u00a0\u00a0\u00a020 STLY`}
              </TextLine>
            </TextContentSection>
          </TextContentWraper>
        </SwiperWrapper>
      </SwiperSlide>
      <SwiperSlide>
        <SwiperWrapper>
          <CoinBg
            width={coinXXXL.width}
            height={coinXXXL.height}
            absTop={coinXXXL.absTop}
            absLeft={coinXXXL.absLeft}
            background={coinXXXL.background}
            filter={coinXXXL.filter}
          />
          <TextContentWraper>
            <TextContentSection>
              <TextLine
                fontFamily="SF Pro Display"
                fontWeight="bold"
                fontSize="32px"
                lineHeight="38px"
                letterSpacing="0.02em"
                color="#FFFFFF"
              >
                Lucrative ETH Launchpools
              </TextLine>
              <TextLine
                fontFamily="HelveticaNeueCyr"
                fontWeight="normal"
                fontSize="22px"
                lineHeight="22px"
                letterSpacing="0.02em"
                color="#FFFFFF"
              >
                Wide horizons for STRL hodlers
              </TextLine>
            </TextContentSection>
            <TextBorder />
            <TextContentSection>
              <TextLine
                fontFamily="HelveticaNeueCyr"
                fontWeight="normal"
                fontSize="18px"
                lineHeight="18px"
                letterSpacing="0.02em"
                color="#FFFFFF"
              >
                Max stake per user:
              </TextLine>
              <TextLine
                fontFamily="SF Pro Display"
                fontWeight="bold"
                fontSize="18px"
                lineHeight="21px"
                letterSpacing="0.02em"
                color="#F08BB9"
              >
                {`500 STRL\u00a0\u00a0\u00a0\u00a0\u00a0|\u00a0\u00a0\u00a0\u00a0\u00a020 STRL`}
              </TextLine>
            </TextContentSection>
          </TextContentWraper>
        </SwiperWrapper>
      </SwiperSlide>
    </Swiper>
  )
}

export default HomeSwiper
