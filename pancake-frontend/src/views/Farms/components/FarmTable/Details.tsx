import React from 'react'
import styled from 'styled-components'
import { ChevronDownIcon, useMatchBreakpoints } from 'pancakeswap-uikit'
import { useTranslation } from 'contexts/Localization'

interface DetailsProps {
  actionPanelToggled: boolean
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-right: 8px;
  color: white;
  font-family: 'Futura PT';
  font-style: normal;
  font-weight: 450;
  font-size: 16px;
  line-height: 21px;
  padding-top: 14px;
  margin-right: 10px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 0px;
  }

  svg {
    path {
      fill: white !important;
    }
  }
`

const ArrowIcon = styled(ChevronDownIcon)<{ toggled: boolean }>`
  transform: ${({ toggled }) => (toggled ? 'rotate(180deg)' : 'rotate(0)')};
  height: 20px;
`

const Details: React.FC<DetailsProps> = ({ actionPanelToggled }) => {
  const { t } = useTranslation()
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  return (
    <Container>
      {!isMobile && t('Details')}
      <ArrowIcon color="white" toggled={actionPanelToggled} />
    </Container>
  )
}

export default Details
