import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { BIG_ZERO } from 'utils/bigNumber'
import { Flex, Text, Box } from 'pancakeswap-uikit'
import { useTranslation } from 'contexts/Localization'
import { PoolCategory } from 'config/constants/types'
import { Pool } from 'state/types'
import ApprovalAction from './ApprovalAction'
import StakeActions from './StakeActions'
import HarvestActions from './HarvestActions'

const InlineText = styled(Text)`
  display: inline;
`

interface CardActionsProps {
  pool: Pool
  stakedBalance: BigNumber
}

const CardActions: React.FC<CardActionsProps> = ({ pool, stakedBalance }) => {
  const { sousId, stakingToken, earningToken, harvest, poolCategory, userData, earningTokenPrice } = pool
  // Pools using native ETH behave differently than pools using a token
  const isEthPool = poolCategory === PoolCategory.ETHEREUM
  const { t } = useTranslation()
  const allowance = userData?.allowance ? new BigNumber(userData.allowance) : BIG_ZERO
  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO
  const earnings = userData?.pendingReward ? new BigNumber(userData.pendingReward) : BIG_ZERO
  const needsApproval = !allowance.gt(0) && !isEthPool
  const isStaked = stakedBalance.gt(0)
  const isLoading = !userData

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        {harvest && (
          <>
            <Box display="inline" pt="22px">
              <InlineText color="textSubtle" bold fontSize="12px">
                {t('Earned')}
              </InlineText>
              <InlineText color="secondary" textTransform="uppercase" bold fontSize="12px">
                {` ${earningToken.symbol}`}
              </InlineText>
            </Box>
            <HarvestActions
              earnings={earnings}
              earningToken={earningToken}
              sousId={sousId}
              earningTokenPrice={earningTokenPrice}
              isEthPool={isEthPool}
              isLoading={isLoading}
            />
          </>
        )}
        <Box display="inline">
          {/* <InlineText color={isStaked ? 'secondary' : 'textSubtle'} textTransform="uppercase" bold fontSize="12px"> */}
          {/*  {isStaked ? stakingToken.symbol : t('Stake')}{' '} */}
          {/* </InlineText> */}
          <InlineText color={isStaked ? 'textSubtle' : 'secondary'} bold fontSize="12px">
            {isStaked ? `Staked ${stakingToken.symbol}` : ''}
          </InlineText>
        </Box>
        {needsApproval ? (
          <ApprovalAction pool={pool} isLoading={isLoading} />
        ) : (
          <StakeActions
            isLoading={isLoading}
            pool={pool}
            stakingTokenBalance={stakingTokenBalance}
            stakedBalance={stakedBalance}
            isEthPool={isEthPool}
            isStaked={isStaked}
          />
        )}
      </Flex>
    </Flex>
  )
}

export default CardActions
