import React from 'react'
import styled from 'styled-components'
import { Button } from 'pancakeswap-uikit'

interface PercentageButtonProps {
  onClick: () => void
  id: string
}

const StyledButton = styled(Button)`
  flex-grow: 1;
`

const PercentageButton: React.FC<PercentageButtonProps> = ({ children, onClick, id }) => {
  return (
    <StyledButton id={id} scale="xs" mx="2px" p="4px 16px" variant="tertiary" onClick={onClick}>
      {children}
    </StyledButton>
  )
}

export default PercentageButton
