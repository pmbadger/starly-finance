import React, { useRef } from 'react'
import styled from 'styled-components'
import { useTable, ColumnType } from 'pancakeswap-uikit'

import Row, { RowProps } from './Row'

export interface ITableProps {
  data: RowProps[]
  columns: ColumnType<RowProps>[]
  userDataReady: boolean
  sortColumn?: string
}

const Container = styled.div`
  filter: ${({ theme }) => theme.card.dropShadow};
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 16px 0px;
  border-radius: 32px;
`

const TableWrapper = styled.div`
  overflow: visible;
  width: 100%;
  background: rgba(23, 29, 48, 0.8);
  border-radius: 32px;
  border: 1px solid #455381;
  border-radius: 32px;

  &::-webkit-scrollbar {
    display: none;
  }

  padding: 10px;
`

const TableContainer = styled.div`
  position: relative;
  border-radius: 32px;
  width: 80%;
`

const FarmTable: React.FC<ITableProps> = (props) => {
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const { data, columns, userDataReady } = props

  const { rows } = useTable(columns, data, { sortable: true, sortColumn: 'farm' })

  return (
    <Container>
      <TableContainer>
        <TableWrapper ref={tableWrapperEl}>
          {rows.map((row) => {
            return <Row {...row.original} userDataReady={userDataReady} key={`table-row-${row.id}`} />
          })}
        </TableWrapper>
      </TableContainer>
    </Container>
  )
}

export default FarmTable
