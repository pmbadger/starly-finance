import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { AutoRenewIcon, Button, Text } from 'pancakeswap-uikit'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { useMasterchef } from 'hooks/useContract'
import { harvestFarm } from 'utils/calls'
import useFarmsWithBalance from 'views/Home/hooks/useFarmsWithBalance'
import { useWeb3React } from '@web3-react/core'

const HarvestButton = styled(Button)`
  background: #255aba33;
  width: 140px;
  height: 54px;
  border-radius: 12px;
  font-family: 'Futura PT';
  color: #82c8f4;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  margin-bottom: 20px;
`

const HarvestAllFarms = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()
  const { farmsWithStakedBalance } = useFarmsWithBalance()
  const { account } = useWeb3React()

  const masterChefContract = useMasterchef()

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    // eslint-disable-next-line no-restricted-syntax
    for (const farmWithBalance of farmsWithStakedBalance) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await harvestFarm(masterChefContract, farmWithBalance.pid)
        toastSuccess(
          `${t('Harvested')}!`,
          t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'STLY' }),
        )
      } catch (error) {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      }
    }
    setPendingTx(false)
  }, [farmsWithStakedBalance, masterChefContract, toastSuccess, toastError, t])

  return (
    <HarvestButton
      width={['100%', null, null, 'auto']}
      id="harvest-all"
      isLoading={pendingTx}
      endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
      disabled={pendingTx || farmsWithStakedBalance.length === 0 || !account}
      onClick={harvestAllFarms}
    >
      <Text color="secondary" bold>
        {pendingTx ? t('Harvesting') : t('Harvest All')}
      </Text>
    </HarvestButton>
  )
}

export default HarvestAllFarms
