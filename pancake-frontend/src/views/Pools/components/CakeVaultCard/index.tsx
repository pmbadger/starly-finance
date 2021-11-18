import React from 'react'
import styled from 'styled-components'
import { Box, CardBody, Flex } from 'pancakeswap-uikit'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import { ConnectWalletBtnWithUnlockAndStar } from 'components/ConnectWalletButton'
import tokens from 'config/constants/tokens'
import { useCakeVault } from 'state/pools/hooks'
import { Pool } from 'state/types'
import CardFooter from '../PoolCard/CardFooter'
import StyledCardHeader from '../PoolCard/StyledCardHeader'
import VaultCardActions from './VaultCardActions'
import UnstakingFeeCountdownRow from './UnstakingFeeCountdownRow'
import RecentCakeProfitRow from './RecentCakeProfitRow'

const StyledCardBody = styled(CardBody)<{ isLoading: boolean }>`
  // min-height: ${({ isLoading }) => (isLoading ? '0' : '254px')};
  padding: 0;
`

const BtnsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 22px;
`

interface CakeVaultProps {
  pool: Pool
  showStakedOnly: boolean
}

const CakeVaultCard: React.FC<CakeVaultProps> = ({ pool, showStakedOnly }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const {
    userData: { userShares, isLoading: isVaultUserDataLoading },
    fees: { performanceFee },
  } = useCakeVault()

  const accountHasSharesStaked = userShares && userShares.gt(0)
  const isLoading = !pool.userData || isVaultUserDataLoading
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100

  if (showStakedOnly && !accountHasSharesStaked) {
    return null
  }

  return (
    <>
      <StyledCardHeader
        isStaking={accountHasSharesStaked}
        isAutoVault
        earningToken={tokens.cake}
        stakingToken={tokens.cake}
        pool={pool}
        performanceFee={performanceFeeAsDecimal}
      />
      <StyledCardBody isLoading={isLoading}>
        <Flex flexDirection="column">
          {account ? (
            <>
              <Box mt="24px">
                <RecentCakeProfitRow />
              </Box>
              <Box mt="8px">
                <UnstakingFeeCountdownRow />
              </Box>
              <VaultCardActions pool={pool} accountHasSharesStaked={accountHasSharesStaked} isLoading={isLoading} />
            </>
          ) : (
            <BtnsWrapper>
              <ConnectWalletBtnWithUnlockAndStar />
            </BtnsWrapper>
          )}
        </Flex>
      </StyledCardBody>
      <CardFooter pool={pool} account={account} />
    </>
  )
}

export default CakeVaultCard
