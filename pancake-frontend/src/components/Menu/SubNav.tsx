import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Tab, TabMenu, useModal } from 'pancakeswap-uikit'
import TransactionsModal from '../App/Transactions/TransactionsModal'

const getActiveIndex = (pathname: string): number => {
  if (pathname.includes('/swap')) {
    return 0
  }
  return 1
}

const Nav = () => {
  const location = useLocation()
  const [onPresentTransactionsModal] = useModal(<TransactionsModal />)

  const openTransactionModal = (index) => {
    if (index === 3) {
      onPresentTransactionsModal()
    }
  }

  return (
    <TabMenu activeIndex={getActiveIndex(location.pathname)} onItemClick={openTransactionModal}>
      <Tab id="btn31-tab-menu-swap" to="/swap" as={Link}>
        Swap
      </Tab>
      <Tab id="btn32-tab-menu-liquidity" to="/liquidity" as={Link}>
        Liquidity
      </Tab>
      <Tab id="btn33-tab-menu-bridge">Bridge</Tab>
      <Tab id="btn34-tab-menu-transactions">Transactions</Tab>
    </TabMenu>
  )
}

export default Nav
