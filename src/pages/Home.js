import React from 'react'
import styled from 'styled-components'
import { useBlockNumber } from '../contexts/application'
import { useETHBalance, useBCDBalance, useBCDTotalSupply } from '../hooks/ethereum'
import {
  useDAOTotalDonation,
  useDAOMemberAmount,
  useDAOProposals,
} from '../hooks/dao'
import { amountFormatter } from '../utils'
import Header from '../components/Header'

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`

const Container = styled.div`
  width: 90%;
  max-width: 42.5rem;
  margin: 0 auto;
`

const Row = styled.div`
  margin-top: 2.5rem;
  display: flex;

  > *:not(:first-child) {
    margin-left: 2.5rem
  }
`

const Widget = styled.div`
  width: 20rem;
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 2px 48px ${({ theme }) => theme.shadowColor};
  display: flex;

  > *:not(:first-child) {
    margin-left: 0.75rem;
  }

  > *:last-child {
    flex: 1;
  }
`

const WidgetData = styled.div`
  flex: 1;
  width: 100%;
  font-size: 2.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const WidgetTitle = styled.div`
  margin-bottom: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
`

const WidgetSubTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  color: rgba(0,0,0,0.6);
`

const TimeWrapper = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  > *:not(:first-child) {
    margin-top: 0.75rem;
  }
`

const TimeText = styled.div`
  font-size: 1rem;
  font-weight: 400;
`

const TimeHeadline = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`

export default function Home() {
  const blockNumber = useBlockNumber()
  const ETHBalance = useETHBalance()
  const BCDBalance = useBCDBalance()
  const BCDTotalSupply = useBCDTotalSupply()
  const totalDonation = useDAOTotalDonation()
  const memberAmount = useDAOMemberAmount()
  const proposals = useDAOProposals()

  return (
    <AppWrapper>
      <Header />
      <Container>
        <Row>
          <Widget>
            <div>
              <WidgetTitle>累積捐款資金 (ETH)</WidgetTitle>
              <WidgetSubTitle>當資金到達 10 ETH 以上時，即開始進行投票來決定要資助淨攤活動</WidgetSubTitle>
            </div>
            <WidgetData>12</WidgetData>
          </Widget>
          <Widget>
            <div>
              <WidgetTitle>個人餘額 (BCD))</WidgetTitle>
              <WidgetSubTitle>參加淨灘活動，保護海灘健康，就可以獲得海灘貨幣</WidgetSubTitle>
            </div>
            <WidgetData>120</WidgetData>
          </Widget>
        </Row>
        <Row>
          <Widget>
            <div>
              <WidgetTitle>捐款人數</WidgetTitle>
              <WidgetData>2000</WidgetData>
            </div>
          </Widget>
          <Widget>
            <div>
              <WidgetTitle>海灘貨幣發行量 (BCD)</WidgetTitle>
              <WidgetData>200000000</WidgetData>
            </div>
          </Widget>
        </Row>
        <TimeWrapper>
          <TimeText>距離投票截止時間還剩下</TimeText>
          <TimeHeadline>9 天 5 時 34 分 21 秒</TimeHeadline>
        </TimeWrapper>
      </Container>
      <div>Block Number: {blockNumber}</div>
      <div>ETH Balance: {ETHBalance ? amountFormatter(ETHBalance, 18) : '-'}</div>
      <div>BCD Balance: {BCDBalance ? amountFormatter(BCDBalance, 18) : '-'}</div>
      <div>BCD TotalSupply: {BCDTotalSupply ? amountFormatter(BCDTotalSupply, 18) : '-'}</div>
      <div>Total Donation: {totalDonation ? amountFormatter(totalDonation, 18) : '-'}</div>
      <div>Member Amount: {memberAmount ? memberAmount.toString() : '-'}</div>
      <div>Proposal Locations: {
        proposals.map((proposal, i) => <div key={i}>{proposal.location}</div>)
      }</div>
    </AppWrapper>
  )
}
