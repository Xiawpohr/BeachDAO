import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { Activity } from './Activity'
import Modal from './Modal'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}))

export default function SimpleTabs() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const notPassedActivities = [
    {
      name: '淨灘活動',
      desc: '',
      location: '台北',
      startDateTime: 1569915268,
      endVoteDateTime: 1569915268,
      isVoted: false,
      participants: 8,
      voters: 10,
      isPassed: false,
      isRewarded: false,
      isElected: false,
    },
    {
      name: '淨灘活動',
      desc: '',
      location: '台中',
      startDateTime: 1569915268,
      endVoteDateTime: 1569915268,
      isVoted: true,
      participants: 3,
      voters: 5,
      isPassed: false,
      isRewarded: false,
      isElected: true,
    },
  ]
  const passedActivities = [
    {
      name: '淨灘活動',
      desc: '',
      location: '宜蘭',
      startDateTime: 1569915268,
      endVoteDateTime: 1569915268,
      isVoted: false,
      participants: 10,
      voters: 10,
      isPassed: true,
      isRewarded: true,
      isElected: false,
    },
    {
      name: '淨灘活動',
      desc: '',
      location: '高雄',
      startDateTime: 1569915268,
      endVoteDateTime: 1569915268,
      isVoted: true,
      participants: 10,
      voters: 10,
      isPassed: true,
      isRewarded: false,
      isElected: false,
    },
  ]
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'
        >
          <Tab label='可報名活動' {...a11yProps(0)} />
          <Tab label='已參加活動' {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <Modal />
      <TabPanel value={value} index={0}>
        {notPassedActivities.map(activity => (
          <Activity {...activity} />
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {passedActivities.map(activity => (
          <Activity {...activity} />
        ))}
      </TabPanel>
    </div>
  )
}
