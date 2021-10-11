import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Starly',
  description:
    'The most popular AMM on Ethereum by user count! Earn STLY through yield farming, then stake it in Pools to earn more tokens!',
  image: 'https://pancakeswap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('Home')} | ${t('Starly')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('Starly')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('Starly')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('Starly')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('Starly')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('Starly')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t('Starly')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('Starly')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('Starly')}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | ${t('Starly')}`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} | ${t('Starly')}`,
      }
    default:
      return null
  }
}
