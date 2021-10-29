import React from "react";
import styled from "styled-components";
import Text from "../../../components/Text/Text";
import { UpArrowIcon, StarLogo } from "../icons";

interface Props {
  cakePriceUsd?: number;
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

const SupplyAndPrice: React.FC<Props> = () => {
  return (
      <>
        <StarContainer>
            <StarLogo/>
        </StarContainer>
        <Table>
            <Row>
                <Text color="#82C8F4" fontSize='11px' fontWeight='400'>Starly Price:</Text>
                <Text color="white" fontSize='11px' fontWeight='600'>$1.249</Text>
                <Text color="#8BF0BF" fontSize='10px' fontWeight='400'>
                    23%
                    <UpArrowIcon/>
                </Text>
            </Row>
            <Row>
                <Text color="#82C8F4" fontSize='11px' fontWeight='400'>Max Supply:</Text>
                <Text color="white" fontSize='11px' fontWeight='400'>100 000 000 STRL</Text>
            </Row>
            <Row>
                <Text color="#82C8F4" fontSize='11px' fontWeight='400'>Total Supply:</Text>
                <Text color="white" fontSize='11px' fontWeight='400'>900 000 000 STRL</Text>
            </Row>
        </Table>
    </>
  );
};

export default React.memo(SupplyAndPrice);
