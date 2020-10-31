import { Button, CircularProgress, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../../../actions/users'
import UsersList from '../../../../v2/organisms/UsersList'
import Container from '../../../../v2/atoms/Container'
import PageSection from '../../../../v2/atoms/PageSection'
import PageHeader from '../../../../v2/organisms/PageHeader'

const RegionUsers = ({ match }) => {
  const { region } = match.params;
  const { translation } = useSelector(state => state.theme)
  const { users, loading, noMoreResults, loadingMore } = useSelector(state => state.users)
  const query = {
    region,
    role: 'user'
  }
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers(query))
  }, [region])

  const loadMoreUsers = () => {
    const last = users[users?.length - 1];
    dispatch(getUsers(query, last))
  }

  return (
    <Container>
      <PageSection>
        <PageHeader
          title={<>{translation.manageRegionUsers} <span className='primary__color'>{region}</span></>}
          backButton
        />
      </PageSection>
      <PageSection>
        <UsersList loading={loading} users={users} />
      </PageSection>
      <PageSection className='flex align__center justify__center mt-1'>
        {users?.length !== 0 && noMoreResults && <Typography variant='body1'>{translation.noMoreResults}</Typography>}
        {users?.length >= 10 && !noMoreResults && <Button onClick={loadMoreUsers}>{loadingMore ? <CircularProgress color='primary' style={{ height: 24, width: 24 }} /> : translation.loadMore}</Button>}
      </PageSection>
    </Container>
  )
}

export default RegionUsers
