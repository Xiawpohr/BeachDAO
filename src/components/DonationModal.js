import React, { useState } from 'react'
import { useWeb3Context } from 'web3-react'
import BigNumber from 'bignumber.js'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import { useDAODonate } from '../hooks/dao'

const Title = styled.div`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`

function getModalStyle() {
  const top = 20
  const left = 50

  return {
    top: `${top}%`,
    left: `calc(${left}% - 235px)`,
  }
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '25px 40px 30px',
    display: 'flex',
    flexDirection: 'column',
  },
}))

const buttonStyle = {
  marginTop: '20px',
  width: '150px',
  marginLeft: 'auto',
  marginRight: 'auto',
  height: '50px',
}

export default function DonationModal(props) {
  const { open, handleClose } = props
  const { account } = useWeb3Context()
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [amount, setAmount] = useState('')
  const [name, setName] = useState('')

  const isConnected = !!account
  const donate = useDAODonate()

  const onClick = () => {
    if (name && amount && isConnected) {
      const value = new BigNumber(amount).times(1e+18).toFixed(0)
      donate(name, value)
      handleClose()
    }
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <form
        style={modalStyle}
        className={classes.paper}
      >
        <Title>捐款</Title>
        <TextField
          id='name'
          label='你的名字'
          className={classes.textField}
          style={{ margin: '20px' }}
          variant='outlined'
          value={name}
          onChange={event => { setName(event.target.value) }}
        />
        <TextField
          id='amount'
          label='金額'
          className={classes.textField}
          style={{ margin: '20px' }}
          variant='outlined'
          value={amount}
          onChange={event => { setAmount(event.target.value) }}
          InputProps={{
            endAdornment: <InputAdornment position="end">ETH</InputAdornment>,
          }}
        />
        <Button
          type='submit'
          style={buttonStyle}
          variant='contained'
          color='primary'
          onClick={onClick}
          disabled={!isConnected}
        >
          捐款
        </Button>
      </form>
    </Modal>
  )
}