import React from 'react'
import styled from 'styled-components'
import { Skeleton } from 'pancakeswap-uikit'
import { useWeb3React } from '@web3-react/core'

export interface EarnedProps {
  earnings: number
  pid: number
}

interface EarnedPropsWithLoading extends EarnedProps {
  userDataReady: boolean
}

const Amount = styled.span<{ earned: number | string }>`
  color: white;
  display: flex;
  align-items: center;
  font-family: 'Futura PT Bold';
`

const Earned: React.FunctionComponent<EarnedPropsWithLoading> = ({ earnings, userDataReady }) => {
  const { account } = useWeb3React()

  if (userDataReady) {
    return <Amount earned={earnings}>{earnings && account ? earnings.toLocaleString() : '–'}</Amount>
  }
  return (
    <Amount earned="-">
      <Skeleton width={60} />
    </Amount>
  )
}

export default Earned
