import React, { useEffect, useState } from 'react'
import Container from '../../../../v2/atoms/Container'
import PageHeader from '../../../../v2/organisms/PageHeader'
import UsersFilter from './components/UsersFilter'
import qs from 'query-string'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../../../actions/users'
import UsersList from '../../../../v2/organisms/UsersList'
import PageSection from '../../../../v2/atoms/PageSection'
import Table from '../../../../v2/organisms/Table'
import { Button, CircularProgress, Typography } from '@material-ui/core'

const Users = () => {
  const [view, setView] = useState('list')
  const [data, setData] = useState([])
  const { loading, users, loadingMore, noMoreResults } = useSelector(state => state.users)
  const { translation } = useSelector(state => state.theme)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    const { search } = history.location
    const parsedQuery = qs.parse(search)
    dispatch(getUsers(parsedQuery))
  }, [history.location.search])

  const handleView = () => {
    setView(view => view === 'list' ? 'table' : 'list')
  }

  const mapData = () => {
    if (users) {
      let arrayHeaders = [
        translation['firstName'],
        translation['lastName'],
        translation['region'],
        translation['hometown'],
        translation['approved'],
        translation['pending'],
      ]
      let array = [arrayHeaders]
      users.forEach(user => {
        const { firstName, lastName, activities, region, hometown } = user;
        array.push([
          firstName,
          lastName,
          region,
          hometown,
          activities.approved,
          activities.pending
        ])
      })
      setData([...array])
    }
  }

  useEffect(() => { mapData() }, [users])

  const loadMoreUsers = () => {
    const { search } = history.location
    const parsedQuery = qs.parse(search)
    const last = users[users?.length - 1]
    dispatch(getUsers(parsedQuery, last))
  }

  return (
    <Container>
      <PageSection>
        <PageHeader  title={translation.usersPageTitle} backButton backLink='/admin' className='mb-0' />
      </PageSection>
      <PageSection className='sticky t-0 z-9'>
        <UsersFilter view={view} handleView={handleView} />
      </PageSection>
      <PageSection>
        {view === 'list' && <UsersList loading={loading} users={users} />}
        {view === 'table' && <Table loading={loading} data={data} />}
      </PageSection>
      <PageSection className='flex align__center justify__center mt-1'>
        {users?.length !== 0 && noMoreResults && <Typography variant='body1'>{translation.noMoreResults}</Typography>}
        {!noMoreResults && users?.length >= 9 && <Button onClick={loadMoreUsers}>{loadingMore ? <CircularProgress color='primary' style={{ height: 24, width: 24 }} /> : translation.loadMore}</Button>}
      </PageSection>
    </Container>
  )
}

export default Users
