import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useETHBalance, useBCDBalance, useBCDTotalSupply } from '../hooks/ethereum'
import {
  useDAOTotalDonation,
  useDAOMemberAmount,
  useDAOProposals,
  useDAOIsOpenVote,
  useDAOStartVoteTime
} from '../hooks/dao'
import { amountFormatter } from '../utils'
import Header from '../components/Header'
import ActivityContainer from '../components/ActivityContainer'

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
  const BCDBalance = useBCDBalance()
  const BCDTotalSupply = useBCDTotalSupply()
  const totalDonation = useDAOTotalDonation()
  const memberAmount = useDAOMemberAmount()
  const isOpenVote = useDAOIsOpenVote()
  const startVoteTime = useDAOStartVoteTime()

  const leftTime = useMemo(() => {
    if (startVoteTime) {
      return startVoteTime.plus(864000).minus(Date.now() / 1000)
    } else {
      return null
    }
  }, [startVoteTime])

  const leftDays = useMemo(() => {
    if (leftTime) {
      return Math.floor(leftTime.div(86400).toNumber())
    } else {
      return null
    }
  }, [leftTime])

  const leftHours = useMemo(() => {
    if (leftTime && leftDays) {
      return Math.floor((leftTime.minus(leftDays * 86400)).div(3600).toNumber())
    } else {
      return null
    }
  }, [leftTime, leftDays])

  const leftMinutes = useMemo(() => {
    if (leftTime && leftDays && leftHours) {
      return Math.floor(
        (leftTime.minus(leftDays * 86400).minus(leftHours * 3600)).div(60).toNumber()
      )
    } else {
      return null
    }
  }, [leftTime, leftDays, leftHours])

  const leftSeconds = useMemo(() => {
    if (leftTime && leftDays && leftHours && leftMinutes) {
      return Math.floor(
        (leftTime.minus(leftDays * 86400).minus(leftHours * 3600).minus(leftMinutes * 60)).toNumber()
      )
    }
  }, [leftTime, leftDays, leftHours, leftMinutes])

  // const proposals = useDAOProposals()

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
            <WidgetData>{totalDonation ? amountFormatter(totalDonation, 18, 2) : '-'}</WidgetData>
          </Widget>
          <Widget>
            <div>
              <WidgetTitle>個人餘額 (BCD)</WidgetTitle>
              <WidgetSubTitle>參加淨灘活動，保護海灘健康，就可以獲得海灘貨幣</WidgetSubTitle>
            </div>
            <WidgetData>{BCDBalance ? amountFormatter(BCDBalance, 18, 2) : '-'}</WidgetData>
          </Widget>
        </Row>
        <Row>
          <Widget>
            <div>
              <WidgetTitle>捐款人數</WidgetTitle>
              <WidgetData>{memberAmount ? memberAmount.toString() : '-'}</WidgetData>
            </div>
          </Widget>
          <Widget>
            <div>
              <WidgetTitle>海灘貨幣發行量 (BCD)</WidgetTitle>
              <WidgetData>{BCDTotalSupply ? amountFormatter(BCDTotalSupply, 18) : '-'}</WidgetData>
            </div>
          </Widget>
        </Row>
        {
          isOpenVote && (
            <TimeWrapper>
              <TimeText>距離投票截止時間還剩下</TimeText>
              <TimeHeadline>{leftDays} 天 {leftHours} 時 {leftMinutes} 分 {leftSeconds} 秒</TimeHeadline>
            </TimeWrapper>
          )
        }
        <Row>
          <ActivityContainer />
        </Row>
      </Container>
    </AppWrapper>
  )
}
