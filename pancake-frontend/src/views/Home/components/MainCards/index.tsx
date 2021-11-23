import React from 'react'
import styled from 'styled-components'
import { cardsMainProps } from 'config/constants/views/home'
import CardMainBg from './CardMainBg'
import CardMainContent from './CardMainContent'

const CardsWrapper = styled.div`
  margin-bottom: 67px;
  display: flex;
  gap: 12px;
`

const CardMain = styled.div`
  position: relative;
  width: 390px;
  height: 256px;
  border-radius: 32px;
`

const MainCardsWrapper: React.FC = () => {
  return (
    <CardsWrapper>
      {cardsMainProps.map((card) => (
        <CardMain key={card.id}>
          <CardMainContent
            textFirst={card.cardMainContentProps.textFirst}
            textSecond={card.cardMainContentProps.textSecond}
            textBtn={card.cardMainContentProps.textBtn}
            textLink={card.cardMainContentProps.textLink}
            btnId={card.cardMainContentProps.btnId}
          />
          <CardMainBg
            imageBg={card.cardMainBgProps.imageBg}
            lightBg={card.cardMainBgProps.lightBg}
            stars={card.cardMainBgProps.stars}
          />
        </CardMain>
      ))}
    </CardsWrapper>
  )
}

export default MainCardsWrapper
