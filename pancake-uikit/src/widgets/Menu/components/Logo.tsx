import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import Flex from "../../../components/Box/Flex";
import { LogoIcon as LogoWithText, StarLogo } from "../icons";
import MenuButton from "./MenuButton";

interface Props {
  isPushed: boolean;
  isDark: boolean;
  togglePush: () => void;
  href: string;
}

const blink = keyframes`
  0%,  100% { transform: scaleY(1); } 
  50% { transform:  scaleY(0.1); } 
`;

const StyledLink = styled(Link)`
  margin-top: 32px;
  display: flex;
  align-items: center;
  .mobile-icon {
    width: 32px;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: none;
    }
  }
  .desktop-icon {
    width: 160px;
    display: none;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: block;
    }
  }
  .right-eye {
    animation-delay: 20ms;
  }
  &:hover {
    .left-eye,
    .right-eye {
      transform-origin: center 60%;
      animation-name: ${blink};
      animation-duration: 350ms;
      animation-iteration-count: 1;
    }
  }
`;

const StarLogoContainer = styled.div`
  margin-left: -30px;
  margin-top: 23px;
`;

const Logo: React.FC<Props> = ({ isPushed, togglePush, isDark, href }) => {
  const isAbsoluteUrl = href.startsWith("http");
  const innerLogo = (
    <>
      <LogoWithText className="desktop-icon" isDark={isDark} />
    </>
  );

  return (
    <Flex>
      <MenuButton aria-label="Toggle menu" onClick={togglePush} mr="24px">
      </MenuButton>
       {isAbsoluteUrl ? (
        <StyledLink as="a" href={href} aria-label="Starly home page">
           {innerLogo}
        </StyledLink>
       ) : (
        <StyledLink to={href} aria-label="Starly home page">
           {innerLogo}
        </StyledLink>
       )}
      <StarLogoContainer>
        <StarLogo/>
      </StarLogoContainer>
    </Flex>
  );
};

export default React.memo(Logo, (prev, next) => prev.isPushed === next.isPushed && prev.isDark === next.isDark);
