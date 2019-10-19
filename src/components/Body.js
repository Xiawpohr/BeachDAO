import React from 'react'
import Expenses from './Expenses'
import Activity from './Activity'
import styled from 'styled-components'
const Body = styled.div`
  flex:1
  background: rgba(0, 0, 0, 0.05);
`
export default function Home() {
  return (
    <Body>
      <Expenses />
      <Activity />
    </Body>
  )
}
