import React from "react";
import { TokenPairImageProps, variants } from "./types";
import { StyledPrimaryImage, StyledSecondaryImage } from "./styles";
import Wrapper from "./Wrapper";

const TokenPairImage: React.FC<TokenPairImageProps> = ({
  primarySrc,
  secondarySrc,
  width,
  height,
  secondaryImageSize,
  variant = variants.DEFAULT,
  primaryImageProps = {},
  secondaryImageProps = {},
  ...props
}) => {

  return (
    <Wrapper position="relative" width={width} height={height} {...props}>
      <StyledPrimaryImage variant={variant} src={primarySrc} width={width} height={height} {...primaryImageProps} />
      <StyledSecondaryImage
        variant={variant}
        src={secondarySrc}
        width={secondaryImageSize || width}
        height={secondaryImageSize || height}
        {...secondaryImageProps}
      />
    </Wrapper>
  );
};

export default TokenPairImage;
