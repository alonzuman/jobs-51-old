import React from 'react'
import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import BackButton from '../../v2/atoms/BackButton'
import styled from 'styled-components'

const TopbarContainer = styled.div`
  display: flex;
  background-color: ${props => props.backgroundColor};
  position: ${props => props.sticky ? `1px solid ${props.borderColor}` : 'none'};
  position: ${props => props.sticky ? 'sticky' : 'relative'};
  flex-direction: column;
  `

  const ItemsContainer = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TopBar = ({ actionOnClick, subtitle = '', title = '', children, backButton = false, sticky = false, action }) => {
  const { theme } = useSelector(state => state.theme)

  return (
    <TopbarContainer
      sticky={sticky}
      borderColor={theme?.palette?.border?.main}
      backgroundColor={theme?.palette?.background?.light}
      elevation={0}
    >
      <div className='flex align__center justify__between'>
        {backButton && <BackButton />}
        <span onClick={actionOnClick}>{action}</span>
      </div>
      <ItemsContainer>
        <div>
          <Typography className='p-0' variant="h1">{title}</Typography>
          <Typography variant="subtitle1">{subtitle}</Typography>
        </div>
        {children}
      </ItemsContainer>
    </TopbarContainer>
  );
}

export default TopBar
