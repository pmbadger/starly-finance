import React from 'react'
import { Flex, Text } from 'pancakeswap-uikit'
import { useTranslation } from 'contexts/Localization'
import { Currency, Percent, Price } from 'pancakeswap-sdk'
import { AutoRow } from '../../components/Layout/Row'
import { ONE_BIPS } from '../../config/constants'
import { Field } from '../../state/mint/actions'

function PoolPriceBar({
  currencies,
  noLiquidity,
  poolTokenPercentage,
  price,
}: {
  currencies: { [field in Field]?: Currency }
  noLiquidity?: boolean
  poolTokenPercentage?: Percent
  price?: Price
}) {
  const { t } = useTranslation()
  return (
    <AutoRow justify="space-around" gap="4px">
      <Flex>
        <Text>{price?.toSignificant(6) ?? '-'}</Text>
        &nbsp;
        <Text>
          {t('%assetA% per %assetB%', {
            assetA: currencies[Field.CURRENCY_B]?.symbol ?? '',
            assetB: currencies[Field.CURRENCY_A]?.symbol ?? '',
          })}
        </Text>
      </Flex>
      <Flex>
        <Text>{price?.invert()?.toSignificant(6) ?? '-'}</Text>
        &nbsp;
        <Text>
          {t('%assetA% per %assetB%', {
            assetA: currencies[Field.CURRENCY_A]?.symbol ?? '',
            assetB: currencies[Field.CURRENCY_B]?.symbol ?? '',
          })}
        </Text>
      </Flex>
      <Flex>
        <Text>
          {noLiquidity && price
            ? '100'
            : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
          % &nbsp;
        </Text>
        <Text>{t('Share of Pool')}</Text>
      </Flex>
    </AutoRow>
  )
}

export default PoolPriceBar
