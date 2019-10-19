import React from 'react'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'

export default function Header() {
  const Header = styled.div`
    display: flex;
    justify-content: space-between;
    color: #fff;
    background-color: #1976d2;
    align-items: center;
    padding: 0 20px;
    height: 60px;
  `
  const Balance = styled.div``
  const Buttons = styled.div``
  const Title = styled.div``
  return (
    <Header>
      <Title>BeachDAO</Title>
      <Buttons>
        <Button
          variant='contained'
          style={{
            background: 'transparent',
            boxShadow: 'none',
            color: 'white',
            disabled: true,
          }}
        >
          {'餘額 : 500 BCH'}
        </Button>
        <Button
          variant='contained'
          style={{
            background: 'transparent',
            boxShadow: 'none',
            color: 'white',
          }}
        >
          捐款
        </Button>
        <Button
          variant='contained'
          style={{
            background: 'transparent',
            boxShadow: 'none',
            color: 'white',
          }}
        >
          我的錢包
        </Button>
      </Buttons>
    </Header>
  )
}
