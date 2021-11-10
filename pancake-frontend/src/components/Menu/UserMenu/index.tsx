import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { Flex, LogoutIcon, useModal, UserMenu as UIKitUserMenu, UserMenuDivider, UserMenuItem } from 'pancakeswap-uikit'
import useAuth from 'hooks/useAuth'
import { useProfile } from 'state/profile/hooks'
import { StyledConnectWalletButton } from 'components/ConnectWalletButton'
import { FetchStatus, useGetEthBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import WalletModal, { WalletView, LOW_ETH_BALANCE } from './WalletModal'
import ProfileUserMenuItem from './ProfileUserMenutItem'
import WalletUserMenuItem from './WalletUserMenuItem'

const UserMenu = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { logout } = useAuth()
  const { balance, fetchStatus } = useGetEthBalance()
  const { isInitialized, isLoading, profile } = useProfile()
  const [onPresentWalletModal] = useModal(<WalletModal initialView={WalletView.WALLET_INFO} />)
  const [onPresentTransactionModal] = useModal(<WalletModal initialView={WalletView.TRANSACTIONS} />)
  const hasProfile = isInitialized && !!profile
  const avatarSrc = profile && profile.nft ? `/images/nfts/${profile.nft.images.sm}` : undefined
  const hasLowEthBalance = fetchStatus === FetchStatus.SUCCESS && balance.lte(LOW_ETH_BALANCE)

  if (!account) {
    return <StyledConnectWalletButton />
  }

  return (
    <UIKitUserMenu account={account} avatarSrc={avatarSrc}>
      <WalletUserMenuItem hasLowEthBalance={hasLowEthBalance} onPresentWalletModal={onPresentWalletModal} />
      <UserMenuItem as="button" onClick={onPresentTransactionModal}>
        {t('Transactions')}
      </UserMenuItem>
      <UserMenuDivider />
      {/* <ProfileUserMenuItem isLoading={isLoading} hasProfile={hasProfile} /> */}
      {/* <UserMenuDivider /> */}
      <UserMenuItem as="button" onClick={logout}>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          {t('Disconnect')}
          <LogoutIcon />
        </Flex>
      </UserMenuItem>
    </UIKitUserMenu>
  )
}

export default UserMenu
