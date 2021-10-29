import React from "react";
import styled, { keyframes, DefaultTheme } from "styled-components";
import { Text } from "../../../components/Text";
import { Colors } from "../../../theme/types";
import { MENU_ENTRY_HEIGHT } from "../config";

export interface Props {
  secondary?: boolean;
  isActive?: boolean;
  theme: DefaultTheme;
  homeIcon?: boolean;
}

const rainbowAnimation = keyframes`
  0%,
  100% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
`;

const LinkLabel = styled.div<Props>`
  color: ${({ isActive }) => (isActive ?  "white" : "#82C8F4")};
  transition: color 0.4s;
  flex-grow: 1;
  font-weight: 500;
  font-style: normal;
  font-size: 15px;
  line-height: 18px;
  font-family: 'SF Pro Display';
`;

const MenuEntry = styled.div<Props>`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 60px;
  font-size: ${({ secondary }) => (secondary ? "14px" : "16px")};
  color: ${({ isActive }) => (isActive ?  "white" : "#82C8F4")};
  background-color: ${({ isActive }) => (isActive ?  "#1D243C" : "none")};

  div{
    color: ${({ isActive }) => (isActive ?  "white" : "#82C8F4")};
  }

  svg {
      path{
        ${({homeIcon}) => (homeIcon ? "stroke" : "fill")}: ${({ isActive }) => ((isActive) ?  "white" : "#4699C6")};
      }
  }

  a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  &:hover{
    background-color: #1D243C;
  }

  svg {
    fill: transparent;
    margin-right: 22px;
    margin-left: 27px;
  }

  // Safari fix
  flex-shrink: 0;

  &.rainbow {
    background-clip: text;
    animation: ${rainbowAnimation} 3s ease-in-out infinite;
    background: ${({ theme }) => theme.colors.gradients.bubblegum};
    background-size: 400% 100%;
  }
`;
MenuEntry.defaultProps = {
  secondary: false,
  isActive: false,
};

const LinkStatus = styled(Text)<{ color: keyof Colors }>`
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 0 8px;
  border: 2px solid;
  border-color: ${({ theme, color }) => theme.colors[color]};
  box-shadow: none;
  color: ${({ theme, color }) => theme.colors[color]};
  margin-left: 8px;
`;

const LinkLabelMemo = React.memo(LinkLabel, (prev, next) => prev.isPushed === next.isPushed);

export { MenuEntry, LinkStatus, LinkLabelMemo as LinkLabel };
