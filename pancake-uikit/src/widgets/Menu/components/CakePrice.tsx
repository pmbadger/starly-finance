import React from "react";
import styled from "styled-components";
import { MetamaskIcon } from "../../../components/Svg";
import Text from "../../../components/Text/Text";

interface Props {
  cakePriceUsd?: number;
}

const PriceLink = styled.a`
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

const CakePrice: React.FC<Props> = () => {
  return (
    <PriceLink
      href="http://3.144.73.77:80/swap"
      target="_blank"
    >
      <MetamaskIcon width="24px" mr="8px" />
      <StyledText>Add STRL to Metamask</StyledText>
    </PriceLink>
  );
};

export default React.memo(CakePrice);
