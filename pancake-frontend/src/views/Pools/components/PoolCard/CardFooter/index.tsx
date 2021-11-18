import React, { useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Flex, CardFooter, Text } from 'pancakeswap-uikit'
import { Pool } from 'state/types'
import ExpandedFooter from './ExpandedFooter'

interface FooterProps {
  pool: Pool
  account: string
  // totalCakeInVault?: BigNumber
}

const ExpandableButtonWrapper = styled(Flex)`
  justify-content: center;
  margin-top: 17px;

  button {
    padding: 0;
  }
`

const StyledText = styled(Text)`
  font-family: 'HelveticaNeueCyr';
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.02em;
  color: #ffffff;
  cursor: pointer;
`

const Footer: React.FC<FooterProps> = ({ pool, account }) => {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <CardFooter style={{ borderTop: 'none', padding: 0 }}>
      <ExpandableButtonWrapper>
        <StyledText onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? t('Hide') : t('Show Details')}</StyledText>
      </ExpandableButtonWrapper>
      {isExpanded && <ExpandedFooter pool={pool} account={account} />}
    </CardFooter>
  )
}

export default Footer
