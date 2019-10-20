import { useEffect, useState, useCallback } from 'react'
import { useWeb3Context } from 'web3-react'
import BigNumber from 'bignumber.js'
import { useBlockNumber } from '../contexts/application'
import { useContract, useGasPrice } from './ethereum'
import ACTIVITY_ABI from '../constants/abis/activity.json'

export function useActivityContract(address) {
  return useContract(address, ACTIVITY_ABI)
}

export function useActivityParticipientAmount(address) {
  const blockNumber = useBlockNumber()
  const activityContract = useActivityContract(address)
  const [amount, setAmount] = useState()

  useEffect(() => {
    if (activityContract) {
      activityContract.getPastEvents('Joint')
        .then(events => {
          return events
            .map(event => event.returnValues.participient)
            .filter((participient, i, arr) => arr.indexOf(participient) === i)
            .length
        })
        .then(result => {
          setAmount(new BigNumber(result))
        })
        .catch(() => {
          setAmount()
        })
    }
  }, [activityContract, blockNumber])

  return amount
}

export function useActivityIsConfirmed(address) {
  const blockNumber = useBlockNumber()
  const activityContract = useActivityContract(address)
  const [isConfirmed, setIsConfirmed] = useState(false)

  useEffect(() => {
    activityContract.methods.confirmed().call()
      .then(result => {
        setIsConfirmed(result)
      })
      .catch(() => {
        setIsConfirmed()
      })
  }, [activityContract, blockNumber])

  return isConfirmed
}

export function useActivityJoin(address) {
  const { account } = useWeb3Context()
  const { getPrice } = useGasPrice()
  const activityContract = useActivityContract(address)

  return useCallback(async (name) => {
    if (address) {
      const join = activityContract.methods.join(name)
      const estimatedGas = await join.estimateGas()
      const gas = new BigNumber(estimatedGas).times(1.5).toFixed(0)
      const gasPrice = await getPrice()
  
      return join.send({
        from: account,
        gas,
        gasPrice,
      })
    }
  }, [address, activityContract, account, getPrice])
}

export function useActivityReward(address) {
  const { account } = useWeb3Context()
  const { getPrice } = useGasPrice()
  const activityContract = useActivityContract(address)

  return useCallback(async () => {
    const reward = activityContract.methods.getRewards()
    const estimatedGas = await reward.estimateGas()
    const gas = new BigNumber(estimatedGas).times(1.5).toFixed(0)
    const gasPrice = await getPrice()

    return reward.send({
      from: account,
      gas,
      gasPrice,
    })
  }, [activityContract, account, getPrice])
}
