import React, { useState } from 'react'
import { Button, Switch, Box, Typography, FormControl } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { signOut, setTheme } from '../../actions'
import Brightness4Icon from '@material-ui/icons/Brightness4';
import PaperContainer from '../layout/PaperContainer';

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
    <PaperContainer>
      <Typography variant='body2'>{translation.displaySettings}</Typography>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <Brightness4Icon style={{color: theme.typography.body1.color }}  />
        <Switch color='primary' checked={checked} onChange={handleCheck} />
      </Box>
      <br />
      <FormControl className='mb-0'>
        {authenticated && <Button className='button-style' color='primary' variant='outlined' onClick={handleSignOut}>{translation.signOut}</Button>}
      </FormControl>
    </PaperContainer>
  )
}

export default Settings
