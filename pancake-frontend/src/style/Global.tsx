import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from 'pancakeswap-uikit/dist/theme'
import fonts from './fonts'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Futura PT';
    src: url(${fonts.FuturaPT}) format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: auto;
  }
  @font-face {
    font-family: 'HelveticaNeueCyr';
    src: url(${fonts.HelveticaNeueCyr}) format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: auto;
  }
  @font-face {
    font-family: 'SF Pro Display';
    src: url(${fonts.SFProDisplay}) format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: auto;
  }
  * {
    font-family: 'Futura PT', sans-serif;
    --swiper-navigation-size: 20px;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
  .swiper-button-next {
    right: 25px !important;
  } 
  .swiper-button-prev {
    left: 25px !important;
  }
`

export default GlobalStyle
