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
      <Tab to="/swap" as={Link}>
        Swap
      </Tab>
      <Tab to="/liquidity" as={Link}>
        Liquidity
      </Tab>
      <Tab>Bridge</Tab>
      <Tab>Transactions</Tab>
    </TabMenu>
  )
}

export default Nav
