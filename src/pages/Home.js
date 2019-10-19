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
