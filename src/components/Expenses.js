import React from 'react'
import styled from 'styled-components'
import { Expense } from './Expense'
const Container = styled.div`
  display: flex;
  margin-bottom: 20px
  > *:not(:first-child) {
    margin-left: 25px;
  }
  > * {
    box-shadow: 0 2px 6px #b5b5b5;
  }
`
export default function Expenses() {
  return (
    <Container>
      <Expense title='發行量(BCH)' value={12000} />
      <Expense title='總資產(ETH)' value={12} />
      <Expense title='人數' value={10} />
    </Container>
  )
}
