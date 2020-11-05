import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getActivities } from '../../../../actions'
import ActivitiesList from '../../../../v2/organisms/ActivitiesList'
import Container from '../../../../v2/atoms/Container'
import PageSection from '../../../../v2/atoms/PageSection'
import PageHeader from '../../../../v2/organisms/PageHeader'
import ActivitiesFilter from './components/ActivitiesFilter'
import qs from 'query-string'
import { useHistory } from 'react-router-dom'
import LoadMoreButton from '../../../../v2/atoms/LoadMoreButton'
import ActivitiesFilterProvider from './components/ActivitiesFilterContext'

const Activities = () => {
  const { translation } = useSelector(state => state.theme);
  const { isFetching, isFetched, isFetchingMore, all, isLastResult, currentUid, oldQuery } = useSelector(state => state.activities.activities);
  const dispatch = useDispatch()
  const history = useHistory()
  const { search } = history?.location
  const query = qs.parse(search)
  const { view } = query

  useEffect(() => {
    const newQuery = search.substring(1)
    if (!isFetched || currentUid) {
      dispatch(getActivities(query))
    } else if (newQuery !== oldQuery) {
      dispatch(getActivities(query))
    }
  }, [search])

  return (
    <Container>
      <PageSection>
        <PageHeader className='mb-0' title={translation.manageActivities} backButton backLink='/admin' />
      </PageSection>
      <ActivitiesFilterProvider>
        <ActivitiesFilter />
      </ActivitiesFilterProvider>
      <PageSection>
        <ActivitiesList view={view} loading={isFetching} activities={all} showUser />
      </PageSection>
      {isFetched && all?.length !== 0 &&
        <LoadMoreButton
          loading={isFetchingMore}
          list={all}
          query={query}
          isLastResult={isLastResult}
          action={getActivities}
        />}
    </Container>
  )
}

export default Activities
