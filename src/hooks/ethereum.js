import { useMemo, useEffect, useState, useCallback } from 'react'
import { useWeb3Context } from 'web3-react'
import BigNumber from 'bignumber.js'
import { useBlockNumber } from '../contexts/application'
import { getContract, getGasPrice } from '../utils'
import { BCD_ADDRESSES } from '../constants'
import BCD_ABI from '../constants/abis/token.json'

export function useContract(address, abi, withSignerIfPossible = true) {
  const { account, library } = useWeb3Context()

  return useMemo(() => {
    try {
      return getContract(
        address,
        abi,
        library,
        withSignerIfPossible ? account : undefined,
      )
    } catch {
      return null
    }
  }, [address, abi, library, account, withSignerIfPossible])
}

export function useGasPrice() {
  const [level, setLevel] = useState('fast')
  const getPrice = useCallback(() => getGasPrice(level), [level])

  return { getPrice, setLevel }
}

export function useETHBalance() {
  const { account, library } = useWeb3Context()
  const blockNumber = useBlockNumber()
  const [balance, setBalance] = useState()

  useEffect(() => {
    library.eth
      .getBalance(account)
      .then(result => {
        setBalance(new BigNumber(result))
      })
      .catch(() => {
        setBalance()
      })
  }, [account, library, blockNumber])

  return balance
}

export function useBCDBalance() {
  const { account, networkId } = useWeb3Context()
  const blockNumber = useBlockNumber()
  const bcdContract = useContract(BCD_ADDRESSES[networkId], BCD_ABI)
  const [balance, setBalance] = useState()

  useEffect(() => {
    bcdContract.methods.balanceOf(account).call()
      .then(result => {
        setBalance(new BigNumber(result))
      })
      .catch(() => {
        setBalance()
      })
  }, [bcdContract, account, blockNumber])

  return balance
}

export function useBCDTotalSupply() {
  const { networkId } = useWeb3Context()
  const blockNumber = useBlockNumber()
  const bcdContract = useContract(BCD_ADDRESSES[networkId], BCD_ABI)
  const [totalSupply, setTotalSupply] = useState()

  useEffect(() => {
    bcdContract.methods.totalSupply().call()
      .then(result => {
        setTotalSupply(new BigNumber(result))
      })
      .catch(() => {
        setTotalSupply()
      })
  }, [bcdContract, blockNumber])

  return totalSupply
}
