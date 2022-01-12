import React from 'react'
import { Box, Button, Flex, InjectedModalProps, LinkExternal, Message, Text } from 'pancakeswap-uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance, { useGetEthBalance } from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import { getBlockExplorerLink } from 'utils'
import { getFullDisplayBalance } from 'utils/formatBalance'
import CopyAddress from './CopyAddress'

interface WalletInfoProps {
  hasLowEthBalance: boolean
  onDismiss: InjectedModalProps['onDismiss']
}

const WalletInfo: React.FC<WalletInfoProps> = ({ hasLowEthBalance, onDismiss }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { balance } = useGetEthBalance()
  const { balance: cakeBalance } = useTokenBalance(getCakeAddress())
  const { logout } = useAuth()

  const handleLogout = () => {
    onDismiss()
    logout()
  }

  return (
    <>
      <Text color="secondary" fontSize="12px" fontWeight="bold" mb="8px">
        {t('Your Address')}
      </Text>
      <CopyAddress account={account} mb="24px" />
      {hasLowEthBalance && (
        <Message variant="warning" mb="24px">
          <Box>
            <Text fontWeight="bold">{t('BNB Balance Low')}</Text>
            <Text as="p">{t('You need BNB for transaction fees.')}</Text>
          </Box>
        </Message>
      )}
      <Flex alignItems="center" justifyContent="space-between">
        <Text color="textSubtle">{t('BNB Balance')}</Text>
        <Text>{getFullDisplayBalance(balance, 18, 6)}</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb="24px">
        <Text color="textSubtle">{t('STLY balance')}</Text>
        <Text>{getFullDisplayBalance(cakeBalance, 18, 3)}</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="end" mb="24px">
        <LinkExternal id="btn25-wallet-info-view-on-explorer" href={getBlockExplorerLink(account, 'address')}>
          {t('View on block explorer')}
        </LinkExternal>
      </Flex>
      <Button id="btn26-wallet-info-disconnect-wallet" variant="secondary" width="100%" onClick={handleLogout}>
        {t('Disconnect Wallet')}
      </Button>
    </>
  )
}

export default WalletInfo
