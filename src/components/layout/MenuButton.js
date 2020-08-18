import React, { useState } from 'react'
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

// Icons
import FavoriteIcon from '@material-ui/icons/Favorite'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings'

// Mui
import { Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { openAddingJob, openSettings, openSigningIn, openSavedDialog, openEditingProfile } from '../../actions';

const MenuButton = () => {
  const { translation } = useSelector(state => state.theme)
  const { authenticated } = useSelector(state => state.auth)
  const authState = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const actions = [
    { icon: <Avatar src={authState?.avatar} alt={authState?.firstName}/>, name: translation.editProfile, handleClick: authenticated ? () => dispatch(openEditingProfile()) : () => dispatch(openSigningIn()) },
    { icon: <AddIcon />, name: translation.addJob, handleClick: () => dispatch(openAddingJob()) },
    { icon: <SettingsIcon />, name: translation.settings, handleClick: () => dispatch(openSettings()) },
    { icon: <FavoriteIcon />, name: translation.savedJobs, icon: <FavoriteIcon />, handleClick: () => dispatch(openSavedDialog()) },
  ]

  const speedDialStyle = {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem'
  }

  return (
    <SpeedDial
      style={speedDialStyle}
      ariaLabel="SpeedDial openIcon example"
      icon={<SpeedDialIcon icon={authenticated ? <MenuIcon /> : <AccountCircleIcon />} openIcon={authenticated ? <CloseIcon /> : <AccountCircleIcon />} />}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      onClick={() => !authenticated && dispatch(openSigningIn())}
      open={open}
    >
      {authenticated && actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          onClick={action.handleClick}
          tooltipTitle={action.name}
          onClick={action.handleClick}
        />
      ))}
    </SpeedDial>
  )
}

export default MenuButton
