import React from 'react'
import { useBlockNumber } from '../contexts/application'
import { useETHBalance, useBCDBalance, useBCDTotalSupply } from '../hooks/ethereum'
import { useDAOTotalDonation, useDAOMemberAmount } from '../hooks/dao'
import { amountFormatter } from '../utils'

export default function Home() {
  const blockNumber = useBlockNumber()
  const ETHBalance = useETHBalance()
  const BCDBalance = useBCDBalance()
  const BCDTotalSupply = useBCDTotalSupply()
  const totalDonation = useDAOTotalDonation()
  const memberAmount = useDAOMemberAmount()

  return (
    <>
      <div>Block Number: {blockNumber}</div>
      <div>ETH Balance: {ETHBalance ? amountFormatter(ETHBalance, 18) : '-'}</div>
      <div>BCD Balance: {BCDBalance ? amountFormatter(BCDBalance, 18) : '-'}</div>
      <div>BCD TotalSupply: {BCDTotalSupply ? amountFormatter(BCDTotalSupply, 18) : '-'}</div>
      <div>Total Donation: {totalDonation ? amountFormatter(totalDonation, 18) : '-'}</div>
      <div>Member Amount: {memberAmount ? memberAmount.toString() : '-'}</div>
    </>
  )
}
