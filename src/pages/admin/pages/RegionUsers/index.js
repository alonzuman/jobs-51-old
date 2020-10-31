import { Button, CircularProgress, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../../../actions/users'
import UsersList from '../../../../v2/organisms/UsersList'
import Container from '../../../../v2/atoms/Container'
import PageSection from '../../../../v2/atoms/PageSection'
import PageHeader from '../../../../v2/organisms/PageHeader'
import RegionUsersFilter from './RegionUsersFilter'
import Table from '../../../../v2/organisms/Table'

const RegionUsers = ({ match }) => {
  const [view, setView] = useState('list');
  const [data, setData] = useState([])
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

  useEffect(() => {
    if (users) {
      mapData()
    }
  }, [users])

  const loadMoreUsers = () => {
    const last = users[users?.length - 1];
    dispatch(getUsers(query, last))
  }

  const handleView = () => setView(view => view === 'list' ? 'table' : 'list')

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

  return (
    <Container>
      <PageSection>
        <PageHeader
          title={<>{translation.manageRegionUsers} <span className='primary__color'>{region}</span></>}
          backButton
        />
      </PageSection>
      <PageSection>
        <RegionUsersFilter view={view} handleView={handleView} />
      </PageSection>
      <PageSection>
        {view === 'list' && <UsersList loading={loading} users={users} />}
        {view === 'table' && <Table loading={loading} data={data} />}
      </PageSection>
      <PageSection className='flex align__center justify__center mt-1'>
        {users?.length !== 0 && noMoreResults && <Typography variant='body1'>{translation.noMoreResults}</Typography>}
        {users?.length >= 10 && !noMoreResults && <Button onClick={loadMoreUsers}>{loadingMore ? <CircularProgress color='primary' style={{ height: 24, width: 24 }} /> : translation.loadMore}</Button>}
      </PageSection>
    </Container>
  )
}

export default RegionUsers
