import { Button, CircularProgress, Divider } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
  padding: 0 16px;
  margin-bottom: 96px;
`

const UserPageApproveUpdate = ({ action, editing, loading }) => {
  const { translation } = useSelector(state => state.theme)

  if (editing) {
    return (
      <Container>
        <Divider />
        <br />
        <Button disabled={loading}
          onClick={action}
          size='large'
          color='primary'
          variant='contained'
        >{loading ? <CircularProgress className='button-spinner' /> : translation.update}</Button>
      </Container>
    )
  } else {
    return null
  }
}

export default UserPageApproveUpdate
