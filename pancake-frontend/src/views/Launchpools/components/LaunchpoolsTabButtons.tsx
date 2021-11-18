import React from 'react'
import styled from 'styled-components'
import { useLocation, Link, useRouteMatch } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from 'pancakeswap-uikit'
import { useTranslation } from 'contexts/Localization'

const LaunchpoolsTabButtons = () => {
  const { url } = useRouteMatch()
  const location = useLocation()
  const { t } = useTranslation()

  let activeIndex
  switch (location.pathname) {
    case '/launchpools':
      activeIndex = 0
      break
    case '/launchpools/archived':
      activeIndex = 1
      break
    default:
      activeIndex = 0
      break
  }

  return (
    <Wrapper>
      <ButtonMenu activeIndex={activeIndex} scale="sm" variant="subtle">
        <ButtonMenuItem as={Link} to={`${url}`}>
          {t('Live')}
        </ButtonMenuItem>
        <ButtonMenuItem as={Link} to={`${url}/archived`}>
          {t('Archive')}
        </ButtonMenuItem>
      </ButtonMenu>
    </Wrapper>
  )
}

export default LaunchpoolsTabButtons

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  a {
    padding: 0 44px;
    font-weight: normal;
    letter-spacing: 0.02em;
    line-height: 21px;
  }
`
