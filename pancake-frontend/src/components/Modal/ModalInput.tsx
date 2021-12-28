import React from 'react'
import styled from 'styled-components'
import { Text, Button, Input, InputProps, Flex, Link } from 'pancakeswap-uikit'
import { useTranslation } from 'contexts/Localization'
import { BigNumber } from 'bignumber.js'

interface ModalInputProps {
  max: string
  symbol: string
  onSelectMax?: () => void
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  value: string
  addLiquidityUrl?: string
  inputTitle?: string
  decimals?: number
  inputId: string
}

const getBoxShadow = ({ isWarning = false, theme }) => {
  if (isWarning) {
    return theme.shadows.warning
  }

  return theme.shadows.inset
}

const StyledTokenInput = styled.div<InputProps>`
  display: flex;
  flex-direction: column;
  border: 1px solid #455381;
  border-radius: 16px;
  box-shadow: ${getBoxShadow};
  color: ${({ theme }) => theme.colors.text};
  padding: 8px 16px 8px 0;
  width: 100%;
`

const StyledInput = styled(Input)`
  box-shadow: none;
  width: 60px;
  margin: 0 8px;
  padding: 0 8px;
  border: 1px solid #455381;
  background-color: #152340;

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 80px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
  }
`

const StyledErrorMessage = styled(Text)`
  position: absolute;
  bottom: -22px;
  a {
    display: inline;
  }
`

const StyledText = styled(Text)`
  color: #82c8f4;
  font-family: 'Futura PT';
`

const StyledButton = styled(Button)`
  height: 40px;
  width: 32px;
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

const ModalInput: React.FC<ModalInputProps> = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
  addLiquidityUrl,
  inputTitle,
  decimals = 18,
  inputId,
}) => {
  const { t } = useTranslation()
  const isBalanceZero = max === '0' || !max

  const displayBalance = (balance: string) => {
    if (isBalanceZero) {
      return '0'
    }
    const balanceBigNumber = new BigNumber(balance)
    if (balanceBigNumber.gt(0) && balanceBigNumber.lt(0.001)) {
      return balanceBigNumber.toLocaleString()
    }
    return balanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
  }

  return (
    <div style={{ position: 'relative' }}>
      <StyledTokenInput isWarning={isBalanceZero}>
        <Flex justifyContent="space-between" pl="16px">
          <StyledText fontSize="14px">{inputTitle}</StyledText>
          <StyledText fontSize="14px">{t('Balance: %balance%', { balance: displayBalance(max) })}</StyledText>
        </Flex>
        <Flex alignItems="flex-end" justifyContent="space-around">
          <StyledInput
            pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
            inputMode="decimal"
            step="any"
            min="0"
            onChange={onChange}
            placeholder="0"
            value={value}
          />
          <StyledButton id={`btn104-max-${inputId}`} onClick={onSelectMax} mr="8px">
            {t('Max')}
          </StyledButton>
          <StyledText fontSize="16px">{symbol}</StyledText>
        </Flex>
      </StyledTokenInput>
      {isBalanceZero && (
        <StyledErrorMessage fontSize="14px" color="failure">
          {t('No tokens to stake')}:{' '}
          <Link
            id={`btn105-get-${inputId}`}
            fontSize="14px"
            bold={false}
            href={addLiquidityUrl}
            external
            color="failure"
          >
            {t('Get %symbol%', { symbol })}
          </Link>
        </StyledErrorMessage>
      )}
    </div>
  )
}

export default ModalInput
