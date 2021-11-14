import React from 'react'
import { Button, useWalletModal, IconButton, Text } from 'pancakeswap-uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'

const ConnectWalletButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  // eslint-disable-next-line react/destructuring-assignment
  const { text, icon, iconPosition } = props

  const StyledText = styled(Text)`
    font-family: 'Futura PT';
  `

  return icon ? (
    <IconButton
      onClick={onPresentConnectModal}
      {...props}
      startIcon={iconPosition === 'start' ? icon : null}
      endIcon={iconPosition === 'end' ? icon : null}
    >
      <StyledText>{t(text || 'Connect Wallet')}</StyledText>
    </IconButton>
  ) : (
    <Button onClick={onPresentConnectModal} {...props}>
      <StyledText>{t(text || 'Connect Wallet')}</StyledText>
    </Button>
  )
}

const ConnectWalletButtonStyle = styled(ConnectWalletButton)`
  padding: 12px 7px;
  width: 158px;
  height: 45px;
  background: linear-gradient(260.3deg, #058fca -29.78%, #2e4bb5 118.84%);
  border-radius: 12px;
  font-style: normal;
  font-weight: 450;
  font-size: 16px;
  line-height: 21px;

  img {
    position: absolute;
    margin-left: 130px;
    margin-top: -15px;
  }
`

export const StyledConnectWalletButton = () => {
  return (
    <ConnectWalletButtonStyle
      text="Connect wallet"
      icon={<img alt="star" src="/images/star.svg" />}
      iconPosition="end"
    />
  )
}

export const StyledConnectWalletButtonExchange = styled(ConnectWalletButton)`
  height: 74px;
  padding: 24px 32px;
  font-style: normal;
  font-weight: 450;
  font-size: 20px;
  line-height: 26px;
  width: 100%;
  background: linear-gradient(260.3deg, #058fca -29.78%, #2e4bb5 118.84%);

  img {
    margin-right: 26px;
  }
`

export default ConnectWalletButton
