import React, { useState } from 'react'
import { useWeb3Context } from 'web3-react'
import BigNumber from 'bignumber.js'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDateTimePicker,
} from '@material-ui/pickers'
import { useDAOLauchActivity } from '../hooks/dao'

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

export default function LauchActivityModal(props) {
  const { open, handleClose } = props
  const { account } = useWeb3Context()
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)

  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [startTime, setStartTime] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date())

  const lauchActivity = useDAOLauchActivity()

  const isConnected = !!account

  const onClick = () => {
    if (location && description && startTime && endTime && isConnected) {
      const startTimeParsed = new BigNumber(Date.parse(startTime) / 1000).toFixed(0)
      const endTimeParsed = new BigNumber(Date.parse(endTime) / 1000).toFixed(0)

      lauchActivity(startTimeParsed, endTimeParsed, location, description)
      handleClose()
    }
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <form style={modalStyle} className={classes.paper}>
        <Title>新增活動</Title>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDateTimePicker
            disableToolbar
            variant='outlined'
            margin='normal'
            id='date-picker-inline'
            label='活動開始時間'
            value={startTime}
            onChange={(date) => { setStartTime(date)}}
          />
          <KeyboardDateTimePicker
            disableToolbar
            variant='outlined'
            margin='normal'
            id='date-picker-inline'
            label='活動結束時間'
            value={endTime}
            onChange={(date) => { setEndTime(date)}}
          />
        </MuiPickersUtilsProvider>
        <TextField
          id='outlined-location'
          label='地點'
          className={classes.textField}
          value={location}
          onChange={(event) => { setLocation(event.target.value) }}
          style={{ margin: '20px' }}
          variant='outlined'
        />
        <TextField
          id='outlined-description'
          label='描述'
          className={classes.textField}
          value={description}
          onChange={(event) => { setDescription(event.target.value) }}
          style={{ margin: '20px' }}
          variant='outlined'
        />
        <Button
          style={buttonStyle}
          variant='contained'
          color='primary'
          onClick={onClick}
          disabled={!isConnected}
        >
          新增
        </Button>
      </form>
    </Modal>
  )
}