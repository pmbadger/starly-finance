import React, { useState } from 'react'
import { Button, Skeleton } from 'pancakeswap-uikit'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { usePriceCakeBusd } from 'state/farms/hooks'
import useToast from 'hooks/useToast'
import { useTranslation } from 'contexts/Localization'
import useHarvestFarm from '../../../hooks/useHarvestFarm'

interface HarvestActionProps extends FarmWithStakedValue {
  userDataReady: boolean
}

const HarvestAction: React.FunctionComponent<HarvestActionProps> = ({ pid, userData, userDataReady }) => {
  const { toastSuccess, toastError } = useToast()
  const earningsBigNumber = new BigNumber(userData.earnings)
  const cakePrice = usePriceCakeBusd()
  let earnings = BIG_ZERO
  let earningsBusd = 0
  let displayBalance = userDataReady ? earnings.toLocaleString() : <Skeleton width={60} />

  // If user didn't connect wallet default balance will be 0
  if (!earningsBigNumber.isZero()) {
    earnings = getBalanceAmount(earningsBigNumber)
    earningsBusd = earnings.multipliedBy(cakePrice).toNumber()
    displayBalance = earnings.toFixed(3, BigNumber.ROUND_DOWN)
  }

  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvestFarm(pid)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  const StyledButton = styled(Button)`
    width: 113px;
    height: 45px;
    background: linear-gradient(260.3deg, #058fca -29.78%, #2e4bb5 118.84%);
    color: white;
    font-family: 'Futura PT';
    padding: 12px 32px;
    font-weight: 450;
    font-size: 16px;
    line-height: 21px;
    border-radius: 12px;

    &:disabled,
    &[disabled] {
      background: #151b2d;
      color: #82c8f4;
    }
  `

  return (
    <StyledButton
      disabled={earnings.eq(0) || pendingTx || !userDataReady || !account}
      onClick={async () => {
        setPendingTx(true)
        try {
          await onReward()
          toastSuccess(
            `${t('Harvested')}!`,
            t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'STLY' }),
          )
        } catch (e) {
          toastError(
            t('Error'),
            t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
          )
          console.error(e)
        } finally {
          setPendingTx(false)
        }
        dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
      }}
      ml="4px"
    >
      {t('Harvest')}
    </StyledButton>
  )
}

export default HarvestAction
