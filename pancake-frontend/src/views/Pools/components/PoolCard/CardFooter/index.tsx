import React, { useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Flex, CardFooter, Button } from 'pancakeswap-uikit'
import { Pool } from 'state/types'
import ExpandedFooter from './ExpandedFooter'

interface FooterProps {
  pool: Pool
  account: string
  // totalCakeInVault?: BigNumber
}

const ExpandableButtonWrapper = styled(Button)`
  margin-top: 17px;
  background: none;
  color: #ffffff;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 12px;
  height: auto;
  letter-spacing: 0.02em;
  font-family: HelveticaNeueCyr;

  button {
    margin: 0;
  }
`

const Footer: React.FC<FooterProps> = ({ pool, account }) => {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)
  const buttonIdPart = isExpanded ? 'hide' : 'show-details'
  const buttonId = pool.isAutoVault ? `btn119-${buttonIdPart}-auto-pool` : `btn119-${buttonIdPart}-${pool.sousId}`

  return (
    <CardFooter style={{ borderTop: 'none', padding: 0 }}>
      <Flex justifyContent="center">
        <ExpandableButtonWrapper id={buttonId} variant="secondary" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? t('Hide') : t('Show Details')}
        </ExpandableButtonWrapper>
      </Flex>
      {isExpanded && <ExpandedFooter pool={pool} account={account} />}
    </CardFooter>
  )
}

export default Footer
