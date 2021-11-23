import React from 'react'
import styled from 'styled-components'
import { useLocation, Link, useRouteMatch } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, NotificationDot } from 'pancakeswap-uikit'
import { useTranslation } from 'contexts/Localization'

interface FarmTabButtonsProps {
  hasStakeInFinishedFarms: boolean
}

const FarmTabButtons: React.FC<FarmTabButtonsProps> = ({ hasStakeInFinishedFarms }) => {
  const { url } = useRouteMatch()
  const location = useLocation()
  const { t } = useTranslation()

  let activeIndex
  switch (location.pathname) {
    case '/farms':
      activeIndex = 0
      break
    case '/farms/archived':
      activeIndex = 1
      break
    default:
      activeIndex = 0
      break
  }

  return (
    <Wrapper>
      <ButtonMenu activeIndex={activeIndex} scale="sm" variant="subtle">
        <ButtonMenuItem id="btn91-live-tab" as={Link} to={`${url}`}>
          {t('Live')}
        </ButtonMenuItem>
        {/* <NotificationDot show={hasStakeInFinishedFarms}> */}
        <ButtonMenuItem id="btn92-archived-tab" as={Link} to={`${url}/archived`}>
          {t('Archive')}
        </ButtonMenuItem>
        {/* </NotificationDot> */}
      </ButtonMenu>
    </Wrapper>
  )
}

export default FarmTabButtons

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
