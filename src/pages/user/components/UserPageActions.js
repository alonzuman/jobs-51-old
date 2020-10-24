import { Button, CircularProgress, Divider } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import useWindowSize from '../../../hooks/useWindowSize'
import { checkPermissions } from '../../../utils'

const Container = styled.div`
  position: fixed;
  bottom: 0;
  padding: 8px 32px 16px 32px;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 99;
  background-color: ${props => props.backgroundColor};

  @media (width: 375px) {
    padding: 16px 16px 32px 16px;
  }

  @media (min-width: 768px) {
    padding: 16px;
    position: relative;
    margin-bottom: 96px;
    background-color: transparent;
  }
`

const UserPageActions = ({ loading, updateAction, deleteAction, editing, isUpdating, isDeleting }) => {
  const { translation, theme } = useSelector(state => state.theme)
  const { role } = useSelector(state => state.auth)
  const { windowWidth } = useWindowSize()

  if (loading || !editing) {
    return null
  } else {
    return (
      <Container backgroundColor={theme?.palette?.background?.paper}>
        {windowWidth > 768 && <Divider className='mb-1' />}
        <Button
          disabled={isDeleting || isUpdating}
          onClick={updateAction}
          size='large'
          color='primary'
          variant='contained'
        >{isUpdating ? <CircularProgress className='button-spinner' /> : translation.update}
        </Button>
        {checkPermissions(role) >= 3 &&
          <Button
            disabled={isDeleting || isUpdating}
            onClick={deleteAction}
            className='mr-5'
            size='large'
            variant='outlined'
          >{isDeleting ? <CircularProgress className='button-spinner' /> : translation.deleteUser}
          </Button>}
      </Container>
    )
  }
}

export default UserPageActions
