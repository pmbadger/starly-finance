import React from "react";
import styled from "styled-components";
import Flex from "../../components/Box/Flex";
import { Box } from "../../components/Box";
import { ArrowBackIcon, CloseIcon } from "../../components/Svg";
import { IconButton } from "../../components/Button";
import { ModalProps } from "./types";

export const ModalHeader = styled.div<{ background?: string }>`
  align-items: center;
  background: #152340;
  display: flex;
  padding: 12px 24px;
`;

export const ModalTitle = styled(Flex)`
  align-items: center;
  flex: 1;
`;

export const ModalBody = styled(Flex)`
  flex-direction: column;
  max-height: 90vh;
  overflow-y: auto;
`;

export const ModalCloseButton: React.FC<{ onDismiss: ModalProps["onDismiss"], modalCloseId: ModalProps['modalCloseId'] }> = ({ onDismiss, modalCloseId }) => {
  return (
    <IconButton id={modalCloseId} variant="text" onClick={onDismiss} aria-label="Close the dialog">
      <CloseIcon color="#2856B8" />
    </IconButton>
  );
};

export const ModalBackButton: React.FC<{ onBack: ModalProps["onBack"], modalBackButtonId: ModalProps["modalBackButtonId"] }> = ({ onBack, modalBackButtonId }) => {
  return (
    <IconButton id={modalBackButtonId} variant="text" onClick={onBack} area-label="go back" mr="8px">
      <ArrowBackIcon color="#2856B8" />
    </IconButton>
  );
};

export const ModalContainer = styled(Box)<{ minWidth: string }>`
  overflow: hidden;
  background: #152340;
  box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);
  border-radius: 32px;
  width: 100%;
  max-height: 100vh;
  z-index: ${({ theme }) => theme.zIndices.modal};

  h2, h3, h4, h5, p{
    font-family: 'Futura PT';
  }

  ${({ theme }) => theme.mediaQueries.xs} {
    width: auto;
    min-width: ${({ minWidth }) => minWidth};
    max-width: 100%;
  }
`;
