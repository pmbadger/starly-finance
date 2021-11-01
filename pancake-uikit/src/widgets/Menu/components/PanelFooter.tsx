import React, {ReactElement} from "react";
import styled from "styled-components";
import { CogIcon } from "../../../components/Svg";
import IconButton from "../../../components/Button/IconButton";
import { MENU_ENTRY_HEIGHT } from "../config";
import { PanelProps, PushedProps } from "../types";
import CakePrice from "./CakePrice";
import SocialLinks from "./SocialLinks";
import SupplyAndPrice from './SupplyAndPrice';

interface Props extends PanelProps, PushedProps {
  registerCakeToken: () => boolean;
  cakeTotalSupply?: ReactElement
}

const Container = styled.div`
  flex: none;
  padding: 36px 13px;
  padding-top: 0;  
  background-color: #171D30;
  width: 100%;
`;

const SocialEntry = styled.div`
  display: flex;
  justify-content: space-between;
  height: ${MENU_ENTRY_HEIGHT}px;
  width: 100%;
  padding: 32px 24px;
  border-bottom: 1px solid #3A4669;
  border-top: 1px solid #3A4669;
  margin-bottom: 36px;
`;

const PraceContainer = styled.div`
  display: flex;
  justify-content: center;
`

const PanelFooter: React.FC<Props> = ({
  isPushed,
  pushNav,
  cakePriceUsd,
  registerCakeToken,
  cakeTotalSupply
}) => {
  if (!isPushed) {
    return (
      <Container>
        <IconButton variant="text" onClick={() => pushNav(true)}>
          <CogIcon />
        </IconButton>
      </Container>
    );
  }

  return (
    <Container>
      <SocialEntry>
        <SocialLinks />
      </SocialEntry>
      <PraceContainer>
        <SupplyAndPrice cakePriceUsd={cakePriceUsd} cakeTotalSupply={cakeTotalSupply}/>
      </PraceContainer>
      <PraceContainer>
        <CakePrice registerCakeToken={registerCakeToken}/>
      </PraceContainer>
    </Container>
  );
};

export default PanelFooter;
