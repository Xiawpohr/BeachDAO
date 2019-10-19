import { useEffect, useState, useCallback } from 'react'
import { useWeb3Context } from 'web3-react'
import BigNumber from 'bignumber.js'
import { useBlockNumber } from '../contexts/application'
import { useContract, useGasPrice } from './ethereum'
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
        return proposals.map((proposal, i) => ({
          id: i,
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

export function useDAOIsOpenVote() {
  const blockNumber = useBlockNumber()
  const daoContract = useDAOContract()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    daoContract.methods.isOpenVote().call()
      .then(result => {
        setIsOpen(result)
      })
      .catch(() => {
        setIsOpen(false)
      })
  }, [daoContract, blockNumber])

  return isOpen
}

export function useDAOStartVoteTime() {
  const blockNumber = useBlockNumber()
  const daoContract = useDAOContract()
  const [startVoteTime, setStartVoteTime] = useState()

  useEffect(() => {
    daoContract.methods.startVoteTime().call()
      .then(result => {
        setStartVoteTime(new BigNumber(result))
      })
      .catch(() => {
        setStartVoteTime()
      })
  }, [daoContract, blockNumber])

  return startVoteTime
}

export function useDAODonate() {
  const { account } = useWeb3Context()
  const { getPrice } = useGasPrice()
  const daoContract = useDAOContract()

  return useCallback(async (name) => {
    const donate = daoContract.methods.donate(name)
    const estimatedGas = await donate.estimateGas()
    const gas = new BigNumber(estimatedGas).times(1.5).toFixed(0)
    const gasPrice = await getPrice()

    return donate.send({
      from: account,
      gas,
      gasPrice,
    })
  }, [daoContract, account, getPrice])
}

export function useDAOLauchActivity() {
  const { account } = useWeb3Context()
  const { getPrice } = useGasPrice()
  const daoContract = useDAOContract()

  return useCallback(async (startTime, endTime, location, description) => {
    const lauchActivity = daoContract.methods.newProposal(startTime, endTime, location, description)
    const estimatedGas = await lauchActivity.estimateGas()
    const gas = new BigNumber(estimatedGas).times(1.5).toFixed(0)
    const gasPrice = await getPrice()

    return lauchActivity.send({
      from: account,
      gas,
      gasPrice
    })
  }, [daoContract, account, getPrice])
}

export function useDAOVote() {
  const { account } = useWeb3Context()
  const { getPrice } = useGasPrice()
  const daoContract = useDAOContract()

  return useCallback(async (proposalId) => {
    const vote = daoContract.methods.vote(proposalId)
    const estimatedGas = await vote.estimateGas()
    const gas = new BigNumber(estimatedGas).times(1.5).toFixed(0)
    const gasPrice = await getPrice()

    return vote.send({
      from: account,
      gas,
      gasPrice
    })
  }, [daoContract, account, getPrice])
}
