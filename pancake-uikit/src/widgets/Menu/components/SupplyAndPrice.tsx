import React, {ReactElement} from "react";
import styled from "styled-components";
import Text from "../../../components/Text/Text";
import { UpArrowIcon, StarLogo } from "../icons";
import {Skeleton} from "../../../components/Skeleton";

interface Props {
  cakePriceUsd?: number;
  cakeTotalSupply?: ReactElement
}

const Table = styled.div`
  background-color: #21283B;
  flex-direction: row;
  padding: 4px 18px;
  width: 200px;
  border-radius: 16px;
  margin-bottom: 32px;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 12px 0;

    div{
        font-family: 'SF Pro Display';
    }
`

const StarContainer = styled.div`
    position: absolute;
    margin-left: -190px;
    margin-top: -4px;
     svg{
         path {
             fill: #FFDF6D !important;
         }
         width: 9px;
         height: 9px;
     }
`

const SupplyAndPrice: React.FC<Props> = ({cakePriceUsd, cakeTotalSupply}) => {
  return (
      <>
        <StarContainer>
            <StarLogo/>
        </StarContainer>
        <Table>
            <Row>
                <Text color="#82C8F4" fontSize='11px' fontWeight='400'>Starly Price:</Text>
                {
                    cakePriceUsd && !isNaN(cakePriceUsd)
                    ? <Text color="white" fontSize='11px' fontWeight='600'>${cakePriceUsd}</Text>
                    : <Skeleton width={40} height={20} my="-2px" />
                }
                <Text color="#8BF0BF" fontSize='10px' fontWeight='400'>
                    23%
                    <UpArrowIcon/>
                </Text>
            </Row>
            <Row>
                <Text color="#82C8F4" fontSize='11px' fontWeight='400'>Max Supply:</Text>
                <Text color="white" fontSize='11px' fontWeight='400'>777 000 000 STLY</Text>
            </Row>
            <Row>
                <Text color="#82C8F4" fontSize='11px' fontWeight='400'>Total Supply:</Text>
                {cakeTotalSupply}
            </Row>
        </Table>
    </>
  );
};

export default React.memo(SupplyAndPrice);
