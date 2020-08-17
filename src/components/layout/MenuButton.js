import React, { useState } from 'react'
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

// Icons
import FavoriteIcon from '@material-ui/icons/Favorite'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings'

// Mui
import { Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { openAddingJob, openSettings, openSigningIn, openSavedDialog } from '../../actions';

const MenuButton = () => {
  const { authenticated, avatar, firstName } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const actions = [
    { icon: <Avatar src={avatar} alt={firstName}/>, name: 'Profile', handleClick: () => dispatch(openSigningIn()) },
    { icon: <AddIcon />, name: 'Add', handleClick: () => dispatch(openAddingJob()) },
    { icon: <SettingsIcon />, name: 'Settings', handleClick: () => dispatch(openSettings()) },
    { icon: <FavoriteIcon />, name: 'Like', icon: <FavoriteIcon />, handleClick: () => dispatch(openSavedDialog()) },
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
      icon={<SpeedDialIcon icon={<MenuIcon />} openIcon={<CloseIcon />} />}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      {actions.map((action) => (
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
