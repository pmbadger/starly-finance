import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from 'pancakeswap-uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};
    overflow-x: hidden;

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
