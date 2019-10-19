import React from 'react'
import styled from 'styled-components'
import ActivityContainer from './ActivityContainer'
export default function MainBox() {
  const MainBox = styled.div`
    flex: 1;
  `
  const Title = styled.div`
    font-size: 24px;
  `
  return (
    <MainBox>
      {/* <Title>瀏覽淨灘活動</Title> */}
      <ActivityContainer />
    </MainBox>
  )
}
