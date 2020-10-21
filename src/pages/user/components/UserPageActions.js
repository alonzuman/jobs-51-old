import { Button, CircularProgress, Divider } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { checkPermissions } from '../../../utils'

const Container = styled.div`
  padding: 0 16px;
  margin-bottom: 96px;
`

const UserPageActions = ({ updateAction, deleteAction, editing, isUpdating, isDeleting }) => {
  const { translation } = useSelector(state => state.theme)
  const { role } = useSelector(state => state.auth)

  if (editing) {
    return (
      <Container>
        <Divider />
        <br />
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
  } else {
    return null
  }
}

export default UserPageActions
