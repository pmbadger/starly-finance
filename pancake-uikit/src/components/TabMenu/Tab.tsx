import styled from "styled-components";
import { color } from "styled-system";
import { TabProps } from "./types";

const Tab = styled.button<TabProps>`
  font-family: 'Futura PT Bold';
  display: inline-flex;
  justify-content: center;
  cursor: pointer;
  border: 0;
  outline: 0;
  flex-grow: 1;
  padding: 40px 92px;
  font-size: 24px;
  font-weight: 600;
  line-height: 120%;
  border-bottom: ${({ isActive }) => isActive ? '1px solid #82C8F4' : '1px solid rgba(130, 200, 244, 0.1)'};  
  border-radius: 32px 32px 0 0;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-grow: 0;
  }

  ${color}
`;

Tab.defaultProps = {
  scale: "md",
};

export default Tab;
