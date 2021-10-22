import React from 'react'
import styled from 'styled-components'
import Card from 'components/Card'
import {cardsMainProps} from 'config/constants/views/home'
import {CardMainWrapperProps} from 'config/constants/types'
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
  background: rgba(23, 29, 48, 0.8);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.12);
  border-radius: 32px;
`

const MainCardsWrapper: React.FC = () => {

  return (
    <CardsWrapper>
      {
        cardsMainProps.map((card) => 
          <CardMain>
            <CardMainBg
              imageBg={card.cardMainBgProps.imageBg}
              lightBg={card.cardMainBgProps.lightBg}
              stars={card.cardMainBgProps.stars}
            />
            <CardMainContent
              textFirst={card.cardMainContentProps.textFirst}
              textSecond={card.cardMainContentProps.textSecond}
              textBtn={card.cardMainContentProps.textBtn}
            />
          </CardMain>
        )
      }
    </CardsWrapper>
  )
}

export default MainCardsWrapper
