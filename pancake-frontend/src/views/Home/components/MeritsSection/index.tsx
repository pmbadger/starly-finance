/* eslint-disable react/no-array-index-key */
import React from 'react'
import styled from 'styled-components'
import { meritCardsContent } from 'config/constants/views/home'
import MeritCard from './MeritCard'

const MeritsWrapper = styled.div`
  height: 195px;
`
const MeritsCardsWrapper = styled.div`
  margin-top: 21px;
  display: flex;
  gap: 32px;
`

const MeritsHeader = styled.p`
  font-family: 'Futura PT';
  font-weight: 600;
  font-size: 32px;
  line-height: 38px;
  color: #FFFFFF;
`

const MeritsSection: React.FC = () => {
  return (
    <MeritsWrapper>
      <MeritsHeader>
        Why Choose us?
      </MeritsHeader>
      <MeritsCardsWrapper>
        {
          meritCardsContent.map((card, i) => 
            <MeritCard
              key={card.id + i}
              image={card.image}
              title={card.title}
              text={card.text}
            />
          )
        }
      </MeritsCardsWrapper>
    </MeritsWrapper>
  )
}

export default MeritsSection
