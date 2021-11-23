import React, { useCallback, useEffect, useState } from 'react'
import { Button, ChevronDownIcon, Text, AddIcon, useModal, CardBody } from 'pancakeswap-uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Currency, ETHER, JSBI, TokenAmount } from 'pancakeswap-sdk'
import { LightCard } from '../../components/Card'
import { ColumnCenter } from '../../components/Layout/Column'
import { CurrencyLogo } from '../../components/Logo'
import { MinimalPositionCard } from '../../components/PositionCard'
import Row, { AutoRow } from '../../components/Layout/Row'
import CurrencySearchModal from '../../components/SearchModal/CurrencySearchModal'
import { PairState, usePair } from '../../hooks/usePairs'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { usePairAdder } from '../../state/user/hooks'
import { useTokenBalance } from '../../state/wallet/hooks'
import StyledInternalLink from '../../components/Links'
import { currencyId } from '../../utils/currencyId'
import Dots from '../../components/Loader/Dots'
import { AppHeader } from '../../components/App'
import Page from '../Page'

enum Fields {
  TOKEN0 = 0,
  TOKEN1 = 1,
}

const StyledButton = styled(Button)`
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: none;
  border-radius: 16px;
  flex-grow: 1;
  height: 70px;
`

const StyledCard = styled.div`
  border-radius: 32px;
  margin-top: 44px;
  max-width: 1192px;
  width: 100%;
  z-index: 1;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  backdrop-filter: blur(5px) brightness(0.5);
`

export default function PoolFinder() {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()

  const [activeField, setActiveField] = useState<number>(Fields.TOKEN1)
  const [currency0, setCurrency0] = useState<Currency | null>(ETHER)
  const [currency1, setCurrency1] = useState<Currency | null>(null)

  const [pairState, pair] = usePair(currency0 ?? undefined, currency1 ?? undefined)
  const addPair = usePairAdder()
  useEffect(() => {
    if (pair) {
      addPair(pair)
    }
  }, [pair, addPair])

  const validPairNoLiquidity: boolean =
    pairState === PairState.NOT_EXISTS ||
    Boolean(
      pairState === PairState.EXISTS &&
        pair &&
        JSBI.equal(pair.reserve0.raw, JSBI.BigInt(0)) &&
        JSBI.equal(pair.reserve1.raw, JSBI.BigInt(0)),
    )

  const position: TokenAmount | undefined = useTokenBalance(account ?? undefined, pair?.liquidityToken)
  const hasPosition = Boolean(position && JSBI.greaterThan(position.raw, JSBI.BigInt(0)))

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      if (activeField === Fields.TOKEN0) {
        setCurrency0(currency)
      } else {
        setCurrency1(currency)
      }
    },
    [activeField],
  )

  const prerequisiteMessage = (
    <LightCard padding="45px 10px">
      <Text textAlign="center">
        {!account ? t('Connect to a wallet to find pools') : t('Select a token to find your liquidity.')}
      </Text>
    </LightCard>
  )

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={handleCurrencySelect}
      showCommonBases
      selectedCurrency={(activeField === Fields.TOKEN0 ? currency1 : currency0) ?? undefined}
    />,
    true,
    true,
    'selectCurrencyModal',
  )

  return (
    <Page>
      <AppHeader
        backId="btn158-back-from-pool-finder"
        title={t('Import Pool')}
        subtitle={t('Import an existing pool')}
        backTo="/pool"
      />
      <CardBody>
        <AutoRow style={{ padding: '37px 0 24px 0px' }} gap="md" justify="center">
          <StyledButton
            id="btn41-import-pool-token0"
            endIcon={<ChevronDownIcon />}
            onClick={() => {
              onPresentCurrencyModal()
              setActiveField(Fields.TOKEN0)
            }}
          >
            {currency0 ? (
              <Row>
                <CurrencyLogo currency={currency0} />
                <Text ml="8px">{currency0.symbol}</Text>
              </Row>
            ) : (
              <Text ml="8px">{t('Select a Token')}</Text>
            )}
          </StyledButton>

          <ColumnCenter style={{ justifyContent: 'center', flexBasis: 0, margin: '0 50px' }}>
            <AddIcon />
          </ColumnCenter>

          <StyledButton
            id="btn42-import-pool-token1"
            endIcon={<ChevronDownIcon />}
            onClick={() => {
              onPresentCurrencyModal()
              setActiveField(Fields.TOKEN1)
            }}
          >
            {currency1 ? (
              <Row>
                <CurrencyLogo currency={currency1} />
                <Text ml="8px">{currency1.symbol}</Text>
              </Row>
            ) : (
              <Text as={Row}>{t('Select a Token')}</Text>
            )}
          </StyledButton>
        </AutoRow>

        <AutoRow justify="center">
          {hasPosition && (
            <ColumnCenter
              style={{ justifyItems: 'center', backgroundColor: '', padding: '12px 0px', borderRadius: '12px' }}
            >
              <Text textAlign="center">{t('Pool Found!')}</Text>
              <StyledInternalLink id="btn43-pool-finder-manage-pool" to="/pool">
                <Text textAlign="center">{t('Manage this pool.')}</Text>
              </StyledInternalLink>
            </ColumnCenter>
          )}
        </AutoRow>

        {currency0 && currency1 ? (
          pairState === PairState.EXISTS ? (
            hasPosition && pair ? (
              <StyledCard>
                <Row style={{ display: 'block' }}>
                  <MinimalPositionCard positionCardId="btn69-pool-finder-position-card" pair={pair} />
                </Row>
              </StyledCard>
            ) : (
              <LightCard padding="45px 10px">
                <AutoRow gap="sm" justify="center">
                  <Text textAlign="center">{t('You don’t have liquidity in this pool yet.')}</Text>
                </AutoRow>
                <AutoRow marginTop="16px" justify="center">
                  <StyledInternalLink
                    id="btn44-pool-finder-add-liquidity"
                    to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}
                  >
                    <Text textAlign="center">{t('Add Liquidity')}</Text>
                  </StyledInternalLink>
                </AutoRow>
              </LightCard>
            )
          ) : validPairNoLiquidity ? (
            <LightCard padding="45px 10px">
              <AutoRow gap="sm" justify="center">
                <Text textAlign="center">{t('No pool found.')}</Text>
              </AutoRow>
              <AutoRow marginTop="16px" justify="center">
                <StyledInternalLink
                  id="btn45-pool-finder-create-pool"
                  to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}
                >
                  {t('Create pool.')}
                </StyledInternalLink>
              </AutoRow>
            </LightCard>
          ) : pairState === PairState.INVALID ? (
            <LightCard padding="45px 10px">
              <AutoRow gap="sm" justify="center">
                <Text textAlign="center" fontWeight={500}>
                  {t('Invalid pair.')}
                </Text>
              </AutoRow>
            </LightCard>
          ) : pairState === PairState.LOADING ? (
            <LightCard padding="45px 10px">
              <AutoRow gap="sm" justify="center">
                <Text textAlign="center">
                  {t('Loading')}
                  <Dots />
                </Text>
              </AutoRow>
            </LightCard>
          ) : null
        ) : (
          prerequisiteMessage
        )}
      </CardBody>

      {/* <CurrencySearchModal
          isOpen={showSearch}
          onCurrencySelect={handleCurrencySelect}
          onDismiss={handleSearchDismiss}
          showCommonBases
          selectedCurrency={(activeField === Fields.TOKEN0 ? currency1 : currency0) ?? undefined}
        /> */}
    </Page>
  )
}
