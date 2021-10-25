import React, { useEffect, useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { useMatchBreakpoints, Text, HelpIcon, Button } from 'pancakeswap-uikit'
import { useTranslation } from 'contexts/Localization'
import useDelayedUnmount from 'hooks/useDelayedUnmount'
import { useFarmUser } from 'state/farms/hooks'

import Apr, { AprProps } from './Apr'
import Farm, { FarmProps } from './Farm'
import Earned, { EarnedProps } from './Earned'
import Details from './Details'
import Multiplier, { MultiplierProps } from './Multiplier'
import Liquidity, { LiquidityProps } from './Liquidity'
import ActionPanel from './Actions/ActionPanel'
import CellLayout from './CellLayout'
import { DesktopColumnSchema, MobileColumnSchema } from '../types'

export interface RowProps {
  apr: AprProps
  farm: FarmProps
  apy: any
  earned: EarnedProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
}

interface RowPropsWithLoading extends RowProps {
  userDataReady: boolean
}

const cells = {
  apr: Apr,
  farm: Farm,
  earned: Earned,
  details: Details,
  multiplier: Multiplier,
  liquidity: Liquidity,
}

const CellInner = styled.div`
  padding-bottom: 25px;
  padding-top: 20px;
  display: flex;
  width: 100%;
  align-items: center;
  padding-right: 8px;
`

const expandAnimation = keyframes`
  from {
    background: transparent;
    border-bottom-left-radius: 32px;
    border-bottom-right-radius: 32px;
  }
  to {
    background: #152340;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`

const collapseAnimation = keyframes`
  from {
    background: #152340;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  to {
    background: transparent;
    border-bottom-left-radius: 32px;
    border-bottom-right-radius: 32px;
  }
`

const StyledRow = styled.div<{ actionPanelExpanded: boolean }>`
  cursor: pointer;
  border-bottom: 2px solid ${({ theme }) => theme.colors.cardBorder};
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  background: ${({ actionPanelExpanded }) => (actionPanelExpanded ? '#152340' : 'transparent')};
  animation: ${({ actionPanelExpanded }) =>
    actionPanelExpanded
      ? css`
          ${expandAnimation} 200ms ease forwards
        `
      : css`
          ${collapseAnimation} 1500ms ease forwards
        `};

  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #82c8f41a;
  background-color: tarnsparent;
  display: flex;
  justify-content: space-between;
  width: 100%;
  &:last-child {
    border-bottom: none;
  }
`

const EarnedMobileCell = styled.div`
  padding: 16px 0 24px 16px;
`

const AprMobileCell = styled.div`
  padding-top: 16px;
  padding-bottom: 24px;
`

const FarmMobileCell = styled.div`
  padding-top: 24px;
`

const ApyTmpText = styled(Text)`
  font-family: 'FuturaPT-Bold';
  margin-right: 8px;
`

const StyledActionsTr = styled.div`
  background: transparent;
  margin-top: -10px !important;
  background: #152340;
  width: 100%;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
`

const HotButton = styled(Button)`
  width: 48px;
  height: 30px;
  margin-top: 31px;
  margin-left: 20px;

  background: #d33b3b;
  border-radius: 50px;

  font-family: 'FuturaPT-Medium';
  font-style: normal;
  font-weight: 450;
  font-size: 11px;
  line-height: 14px;
`

const Row: React.FunctionComponent<RowPropsWithLoading> = (props) => {
  const { details, userDataReady } = props
  const hasStakedAmount = !!useFarmUser(details.pid).stakedBalance.toNumber()
  const [actionPanelExpanded, setActionPanelExpanded] = useState(hasStakedAmount)
  const shouldRenderChild = useDelayedUnmount(actionPanelExpanded, 300)
  const { t } = useTranslation()

  const toggleActionPanel = () => {
    setActionPanelExpanded(!actionPanelExpanded)
  }

  useEffect(() => {
    setActionPanelExpanded(hasStakedAmount)
  }, [hasStakedAmount])

  const { isXl, isXs } = useMatchBreakpoints()

  const isMobile = !isXl
  const tableSchema = isMobile ? MobileColumnSchema : DesktopColumnSchema
  const columnNames = tableSchema.map((column) => column.name)

  const handleRenderRow = () => {
    if (!isXs) {
      return (
        <StyledRow onClick={toggleActionPanel} actionPanelExpanded={actionPanelExpanded}>
          <CellLayout>
            <HotButton>{t('Hot')}</HotButton>
          </CellLayout>
          {Object.keys(props).map((key) => {
            const columnIndex = columnNames.indexOf(key)
            if (columnIndex === -1) {
              return null
            }
            switch (key) {
              case 'details':
                return (
                  <div key={key}>
                    <CellInner>
                      <CellLayout>
                        <Details actionPanelToggled={actionPanelExpanded} />
                      </CellLayout>
                    </CellInner>
                  </div>
                )
              case 'apy':
                return (
                  <div key={key}>
                    <CellInner>
                      <CellLayout label={t('APY:')}>
                        <ApyTmpText>{props.apy.value}</ApyTmpText>
                        <HelpIcon color="textSubtle" />
                      </CellLayout>
                    </CellInner>
                  </div>
                )
              default:
                return (
                  <div key={key}>
                    <CellInner>
                      <CellLayout label={t(tableSchema[columnIndex].label)}>
                        {React.createElement(cells[key], { ...props[key], userDataReady })}
                      </CellLayout>
                    </CellInner>
                  </div>
                )
            }
          })}
        </StyledRow>
      )
    }

    return (
      <StyledRow onClick={toggleActionPanel} actionPanelExpanded={actionPanelExpanded}>
        <div>
          <tr>
            <FarmMobileCell>
              <CellLayout>
                <Farm {...props.farm} />
              </CellLayout>
            </FarmMobileCell>
          </tr>
          <tr>
            <EarnedMobileCell>
              <CellLayout label={t('Earned')}>
                <Earned {...props.earned} userDataReady={userDataReady} />
              </CellLayout>
            </EarnedMobileCell>
            <AprMobileCell>
              <CellLayout label={t('APR')}>
                <Apr {...props.apr} hideButton />
              </CellLayout>
            </AprMobileCell>
          </tr>
        </div>
        <div>
          <CellInner>
            <CellLayout>
              <Details actionPanelToggled={actionPanelExpanded} />
            </CellLayout>
          </CellInner>
        </div>
      </StyledRow>
    )
  }

  return (
    <>
      {handleRenderRow()}
      {shouldRenderChild && (
        <StyledActionsTr>
          <ActionPanel {...props} expanded={actionPanelExpanded} />
        </StyledActionsTr>
      )}
    </>
  )
}

export default Row
