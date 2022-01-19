import React from 'react'
import { Text } from 'pancakeswap-uikit'
import { Field } from 'state/swap/actions'
import { useUserSlippageTolerance } from 'state/user/hooks'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown } from 'utils/prices'
import { AutoColumn } from 'components/Layout/Column'
import QuestionHelper from 'components/QuestionHelper'
import { RowBetween, RowFixed } from 'components/Layout/Row'
import { Trade, TradeType } from 'pancakeswap-sdk'
import FormattedPriceImpact from './FormattedPriceImpact'
import SwapRoute from './SwapRoute'

function TradeSummary({ trade, allowedSlippage }: { trade: Trade; allowedSlippage: number }) {
  const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
  const isExactIn = trade.tradeType === TradeType.EXACT_INPUT
  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage)

  return (
    <AutoColumn style={{ flexDirection: 'column' }}>
      <RowBetween>
        <RowFixed margin="8px 0">
          <Text fontSize="16px" color="textSubtle">
            {isExactIn ? 'Minimum received' : 'Maximum sold'}
          </Text>
          <QuestionHelper
            text="Your transaction will revert if there is a large, unfavorable price movement before it is confirmed."
            ml="4px"
          />
        </RowFixed>
        <RowFixed margin="8px 0">
          <Text fontSize="16px">
            {isExactIn
              ? `${slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4)} ${trade.outputAmount.currency.symbol}` ??
                '-'
              : `${slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4)} ${trade.inputAmount.currency.symbol}` ?? '-'}
          </Text>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <RowFixed margin="8px 0">
          <Text fontSize="16px" color="textSubtle">
            Price Impact
          </Text>
          <QuestionHelper
            text="The difference between the market price and estimated price due to trade size."
            ml="4px"
          />
        </RowFixed>
        <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
      </RowBetween>

      <RowBetween>
        <RowFixed margin="8px 0">
          <Text fontSize="16px" color="textSubtle">
            Liquidity Provider Fee
          </Text>
          <QuestionHelper
            text={
              <>
                <Text mb="12px">For each trade a 0.01% fee is paid</Text>
                {/* <Text>- 0.17% to LP token holders</Text> */}
                {/* <Text>- 0.03% to the Treasury</Text> */}
                {/* <Text>- 0.05% towards STLY buyback and burn</Text> */}
              </>
            }
            ml="4px"
          />
        </RowFixed>
        <Text fontSize="16px">
          {realizedLPFee ? `${realizedLPFee.toSignificant(4)} ${trade.inputAmount.currency.symbol}` : '-'}
        </Text>
      </RowBetween>
    </AutoColumn>
  )
}

export interface AdvancedSwapDetailsProps {
  trade?: Trade
}

export function AdvancedSwapDetails({ trade }: AdvancedSwapDetailsProps) {
  const [allowedSlippage] = useUserSlippageTolerance()

  const showRoute = Boolean(trade && trade.route.path.length > 2)

  return (
    <AutoColumn style={{ flexDirection: 'column' }} gap="0px">
      {trade && (
        <>
          <TradeSummary trade={trade} allowedSlippage={allowedSlippage} />
          {showRoute && (
            <>
              <RowBetween style={{ margin: '8px 0' }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <Text fontSize="16px" color="textSubtle">
                    Route
                  </Text>
                  <QuestionHelper
                    text="Routing through these tokens resulted in the best price for your trade."
                    ml="4px"
                  />
                </span>
                <SwapRoute trade={trade} />
              </RowBetween>
            </>
          )}
        </>
      )}
    </AutoColumn>
  )
}
