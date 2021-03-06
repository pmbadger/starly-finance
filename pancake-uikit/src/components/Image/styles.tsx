import styled from "styled-components";
import { variant as StyledSystemVariant } from "styled-system";
import { ImageProps, Variant, variants } from "./types";
import TokenImage from "./TokenImage";

interface StyledImageProps extends ImageProps {
  variant: Variant;
}

export const StyledPrimaryImage = styled(TokenImage)<StyledImageProps>`
  position: absolute;
  width: ${({ width }) => `${width}px`};
  display: inline-block;
  right: ${({ width }) => `${width / 1.3}px`};
  z-index: 1;
`;

export const StyledSecondaryImage = styled(TokenImage)<StyledImageProps>`
  position: absolute;
  width: ${({ width }) => `${width}px`};
  bottom: 0;
  left: 0;
`;
