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

export default ConnectWalletButton
