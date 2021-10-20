import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Tab, TabMenu } from 'pancakeswap-uikit'

const getActiveIndex = (pathname: string): number => {
  if (pathname.includes('/liquidity')) {
    return 1
  }
  return 0
}

const Nav = () => {
  const location = useLocation()
  return (
    <TabMenu activeIndex={getActiveIndex(location.pathname)}>
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
