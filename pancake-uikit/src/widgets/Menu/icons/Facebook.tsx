import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.5 9C18.5 4.02943 14.4706 0 9.5 0C4.52943 0 0.5 4.02943 0.5 9C0.5 13.4921 3.79115 17.2155 8.09375 17.8907V11.6016H5.80859V9H8.09375V7.01719C8.09375 4.76156 9.43742 3.51562 11.4932 3.51562C12.4776 3.51562 13.5078 3.69141 13.5078 3.69141V5.90625H12.373C11.255 5.90625 10.9062 6.60006 10.9062 7.3125V9H13.4023L13.0033 11.6016H10.9062V17.8907C15.2088 17.2155 18.5 13.4921 18.5 9Z" fill="#4699C6"/>
    </Svg>
  );
};

export default Icon;
