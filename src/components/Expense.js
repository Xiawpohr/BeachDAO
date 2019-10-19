import React from 'react'
import styled from 'styled-components'
export const Expense = props => {
  const Expense = styled.div`
    width: 150px;
    height: 80px;
    background-color: #ffffff;
    text-align: center;
    padding: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
  `
  const Title = styled.div`
    height: 30px;
  `
  const Value = styled.div`
    height: 20px;
  `
  return (
    <Expense>
      <Title>{props.title}</Title>
      <Value>{props.value}</Value>
    </Expense>
  )
}
