import React from 'react'
import { Flex, UserMenuItem, WarningIcon } from 'pancakeswap-uikit'
import { useTranslation } from 'contexts/Localization'

interface WalletUserMenuItemProps {
  hasLowEthBalance: boolean
  onPresentWalletModal: () => void
}

const WalletUserMenuItem: React.FC<WalletUserMenuItemProps> = ({ hasLowEthBalance, onPresentWalletModal }) => {
  const { t } = useTranslation()

  return (
    <UserMenuItem id="btn18-wallet-menu-item" as="button" onClick={onPresentWalletModal}>
      <Flex alignItems="center" justifyContent="space-between" width="100%">
        {t('Wallet')}
        {hasLowEthBalance && <WarningIcon color="warning" width="24px" />}
      </Flex>
    </UserMenuItem>
  )
}

export default WalletUserMenuItem
