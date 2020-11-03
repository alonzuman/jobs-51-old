import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getActivities } from '../../../../actions'
import ActivitiesList from '../../../../v2/organisms/ActivitiesList'
import Container from '../../../../v2/atoms/Container'
import PageSection from '../../../../v2/atoms/PageSection'
import PageHeader from '../../../../v2/organisms/PageHeader'
import Table from '../../../../v2/organisms/Table'
import RegionActivitiesFilter from './RegionActivitiesFilter'
import LoadMoreButton from '../../../../v2/atoms/LoadMoreButton'
import { translateDate } from '../../../../utils'

const RegionActivities = ({ match }) => {
  const [view, setView] = useState('list')
  const [data, setData] = useState([])
  const { region } = match.params;
  const { translation } = useSelector(state => state.theme)
  const { loading, activities, loadingMore, noMoreResults } = useSelector(state => state.activities)
  const query = {
    selectedRegion: region
  }
  const dispatch = useDispatch()

  const handleView = () => setView(view => view === 'list' ? 'table' : 'list')

  const mapData = () => {
    if (activities) {
      let arrayHeaders = [
        translation['firstName'],
        translation['lastName'],
        translation['region'],
        translation['date'],
        translation['type'],
        translation['description'],
        translation['approved'],
      ]
      let array = [arrayHeaders]
      activities.forEach(activity => {
        const { user, description, type, region, approved, date } = activity;
        const { firstName, lastName } = user;
        const [day, month, number, year, monthNumber] = translateDate(activity.date)
        array.push([
          firstName,
          lastName,
          region,
          `${number}/${monthNumber}/${year}`,
          type,
          description,
          approved ? translation.yes : translation.no,
        ])
      })
      setData([...array])
    }
  }

  useEffect(() => {
    mapData()
  }, [activities])

  useEffect(() => {
    dispatch(getActivities(query))
  }, [region])

  return (
    <Container>
      <PageSection>
        <PageHeader
          className='mb-0'
          backButton
          title={<>{translation.manageRegionActivities} <span className='primary__color'>{region}</span></>}
        />
      </PageSection>
      <RegionActivitiesFilter region={region} view={view} handleView={handleView} />
      <PageSection>
        {view === 'list' && <ActivitiesList showUser loading={loading} activities={activities} />}
        {view === 'table' && <Table loading={loading} data={data} />}
      </PageSection>
      <LoadMoreButton
        loading={loadingMore}
        list={activities}
        last={activities[activities?.length - 1]}
        query={query}
        noMoreResults={noMoreResults}
        action={getActivities}
      />
    </Container>
  )
}

export default RegionActivities
