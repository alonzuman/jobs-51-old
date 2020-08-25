import React, { useState } from 'react'
import { Button, Switch, Box, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { signOut, setTheme } from '../../actions'
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { Redirect } from 'react-router-dom';

const Settings = () => {
  const { authenticated } = useSelector(state => state.auth)
  const { translation, theme } = useSelector(state => state.theme)
  const [checked, setChecked] = useState(theme.palette.type === 'dark')
  const dispatch = useDispatch()

  const handleCheck = () => {
    setChecked(!checked)
    dispatch(setTheme())
  }

  const handleSignOut = () => {
    dispatch(signOut())
  }

  return (
    <div>
      <br />
      <Typography variant='body2'>{translation.displaySettings}</Typography>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <Brightness4Icon style={{color: theme.typography.body1.color }}  />
        <Switch color='primary' checked={checked} onChange={handleCheck} />
      </Box>
      <br />
      <br />
      {authenticated && <Button className='button-style' color='primary' variant='outlined' onClick={handleSignOut}>{translation.signOut}</Button>}
    </div>
  )
}

export default Settings
