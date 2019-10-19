import React from 'react'
import styled from 'styled-components'
import { Expense } from './Expense'
const Container = styled.div`
  display: flex;
  > *:not(:first-child) {
    margin-left: 20px;
  }
`
export default function Expenses() {
  return (
    <Container>
      <Expense title='發行量(BCH)' value={12000} />
      <Expense title='總資產(ETH)' value={12} />
      <Expense title='人數' value={10} />
      <Expense title='餘額(BCH)' value={10} />
    </Container>
  )
}
