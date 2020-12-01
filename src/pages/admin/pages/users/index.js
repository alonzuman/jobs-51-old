import React, { useEffect, useState } from 'react'
import Container from '../../../../components/atoms/Container'
import PageHeader from '../../../../components/organisms/PageHeader'
import UsersFilter from './components/UsersFilter'
import qs from 'query-string'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../../../actions/users'
import UsersList from '../../../../components/organisms/UsersList'
import PageSection from '../../../../components/atoms/PageSection'
import Table from '../../../../components/organisms/Table'
import LoadMoreButton from '../../../../components/atoms/LoadMoreButton'
import UsersFilterProvider from './components/UsersFilterContext'

const Users = () => {
  const { all, isFetching, isFetched, isFetchingMore, isLastResult, query: oldQuery } = useSelector(state => state.users.users)
  const { translation } = useSelector(state => state.theme)
  const history = useHistory()
  const dispatch = useDispatch()
  const { search } = history.location
  const query = qs.parse(search)
  const { view } = query

  useEffect(() => {
    const newQuery = search.substring(1)
    if (!isFetched && !isFetching) {
      dispatch(getUsers(query))
    } else if (newQuery !== oldQuery && !isFetching) {
      dispatch(getUsers(query))
    }
  }, [search])

  return (
    <Container>
      <PageSection>
        <PageHeader title={translation.usersPageTitle} backButton backLink='/admin' className='mb-0' />
      </PageSection>
      <UsersFilterProvider>
        <UsersFilter />
      </UsersFilterProvider>
      <PageSection>
        <UsersList view={view} loading={isFetching} users={all} />
      </PageSection>
      {isFetched && all?.length !== 0 && <LoadMoreButton
        loading={isFetchingMore}
        query={query}
        list={all}
        action={getUsers}
        isLastResult={isLastResult}
      />}
    </Container>
  )
}

export default Users
