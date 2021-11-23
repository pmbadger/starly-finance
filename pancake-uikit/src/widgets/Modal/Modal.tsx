import React from "react";
import { useTheme } from "styled-components";
import Heading from "../../components/Heading/Heading";
import getThemeValue from "../../util/getThemeValue";
import { ModalBody, ModalHeader, ModalTitle, ModalContainer, ModalCloseButton, ModalBackButton } from "./styles";
import { ModalProps } from "./types";

const Modal: React.FC<ModalProps> = ({
  title,
  onDismiss,
  onBack,
  children,
  hideCloseButton = false,
  bodyPadding = "24px",
  headerBackground = "transparent",
  minWidth = "320px",
  modalCloseId,
  modalBackButtonId,
  ...props
}) => {
  const theme = useTheme();
  return (
    <ModalContainer minWidth={minWidth} {...props}>
      <ModalHeader background='#152340'>
        <ModalTitle>
          {onBack && <ModalBackButton modalBackButtonId={modalBackButtonId} onBack={onBack} />}
          <Heading>{title}</Heading>
        </ModalTitle>
        {!hideCloseButton && <ModalCloseButton modalCloseId={modalCloseId} onDismiss={onDismiss} />}
      </ModalHeader>
      <ModalBody p={bodyPadding}>{children}</ModalBody>
    </ModalContainer>
  );
};

export default Modal;
