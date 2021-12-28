import React from 'react'
import styled from 'styled-components'
import { Card } from 'pancakeswap-uikit'

export const BodyWrapper = styled(Card)`
  border-radius: 32px;
  max-width: 1192px;
  width: 80%;
  z-index: 1;
  background: radial-gradient(68.65% 68.65% at 50% 48.28%, rgb(125 201 255 / 10%) 0%, rgb(23 44 104 / 35%) 100%);
  border: 1px solid rgba(130, 200, 244, 0.1);
  backdrop-filter: blur(5px) brightness(0.5);

  div {
    background: transparent;
  }
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
