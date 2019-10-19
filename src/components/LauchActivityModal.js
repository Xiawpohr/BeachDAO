import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'

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
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [values, setValues] = useState({
    location: '',
    startTime: '2019-10-20T10:30',
    endTime: '2019-10-21T10:30',
    description: '',
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <form style={modalStyle} className={classes.paper}>
        <Title>新增活動</Title>
        <TextField
          id='datetime-start'
          label='活動開始時間'
          type='datetime-local'
          style={{ margin: '20px' }}
          defaultValue={values.startTime}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id='datetime-end'
          label='活動結束時間'
          type='datetime-local'
          style={{ margin: '20px' }}
          defaultValue={values.endTime}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id='outlined-location'
          label='地點'
          className={classes.textField}
          value={values.location}
          onChange={handleChange('name')}
          style={{ margin: '20px' }}
          variant='outlined'
        />
        <TextField
          id='outlined-description'
          label='描述'
          className={classes.textField}
          value={values.description}
          onChange={handleChange('description')}
          style={{ margin: '20px' }}
          variant='outlined'
        />
        <Button
          style={buttonStyle}
          variant='contained'
          color='primary'
          onClick={handleClose}
        >
          新增
        </Button>
      </form>
    </Modal>
  )
}