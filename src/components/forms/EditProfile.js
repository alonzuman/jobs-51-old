import React, { useState } from 'react'
import UserDetails from './profile/UserDetails'
import PersonalDetails from './profile/PersonalDetails'
import { Tabs, Tab, Container, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import Settings from './Settings'
import TopBar from '../layout/TopBar'
import { setAlert } from '../../actions'

const EditProfile = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState(0)
  const { translation } = useSelector(state => state.theme)
  const handleValueChange = (newValue) => setValue(newValue)

  return (
    <>
      <TopBar title={translation.myProfile}>
        <Tabs style={{width: '100%'}} indicatorColor='primary' value={value}>
          <Tab label={translation.userDetails} onClick={() => handleValueChange(0)} />
          <Tab label={translation.personalDetails} onClick={() => handleValueChange(1)}  />
          <Tab label={translation.settings} onClick={() => handleValueChange(2)}  />
        </Tabs>
      </TopBar >
      <Container>
        {value === 0 && <UserDetails />}
        {value === 1 && <PersonalDetails />}
        {value === 2 && <Settings />}
      </Container>
      <Button onClick={() => dispatch({
        type: 'SET_ALERT',
        payload: {
          type: 'error',
          msg: 'tf'
        }
        }
      )}>Hi</Button>
    </>
  )
}

export default EditProfile
