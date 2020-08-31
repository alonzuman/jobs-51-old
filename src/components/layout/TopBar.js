import React, { useEffect, useState } from 'react'
import { AppBar, Typography, Paper } from '@material-ui/core'
import { useSelector } from 'react-redux'
import BackButton from './BackButton'
import './TopBar.css'

const TopBar = ({ subtitle = '', title = '', children, backButton = false, sticky = false }) => {
  const { theme } = useSelector(state => state.theme)

  const containerStyle = {
    borderBottom: sticky ? `1px solid ${theme.palette.border.main}` : 'none'
  }

  const paperStyle = {
    backgroundColor: theme.palette.background.main
  }

  return (
    <AppBar elevation={0} style={containerStyle} className={`topbar__container ${sticky ? 'sticky' : 'relative'}`}>
      <Paper style={paperStyle} elevation={0} className='paper__background'>
        {backButton && <BackButton />}
        <div className={`margin__center max__width transparent top__row__container flex justify__between align__center full__width ${backButton ? '' : 'mt-3'}`}>
          <div>
            <Typography variant='h1'>{title}</Typography>
            <Typography variant='subtitle1'>{subtitle}</Typography>
          </div>
          { children }
        </div>
      </Paper>
    </AppBar>
  )
}

export default TopBar
