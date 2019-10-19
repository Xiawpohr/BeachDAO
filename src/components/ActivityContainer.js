import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import ActivityItem from './ActivityItem'
import { useDAOProposals } from '../hooks/dao'

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
    backgroundColor: 'transparent',
  },
}))

export default function SimpleTabs() {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const proposals = useDAOProposals()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  
  const passedActivities = [
    {
      id: '3',
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
      id: '4',
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
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        aria-label='simple tabs example'
        centered
      >
        <Tab label='所有活動' {...a11yProps(0)} />
        <Tab label='已參加活動' {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {!!proposals.length && proposals.map(activity => (
          <ActivityItem key={activity.id} {...activity} />
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {passedActivities.map(activity => (
          <ActivityItem key={activity.id} {...activity} />
        ))}
      </TabPanel>
    </div>
  )
}
