import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'

const Activity = styled.div`
  flex-direction: column
  background-color: #FFFFFF
  display: flex
  box-shadow: 0 2px 6px #b5b5b5
  border-radius: 8px
  box-sizing: border-box
  margin: 20px 0
`

const Title = styled.div`
  padding: 10px
  font-weight: 600;
  background-color: rgb(238, 237, 244)
`

const Body = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`

const Description = styled.div``
const Location = styled.div``
const StartDateTimeBox = styled.div``

const Participants = styled.div`
  display: flex;
  flex-direction: column;
  
  > *:not(:first-child) {
    margin-top: 1rem;
  }
`

const Count = styled.div`
  text-align:center
  font-size:24px
  `
const Voters = styled.div`
  display: flex;
  flex-direction: column;

  > *:not(:first-child) {
    margin-top: 1rem;
  }
`
const IsPassed = styled.div``
const NotPassed = styled.div`
  display: flex;
`
const LeftBox = styled.div`
  display: flex;
  
  > *:not(:first-child) {
    margin-left: 2rem;
  }
`
const RightBox = styled.div`
  width: 300px;
`
const useStyles = makeStyles({
  button: {
    background: '#2377E3',
    border: 0,
    borderRadius: 20,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 40,
  },
});


export default function ActivityItem(props) {
  const classes = useStyles()

  const startDateTime = moment(props.startDateTime * 1000).format(
    'YYYY/MM/DD A hh:mm',
  )
  const endVoteDateTime = moment(props.endVoteDateTime * 1000).format(
    'YYYY/MM/DD A hh:mm',
  )
  return (
    <Activity>
      <Title>{props.name}</Title>
      <Body>
        <LeftBox>
          <Participants>
            <Count>{props.participants + '人'}</Count>
            {props.isPassed ? (
              ''
            ) : (
              <Button className={classes.button}>
                報名
              </Button>
            )}
          </Participants>
          <Voters>
            <Count>{props.voters + '票'}</Count>
            {props.isPassed ? (
              ''
            ) : (
              <Button className={classes.button}>
                投票
              </Button>
            )}
          </Voters>
        </LeftBox>
        <RightBox>
          <Description>{'活動說明: ' + props.desc}</Description>
          <Location>{'活動地點: ' + props.location}</Location>
          <StartDateTimeBox>{'活動時間: ' + startDateTime}</StartDateTimeBox>

          {props.isPassed ? (
            <IsPassed>
              {
                ('活動結束',
                props.isRewarded ? (
                  '已領取'
                ) : (
                  <Button className={classes.button}>
                    領取
                  </Button>
                ))
              }
            </IsPassed>
          ) : (
            ''
          )}
        </RightBox>
      </Body>
    </Activity>
  )
}
