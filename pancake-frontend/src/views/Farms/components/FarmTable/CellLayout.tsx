import React from 'react'
import styled from 'styled-components'

const Label = styled.div`
f ont-family: 'Futura PT';
  color: #82c8f4;
  text-align: left;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 17px;
  margin: 4px 0px;
`

const ContentContainer = styled.div`
  min-height: 24px;
  display: flex;
  align-items: center;
  font-family: 'Futura PT';

  svg {
    path {
      fill: #82c8f4;
    }
  }
`

interface CellLayoutProps {
  label?: string
}

const CellLayout: React.FC<CellLayoutProps> = ({ label = '', children }) => {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <ContentContainer>{children}</ContentContainer>
    </div>
  )
}

export default CellLayout
