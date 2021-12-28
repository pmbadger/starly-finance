import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4.5 8.16665V0.833313" stroke="#8BF0C0" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.29163 4.04165L4.49996 0.833313L7.70829 4.04165" stroke="#8BF0C0" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default Icon;
