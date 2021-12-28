import React from 'react'
import { Text } from 'pancakeswap-uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { ChainId, Currency, currencyEquals, ETHER, Token } from 'pancakeswap-sdk'

import { SUGGESTED_BASES } from '../../config/constants'
import QuestionHelper from '../QuestionHelper'
import { AutoRow } from '../Layout/Row'
import { CurrencyLogo } from '../Logo'

const BaseWrapper = styled.div<{ disable?: boolean }>`
  border: 1px solid ${({ theme, disable }) => (disable ? 'transparent' : theme.colors.dropdown)};
  border-radius: 10px;
  display: flex;
  padding: 6px;

  align-items: center;
  :hover {
    cursor: ${({ disable }) => !disable && 'pointer'};
    background-color: ${({ theme, disable }) => !disable && theme.colors.background};
  }

  background-color: ${({ theme, disable }) => disable && theme.colors.dropdown};
  opacity: ${({ disable }) => disable && '0.4'};
`

export default function CommonBases({
  chainId,
  onSelect,
  selectedCurrency,
}: {
  chainId?: ChainId
  selectedCurrency?: Currency | null
  onSelect: (currency: Currency) => void
}) {
  const { t } = useTranslation()
  return (
    <AutoRow gap="md" marginTop="16px">
      <AutoRow>
        <Text fontSize="14px">{t('Common bases')}</Text>
        <QuestionHelper text={t('These tokens are commonly paired with other tokens.')} ml="4px" />
      </AutoRow>
      <AutoRow gap="auto">
        <BaseWrapper
          id="btn153-common-bases-eth"
          onClick={() => {
            if (!selectedCurrency || !currencyEquals(selectedCurrency, ETHER)) {
              onSelect(ETHER)
            }
          }}
          disable={selectedCurrency === ETHER}
        >
          <CurrencyLogo size="24px" currency={ETHER} style={{ marginRight: 8 }} />
          <Text>ETH</Text>
        </BaseWrapper>
        {(chainId ? SUGGESTED_BASES[chainId] : []).map((token: Token) => {
          const selected = selectedCurrency instanceof Token && selectedCurrency.address === token.address
          return (
            <BaseWrapper
              id={`btn154-common-bases-${token.address}`}
              onClick={() => !selected && onSelect(token)}
              disable={selected}
              key={token.address}
            >
              <CurrencyLogo size="24px" currency={token} style={{ marginRight: 8 }} />
              <Text>{token.symbol}</Text>
            </BaseWrapper>
          )
        })}
      </AutoRow>
    </AutoRow>
  )
}
