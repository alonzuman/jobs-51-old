import React, { useState } from 'react'
import { Button, Switch, Box, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { signOut, setTheme } from '../../actions'
import Brightness4Icon from '@material-ui/icons/Brightness4';

const Settings = () => {
  const { authenticated } = useSelector(state => state.auth)
  const { translation, theme } = useSelector(state => state.theme)
  const [checked, setChecked] = useState(theme.palette.type === 'dark')
  const dispatch = useDispatch()

  const handleCheck = () => {
    setChecked(!checked)
    dispatch(setTheme())
  }

  return (
    <div>
      <Typography variant='body2'>{translation.displaySettings}</Typography>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <Brightness4Icon />
        <Switch color='primary' checked={checked} onChange={handleCheck} />
      </Box>
      <br />
      <br />
      {authenticated && <Button className='button-style' color='primary' variant='outlined' onClick={() => dispatch(signOut())}>{translation.signOut}</Button>}
    </div>
  )
}

export default Settings
