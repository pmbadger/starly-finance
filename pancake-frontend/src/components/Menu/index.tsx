import React from 'react'
import { Menu as UikitMenu, Skeleton } from 'pancakeswap-uikit'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { useProfile } from 'state/profile/hooks'
import config from './config'
import UserMenu from './UserMenu'
import GlobalSettings from './GlobalSettings'
import { registerCakeToken } from '../../utils/wallet'
import { useTotalSupply } from '../../hooks/useTokenBalance'
import { getBalanceNumber } from '../../utils/formatBalance'
import Balance from '../Balance'

const Menu = (props) => {
  const { isDark, toggleTheme } = useTheme()
  const cakePriceUsd = usePriceCakeBusd()
  const { profile } = useProfile()
  const { currentLanguage, setLanguage, t } = useTranslation()
  const totalSupply = useTotalSupply()
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) : 0
  return (
    <UikitMenu
      registerCakeToken={registerCakeToken}
      userMenu={<UserMenu />}
      // globalMenu={<GlobalSettings />}
      isDark={isDark}
      // toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      cakePriceUsd={cakePriceUsd.toFixed(3)}
      cakeTotalSupply={
        cakeSupply ? (
          <Balance decimals={0} color="white" fontSize="11px" fontWeight="400" value={cakeSupply} unit=" STLY" />
        ) : (
          <Skeleton height={20} width={88} my="-2px" />
        )
      }
      links={config(t)}
      profile={{
        username: profile?.username,
        image: profile?.nft ? `/images/nfts/${profile.nft?.images.sm}` : undefined,
        profileLink: '/profile',
        noProfileLink: '/profile',
        showPip: !profile?.username,
      }}
      {...props}
    />
  )
}

export default Menu
