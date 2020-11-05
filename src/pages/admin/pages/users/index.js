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
import LoadMoreButton from '../../../../v2/atoms/LoadMoreButton'

const Users = () => {
  const [view, setView] = useState('list')
  const [data, setData] = useState([])
  const { all, isFetching, isFetched, isFetchingMore, isFetchedMore, isLastResult } = useSelector(state => state.users.users)
  const { translation } = useSelector(state => state.theme)
  const history = useHistory()
  const dispatch = useDispatch()
  const { search } = history.location
  const query = qs.parse(search)

  useEffect(() => {
    if (!isFetched) {
      dispatch(getUsers(query))
    }
  }, [history.location])

  const handleView = () => {
    setView(view => view === 'list' ? 'table' : 'list')
  }

  const mapData = () => {
    if (all) {
      let arrayHeaders = [
        translation['firstName'],
        translation['lastName'],
        translation['region'],
        translation['hometown'],
        translation['approved'],
        translation['pending'],
      ]
      let array = [arrayHeaders]
      all.forEach(user => {
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

  useEffect(() => { mapData() }, [all])

  return (
    <Container>
      <PageSection>
        <PageHeader title={translation.usersPageTitle} backButton backLink='/admin' className='mb-0' />
      </PageSection>
      <UsersFilter view={view} handleView={handleView} />
      <PageSection>
        {view === 'list' && <UsersList loading={isFetching} users={all} />}
        {view === 'table' && <Table loading={isFetching} data={data} />}
      </PageSection>
      <LoadMoreButton
        loading={isFetchingMore}
        query={query}
        list={all}
        last={all[all?.length - 1] || {}}
        action={getUsers}
        isLastResult={isLastResult}
      />
    </Container>
  )
}

export default Users
