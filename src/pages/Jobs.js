import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getJobs, openDialog } from '../actions'
import JobCard from '../components/cards/JobCard'
import CardsSkeletons from '../components/skeletons/CardsSkeletons'
import { Dialog, Grid, Typography } from '@material-ui/core'
import FiltersBar from '../components/layout/FiltersBar'
import TopBar from '../components/layout/TopBar'
import AddIcon from '@material-ui/icons/Add'
import FloatingActionButton from '../components/layout/FloatingActionButton'
import PageContainer from '../components/layout/PageContainer'
import SecondaryBar from '../components/layout/SecondaryBar'
import PersonalDetails from '../components/forms/profile/PersonalDetails'
import PersonalDetailsContainer from '../components/dialogs/PersonalDetailsContainer'

const Jobs = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { translation } = useSelector(state => state.theme)
  const { jobs, loading, filters } = useSelector(state => state.jobs)
  const authState = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getJobs())
  }, [dispatch, filters])

  useEffect(() => {
    if (!authState?.loading && !authState.serviceYear) {
      setIsOpen(true)
    }
  }, [authState])

  const filtersBar = [
    { type: 'categories', label: translation.categories, onClick: () => dispatch(openDialog({ type: 'CategoriesFilter', title: 'categories' }))  },
    { type: 'locations',  label: translation.location, onClick: () => dispatch(openDialog({ type: 'LocationsFilter', title: 'location' }))  },
    { type: 'dates', label: translation.datePosted, onClick: () => dispatch(openDialog({ type: 'DatesFilter', title: 'datePosted' })) },
  ]

  return (
    <>
      <PersonalDetailsContainer open={isOpen} onClose={() => setIsOpen(false)} />
      <FloatingActionButton color='primary' variant='extended' title={translation.addJob} action={() => dispatch(openDialog({ type: 'AddJob', title: 'addJob' }))}>
        <AddIcon />
      </FloatingActionButton>
      <TopBar backButton={true} title={translation.findJob} />
      <SecondaryBar>
        <FiltersBar filterOptions={filtersBar} />
      </SecondaryBar>
      <PageContainer>
        {loading && <CardsSkeletons />}
        <Grid className='cards__container' container spacing={2}>
          {(jobs?.length === 0 && !loading) && <Typography color='textPrimary' variant='body1'>{translation?.couldntFindJobs}</Typography>}
          {!loading && jobs?.map((job, index) => <JobCard key={index} job={job} />)}
        </Grid>
      </PageContainer>
    </>
  )
}

export default Jobs
