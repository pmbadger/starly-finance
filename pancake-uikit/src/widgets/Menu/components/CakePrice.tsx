import React from "react";
import styled from "styled-components";
import { MetamaskIcon } from "../../../components/Svg";
import Text from "../../../components/Text/Text";

interface Props {
  cakePriceUsd?: number;
  registerCakeToken: () => boolean;
}

const AddTokenButton = styled.a`
  display: flex;
  align-items: center;
  background-color: #21283B;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 22px;
  width: 200px;
  height: 38px;
  border-radius: 8px;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const StyledText = styled(Text)`
  color: white;
  font-size: 11px;
  font-family: 'SF Pro Display';
`

const CakePrice: React.FC<Props> = (props) => {
  const { registerCakeToken } = props
  return (
    <AddTokenButton
      onClick={() => registerCakeToken()}
    >
      <MetamaskIcon width="24px" mr="8px" />
      <StyledText>Add STLY to Metamask</StyledText>
    </AddTokenButton>
  );
};

export default React.memo(CakePrice);
