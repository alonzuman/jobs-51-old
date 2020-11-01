import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getActivities } from '../../../../actions'
import ActivitiesList from '../../../../v2/organisms/ActivitiesList'
import Container from '../../../../v2/atoms/Container'
import PageSection from '../../../../v2/atoms/PageSection'
import PageHeader from '../../../../v2/organisms/PageHeader'
import Table from '../../../../v2/organisms/Table'
import RegionActivitiesFilter from './RegionActivitiesFilter'

const RegionActivities = ({ match }) => {
  const [view, setView] = useState('list')
  const [data, setData] = useState([])
  const { region } = match.params;
  const { translation } = useSelector(state => state.theme)
  const { loading, activities } = useSelector(state => state.activities)
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
        translation['type'],
        translation['description'],
        translation['approved'],
      ]
      let array = [arrayHeaders]
      activities.forEach(activity => {
        const { user, description, type, region, approved } = activity;
        const { firstName, lastName } = user;
        array.push([
          firstName,
          lastName,
          region,
          type,
          description,
          approved ? translation.no : translation.yes,
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
      <RegionActivitiesFilter view={view} handleView={handleView} />
      <PageSection disableGutters>
        {view === 'list' && <ActivitiesList showUser loading={loading} activities={activities} />}
        {view === 'table' && <Table loading={loading} data={data} />}
      </PageSection>
    </Container>
  )
}

export default RegionActivities
