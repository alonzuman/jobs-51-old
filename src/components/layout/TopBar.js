import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Paper } from '@material-ui/core'
import { useSelector } from 'react-redux'
import BackButton from './BackButton'
import './TopBar.css'
import styled from 'styled-components'

const TopbarContainer = styled.div`
  display: flex;
  background-color: ${props => props.backgroundColor};
  position: ${props => props.sticky ? `1px solid ${props.borderColor}` : 'none'};
`

const TopBar = ({ actionOnClick, subtitle = '', title = '', children, backButton = false, sticky = false, action }) => {
  const { theme } = useSelector(state => state.theme)
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
    return () => window.removeEventListener('resize', () => setWidth(window.innerWidth))
  }, [])

  return (
    <TopbarContainer
      sticky={sticky}
      borderColor={theme?.palette?.border?.main}
      backgroundColor={theme?.palette?.background?.light}
      elevation={0}
      className={`topbar__container ${sticky ? "sticky" : "relative"}`}
    >
      <div className={`flex align__center ${width > 768 ? '' : 'justify__between'}`}>
        {backButton && <BackButton />}
        <span onClick={actionOnClick}>{action}</span>
      </div>
      <div className={`margin__center max__width transparent top__row__container flex justify__between align__center full__width ${backButton ? "" : "mt-3"}`}>
        <div>
          <Typography variant="h1">{title}</Typography>
          <Typography variant="subtitle1">{subtitle}</Typography>
        </div>
        {children}
      </div>
    </TopbarContainer>
  );
}

export default TopBar
