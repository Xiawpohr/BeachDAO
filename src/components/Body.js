import React from 'react'
import Expenses from './Expenses'
import MainBox from './MainBox'
import styled from 'styled-components'
const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 680px;
  margin: auto;
`
export default function Home() {
  return (
    <Body>
      <Expenses />
      <MainBox />
    </Body>
  )
}
