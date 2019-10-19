import { useEffect, useState } from 'react'
import { useWeb3Context } from 'web3-react'
import BigNumber from 'bignumber.js'
import { useBlockNumber } from '../contexts/application'
import { useContract } from './ethereum'
import { DAO_ADDRESSES, DAO_FROM_BLOCK } from '../constants'
import DAO_ABI from '../constants/abis/dao.json'

export function useDAOContract() {
  const { networkId } = useWeb3Context()
  return useContract(DAO_ADDRESSES[networkId], DAO_ABI)
}

export function useDAOTotalDonation() {
  const blockNumber = useBlockNumber()
  const daoContract = useDAOContract()
  const [totalDonation, setTotalDonation] = useState()

  useEffect(() => {
    daoContract.methods.totalDonation().call()
      .then(result => {
        setTotalDonation(new BigNumber(result))
      })
      .catch(() => {
        setTotalDonation()
      })
  }, [daoContract, blockNumber])

  return totalDonation
}

export function useDAOMemberAmount() {
  const blockNumber = useBlockNumber()
  const daoContract = useDAOContract()
  const [amount, setAmount] = useState()

  useEffect(() => {
    daoContract.getPastEvents('Donated', {
      fromBlock: DAO_FROM_BLOCK
    })
      .then(events => {
        return events
          .map(event => event.returnValues.donator)
          .filter((address, i, arr) => arr.indexOf(address) === i)
          .length
      })
      .then(result => {
        setAmount(new BigNumber(result))
      })
      .catch(() => {
        setAmount()
      })
  }, [daoContract, blockNumber])

  return amount
}

export function useDAOProposals() {
  const blockNumber = useBlockNumber()
  const daoContract = useDAOContract()
  const [proposals, setProposals] = useState([])

  useEffect(() => {
    daoContract.methods.numProposals().call()
      .then(numProposals => {
        return Promise.all([
          ...Array(numProposals.toNumber()).fill(0).map((_, i) => {
            return daoContract.methods.proposals(i).call()
          })
        ])
      })
      .then(proposals => {
        return proposals.map(proposal => ({
          location: proposal.location,
          description: proposals.description,
          startTime: new BigNumber(proposal.startTime).toNumber(),
          isPassed: proposal.proposalPassed
        }))
      })
      .then(result => {
        setProposals(result)
      })
      .catch(() => {
        setProposals([])
      })
  }, [daoContract, blockNumber])

  return proposals
}
