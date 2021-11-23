import { scales, variants } from "./types";
import {lightColors} from "../../theme";

export const scaleVariants = {
  [scales.MD]: {
    height: "48px",
    padding: "0 24px",
  },
  [scales.SM]: {
    height: "32px",
    padding: "0 16px",
  },
  [scales.XS]: {
    height: "20px",
    fontSize: "12px",
    padding: "0 8px",
  },
};

export const styleVariants = {
  [variants.PRIMARY]: {
    background: lightColors.gradients.blue,
    fontFamily: "Futura PT",
    color: "white",
    ":disabled": {
      background: lightColors.disabled,
      boxShadow: "none",
      color: "secondary"
    },
  },
  [variants.SECONDARY]: {
    backgroundColor: lightColors.buttonSecondary,
    borderRadius: "12px",
    fontFamily: "Futura PT",
    boxShadow: "none",
    color: "secondary",
    ":disabled": {
      backgroundColor: lightColors.disabled,
    },
  },
  [variants.TERTIARY]: {
    backgroundColor: "tertiary",
    boxShadow: "none",
    color: "primary",
  },
  [variants.SUBTLE]: {
    backgroundColor: "textSubtle",
    color: "backgroundAlt",
  },
  [variants.DANGER]: {
    backgroundColor: "failure",
    color: "white",
  },
  [variants.SUCCESS]: {
    backgroundColor: "success",
    color: "white",
  },
  [variants.TEXT]: {
    backgroundColor: "transparent",
    color: "primary",
    boxShadow: "none",
  },
};
