import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Logo: React.FC<SvgProps> = () => {
  return (
    <Svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.59583 8.59583L7.49393 15L5.1601 9.84424L0 7.50607L6.40851 6.40851L7.50607 0L9.84857 5.15576L15 7.49393L8.59583 8.59583Z" fill="#B5C9FF"/>
    </Svg>
  );
};

export default Logo
