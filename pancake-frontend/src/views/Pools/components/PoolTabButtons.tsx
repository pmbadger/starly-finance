import React from 'react'
import { useRouteMatch, Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem, Toggle, Text } from 'pancakeswap-uikit'
import { useTranslation } from 'contexts/Localization'

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 6.5vw;
  margin-top: 5px;
  margin-right: 7vw;
  margin-bottom: 20px;

  ${Text} {
    margin-left: 13px;
    font-family: 'Futura PT';
    color: #82c8f4;
    font-size: 14px;
    line-height: 18px;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  display: flex;
  width: 80%;
  justify-content: space-between;
  max-width: 1193px;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    > div {
      padding: 0;
    }
  }
`

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

const PoolTabButtons = ({ stakedOnly, setStakedOnly, hasStakeInFinishedPools }) => {
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

  const liveOrFinishedSwitch = (
    <Wrapper>
      <ButtonMenu activeIndex={activeIndex} scale="sm" variant="subtle">
        <ButtonMenuItem as={Link} to={`${url}`}>
          {t('Live')}
        </ButtonMenuItem>
        {/* <NotificationDot show={hasStakeInFinishedPools}> */}
        <ButtonMenuItem as={Link} to={`${url}/archived`}>
          {t('Archive')}
        </ButtonMenuItem>
        {/* </NotificationDot> */}
      </ButtonMenu>
    </Wrapper>
  )

  const stakedOnlySwitch = (
    <ToggleWrapper>
      <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="lg" />
      <Text> {t('Staked only')}</Text>
    </ToggleWrapper>
  )

  return (
    <ViewControls>
      {liveOrFinishedSwitch}
      {stakedOnlySwitch}
    </ViewControls>
  )
}

export default PoolTabButtons
