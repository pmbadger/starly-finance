import BigNumber from 'bignumber.js'
import React from 'react'
import { CardBody, Flex, CardRibbon } from 'pancakeswap-uikit'
import { ConnectWalletBtnWithUnlockAndStar } from 'components/ConnectWalletButton'
import { useTranslation } from 'contexts/Localization'
import { BIG_ZERO } from 'utils/bigNumber'
import { Pool } from 'state/types'
import styled from 'styled-components'
import CardFooter from './CardFooter'
import StyledCardHeader from './StyledCardHeader'
import CardActions from './CardActions'

const BtnsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 22px;
`

const PoolCard: React.FC<{ pool: Pool; account: string }> = ({ pool, account }) => {
  const { sousId, stakingToken, earningToken, isFinished, userData } = pool
  const { t } = useTranslation()
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const accountHasStakedBalance = stakedBalance.gt(0)

  return (
    // <StyledCard
    //   isFinished={isFinished && sousId !== 0}
    //   ribbon={isFinished && <CardRibbon variantColor="textDisabled" text={t('Finished')} />}
    // >
    <>
      <StyledCardHeader
        isStaking={accountHasStakedBalance}
        earningToken={earningToken}
        stakingToken={stakingToken}
        isFinished={isFinished && sousId !== 0}
        pool={pool}
      />
      <CardBody style={{ padding: 0 }}>
        <Flex flexDirection="column">
          {account ? (
            <CardActions pool={pool} stakedBalance={stakedBalance} />
          ) : (
            <BtnsWrapper>
              <ConnectWalletBtnWithUnlockAndStar id={`btn118-unlock-wallet-${pool.sousId}`} />
            </BtnsWrapper>
          )}
        </Flex>
      </CardBody>
      <CardFooter pool={pool} account={account} />
    </>
    // </StyledCard>
  )
}

export default PoolCard
