import React, { useState } from 'react'
import { Button, Switch, Box, Typography, FormControl, Paper } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { signOut, setTheme } from '../../actions'
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { Link } from 'react-router-dom';

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

  const privacyPolicyStyle = {
    position: 'absolute',
    bottom: '5.5rem',
    left: '50%',
    transform: 'translate(-50%, 0)'
  }

  return (
    <>
      <Typography variant='body2'>{translation.displaySettings}</Typography>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <Brightness4Icon style={{color: theme.typography.body1.color }}  />
        <Switch color='primary' checked={checked} onChange={handleCheck} />
      </Box>
      <br />
      <FormControl className='mb-0'>
        {authenticated && <Button className='button-style' color='primary' variant='outlined' onClick={handleSignOut}>{translation.signOut}</Button>}
      </FormControl>
      <Link style={privacyPolicyStyle} to='/privacy-policy'>
        <Typography variant='body1'>
          {translation.privacyPolicy}
        </Typography>
      </Link>
    </>
  )
}

export default Settings
