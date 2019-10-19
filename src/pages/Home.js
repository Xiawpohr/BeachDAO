import React from 'react'
import Header from '../components/Header'
import Body from '../components/Body'
import styled from 'styled-components'

export default function Home() {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
  `
  return (
    <Container>
      <Header />
      <Body />
    </Container>
  )
}
